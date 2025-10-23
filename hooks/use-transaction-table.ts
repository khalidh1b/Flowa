// Re-export the refactored hook for backward compatibility
export { useTransactionTable, RECURRING_INTERVALS } from './use-transaction-table/index';

// Re-export types for convenience
export type {
    SortConfig,
    FilterConfig,
    PaginationConfig,
    UseTransactionTableProps,
    RecurringInterval,
    SortField,
    SortDirection
} from './use-transaction-table/index';