'use server';

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// helper function to get the current user from the database
const getCurrentUser = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("no user found - please sign in");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    });

    if (!user) throw new Error("user profile missing");
    return user;
};

// helper function to get the start and end dates of the current month
const getMonthDateRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
};

// helper function to convert database decimal to regular number
const toNumber = (amount: any) => amount ? amount.toNumber() : 0;

// main function to get user's budget and current month spending
export const getCurrentBudget = async (accountId: string) => {
    try {
        const user = await getCurrentUser();

        const budget = await db.budget.findFirst({
            where: { userId: user.id }
        });

        const { firstDay, lastDay } = getMonthDateRange();
        
        const expenses = await db.transaction.aggregate({
            where: {
                userId: user.id,
                type: "EXPENSE",
                date: { gte: firstDay, lte: lastDay },
                accountId
            },
            _sum: { amount: true }
        });

        return {
            budget: budget ? { ...budget, amount: toNumber(budget.amount) } : null,
            currentExpenses: toNumber(expenses._sum.amount)
        };

    } catch (error) {
        console.error("oops! couldn't get budget info:", error);
        throw error;
    }
};

// main function to update or create a budget
export const updateBudget = async (amount: number) => {
    try {
        const user = await getCurrentUser();

        const budget = await db.budget.upsert({
            where: { userId: user.id },
            update: { amount },
            create: { userId: user.id, amount }
        });

        revalidatePath("/dashboard");

        return {
            success: true,
            data: { ...budget, amount: toNumber(budget.amount) }
        };

    } catch (error) {
        console.error("oops! couldn't update budget:", error);
        return { 
            success: false, 
            error: (error as Error).message 
        };
    }
};