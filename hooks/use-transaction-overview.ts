import { useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Account, Transaction, PieChartData } from '@/app/types/dashboard';

// Constants
const COLORS = [
  "#FF6B6B",
  "#4ECDC4", 
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
] as const;

const DEFAULT_RECENT_TRANSACTIONS_COUNT = 5;
const TRANSACTION_TYPES = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
} as const;

// Types
interface UseTransactionOverviewReturn {
  selectedAccountId: string | undefined;
  setSelectedAccountId: (id: string) => void;
  accountTransactions: Transaction[];
  recentTransactions: Transaction[];
  pieChartData: PieChartData[];
  formatTransactionDate: (date: string) => string;
  getTransactionIcon: (type: string) => string;
  getTransactionColor: (type: string) => string;
  getChartColors: (index: number) => string;
  hasTransactions: boolean;
  hasExpenses: boolean;
  isLoading: boolean;
  error: string | null;
}

// Utility functions
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const parseDate = (dateString: string): Date => {
  if (!isValidDate(dateString)) {
    return new Date();
  }
  return new Date(dateString);
};


export const useTransactionOverview = (
  accounts: Account[] = [], 
  transactions: Transaction[] = []
): UseTransactionOverviewReturn => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(() => {
    // Safe initialization with fallback
    if (!accounts.length) return undefined;
    return accounts.find((a) => a.isDefault)?.id || accounts[0]?.id;
  });

  // Error handling
  const error = useMemo(() => {
    if (!accounts.length) return 'No accounts available';
    if (!transactions.length) return 'No transactions available';
    if (selectedAccountId && !accounts.find(a => a.id === selectedAccountId)) {
      return 'Selected account not found';
    }
    return null;
  }, [accounts, transactions, selectedAccountId]);

  const isLoading = useMemo(() => {
    return false; 
  }, []);

  // Memoized account transactions filter
  const accountTransactions = useMemo(() => {
    if (!selectedAccountId || !transactions.length) return [];
    
    return transactions.filter((transaction) => {
      return transaction.accountId === selectedAccountId && 
             isValidDate(transaction.date);
    });
  }, [selectedAccountId, transactions]);

  // Memoized recent transactions with safe sorting
  const recentTransactions = useMemo(() => {
    if (!accountTransactions.length) return [];
    
    return [...accountTransactions]
      .sort((a, b) => {
        const dateA = parseDate(a.date).getTime();
        const dateB = parseDate(b.date).getTime();
        return dateB - dateA;
      })
      .slice(0, DEFAULT_RECENT_TRANSACTIONS_COUNT);
  }, [accountTransactions]);

  // Memoized current month expenses
  const currentMonthExpenses = useMemo(() => {
    if (!accountTransactions.length) return [];
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return accountTransactions.filter((transaction) => {
      const transactionDate = parseDate(transaction.date);
      return (
        transaction.type === TRANSACTION_TYPES.EXPENSE &&
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
  }, [accountTransactions]);

  // Memoized expenses by category
  const expensesByCategory = useMemo(() => {
    return currentMonthExpenses.reduce<Record<string, number>>((acc, transaction) => {
      const category = transaction.category || 'Uncategorized';
      const amount = Math.abs(transaction.amount);
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  }, [currentMonthExpenses]);

  // Memoized pie chart data
  const pieChartData = useMemo((): PieChartData[] => {
    return Object.entries(expensesByCategory)
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => ({
        name: category,
        value: Number(amount.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expensesByCategory]);

  // Memoized utility functions
  const formatTransactionDate = useCallback((dateString: string): string => {
    if (!isValidDate(dateString)) {
      return 'Invalid Date';
    }
    return format(parseDate(dateString), "PP");
  }, []);

  const getTransactionIcon = useCallback((type: string): string => {
    return type === TRANSACTION_TYPES.EXPENSE ? "ArrowDownRight" : "ArrowUpRight";
  }, []);

  const getTransactionColor = useCallback((type: string): string => {
    return type === TRANSACTION_TYPES.EXPENSE ? "text-red-500" : "text-green-500";
  }, []);

  const getChartColors = useCallback((index: number): string => {
    return COLORS[index % COLORS.length];
  }, []);

  // Memoized boolean states
  const hasTransactions = useMemo(() => accountTransactions.length > 0, [accountTransactions]);
  const hasExpenses = useMemo(() => pieChartData.length > 0, [pieChartData]);

  return {
    selectedAccountId,
    setSelectedAccountId,
    accountTransactions,
    recentTransactions,
    pieChartData,
    formatTransactionDate,
    getTransactionIcon,
    getTransactionColor,
    getChartColors,
    hasTransactions,
    hasExpenses,
    isLoading,
    error,
  };
};