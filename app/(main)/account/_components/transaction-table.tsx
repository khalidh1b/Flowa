"use client";

import { TableBody } from '@/components/ui/table';
import { useTransactionTable } from '@/hooks/use-transaction-table';
import React from 'react';
import type { Transaction } from '@/app/lib/types';
import {
    TransactionTableWrapper,
    TransactionFilters,
    TransactionTableHeader,
    TransactionRow,
    TransactionPagination,
    TransactionTableContainer,
    EmptyTransactionRow
} from './index';

interface TransactionTableProps {
    transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
    const {
        selectedIds,
        sortConfig,
        filters,
        pageNumber,
        deleteLoading,
        paginatedTransactions,
        totalPages,
        setSearchTerm,
        setTypeFilter,
        setRecurringFilter,
        handleSort,
        handleSelect,
        handleSelectAll,
        handleBulkDelete,
        handleDeleteTransaction,
        handleEditTransaction,
        handleClearFilters,
        handlePageSelection,
    } = useTransactionTable({ transactions });

    const allSelected = selectedIds.length === paginatedTransactions.length && paginatedTransactions.length > 0;
    const isEmpty = paginatedTransactions.length === 0;

    return (
        <TransactionTableWrapper isLoading={deleteLoading}>
            <TransactionFilters
                searchTerm={filters.searchTerm || ""}
                typeFilter={filters.typeFilter}
                recurringFilter={filters.recurringFilter}
                selectedCount={selectedIds.length}
                onSearchChange={setSearchTerm}
                onTypeFilterChange={setTypeFilter}
                onRecurringFilterChange={setRecurringFilter}
                onBulkDelete={handleBulkDelete}
                onClearFilters={handleClearFilters}
            />

            <TransactionTableContainer isEmpty={isEmpty}>
                <TransactionTableHeader
                    sortConfig={sortConfig}
                    allSelected={allSelected}
                    onSort={handleSort}
                    onSelectAll={handleSelectAll}
                />

                {isEmpty ? (
                    <EmptyTransactionRow />
                ) : (
                    <TableBody>
                        {paginatedTransactions.map((transaction) => (
                            <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                                isSelected={selectedIds.includes(transaction.id)}
                                onSelect={handleSelect}
                                onEdit={handleEditTransaction}
                                onDelete={handleDeleteTransaction}
                            />
                        ))}
                    </TableBody>
                )}
            </TransactionTableContainer>

            <TransactionPagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageSelection}
            />
        </TransactionTableWrapper>
    );
};

export default TransactionTable;
