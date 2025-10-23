"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TransactionTypeSelectorProps {
    value: "INCOME" | "EXPENSE";
    onValueChange: (value: "INCOME" | "EXPENSE") => void;
    error?: string;
}

const TransactionTypeSelector: React.FC<TransactionTypeSelectorProps> = ({
    value,
    onValueChange,
    error,
}) => {
    return (
        <div className='space-y-2'>
            <label className='text-sm font-medium'> Type </label>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                </SelectContent>
            </Select>

            {error && (
                <p className='text-sm text-red-500'> {error} </p>
            )}
        </div>
    );
};

export default TransactionTypeSelector;
