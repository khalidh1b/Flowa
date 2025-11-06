import type { Account, TransactionFormValues } from '@/app/types/transaction';

export const getDefaultAccountId = (accounts: Account[]): string => {
    return accounts.find((ac) => ac.isDefault)?.id ?? "";
};

export const createDefaultFormValues = (
    accounts: Account[]
): TransactionFormValues => ({
    type: "EXPENSE",
    amount: "",
    description: "",
    accountId: getDefaultAccountId(accounts),
    category: "",
    date: new Date(),
    isRecurring: false,
});

export const createEditFormValues = (
    initialData: Partial<TransactionFormValues & { amount?: number }>,
    accounts: Account[]
): TransactionFormValues => {
    const safeAmount = initialData.amount !== undefined ? String(initialData.amount) : "";
    const safeDate = initialData.date ? new Date(initialData.date as any) : new Date();
    
    return {
        type: (initialData.type as TransactionFormValues['type']) ?? "EXPENSE",
        amount: safeAmount,
        description: initialData.description ?? "",
        accountId: initialData.accountId ?? getDefaultAccountId(accounts),
        category: initialData.category ?? "",
        date: safeDate,
        isRecurring: initialData.isRecurring ?? false,
        ...(initialData.recurringInterval && {
            recurringInterval: initialData.recurringInterval,
        }),
    };
};

export const validateScannedData = (scannedData: Record<string, any> | null): boolean => {
    return scannedData !== null && typeof scannedData === 'object' && Object.keys(scannedData).length > 0;
};

export const safeParseFloat = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

export const getCurrencyForAccount = (accounts: Account[], accountId: string): string => {
    return accounts.find((ac: Account) => ac.id === accountId)?.currency ?? "USD";
};