'use server';

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface Transaction {
  balance?: { toNumber: () => number } | number;
  amount?: { toNumber: () => number } | number;
  [key: string]: any;
}

interface Account {
  balance?: { toNumber: () => number } | number;
  [key: string]: any;
}

const serializeTransaction = (obj: Transaction): Transaction => {
    const serialized: Transaction = { ...obj };

    if (obj.balance && typeof obj.balance !== "number") {
        serialized.balance = obj.balance.toNumber();
    }

    if (obj.amount && typeof obj.amount !== "number") {
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;
};

const serializeAccount = (obj: Account): Account => {
    const serialized: Account = { ...obj };

    if (obj.balance && typeof obj.balance !== "number") {
        serialized.balance = obj.balance.toNumber();
    }

    return serialized;
};

interface CreateAccountData {
  name: string
  type: 'CURRENT' | 'SAVINGS'
  balance: string
  currency: keyof typeof import('@prisma/client').Currencies
  isDefault?: boolean
}

export const createAccount = async (data: CreateAccountData) => {
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
        const serializedAccount = serializeAccount(account);

        revalidatePath("/dashboard");
        return {
            success: true,
            data: serializedAccount
        };
    } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
    }
}

// Fetches all accounts for the authenticated user, ordered by creation date.
// Includes a count of related transactions for each account.
// Serializes account data for frontend compatibility.
interface AccountResponse {
  id: string
  name: string
  currency: string
  type: string
  balance: number
  isDefault: boolean
  _count?: {
    transaction: number
  }
}

export const getUserAccounts = async (): Promise<AccountResponse[]> => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    // console.log('userId from clerk', userId);
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
    });

    // console.log('user in db', user);
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

    const serializedAccounts = accounts.map(serializeAccount);

    return serializedAccounts as AccountResponse[];
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
