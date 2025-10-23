"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Account, Transaction, DateRangeKey } from '@/app/types/chart';
import { DATE_RANGES } from '@/utils/chart-constants';
import { useChartData } from '@/hooks/use-chart-data';

interface AccountChartProps {
  transactions: Transaction[];
  account: Account;
}

const AccountChart: React.FC<AccountChartProps> = ({ transactions, account }) => {
  const [dateRange, setDateRange] = useState<DateRangeKey>("1M");

  const { filteredData, totals } = useChartData(transactions, dateRange);

  return (
    <Card>
      {/* Header with title and date range selector */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-normal">Transaction Overview</CardTitle>
        <Select 
          defaultValue={dateRange} 
          onValueChange={(value) => setDateRange(value as DateRangeKey)}
        >
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

export default AccountChart;