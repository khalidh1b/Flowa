import type { Transaction } from '@/app/lib/types';

export interface SortConfig {
    field: "date" | "amount" | "category";
    direction: "asc" | "desc";
}

export interface FilterConfig {
    searchTerm: string;
    typeFilter: string;
    recurringFilter: string;
}

export interface PaginationConfig {
    pageNumber: number;
    itemsPerPage: number;
}

export interface UseTransactionTableProps {
    transactions: Transaction[];
}

export const RECURRING_INTERVALS = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly"
} as const;

export type RecurringInterval = keyof typeof RECURRING_INTERVALS;

export type SortField = SortConfig['field'];
export type SortDirection = SortConfig['direction'];
