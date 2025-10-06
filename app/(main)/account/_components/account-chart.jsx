"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DATE_RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions, account }) => {
    const [dateRange, setDateRange] = useState("1M");

    // Memoized calculation of daily grouped income/expense data for chart
    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0));

        // Filter transactions within selected date range
        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
        );

        // Group transactions by day and sum income/expense
        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "MMM dd");

            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }

            if (transaction.type === "INCOME") {
                acc[date].income += transaction.amount;
            } else {
                acc[date].expense += transaction.amount
            }

            return acc;
        }, {})

        // Convert grouped object to sorted array for chart
        return Object.values(grouped).sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }, [transactions, dateRange]);

    // Memoized calculation of total income and expense for summary
    const totals = useMemo(() => {
        return filteredData.reduce(
            (acc, day) => ({
                income: acc.income + day.income,
                expense: acc.expense + day.expense,
            }), { income: 0, expense: 0 }
        );
    }, [filteredData]);

    // Render the account chart UI
    return (
        <Card>
            {/* Header with title and date range selector */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle className="text-base font-normal">Transaction Overview</CardTitle>
                <Select defaultValue={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                {/* Summary totals: Income, Expenses, Net */}
                <div className='flex justify-around mb-6 text-sm'>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Total Income</p>
                        <p className='text-lg font-bold text-green-500'>
                            {account.currency} {totals.income.toFixed(2)}
                        </p>
                    </div>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Total Expenses</p>
                        <p className='text-lg font-bold text-red-500'>
                            {account.currency} {totals.expense.toFixed(2)}
                        </p>
                    </div>
                    <div className='text-center'>
                        <p className='text-muted-foreground'>Net</p>
                        <p
                            className={`text-lg font-bold ${
                                totals.income - totals.expense >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {account.currency} {(totals.income - totals.expense).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Bar chart for daily income and expenses */}
                <div className='h-[300px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${account?.currency} ${value}`}
                            />
                            <Tooltip formatter={(value) => [`${account?.currency} ${value}`, undefined]} />
                            <Legend />
                            <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default AccountChart