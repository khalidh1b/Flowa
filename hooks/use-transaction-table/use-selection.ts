import { useState, useCallback } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import type { Transaction } from '@/app/lib/types';

/**
 * Hook for managing transaction selection state and operations
 */
export const useSelection = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    /**
     * Toggle selection of a single transaction
     */
    const handleSelect = useCallback((id: string) => {
        setSelectedIds((current) => 
            current.includes(id) 
                ? current.filter(item => item !== id) 
                : [...current, id]
        );
    }, []);

    /**
     * Select or deselect all transactions
     */
    const handleSelectAll = useCallback((
        checkedState: CheckedState, 
        availableTransactions: Transaction[]
    ) => {
        if (checkedState === true) {
            setSelectedIds(availableTransactions.map(t => t.id));
        } else {
            setSelectedIds([]);
        }
    }, []);

    /**
     * Clear all selections
     */
    const clearSelection = useCallback(() => {
        setSelectedIds([]);
    }, []);

    /**
     * Check if a transaction is selected
     */
    const isSelected = useCallback((id: string) => {
        return selectedIds.includes(id);
    }, [selectedIds]);

    /**
     * Get count of selected transactions
     */
    const selectedCount = selectedIds.length;

    /**
     * Check if all transactions are selected
     */
    const isAllSelected = useCallback((availableTransactions: Transaction[]) => {
        return availableTransactions.length > 0 && 
               selectedIds.length === availableTransactions.length;
    }, [selectedIds]);

    /**
     * Check if some (but not all) transactions are selected
     */
    const isIndeterminate = useCallback((availableTransactions: Transaction[]) => {
        return selectedIds.length > 0 && 
               selectedIds.length < availableTransactions.length;
    }, [selectedIds]);

    return {
        // State
        selectedIds,
        selectedCount,
        
        // Actions
        handleSelect,
        handleSelectAll,
        clearSelection,
        
        // Computed values
        isSelected,
        isAllSelected,
        isIndeterminate,
    };
};
