"use client";

import { updateDefaultAccount } from '@/app/actions/accounts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

interface Account {
    id: string
    name: string
    type: string
    currency: string
    balance: number
    isDefault: boolean
};

interface AccountCardProps {
    account: Account
};

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
    const { name, type, currency, balance, id, isDefault } = account;
    
    interface UpdatedAccount {
        success: boolean;
    };

    const { loading: updateDefaultLoading, fn: updateDefaultFn, data, error } = useFetch(updateDefaultAccount);
    const updatedAccount = data as UpdatedAccount | undefined;

    console.log('Account', account);
    const handleDefaultChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (isDefault) {
            toast.warning("You need at least ONE default account");
            return; // Don't allow toggling off the default account
        }

        await updateDefaultFn(id);
    }

    useEffect(() => {
        if (updatedAccount?.success) {
            toast.success(
                "Default account updated successfully! UI will reflect changes soon."
            );
        }
    }, [updatedAccount, updateDefaultLoading]);

    useEffect(() => {
        if (error) {
            const err = error as Error;
            toast.error(err.message || "Failed to update default account");
        }
    }, [error]);

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
                            onClick={handleDefaultChange} 
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

export default AccountCard;