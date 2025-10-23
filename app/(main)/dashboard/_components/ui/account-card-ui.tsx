"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowDownRight, ArrowUpRight, Loader } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Account } from '@/app/types/dashboard';

interface AccountCardUIProps {
    account: Account;
    updateDefaultLoading: boolean;
    onDefaultChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccountCardUI: React.FC<AccountCardUIProps> = ({ 
    account, 
    updateDefaultLoading, 
    onDefaultChange 
}) => {
    const { name, type, currency, balance, id, isDefault } = account;

    return (
        <Card className='hover:shadow-md transition-shadow group relative'>
            <Link href={`/account/${id}`}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium capitalize'> {name} </CardTitle>
                    <div className='p-2'>
                        {updateDefaultLoading 
                        ? <Loader className="animate-spin w-8 h-8"/> 
                        : <Switch 
                            checked={!!isDefault} 
                            onClick={onDefaultChange} 
                            disabled={!!updateDefaultLoading}
                         />
                        }
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        {currency} {balance.toFixed(2)}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        {type.charAt(0) + type.slice(1).toLowerCase()} Account
                    </p>
                </CardContent>
                <CardFooter className='flex justify-between text-sm text-muted-foreground'>
                    <div className='flex items-center'>
                        <ArrowUpRight className='mr-1 h-4 2-4 text-green-500' />
                        Income
                    </div>
                    <div className='flex items-center'>
                        <ArrowDownRight className='mr-1 h-4 2-4 text-red-500' />
                        Expense
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default AccountCardUI;
