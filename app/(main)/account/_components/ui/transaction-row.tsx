"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { CategoryBadge } from '@/components/ui/category-badge';
import { AmountDisplay } from '@/components/ui/amount-display';
import { RecurringBadge } from '@/components/ui/recurring-badge';
import { TableActions } from '@/components/ui/table-actions';
import { format } from 'date-fns';
import React from 'react';
import type { Transaction } from '@/app/lib/types';

interface TransactionRowProps {
    transaction: Transaction;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
}) => {
    const handleSelect = () => onSelect(transaction.id);
    const handleEdit = () => onEdit(transaction.id);
    const handleDelete = () => onDelete(transaction.id);

    return (
        <TableRow key={transaction.id}>
            <TableCell>
                <Checkbox 
                    onCheckedChange={handleSelect} 
                    checked={isSelected} 
                />
            </TableCell>
            <TableCell>
                {format(new Date(transaction.date), "PP")}
            </TableCell>
            <TableCell>
                {transaction.description}
            </TableCell>
            <TableCell className='capitalize'>
                <CategoryBadge category={transaction.category} />
            </TableCell>
            <TableCell className="text-right font-medium">
                <AmountDisplay transaction={transaction} />
            </TableCell>
            <TableCell>
                <RecurringBadge transaction={transaction} />
            </TableCell>
            <TableCell>
                <TableActions onEdit={handleEdit} onDelete={handleDelete} />
            </TableCell>
        </TableRow>
    );
};
