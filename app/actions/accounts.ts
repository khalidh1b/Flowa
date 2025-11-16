'use server';

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// helper: convert big numbers to regular numbers
const fixNumbers = (obj: any): any => {
    const fixed = { ...obj };
    
    if (obj?.balance?.toNumber) fixed.balance = obj.balance.toNumber();
    if (obj?.amount?.toNumber) fixed.amount = obj.amount.toNumber();
    
    return fixed;
};

// helper: get current user
const getCurrentUser = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("no user logged in");
    
    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    });
    
    if (!user) throw new Error("user not found");
    return user;
};

// set default account for user
export const updateDefaultAccount = async (accountId: string) => {
    try {
        const user = await getCurrentUser();
        
        // remove old default
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true },
            data: { isDefault: false }
        });
        
        // set new default
        const account = await db.account.update({
            where: { userId: user.id, id: accountId },
            data: { isDefault: true }
        });
        
        revalidatePath('/dashboard');
        return { success: true, data: fixNumbers(account) };
    } catch (error: any) {
        throw new Error(error?.message ?? "something went wrong");
    }
};

// get account with all its transactions
export const getAccountWithTransactions = async (accountId: string) => {
    const user = await getCurrentUser();
    
    const account = await db.account.findUnique({
        where: { userId: user.id, id: accountId },
        include: {
            transaction: { orderBy: { date: "desc" } },
            _count: { select: { transaction: true } }
        }
    });
    
    if (!account) return null;
    
    return {
        ...fixNumbers(account),
        transactions: account.transaction.map(fixNumbers)
    };
};

// delete many transactions at once
export async function bulkDeleteTransaction(transactionIds: string[]) {
    try {
        const user = await getCurrentUser();
        
        // get all transactions to delete
        const transactions = await db.transaction.findMany({
            where: { id: { in: transactionIds }, userId: user.id }
        });
        
        // calculate how much to add back to each account
        const balanceChanges = transactions.reduce((acc: any, transaction: any) => {
            const amount = Number(transaction.amount);
            const change = transaction.type === "EXPENSE" ? amount : -amount;
            acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
            return acc;
        }, {});
        
        // delete and update in one go
        await db.$transaction(async (tx: any) => {
            // delete the transactions
            await tx.transaction.deleteMany({
                where: { id: { in: transactionIds }, userId: user.id }
            });
            
            // fix account balances
            for (const [accountId, change] of Object.entries(balanceChanges)) {
                await tx.account.update({
                    where: { id: accountId },
                    data: { balance: { increment: change } }
                });
            }
        });
        
        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error?.message ?? "delete failed" };
    }
};