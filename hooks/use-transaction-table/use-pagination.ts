import { useState, useCallback, useMemo } from 'react';
import type { Transaction } from '@/app/lib/types';
import { getPaginatedTransactions, getTotalPages } from './utils';

/**
 * Hook for managing pagination state and operations
 */
export const usePagination = (
    transactions: Transaction[],
    itemsPerPage: number = 20
) => {
    const [pageNumber, setPageNumber] = useState(1);

    // Calculate total pages
    const totalPages = useMemo(() => 
        getTotalPages(transactions.length, itemsPerPage),
        [transactions.length, itemsPerPage]
    );

    // Get paginated transactions
    const paginatedTransactions = useMemo(() => 
        getPaginatedTransactions(transactions, pageNumber, itemsPerPage),
        [transactions, pageNumber, itemsPerPage]
    );

    /**
     * Change to a specific page
     */
    const handlePageSelection = useCallback((selectedPage: number) => {
        if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== pageNumber) {
            setPageNumber(selectedPage);
        }
    }, [pageNumber, totalPages]);

    /**
     * Go to next page
     */
    const goToNextPage = useCallback(() => {
        if (pageNumber < totalPages) {
            setPageNumber(prev => prev + 1);
        }
    }, [pageNumber, totalPages]);

    /**
     * Go to previous page
     */
    const goToPreviousPage = useCallback(() => {
        if (pageNumber > 1) {
            setPageNumber(prev => prev - 1);
        }
    }, [pageNumber]);

    /**
     * Go to first page
     */
    const goToFirstPage = useCallback(() => {
        setPageNumber(1);
    }, []);

    /**
     * Go to last page
     */
    const goToLastPage = useCallback(() => {
        setPageNumber(totalPages);
    }, [totalPages]);

    /**
     * Reset to first page (useful when filters change)
     */
    const resetPagination = useCallback(() => {
        setPageNumber(1);
    }, []);

    return {
        // State
        pageNumber,
        totalPages,
        
        // Computed values
        paginatedTransactions,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
        isFirstPage: pageNumber === 1,
        isLastPage: pageNumber === totalPages,
        
        // Actions
        handlePageSelection,
        goToNextPage,
        goToPreviousPage,
        goToFirstPage,
        goToLastPage,
        resetPagination,
    };
};
