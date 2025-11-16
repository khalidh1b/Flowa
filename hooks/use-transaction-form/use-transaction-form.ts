"use client";

import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import useFetch from '@/hooks/use-fetch';
import { transactionSchema } from '@/app/lib/schema';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from './constants';
import { 
    createDefaultFormValues, 
    createEditFormValues, 
    getCurrencyForAccount 
} from './utils';
import { useTransactionSubmission } from './use-transaction-submission';
import { useReceiptScanner } from './use-receipt-scanner';

import type { 
    TransactionFormValues, 
    Account, 
    Category, 
    TransactionResult 
} from '@/app/types/transaction';

// custom hook for managing transaction form state and operations
export const useTransactionForm = (
    accounts: Account[], 
    categories: Category[], 
    editMode = false, 
    initialData: Partial<TransactionFormValues & { amount?: number }> | null = null
) => {
    const router = useRouter();
    const editId = useSearchParams().get("edit");

    // memoized form default values based on mode
    const defaultValues = useMemo(() => 
        editMode && initialData 
            ? createEditFormValues(initialData, accounts)
            : createDefaultFormValues(accounts),
        [editMode, initialData, accounts]
    );

    const formMethods = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues,
    });

    const { register, setValue, handleSubmit, formState: { errors }, watch, getValues, reset, setError } = formMethods;

    // transaction submission logic
    const { transactionFunction, onSubmit: createOnSubmit } = useTransactionSubmission(
        editMode,
        editId,
        (accountId: string) => getCurrencyForAccount(accounts, accountId),
        setError
    );

    // api call hook for transaction operations
    const { loading: transactionLoading, execute: transactionFn, data: transactionResult, error: transactionError } = 
        useFetch(transactionFunction);

    const { handleScanComplete } = useReceiptScanner(setValue);

    // watched form values for reactive updates
    const [type, isRecurring, date, category] = watch(["type", "isRecurring", "date", "category"]);

    // memoized categories filtered by transaction type
    const filteredCategories = useMemo(() => 
        categories.filter((cat: Category) => cat.type === type),
        [categories, type]
    );

    // form submission handler
    const onSubmit = useCallback(async (data: TransactionFormValues) => 
        await createOnSubmit(data, transactionFn),
        [createOnSubmit, transactionFn]
    );

    // handle successful transaction submission
    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(SUCCESS_MESSAGES[editMode ? "update" : "create"]);
            reset();
            
            const accountId = transactionResult.data?.accountId;
            if (accountId) router.push(`/account/${accountId}`);
        }
    }, [transactionResult, transactionLoading, editMode, reset, router]);

    // handle transaction errors
    useEffect(() => {
        if (transactionError && !transactionLoading) {
            toast.error(transactionError.message || ERROR_MESSAGES.transactionFailed);
        }
    }, [transactionError, transactionLoading]);

    return {
        type, isRecurring, date, category, filteredCategories, transactionLoading, transactionError,
        register, setValue, handleSubmit, errors, watch, getValues, reset, setError,
        onSubmit, handleScanComplete,
    };
};