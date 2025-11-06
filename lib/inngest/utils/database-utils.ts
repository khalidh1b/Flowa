import { db } from "../../prisma";
import { MonthlyStats, BudgetWithUser, TransactionWithAccount } from "../types";
import { DateUtils } from "./date-utils";

export class DatabaseUtils {
  static async getBudgetsWithUsers(): Promise<BudgetWithUser[]> {
    return await db.budget.findMany({
      include: {
        user: {
          include: {
            accounts: {
              where: {
                isDefault: true,
              }
            }
          }
        }
      }
    });
  }

  static async getMonthlyExpenses(
    userId: string, 
    accountId: string, 
    { startDate, endDate }: { startDate: Date; endDate: Date }
  ): Promise<number> {
    const expenses = await db.transaction.aggregate({
      where: {
        userId,
        accountId,
        type: "EXPENSE",
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return Number(expenses._sum.amount) || 0;
  }

  static async getRecurringTransactions(): Promise<TransactionWithAccount[]> {
    return await db.transaction.findMany({
      where: {
        isRecurring: true,
        status: "COMPLETED",
        OR: [
          { lastProcessed: null },
          { nextRecurringDate: { lte: new Date() } },
        ],
      },
      include: {
        account: true,
      },
    });
  }

  static async getTransactionById(
    transactionId: string, 
    userId: string
  ): Promise<TransactionWithAccount | null> {
    return await db.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
      },
      include: {
        account: true,
      },
    });
  }

  static async getMonthlyStats(userId: string, month: Date): Promise<MonthlyStats> {
    const { startDate, endDate } = DateUtils.getMonthRange(month);

    const transactions = await db.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return transactions.reduce((stats: MonthlyStats, transaction) => {
      const amount = Number(transaction.amount);
      if (transaction.type === "EXPENSE") {
        stats.totalExpenses += amount;
        stats.byCategory[transaction.category] = (stats.byCategory[transaction.category] || 0) + amount;
      } else {
        stats.totalIncome += amount;
      }
      return stats;
    }, {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {} as Record<string, number>,
      transactionCount: transactions.length,
    });
  }

  static async updateBudgetAlert(budgetId: string): Promise<void> {
    await db.budget.update({
      where: { id: budgetId },
      data: { lastAlertSent: new Date() }
    });
  }

  static async createRecurringTransaction(
    transaction: TransactionWithAccount
  ): Promise<void> {
    await db.$transaction(async (tx) => {
      // Convert Decimal to number
      const amount = typeof transaction.amount === 'object' 
        ? transaction.amount.toNumber() 
        : transaction.amount;

      // Create new transaction
      await tx.transaction.create({
        data: {
          type: transaction.type,
          amount: amount,
          description: `${transaction.description || 'Transaction'} (Recurring)`,
          date: new Date(),
          category: transaction.category,
          userId: transaction.userId,
          accountId: transaction.accountId,
          isRecurring: false,
        },
      });

      // Update account balance
      const balanceChange = transaction.type === "EXPENSE" 
        ? -amount 
        : amount;

      await tx.account.update({
        where: { id: transaction.accountId },
        data: { balance: { increment: balanceChange } },
      });

      // Update last processed date and next recurring date
      await tx.transaction.update({
        where: { id: transaction.id },
        data: {
          lastProcessed: new Date(),
          nextRecurringDate: DateUtils.calculateNextRecurringDate(
            new Date(),
            transaction.recurringInterval || "MONTHLY"
          ),
        },
      });
    });
  }

  static async getAllUsersWithAccounts() {
    return await db.user.findMany({
      include: { accounts: true },
    });
  }
};