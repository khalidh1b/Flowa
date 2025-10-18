import { getAccountWithTransactions } from '@/app/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import type { Account as AccountType, Transaction as TransactionType } from '@/app/lib/types';
import TransactionTable from '../_components/transaction-table';
import AccountChart from '../_components/account-chart';
import { Loader } from 'lucide-react';

type Transaction = {
    id: string;
    date: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    accountId: string;
}

type Account = {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: number | string;
    _count?: { transaction: number };
}

const AccountsPage = async (props: { params?: Promise<{ id: string }> }) => {
    // normalize possibly-thenable params at runtime
    const params = await Promise.resolve(props.params as Promise<{ id: string }> | undefined);
    const { id } = params as { id: string };

    const accountData = await getAccountWithTransactions(id) as { transactions: Transaction[] } & Account | null;

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = (accountData as unknown) as { transactions: TransactionType[] } & AccountType;

    return (
        <div className='space-y-8 px-5'>
            <div className='flex gap-4 items-end justify-between'>
                <div>
                    <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize'> {account.name} </h1>
                    <p className='text-muted-foreground'> {account.type.charAt(0) + account.type.slice(1).toLowerCase()} </p>
                </div>

                <div className='text-right pb-2'>
                    <div className='text-xl sm:text-2xl font-bold'> {account.currency} {parseFloat(String(account.balance)).toFixed(2)} </div>
                    <p className='text-sm text-muted-foreground'> {account._count?.transaction ?? 0} Transactions </p>
                </div>
            </div>

            {/* Chart Section */}
            <Suspense fallback={<div className="flex gap-2 items-center"><Loader className="animate-spin w-8 h-8"/>Loading...</div>}>
                <AccountChart transactions={transactions} account={account}/>
            </Suspense>

            {/* Transaction Table */}
            <Suspense fallback={<div className="flex gap-2 items-center"><Loader className="animate-spin w-8 h-8"/>Loading...</div>}>
                <TransactionTable transactions={transactions} />
            </Suspense>
        </div>
    )
}

export default AccountsPage;