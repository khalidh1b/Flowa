export type RecurringInterval = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type Transaction = {
  id: string;
  description?: string;
  date: string;
  amount: number;
  category: string;
  currency: string;
  type: 'INCOME' | 'EXPENSE';
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  nextRecurringDate?: string | null;
};

export type Account = {
  id: string;
  name: string;
  type: string;
  currency: string;
  balance: number | string;
  _count?: { transaction: number };
};
