'use server';

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };

    if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }

    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;
};

export const createAccount = async (data) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Convert balance to float before saving
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }

        // Check if this is the user's first account
        const existingAccounts = await db.account.findMany({
            where: {
                userId: user.id
            },
        });

        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        // Removing all existing accounts from default if current account should be made default
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: {
                    userId: user.id,
                    isDefault: true
                },
                data: {
                    isDefault: false
                },
            });
        }

        const account = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });
        

        // NextJS doesn't allow float values so we are converting it to a number.
        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");
        return {
            success: true,
            data: serializedAccount
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Fetches all accounts for the authenticated user, ordered by creation date.
// Includes a count of related transactions for each account.
// Serializes account data for frontend compatibility.
export const getUserAccounts = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    console.log('userId from clerk', userId);
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });

    console.log('user in db', user);
    if (!user) {
        throw new Error("User not found");
    }

    const accounts = await db.account.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            _count: {
                select: {
                    transaction: true,
                },
            },
        },
    });

    const serializedAccount = accounts.map(serializeTransaction);

    return serializedAccount;
}

// Retrieves all transactions for the authenticated user, ordered by date.
// Serializes transaction data for frontend compatibility.
export const getDashboardData = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Get all user transactions
    const transactions = await db.transaction.findMany({
        where: { userId: user.id },
        orderBy: { date: "desc" },
    });

    return transactions.map(serializeTransaction);
}