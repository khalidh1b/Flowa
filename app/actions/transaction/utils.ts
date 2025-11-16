'use server';

// converts decimal amount to regular number for easier handling
export const serializeAmount = async (obj: any): Promise<any> => ({
    ...obj,
    amount: obj.amount.toNumber(),
});

// calculates the next date for recurring transactions
export const calculateNextRecurringDate = async (startDate: Date | string, interval: string): Promise<Date> => {
    const date = new Date(startDate);

    const intervalMap = {
        DAILY: () => date.setDate(date.getDate() + 1),
        WEEKLY: () => date.setDate(date.getDate() + 7),
        MONTHLY: () => date.setMonth(date.getMonth() + 1),
        YEARLY: () => date.setFullYear(date.getFullYear() + 1),
    };

    intervalMap[interval as keyof typeof intervalMap]?.();
    return date;
};

// calculates how much the account balance should change
export const calculateBalanceChange = async (type: string, amount: number): Promise<number> => 
    type === "EXPENSE" ? -amount : amount;
