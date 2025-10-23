import { useState, useCallback, useMemo } from 'react';
import type { Transaction } from '@/app/lib/types';
import type { SortConfig, FilterConfig, SortField } from './types';
import { processTransactions } from './utils';

/**
 * Hook for managing filtering and sorting state and operations
 */
export const useFiltersAndSorting = (transactions: Transaction[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: "date",
        direction: "desc",
    });

    const [filters, setFilters] = useState<FilterConfig>({
        searchTerm: "",
        typeFilter: "",
        recurringFilter: "",
    });

    // Process transactions with current filters and sorting
    const processedTransactions = useMemo(() => 
        processTransactions(transactions, filters, sortConfig),
        [transactions, filters, sortConfig]
    );

    /**
     * Handle sorting by field and toggle direction
     */
    const handleSort = useCallback((field: SortField) => {
        setSortConfig(current => ({
            field,
            direction: current.field === field && current.direction === 'asc' 
                ? 'desc' 
                : 'asc',
        }));
    }, []);

    /**
     * Update search term
     */
    const setSearchTerm = useCallback((searchTerm: string) => {
        setFilters(prev => ({ ...prev, searchTerm }));
    }, []);

    /**
     * Update type filter
     */
    const setTypeFilter = useCallback((typeFilter: string) => {
        setFilters(prev => ({ ...prev, typeFilter }));
    }, []);

    /**
     * Update recurring filter
     */
    const setRecurringFilter = useCallback((recurringFilter: string) => {
        setFilters(prev => ({ ...prev, recurringFilter }));
    }, []);

    /**
     * Clear all filters
     */
    const clearFilters = useCallback(() => {
        setFilters({
            searchTerm: "",
            typeFilter: "",
            recurringFilter: "",
        });
    }, []);

    /**
     * Check if any filters are active
     */
    const hasActiveFilters = useMemo(() => {
        return !!(filters.searchTerm || filters.typeFilter || filters.recurringFilter);
    }, [filters]);

    /**
     * Get count of active filters
     */
    const activeFiltersCount = useMemo(() => {
        return [
            filters.searchTerm,
            filters.typeFilter,
            filters.recurringFilter
        ].filter(Boolean).length;
    }, [filters]);

    return {
        // State
        sortConfig,
        filters,
        
        // Computed values
        processedTransactions,
        hasActiveFilters,
        activeFiltersCount,
        
        // Actions
        handleSort,
        setSearchTerm,
        setTypeFilter,
        setRecurringFilter,
        clearFilters,
        setSortConfig,
    };
};
