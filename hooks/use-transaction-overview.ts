import { useState } from 'react';
import { format } from 'date-fns';
import { Account, Transaction, PieChartData } from '@/app/types/dashboard';

const COLORS = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
    "#9FA8DA",
];

export const useTransactionOverview = (accounts: Account[], transactions: Transaction[]) => {
    const [selectedAccountId, setSelectedAccountId] = useState(
        accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
    );

    // Filter transactions for selected account 
    const accountTransactions = transactions.filter(
        (t) => t.accountId === selectedAccountId
    );

    const recentTransactions = accountTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5);

    // Calculate expense breakdown for current month
    const currentDate = new Date();
    const currentMonthExpenses = accountTransactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
            t.type === "EXPENSE" &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
        );
    });

    // Group expenses by category
    const expensesByCategory = currentMonthExpenses.reduce<Record<string, number>> ((acc, transaction) => {
        const category = transaction.category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {});

    // Format data for pie chart
    const pieChartData: PieChartData[] = Object.entries(expensesByCategory).map(
        ([category, amount]) => ({
            name: category,
            value: amount,
        })
    );

    const formatTransactionDate = (date: string) => {
        return format(new Date(date), "PP");
    };

    const getTransactionIcon = (type: string) => {
        return type === "EXPENSE" ? "ArrowDownRight" : "ArrowUpRight";
    };

    const getTransactionColor = (type: string) => {
        return type === "EXPENSE" ? "text-red-500" : "text-green-500";
    };

    const getChartColors = (index: number) => {
        return COLORS[index % COLORS.length];
    };

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
        hasTransactions: accountTransactions.length > 0,
        hasExpenses: pieChartData.length > 0,
    };
};
