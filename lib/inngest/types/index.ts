export interface MonthlyReportData {
  month: string;
  stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory?: Record<string, number>;
  };
  insights?: string[];
  totalExpenses: number;
  budgetAmount: number;
  percentageUsed: number;
};

export interface BudgetAlertData {
  percentageUsed: number;
  budgetAmount: number;
  totalExpenses: number;
  month: string;
  stats: {
    totalIncome: number;
    totalExpenses: number;
    byCategory?: Record<string, number>;
  };
  insights?: string[];
};

export interface RecurringTransactionEvent {
  name: "transaction.recurring.process";
  data: {
    transactionId: string;
    userId: string;
  };
};

export interface MonthlyStats {
  totalExpenses: number;
  totalIncome: number;
  byCategory: Record<string, number>;
  transactionCount: number;
};

export interface BudgetWithUser {
  id: string;
  userId: string;
  amount: number | { toNumber(): number };
  lastAlertSent: Date | null;
  user: {
    id: string;
    email: string;
    accounts: Array<{
      id: string;
      isDefault: boolean;
    }>;
  };
};

export interface TransactionWithAccount {
  id: string;
  userId: string;
  accountId: string;
  type: "INCOME" | "EXPENSE";
  amount: number | { toNumber(): number };
  description: string | null;
  category: string;
  date: Date;
  isRecurring: boolean;
  status: string;
  lastProcessed: Date | null;
  nextRecurringDate: Date | null;
  recurringInterval: string | null;
  account: {
    id: string;
    balance: number | { toNumber(): number };
  };
};

export interface DateRange {
  startDate: Date;
  endDate: Date;
};