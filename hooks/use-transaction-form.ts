"use client";

import { createTransaction, updateTransaction } from '@/app/actions/transaction';
import useFetch from '@/hooks/use-fetch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '@/app/lib/schema';
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

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        reset
    } = useForm({
        resolver: zodResolver(transactionSchema),
        defaultValues:
            editMode && initialData ? {
                type: (initialData.type as TransactionFormValues['type']) ?? "EXPENSE",
                amount: (initialData.amount !== undefined ? String(initialData.amount) : ""),
                description: initialData.description ?? undefined,
                accountId: initialData.accountId ?? accounts.find((ac) => ac.isDefault)?.id ?? "",
                category: initialData.category ?? "",
                date: initialData.date ? new Date(initialData.date as any) : new Date(),
                isRecurring: initialData.isRecurring ?? false,
                ...(initialData.recurringInterval && {
                    recurringInterval: initialData.recurringInterval,
                }),
            } :
                {
                    type: "EXPENSE",
                    amount: "",
                    description: "",
                    accountId: accounts.find((ac) => ac.isDefault)?.id ?? "",
                    date: new Date(),
                    isRecurring: false,
                } as TransactionFormValues,
    });

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    }: { loading: boolean | null; fn: (...args: any[]) => Promise<void>; data: TransactionResult | undefined } = useFetch(editMode ? updateTransaction : createTransaction);

    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");
    const category = watch("category");

    const onSubmit = async (data: TransactionFormValues) => {
        const currency = accounts.find((ac: Account) => ac.id === data.accountId)?.currency || "USD";

        const formData = {
            ...data,
            currency,
            amount: parseFloat(data.amount),
        };

        if (editMode) {
            await transactionFn(editId, formData);
        } else {
            await transactionFn(formData);
        }
    };

    useEffect(() => {
        if (transactionResult && (transactionResult as TransactionResult).success && !transactionLoading) {
            toast.success(editMode ? "Transaction updated successfully" : "Transaction created successfully");
            reset();
            const acctId = (transactionResult as TransactionResult).data?.accountId;
            if (acctId) router.push(`/account/${acctId}`);
        }
    }, [transactionResult, transactionLoading, editMode, reset, router]);

    const filteredCategories = categories.filter((category: Category) => category.type === type);

    const handleScanComplete = useCallback((scannedData: Record<string, any> | null) => {
        if (!scannedData || Object.keys(scannedData).length === 0) {
            toast.error("Couldn't detect any valid receipt information.");
            return;
        };
        
        if (scannedData) {
            setValue("amount", scannedData?.amount?.toString() || "");
            if (scannedData.date) setValue("date", new Date(scannedData.date));
            if (scannedData.description) {
                setValue("description", scannedData.description || "");
            }
            if (scannedData.category) {
                setValue("category", scannedData.category || "");
            }
        }
    }, [setValue]);

    return {
        // Form methods
        register,
        setValue,
        handleSubmit,
        errors,
        watch,
        getValues,
        reset,
        
        // Form state
        type,
        isRecurring,
        date,
        category,
        filteredCategories,
        transactionLoading,
        
        // Handlers
        onSubmit,
        handleScanComplete,
    };
};
