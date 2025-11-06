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

export const useTransactionForm = (
    accounts: Account[], 
    categories: Category[], 
    editMode = false, 
    initialData: Partial<TransactionFormValues & { amount?: number }> | null = null
) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    // Memoize default values
    const defaultValues = useMemo(() => {
        return editMode && initialData 
            ? createEditFormValues(initialData, accounts)
            : createDefaultFormValues(accounts);
    }, [editMode, initialData, accounts]);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        reset,
        setError,
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues,
    });

    // Use transaction submission hook
    const { transactionFunction, onSubmit: createOnSubmit } = useTransactionSubmission(
        editMode,
        editId,
        (accountId: string) => getCurrencyForAccount(accounts, accountId),
        setError
    );

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
        error: transactionError,
    } = useFetch(transactionFunction);

    // Use receipt scanner hook
    const { handleScanComplete } = useReceiptScanner(setValue);

    const formValues = watch(["type", "isRecurring", "date", "category"]);
    const [type, isRecurring, date, category] = formValues;

    // Memoize filtered categories
    const filteredCategories = useMemo(() => {
        return categories.filter((cat: Category) => cat.type === type);
    }, [categories, type]);

    // Create submit handler that uses the submission hook
    const onSubmit = useCallback(async (data: TransactionFormValues) => {
        await createOnSubmit(data, transactionFn);
    }, [createOnSubmit, transactionFn]);

    useEffect(() => {
        if (transactionResult && transactionResult.success && !transactionLoading) {
            toast.success(SUCCESS_MESSAGES[editMode ? "update" : "create"]);
            reset();
            
            const accountId = transactionResult.data?.accountId;
            if (accountId) {
                router.push(`/account/${accountId}`);
            }
        }
    }, [transactionResult, transactionLoading, editMode, reset, router]);

    // Handle transaction errors
    useEffect(() => {
        if (transactionError && !transactionLoading) {
            toast.error(transactionError.message || ERROR_MESSAGES.transactionFailed);
        }
    }, [transactionError, transactionLoading]);

    return {
        // Form methods
        register,
        setValue,
        handleSubmit,
        errors,
        watch,
        getValues,
        reset,
        setError,
        
        // Form state
        type,
        isRecurring,
        date,
        category,
        filteredCategories,
        transactionLoading,
        transactionError,
        
        // Handlers
        onSubmit,
        handleScanComplete,
    };
};