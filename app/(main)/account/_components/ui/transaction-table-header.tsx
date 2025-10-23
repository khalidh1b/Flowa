"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

import type { SortField } from '@/hooks/use-transaction-table/types';

interface SortConfig {
    field: SortField;
    direction: 'asc' | 'desc';
}

interface TransactionTableHeaderProps {
    sortConfig: SortConfig;
    allSelected: boolean;
    onSort: (field: SortField) => void;
    onSelectAll: (checkedState: boolean) => void;
}

export const TransactionTableHeader: React.FC<TransactionTableHeaderProps> = ({
    sortConfig,
    allSelected,
    onSort,
    onSelectAll,
}) => {
    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortConfig.field !== field) return null;
        return sortConfig.direction === "asc" ? (
            <ChevronUp className='ml-1 h-4 w-4' />
        ) : (
            <ChevronDown className='ml-1 h-4 w-4' />
        );
    };

    const SortableHeader = ({ children, field, className = "" }: { 
        children: React.ReactNode; 
        field: SortField; 
        className?: string;
    }) => (
        <TableHead className={`cursor-pointer ${className}`} onClick={() => onSort(field)}>
            <div className='flex items-center'>
                {children}
                <SortIcon field={field} />
            </div>
        </TableHead>
    );

    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                    <Checkbox 
                        onCheckedChange={onSelectAll} 
                        checked={allSelected} 
                    />
                </TableHead>
                <SortableHeader field="date">Date</SortableHeader>
                <TableHead>Description</TableHead>
                <SortableHeader field="category">Category</SortableHeader>
                <SortableHeader field="amount" className="text-right">
                    <div className='flex items-center justify-end'>
                        Amount
                        <SortIcon field="amount" />
                    </div>
                </SortableHeader>
                <TableHead>Recurring</TableHead>
                <TableHead className='w-[50px]' />
            </TableRow>
        </TableHeader>
    );
};
