'use server';

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/lib/auth-helpers";
import { serializeAccount, serializeTransaction } from "@/app/lib/serializers";

type CreateAccountData = {
  name: string;
  type: 'CURRENT' | 'SAVINGS';
  balance: string;
  currency: keyof typeof import('@prisma/client').Currencies;
  isDefault?: boolean;
};

// create a new bank account for the user
export const createAccount = async (data: CreateAccountData) => {
  try {
    const user = await getCurrentUser();
    
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("please enter a valid balance amount");
    }

    // check if this is the user's first account
    const existingAccounts = await db.account.count({
      where: { userId: user.id },
    });

    const shouldBeDefault = existingAccounts === 0 ? true : data.isDefault;

    // if this should be default, remove default from other accounts
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // create the new account
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    revalidatePath("/dashboard");
    
    return {
      success: true,
      data: serializeAccount(account),
    };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

// get all accounts for the current user
export const getUserAccounts = async () => {
  const user = await getCurrentUser();

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { transaction: true },
      },
    },
  });

  return accounts.map(serializeAccount);
};

// get all dashboard data (transactions) for the current user
export const getDashboardData = async () => {
  const user = await getCurrentUser();

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
};