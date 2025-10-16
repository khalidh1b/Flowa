import { getAccountWithTransactions } from '@/app/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from '../_components/transaction.table';
import AccountChart from '../_components/account-chart';
import { Loader } from 'lucide-react';

const AccountsPage = async ({ params }) => {
    const { id } = await params;
    const accountData = await getAccountWithTransactions(id);

    if (!accountData) {
        notFound();
    }

    const { transactions, ...account } = accountData;

    return (
        <div className='space-y-8 px-5'>
            <div className='flex gap-4 items-end justify-between'>
                <div>
                    <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize'> {account.name} </h1>
                    <p className='text-muted-foreground'> {account.type.charAt(0) + account.type.slice(1).toLowerCase()} </p>
                </div>

                <div className='text-right pb-2'>
                    <div className='text-xl sm:text-2xl font-bold'> {account.currency} {parseFloat(account.balance).toFixed(2)} </div>
                    <p className='text-sm text-muted-foreground'> {account._count.transaction} Transactions </p>
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