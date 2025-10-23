"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransactionOverview } from '@/hooks/use-transaction-overview';
import { DashboardOverviewProps, Account } from '@/app/types/dashboard';
import { RecentTransactionsList, ExpenseBreakdownChart } from './ui';

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ accounts, transactions }) => {
    const {
        selectedAccountId,
        setSelectedAccountId,
        recentTransactions,
        pieChartData,
        formatTransactionDate,
        getTransactionIcon,
        getTransactionColor,
        getChartColors
    } = useTransactionOverview(accounts, transactions);

    const currency = accounts.find((a: Account) => a.id === selectedAccountId)?.currency || '';

    return (
        <div className='grid gap-4 md:grid-cols-2'>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-base font-normal">Recent Transactions</CardTitle>
                    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select Account" />
                        </SelectTrigger>
                        <SelectContent>
                            {accounts.map((account: Account) => (
                                <SelectItem key={account.id} value={account.id}>
                                    {account.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <RecentTransactionsList
                        transactions={recentTransactions}
                        currency={currency}
                        formatTransactionDate={formatTransactionDate}
                        getTransactionIcon={getTransactionIcon}
                        getTransactionColor={getTransactionColor}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Monthly Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent className='p-0 pb-5'>
                    <ExpenseBreakdownChart
                        data={pieChartData}
                        currency={currency}
                        getChartColors={getChartColors}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardOverview;