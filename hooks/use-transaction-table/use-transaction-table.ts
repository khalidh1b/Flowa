import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import type { Transaction } from '@/app/lib/types';
import type { UseTransactionTableProps } from './types';
import { useFiltersAndSorting } from './use-filters-and-sorting';
import { useSelection } from './use-selection';
import { usePagination } from './use-pagination';
import { useTransactionActions } from './use-transaction-actions';

/**
 * Main hook for managing transaction table functionality
 * 
 * This hook composes smaller, focused hooks to provide a complete
 * transaction table management solution with filtering, sorting,
 * pagination, selection, and CRUD operations.
 * 
 * @param props - Configuration object containing transactions array
 * @returns Object containing state, computed values, and action handlers
 */
export const useTransactionTable = ({ transactions }: UseTransactionTableProps) => {
    // Initialize individual hooks
    const filtersAndSorting = useFiltersAndSorting(transactions);
    const selection = useSelection();
    const pagination = usePagination(filtersAndSorting.processedTransactions);
    const actions = useTransactionActions();

    // Clear selection when transactions change (e.g., after deletion)
    useEffect(() => {
        selection.clearSelection();
    }, [transactions.length]);

    // Enhanced bulk delete that also clears selection and resets pagination
    const handleBulkDelete = async () => {
        await actions.handleBulkDelete(selection.selectedIds);
        selection.clearSelection();
        pagination.resetPagination();
    };

    // Enhanced single delete that resets pagination if needed
    const handleDeleteTransaction = async (transactionId: string) => {
        await actions.handleDeleteTransaction(transactionId);
        
        // Reset to first page if current page becomes empty
        if (pagination.paginatedTransactions.length === 1 && pagination.pageNumber > 1) {
            pagination.goToPreviousPage();
        }
    };

    // Enhanced clear filters that also resets pagination
    const handleClearFilters = () => {
        filtersAndSorting.clearFilters();
        selection.clearSelection();
        pagination.resetPagination();
    };

    // Computed values for convenience
    const hasActiveFilters = filtersAndSorting.hasActiveFilters;
    const activeFiltersCount = filtersAndSorting.activeFiltersCount;
    const selectedCount = selection.selectedCount;
    const isAllSelected = selection.isAllSelected(filtersAndSorting.processedTransactions);
    const isIndeterminate = selection.isIndeterminate(filtersAndSorting.processedTransactions);

    return {
        // State from individual hooks
        selectedIds: selection.selectedIds,
        sortConfig: filtersAndSorting.sortConfig,
        filters: filtersAndSorting.filters,
        pageNumber: pagination.pageNumber,
        deleteLoading: actions.deleteLoading,
        
        // Computed values
        filteredAndSortedTransactions: filtersAndSorting.processedTransactions,
        paginatedTransactions: pagination.paginatedTransactions,
        totalPages: pagination.totalPages,
        hasActiveFilters,
        activeFiltersCount,
        selectedCount,
        isAllSelected,
        isIndeterminate,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPreviousPage,
        isFirstPage: pagination.isFirstPage,
        isLastPage: pagination.isLastPage,
        
        // Filter and sort actions
        setSearchTerm: filtersAndSorting.setSearchTerm,
        setTypeFilter: filtersAndSorting.setTypeFilter,
        setRecurringFilter: filtersAndSorting.setRecurringFilter,
        handleSort: filtersAndSorting.handleSort,
        
        // Selection actions
        handleSelect: selection.handleSelect,
        handleSelectAll: (checkedState: boolean) => 
            selection.handleSelectAll(checkedState, filtersAndSorting.processedTransactions),
        clearSelection: selection.clearSelection,
        isSelected: selection.isSelected,
        
        // Transaction actions
        handleBulkDelete,
        handleDeleteTransaction,
        handleEditTransaction: actions.handleEditTransaction,
        handleDuplicateTransaction: actions.handleDuplicateTransaction,
        handleViewTransaction: actions.handleViewTransaction,
        
        // Pagination actions
        handlePageSelection: pagination.handlePageSelection,
        goToNextPage: pagination.goToNextPage,
        goToPreviousPage: pagination.goToPreviousPage,
        goToFirstPage: pagination.goToFirstPage,
        goToLastPage: pagination.goToLastPage,
        
        // Utility actions
        handleClearFilters,
    };
};
