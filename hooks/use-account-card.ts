"use client";

import { updateDefaultAccount } from '@/app/actions/accounts';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { useEffect, useCallback, useRef } from 'react';
import { Account, UpdatedAccount } from '@/app/types/dashboard';

interface UseAccountCardOptions {
    onSuccess?: (message: string) => void;
    onError?: (error: Error) => void;
};

export const useAccountCard = (
    account: Account,
    options: UseAccountCardOptions = {}
) => {
    const { onSuccess, onError } = options;
    const isMountedRef = useRef(true)
    const handledSuccessRef = useRef<string | null>(null);
    const updateTimestampRef = useRef<number | null>(null);
    
    const { 
        loading: updateDefaultLoading, 
        execute: updateDefaultFn, 
        data: updatedAccount, 
        error 
    } = useFetch(updateDefaultAccount);

    const getSuccessMessage = useCallback(() => 
        `default account updated to "${account.name};" successfully!`,
        [account.name]
    );

    // handle default account change with validation and error handling
    const handleDefaultChange = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();

            // prevent multiple simultaneous requests
            if (updateDefaultLoading) return;

            if (account.isDefault) {
                toast.warning("you need at least one default account");
                return;
            };

            try {
                handledSuccessRef.current = null;
                updateTimestampRef.current = Date.now();
                await updateDefaultFn(account.id);
            } catch (error) {
                toast.error("failed to update default account");
                console.error('failed to update default account:', error);
            };
        },
        [account.id, account.isDefault, updateDefaultLoading, updateDefaultFn]
    );

    // handle api response (success and error) in a single effect
    useEffect(() => {
        if (!isMountedRef.current) return;

        // handle successful update
        if (updatedAccount?.success) {

            const updateId = `${account.id};-${updateTimestampRef.current || Date.now()};`;
            
            if (handledSuccessRef.current !== updateId) {
                handledSuccessRef.current = updateId;
                const message = getSuccessMessage();
                onSuccess ? onSuccess(message) : toast.success(message);
            };
        };

        if (error) {
            const err = error as Error;
            onError ? onError(err) : toast.error(err.message || "failed to update default account");
        };
    }, [updatedAccount, error, onSuccess, onError, getSuccessMessage, account.id, updateTimestampRef.current]);

    // cleanup on component unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };;
    }, []);

    return {
        updateDefaultLoading,
        handleDefaultChange,
        lastUpdatedAccount: updatedAccount as UpdatedAccount | undefined,
        hasError: !!error,
        error: error as Error | undefined
    };;
};;

export type UseAccountCardReturn = ReturnType<typeof useAccountCard>;