'use server';

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUser, checkRateLimit } from "./auth-helpers";
import { serializeAmount, calculateNextRecurringDate, calculateBalanceChange } from "./utils";

// creates a new transaction and updates account balance
export const createTransaction = async (data: any): Promise<{ success: boolean; data: any }> => {
    try {
        const user = await getAuthenticatedUser();
        await checkRateLimit(user.clerkUserId);

        // check if the account belongs to this user
        const account = await db.account.findUnique({
            where: {
                id: data.accountId,
                userId: user.id,
            },
        });

        if (!account) {
            throw new Error("Account not found");
        }

        // calculate new account balance
        const balanceChange = await calculateBalanceChange(data.type, data.amount);
        const newBalance = account.balance.toNumber() + balanceChange;

        // create transaction and update balance in one go
        const transaction = await db.$transaction(async (tx) => {
            const newTransaction = await tx.transaction.create({
                data: {
                    ...data,
                    userId: user.id,
                    nextRecurringDate: data.isRecurring && data.recurringInterval 
                        ? await calculateNextRecurringDate(data.date, data.recurringInterval) 
                        : null,
                },
            });

            // update the account balance
            await tx.account.update({
                where: { id: data.accountId },
                data: { balance: newBalance },
            });

            return newTransaction;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${transaction.accountId}`);

        return { success: true, data: await serializeAmount(transaction) };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};

// gets a single transaction by id
export const getTransaction = async (id: string): Promise<any> => {
    const user = await getAuthenticatedUser();

    const transaction = await db.transaction.findUnique({
        where: {
            id,
            userId: user.id,
        },
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    return await serializeAmount(transaction);
};

// updates an existing transaction
export const updateTransaction = async (id: string, data: any): Promise<{ success: boolean; data: any }> => {
    try {
        const user = await getAuthenticatedUser();

        // get the original transaction to calculate balance changes
        const originalTransaction = await db.transaction.findUnique({
            where: {
                id,
                userId: user.id,
            },
            include: { account: true },
        });

        if (!originalTransaction) {
            throw new Error("Transaction not found");
        }

        // calculate how much the balance should change
        const oldBalanceChange = await calculateBalanceChange(
            originalTransaction.type, 
            originalTransaction.amount.toNumber()
        );
        const newBalanceChange = await calculateBalanceChange(data.type, data.amount);
        const netBalanceChange = newBalanceChange - oldBalanceChange;

        // update transaction and account balance together
        const transaction = await db.$transaction(async (tx) => {
            const updated = await tx.transaction.update({
                where: { id, userId: user.id },
                data: {
                    ...data,
                    nextRecurringDate: data.isRecurring && data.recurringInterval 
                        ? await calculateNextRecurringDate(data.date, data.recurringInterval) 
                        : null,
                },
            });

            // update account balance with the difference
            await tx.account.update({
                where: { id: data.accountId },
                data: {
                    balance: { increment: netBalanceChange },
                },
            });

            return updated;
        });

        revalidatePath("/dashboard");
        revalidatePath(`/account/${data.accountId}`);

        return { success: true, data: await serializeAmount(transaction) };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
};