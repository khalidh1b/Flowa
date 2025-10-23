"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash, X } from 'lucide-react';
import React from 'react';

interface TransactionFiltersProps {
    searchTerm: string;
    typeFilter: string;
    recurringFilter: string;
    selectedCount: number;
    onSearchChange: (value: string) => void;
    onTypeFilterChange: (value: string) => void;
    onRecurringFilterChange: (value: string) => void;
    onBulkDelete: () => void;
    onClearFilters: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
    searchTerm,
    typeFilter,
    recurringFilter,
    selectedCount,
    onSearchChange,
    onTypeFilterChange,
    onRecurringFilterChange,
    onBulkDelete,
    onClearFilters,
}) => {
    const hasActiveFilters = searchTerm || typeFilter || recurringFilter || selectedCount > 0;

    return (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                    placeholder='Search transactions'
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='pl-8'
                />
            </div>

            <div className='flex gap-2'>
                <Select value={typeFilter} onValueChange={onTypeFilterChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={recurringFilter} onValueChange={onRecurringFilterChange}>
                    <SelectTrigger className='w-[150px]'>
                        <SelectValue placeholder="All Transactions" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recurring">Recurring Only</SelectItem>
                        <SelectItem value="non-recurring">Non-Recurring Only</SelectItem>
                    </SelectContent>
                </Select>

                {selectedCount > 0 && (
                    <div className='flex items-center gap-2'>
                        <Button variant="destructive" size="sm" onClick={onBulkDelete}>
                            <Trash className='h-4 w-4 mr-2' />
                            Delete Selected ({selectedCount})
                        </Button>
                    </div>
                )}

                {hasActiveFilters && (
                    <Button variant="outline" size="icon" onClick={onClearFilters} title="Clear Filters">
                        <X className='h-4 w-5' />
                    </Button>
                )}
            </div>
        </div>
    );
};
