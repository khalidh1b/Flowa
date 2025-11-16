import { useCallback } from 'react';
import { toast } from 'sonner';
import { createTransaction, updateTransaction } from '@/app/actions/transaction';
import { ERROR_MESSAGES } from './constants';
import { safeParseFloat } from './utils';
import type { TransactionFormValues } from '@/app/types/transaction';

// custom hook for handling transaction submission logic
export const useTransactionSubmission = (
    editMode: boolean,
    editId: string | null,
    getCurrencyForAccount: (accountId: string) => string,
    setError: (field: any, error: { message: string }) => void
) => {
    
    // determines which transaction function to use based on edit mode
    const transactionFunction = useCallback(async (data: TransactionFormValues) => {
        const amount = safeParseFloat(data.amount);
        
        // validate amount is positive
        if (amount <= 0) {
            setError("amount", { message: ERROR_MESSAGES.amountValidation });
            throw new Error(ERROR_MESSAGES.amountValidation);
        }

        // prepare transaction data with currency
        const formData = {
            ...data,
            currency: getCurrencyForAccount(data.accountId),
            amount,
        };

        // execute transaction based on mode
        if (editMode && editId) {
            return await updateTransaction(editId, formData);
        } else {
            return await createTransaction(formData);
        }
    }, [editMode, editId, getCurrencyForAccount, setError]);

    // handles form submission with validation and error handling (kept for backward compatibility)
    const onSubmit = useCallback(async (data: TransactionFormValues) => {
        try {
            await transactionFunction(data);
        } catch (error) {
            console.error("transaction submission error:", error);
            toast.error(ERROR_MESSAGES.submissionError);
        }
    }, [transactionFunction]);

    return { transactionFunction, onSubmit };
};
