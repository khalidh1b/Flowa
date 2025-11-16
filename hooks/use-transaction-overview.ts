import { useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { Account, Transaction, PieChartData } from '@/app/types/dashboard';

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5", "#9FA8DA"] as const;
const RECENT_COUNT = 5;
const TRANSACTION_TYPES = { EXPENSE: 'EXPENSE', INCOME: 'INCOME' } as const;

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
};

// date utilities
const dateUtils = {
  isValid: (date: string): boolean => !isNaN(new Date(date).getTime()),
  parse: (date: string): Date => dateUtils.isValid(date) ? new Date(date) : new Date(),
  format: (date: string): string => dateUtils.isValid(date) ? format(dateUtils.parse(date), "PP") : 'Invalid Date'
};

export const useTransactionOverview = (
  accounts: Account[] = [], 
  transactions: Transaction[] = []
): UseTransactionOverviewReturn => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(() => 
    accounts.length ? accounts.find(a => a.isDefault)?.id || accounts[0]?.id : undefined
  );

  // validation and error states
  const { error, isLoading } = useMemo(() => {
    const hasError = !accounts.length ? 'No accounts available' : 
                   !transactions.length ? 'No transactions available' :
                   selectedAccountId && !accounts.find(a => a.id === selectedAccountId) ? 'Selected account not found' : 
                   null;
    return { error: hasError, isLoading: false };
  }, [accounts, transactions, selectedAccountId]);

  // filtered transactions for selected account
  const accountTransactions = useMemo(() => 
    selectedAccountId ? transactions.filter(t => 
      t.accountId === selectedAccountId && dateUtils.isValid(t.date)
    ) : []
  , [selectedAccountId, transactions]);

  // recent transactions sorted by date
  const recentTransactions = useMemo(() => 
    [...accountTransactions]
      .sort((a, b) => dateUtils.parse(b.date).getTime() - dateUtils.parse(a.date).getTime())
      .slice(0, RECENT_COUNT)
  , [accountTransactions]);

  // current month expenses for chart data
  const { currentMonthExpenses, expensesByCategory, pieChartData } = useMemo(() => {
    const now = new Date();
    const currentMonthExpenses = accountTransactions.filter(t => 
      t.type === TRANSACTION_TYPES.EXPENSE &&
      dateUtils.parse(t.date).getMonth() === now.getMonth() &&
      dateUtils.parse(t.date).getFullYear() === now.getFullYear()
    );

    const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
      const category = t.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(expensesByCategory)
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => ({ name: category, value: Number(amount.toFixed(2)) }))
      .sort((a, b) => b.value - a.value);

    return { currentMonthExpenses, expensesByCategory, pieChartData };
  }, [accountTransactions]);

  // utility callbacks
  const formatTransactionDate = useCallback((date: string): string => dateUtils.format(date), []);
  
  const getTransactionIcon = useCallback((type: string): string => 
    type === TRANSACTION_TYPES.EXPENSE ? "ArrowDownRight" : "ArrowUpRight", []
  );

  const getTransactionColor = useCallback((type: string): string => 
    type === TRANSACTION_TYPES.EXPENSE ? "text-red-500" : "text-green-500", []
  );

  const getChartColors = useCallback((index: number): string => 
    COLORS[index % COLORS.length], []
  );

  // derived boolean states
  const hasTransactions = accountTransactions.length > 0;
  const hasExpenses = pieChartData.length > 0;

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