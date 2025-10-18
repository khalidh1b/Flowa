import { getDashboardData, getUserAccounts } from '@/app/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react'
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/app/actions/budget';
import BudgetProgress from './_components/budget-progress';
import DashboardOverview from './_components/transaction-overview';

interface Account {
  id: string;
  name: string;
  isDefault: boolean;
  balance: number
  type: string
  currency: string
};

const DashboardPage = async () => {
    const accounts = await getUserAccounts();

    console.log('user all accounts', accounts);
    const defaultAccount = accounts?.find((account) => account.isDefault);

    console.log(defaultAccount);
    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    const transactions = await getDashboardData();

    return (
        <div className='space-y-8'>
            
            {defaultAccount && budgetData?.budget && (
                <BudgetProgress
                    initialBudget={budgetData.budget}
                    currentExpenses={budgetData?.currentExpenses || 0}
                    currency={defaultAccount.currency}
                />
            )}

            <Suspense fallback={"Loading Overview..."}>
                <DashboardOverview accounts={accounts} transactions={transactions?.map(t => ({
                    id: t.id,
                    accountId: t.accountId,
                    amount: typeof t.amount === 'number' ? t.amount : t.amount?.toNumber() || 0,
                    date: t.date,
                    type: t.type,
                    category: t.category,
                    currency: t.currency,
                    description: t.description
                })) || []} />
            </Suspense>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed h-full'>
                        <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
                            <Plus className='h-10 w-10 mb-2' />
                            <p className='text-sm font-medium'> New Account </p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {accounts.length > 0 && accounts?.map((accountFromAPI) => {
                    const account: Account = 
                     {
                        ...accountFromAPI,
                        balance: Number(accountFromAPI.balance)
                    }
                    return <AccountCard key={account.id} account={account} />
                })}
            </div>
        </div>
    );
}

export default DashboardPage
