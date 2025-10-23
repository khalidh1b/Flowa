"use client";

import React from 'react';
import { useTransactionForm } from '@/hooks/use-transaction-form';
import TransactionFormUI from './ui/transaction-form-ui';
import type { AddTransactionFormProps } from '@/app/types/transaction';

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ 
    accounts, 
    categories, 
    editMode = false, 
    initialData = null 
}) => {
    const formHook = useTransactionForm(accounts, categories, editMode, initialData);

    return (
        <TransactionFormUI
            register={formHook.register}
                setValue={formHook.setValue}
                handleSubmit={formHook.handleSubmit}
                errors={formHook.errors}
                getValues={formHook.getValues}
                
                type={formHook.type}
                isRecurring={formHook.isRecurring}
                date={formHook.date}
                category={formHook.category}
                filteredCategories={formHook.filteredCategories}
                transactionLoading={formHook.transactionLoading}
                
                accounts={accounts}
                
                onSubmit={formHook.onSubmit}
                handleScanComplete={formHook.handleScanComplete}
                
                editMode={editMode}
        />
    );
};

export default AddTransactionForm;