"use client";

import { updateDefaultAccount } from '@/app/actions/accounts';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Account, UpdatedAccount } from '@/app/types/dashboard';

export const useAccountCard = (account: Account) => {
    const { loading: updateDefaultLoading, fn: updateDefaultFn, data, error } = useFetch(updateDefaultAccount);
    const updatedAccount = data as UpdatedAccount | undefined;

    const handleDefaultChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (account.isDefault) {
            toast.warning("You need at least ONE default account");
            return; // Don't allow toggling off the default account
        }

        await updateDefaultFn(account.id);
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

    return {
        updateDefaultLoading,
        handleDefaultChange
    };
};
