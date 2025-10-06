import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Converts BigInt fields (balance, amount) to numbers for easier handling.
 * @param {Object} obj - The transaction or account object.
 * @returns {Object} - Serialized object with numeric fields.
 */
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

/**
 * Sets the given account as the default for the authenticated user.
 * Unsets any previously default account.
 * @param {string} accountId - The account to set as default.
 * @returns {Object} - Success status and updated account data.
 * @throws {Error} - If user is unauthorized or not found.
 */
export const updateDefaultAccount = async (accountId) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        // Find user by Clerk ID
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Unset previous default account(s)
        await db.account.updateMany({
            where: {
                userId: user.id,
                isDefault: true
            },
            data: {
                isDefault: false
            },
        });

        // Set new default account
        const account = await db.account.update({
            where: {
                userId: user.id,
                id: accountId
            },
            data: {
                isDefault: true
            }
        });

        // Refresh dashboard data
        revalidatePath('/dashboard');

        return {
            success: true,
            data: serializeTransaction(account)
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Retrieves an account along with its associated transactions for the authenticated user.
 *
 * @async
 * @function getAccountWithTransactions
 * @param {string} accountId - The unique identifier of the account to retrieve.
 * @returns {Promise<Object|null>} An object containing the account details and its transactions,
 * or null if the account is not found.
 * @throws {Error} Throws an error if the user is unauthorized or not found.
 */
export const getAccountWithTransactions = async (accountId) => {
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

    const account = await db.account.findUnique({
        where: {
            userId: user.id,
            id: accountId
        },
        include: {
            transaction: {
                orderBy: {
                    date: "desc"
                },
            },
            _count: {
                select: {
                    transaction: true
                },
            }
        },
    });

    if (!account) {
        return null;
    }

    return {
        ...serializeTransaction(account),
        transactions: account.transaction.map(serializeTransaction),
    }
}

export async function bulkDeleteTransaction(transactionIds) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        if (!user) throw new Error("User not found");

        // Get transactions to calculate balance changes
        const transactions = await db.transaction.findMany({
            where: {
                id: { in: transactionIds },
                userId: user.id,
            },
        });

        // Group transactions by account to update balances
        const accountBalanceChanges = transactions.reduce((acc, transaction) => {
            const change =
                transaction.type === "EXPENSE"
                    ? transaction.amount
                    : -transaction.amount;
            acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
            return acc;
        }, {});

        // Delete transactions and update account balances in a transaction
        await db.$transaction(async (tx) => {
            // Delete transactions
            await tx.transaction.deleteMany({
                where: {
                    id: { in: transactionIds },
                    userId: user.id,
                },
            });

            // Update account balances
            for (const [accountId, balanceChange] of Object.entries(
                accountBalanceChanges
            )) {
                await tx.account.update({
                    where: { id: accountId },
                    data: {
                        balance: {
                            increment: balanceChange,
                        },
                    },
                });
            }
        });

        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}