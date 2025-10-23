import type { z } from 'zod';
import { transactionSchema } from '@/app/lib/schema';

export type TransactionFormValues = z.infer<typeof transactionSchema>;

export type Account = {
    id: string;
    name: string;
    currency: string;
    balance: string | number;
    isDefault?: boolean;
};

export type Category = {
    id: string;
    name: string;
    type: "INCOME" | "EXPENSE";
};

export type TransactionResult = {
    success?: boolean;
    data?: { accountId?: string } | null;
};

export interface AddTransactionFormProps {
    accounts: Account[];
    categories: Category[];
    editMode?: boolean;
    initialData?: Partial<TransactionFormValues & { amount?: number }> | null;
};