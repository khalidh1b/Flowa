"use client";

import React from 'react';
import ReceiptScanner from '../receipt-scanner';
import type { Account, Category } from '@/app/types/transaction';
import {
    TransactionTypeSelector,
    AmountAccountFields,
    CategorySelector,
    DatePickerField,
    DescriptionInput,
    RecurringTransactionToggle,
    TransactionFormActions,
} from './index';

interface TransactionFormUIProps {

    register: any;
    setValue: any;
    handleSubmit: any;
    errors: any;
    getValues: any;
    
    type: "INCOME" | "EXPENSE";
    isRecurring: boolean;
    date: Date;
    category: string;
    filteredCategories: Category[];
    transactionLoading: boolean | null;
    
    accounts: Account[];
    
    onSubmit: (data: any) => void;
    handleScanComplete: (data: any) => void;
    
    editMode: boolean;
}

const TransactionFormUI: React.FC<TransactionFormUIProps> = ({
    register,
    setValue,
    handleSubmit,
    errors,
    getValues,
    type,
    isRecurring,
    date,
    category,
    filteredCategories,
    transactionLoading,
    accounts,
    onSubmit,
    handleScanComplete,
    editMode,
}) => {
    return (
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {!editMode && (<ReceiptScanner onScanComplete={handleScanComplete} />)}

            <TransactionTypeSelector
                value={type}
                onValueChange={(value: "INCOME" | "EXPENSE") => setValue("type", value)}
                error={errors.type?.message}
            />

            <AmountAccountFields
                amountRegister={register("amount")}
                amountError={errors.amount?.message}
                accountIdOnChange={(value) => setValue("accountId", value)}
                accountIdDefaultValue={getValues("accountId")}
                accountIdError={errors.accountId?.message}
                accounts={accounts}
            />

            <CategorySelector
                value={category}
                onValueChange={(value) => setValue("category", value)}
                categories={filteredCategories}
                error={errors.category?.message}
            />

            <DatePickerField
                value={date as Date}
                onChange={(d: Date) => setValue("date", d)}
                error={errors.date?.message}
            />

            <DescriptionInput
                register={register("description")}
                error={errors.description?.message}
            />

            <RecurringTransactionToggle
                isRecurring={isRecurring}
                onRecurringChange={(checked) => setValue("isRecurring", checked)}
                recurringInterval={getValues("recurringInterval")}
                onIntervalChange={(value: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY") => setValue("recurringInterval", value)}
                intervalError={errors.recurringInterval?.message}
                intervalDefaultValue={getValues("recurringInterval")}
            />

            <TransactionFormActions
                isLoading={Boolean(transactionLoading)}
                editMode={editMode}
            />
        </form>
    );
};

export default TransactionFormUI;
