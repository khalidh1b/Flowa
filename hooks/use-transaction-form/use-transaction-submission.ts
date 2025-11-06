import { useCallback } from 'react';
import { toast } from 'sonner';
import { createTransaction, updateTransaction } from '@/app/actions/transaction';
import { ERROR_MESSAGES } from './constants';
import { safeParseFloat } from './utils';
import type { TransactionFormValues } from '@/app/types/transaction';

export const useTransactionSubmission = (
    editMode: boolean,
    editId: string | null,
    getCurrencyForAccount: (accountId: string) => string,
    setError: (field: any, error: { message: string }) => void
) => {
    const transactionFunction = useCallback(async (...args: any[]) => {
        if (editMode) {
            const [id, data] = args;
            return updateTransaction(id, data);
        } else {
            const [data] = args;
            return createTransaction(data);
        }
    }, [editMode]);

    const onSubmit = useCallback(async (data: TransactionFormValues, transactionFn: (...args: any[]) => Promise<any>) => {
        try {
            const currency = getCurrencyForAccount(data.accountId);
            const amount = safeParseFloat(data.amount);

            if (amount <= 0) {
                setError("amount", { message: ERROR_MESSAGES.amountValidation });
                return;
            }

            const formData = {
                ...data,
                currency,
                amount,
            };

            if (editMode && editId) {
                await transactionFn(editId, formData);
            } else {
                await transactionFn(formData);
            }
        } catch (error) {
            console.error("Transaction submission error:", error);
            toast.error(ERROR_MESSAGES.submissionError);
        }
    }, [getCurrencyForAccount, editMode, editId, setError]);

    return {
        transactionFunction,
        onSubmit,
    };
};