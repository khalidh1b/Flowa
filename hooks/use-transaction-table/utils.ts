import type { Transaction } from '@/app/lib/types';
import type { SortConfig, FilterConfig } from './types';

/**
 * Filters transactions based on search term, type, and recurring status
 */
export const filterTransactions = (
    transactions: Transaction[],
    filters: FilterConfig
): Transaction[] => {
    let result = [...transactions];

    // Apply search filter by description
    if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        result = result.filter((transaction) => 
            transaction.description?.toLowerCase().includes(searchLower)
        );
    }

    // Apply recurring filter (recurring or non-recurring)
    if (filters.recurringFilter) {
        result = result.filter((transaction) => {
            if (filters.recurringFilter === 'recurring') {
                return transaction.isRecurring;
            }
            return !transaction.isRecurring;
        });
    }

    // Apply type filter (INCOME or EXPENSE)
    if (filters.typeFilter) {
        result = result.filter((transaction) => 
            transaction.type === filters.typeFilter
        );
    }

    return result;
};

/**
 * Sorts transactions based on field and direction
 */
export const sortTransactions = (
    transactions: Transaction[],
    sortConfig: SortConfig
): Transaction[] => {
    return [...transactions].sort((a, b) => {
        let comparison = 0;

        switch (sortConfig.field) {
            case "date":
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                break;
            case "amount":
                comparison = a.amount - b.amount;
                break;
            case "category":
                comparison = a.category.localeCompare(b.category);
                break;
            default:
                comparison = 0;
        }

        return sortConfig.direction === "asc" ? comparison : -comparison;
    });
};

/**
 * Applies both filtering and sorting to transactions
 */
export const processTransactions = (
    transactions: Transaction[],
    filters: FilterConfig,
    sortConfig: SortConfig
): Transaction[] => {
    const filtered = filterTransactions(transactions, filters);
    return sortTransactions(filtered, sortConfig);
};

/**
 * Gets paginated slice of transactions
 */
export const getPaginatedTransactions = (
    transactions: Transaction[],
    pageNumber: number,
    itemsPerPage: number = 20
): Transaction[] => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
};

/**
 * Calculates total number of pages
 */
export const getTotalPages = (
    totalItems: number,
    itemsPerPage: number = 25
): number => {
    return Math.ceil(totalItems / itemsPerPage);
};
