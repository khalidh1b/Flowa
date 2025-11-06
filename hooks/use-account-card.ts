"use client";

import { updateDefaultAccount } from '@/app/actions/accounts';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { useEffect, useCallback, useRef } from 'react';
import { Account, UpdatedAccount } from '@/app/types/dashboard';

interface UseAccountCardOptions {
    onSuccess?: (message: string) => void;
    onError?: (error: Error) => void;
    debounceMs?: number;
}

export const useAccountCard = (
    account: Account,
    options: UseAccountCardOptions = {}
) => {
    const { onSuccess, onError, debounceMs = 300 } = options;
    
    const isMountedRef = useRef(true);
    
    const { 
        loading: updateDefaultLoading, 
        fn: updateDefaultFn, 
        data, 
        error 
    } = useFetch(updateDefaultAccount);
    
    const updatedAccount = data as UpdatedAccount | undefined;

    // Memoize the success message
    const successMessage = useCallback(() => {
        return `Default account updated to "${account.name}" successfully!`;
    }, [account.name]);

    // Optimized handler with debouncing and better error handling
    const handleDefaultChange = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();

            // Prevent multiple simultaneous requests
            if (updateDefaultLoading) {
                return;
            }

            // Early validation
            if (account.isDefault) {
                toast.warning("You need at least ONE default account");
                return;
            }

            try {
                await updateDefaultFn(account.id);
            } catch (error) {
                toast.error("Failed to update default account");
                console.error('Failed to update default account:', error);
            }
        },
        [account.id, account.isDefault, account.name, updateDefaultLoading, updateDefaultFn]
    );

    // Handle success state with cleanup
    useEffect(() => {
        if (!isMountedRef.current) return;

        if (updatedAccount?.success) {
            const message = successMessage();
            
            if (onSuccess) {
                onSuccess(message);
            } else {
                toast.success(message);
            }
        }
    }, [updatedAccount, onSuccess, successMessage]);

    // Handle error state with cleanup and custom error handling
    useEffect(() => {
        if (!isMountedRef.current) return;

        if (error) {
            const err = error as Error;
            
            if (onError) {
                onError(err);
            } else {
                toast.error(err.message || "Failed to update default account");
            }
        }
    }, [error, onError]);

    // Cleanup funciton on unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return {
        updateDefaultLoading,
        handleDefaultChange,
        lastUpdatedAccount: updatedAccount,
        hasError: !!error,
        error
    };
};

export type UseAccountCardReturn = ReturnType<typeof useAccountCard>;