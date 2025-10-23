# use-transaction-table Hook Suite

This directory contains a refactored version of the original `useTransactionTable` hook, broken down into smaller, more focused hooks for better maintainability, testability, and reusability.

## 📁 File Structure

```
hooks/use-transaction-table/
├── index.ts                          # Main exports and re-exports
├── types.ts                          # Type definitions and constants
├── utils.ts                          # Pure utility functions
├── use-selection.ts                  # Selection management hook
├── use-pagination.ts                 # Pagination logic hook
├── use-filters-and-sorting.ts        # Filtering and sorting hook
├── use-transaction-actions.ts        # CRUD operations hook
├── use-transaction-table.ts          # Main composed hook
└── README.md                         # This documentation
```

## 🚀 Usage

### Basic Usage (Backward Compatible)

```typescript
import { useTransactionTable } from '@/hooks/use-transaction-table';

const MyComponent = ({ transactions }) => {
  const {
    // State
    selectedIds,
    sortConfig,
    filters,
    pageNumber,
    deleteLoading,
    
    // Computed values
    filteredAndSortedTransactions,
    paginatedTransactions,
    totalPages,
    hasActiveFilters,
    selectedCount,
    
    // Actions
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
};
```

### Advanced Usage (Individual Hooks)

```typescript
import {
  useSelection,
  usePagination,
  useFiltersAndSorting,
  useTransactionActions,
} from '@/hooks/use-transaction-table';

const MyComponent = ({ transactions }) => {
  const filtersAndSorting = useFiltersAndSorting(transactions);
  const selection = useSelection();
  const pagination = usePagination(filtersAndSorting.processedTransactions);
  const actions = useTransactionActions();
  
};
```

## 🔧 Individual Hooks

### `useSelection`

Manages transaction selection state and operations.

**Returns:**
- `selectedIds: string[]` - Array of selected transaction IDs
- `selectedCount: number` - Number of selected transactions
- `handleSelect: (id: string) => void` - Toggle selection of a transaction
- `handleSelectAll: (checkedState: CheckedState, transactions: Transaction[]) => void` - Select/deselect all
- `clearSelection: () => void` - Clear all selections
- `isSelected: (id: string) => boolean` - Check if transaction is selected
- `isAllSelected: (transactions: Transaction[]) => boolean` - Check if all are selected
- `isIndeterminate: (transactions: Transaction[]) => boolean` - Check if some are selected

### `usePagination`

Handles pagination logic and state management.

**Parameters:**
- `transactions: Transaction[]` - Transactions to paginate
- `itemsPerPage?: number` - Items per page (default: 20)

**Returns:**
- `pageNumber: number` - Current page number
- `totalPages: number` - Total number of pages
- `paginatedTransactions: Transaction[]` - Transactions for current page
- `hasNextPage: boolean` - Whether next page exists
- `hasPreviousPage: boolean` - Whether previous page exists
- `handlePageSelection: (page: number) => void` - Navigate to specific page
- `goToNextPage: () => void` - Go to next page
- `goToPreviousPage: () => void` - Go to previous page
- `goToFirstPage: () => void` - Go to first page
- `goToLastPage: () => void` - Go to last page
- `resetPagination: () => void` - Reset to first page

### `useFiltersAndSorting`

Manages filtering and sorting of transactions.

**Parameters:**
- `transactions: Transaction[]` - Transactions to filter and sort

**Returns:**
- `sortConfig: SortConfig` - Current sorting configuration
- `filters: FilterConfig` - Current filter configuration
- `processedTransactions: Transaction[]` - Filtered and sorted transactions
- `hasActiveFilters: boolean` - Whether any filters are active
- `activeFiltersCount: number` - Number of active filters
- `handleSort: (field: SortField) => void` - Handle sorting by field
- `setSearchTerm: (term: string) => void` - Set search term
- `setTypeFilter: (type: string) => void` - Set type filter
- `setRecurringFilter: (filter: string) => void` - Set recurring filter
- `clearFilters: () => void` - Clear all filters

### `useTransactionActions`

Handles transaction CRUD operations.

**Returns:**
- `deleteLoading: boolean` - Whether delete operation is in progress
- `handleBulkDelete: (ids: string[]) => Promise<void>` - Delete multiple transactions
- `handleDeleteTransaction: (id: string) => Promise<void>` - Delete single transaction
- `handleEditTransaction: (id: string) => void` - Navigate to edit page
- `handleDuplicateTransaction: (id: string) => void` - Navigate to duplicate page
- `handleViewTransaction: (id: string) => void` - Navigate to view page

## 🛠️ Utility Functions

### `filterTransactions`

Filters transactions based on search term, type, and recurring status.

```typescript
const filtered = filterTransactions(transactions, {
  searchTerm: "coffee",
  typeFilter: "EXPENSE",
  recurringFilter: "recurring"
});
```

### `sortTransactions`

Sorts transactions based on field and direction.

```typescript
const sorted = sortTransactions(transactions, {
  field: "date",
  direction: "desc"
});
```

### `processTransactions`

Applies both filtering and sorting to transactions.

```typescript
const processed = processTransactions(transactions, filters, sortConfig);
```

### `getPaginatedTransactions`

Gets paginated slice of transactions.

```typescript
const page = getPaginatedTransactions(transactions, pageNumber, itemsPerPage);
```

### `getTotalPages`

Calculates total number of pages.

```typescript
const totalPages = getTotalPages(totalItems, itemsPerPage);
```

## 📝 Types

### `SortConfig`

```typescript
interface SortConfig {
  field: "date" | "amount" | "category";
  direction: "asc" | "desc";
}
```

### `FilterConfig`

```typescript
interface FilterConfig {
  searchTerm: string;
  typeFilter: string;
  recurringFilter: string;
}
```

### `PaginationConfig`

```typescript
interface PaginationConfig {
  pageNumber: number;
  itemsPerPage: number;
}
```

## 🧪 Testing

The modular structure makes testing much easier:

```typescript
// Test selection logic
import { renderHook, act } from '@testing-library/react';
import { useSelection } from '@/hooks/use-transaction-table';

test('should toggle selection', () => {
  const { result } = renderHook(() => useSelection());
  
  act(() => {
    result.current.handleSelect('tx-1');
  });
  
  expect(result.current.selectedIds).toContain('tx-1');
});
```

## 🔄 Migration from Original Hook

The refactored version maintains full backward compatibility. Existing code will continue to work without changes:

```typescript
const table = useTransactionTable({ transactions });
```

However, you can now also use individual hooks for more granular control:

```typescript
const filters = useFiltersAndSorting(transactions);
const selection = useSelection();
const pagination = usePagination(filters.processedTransactions);
```

## 🎯 Benefits of Refactoring

1. **Better Separation of Concerns**: Each hook has a single responsibility
2. **Improved Testability**: Individual hooks can be tested in isolation
3. **Enhanced Reusability**: Hooks can be used independently in other components
4. **Easier Maintenance**: Smaller, focused code is easier to understand and modify
5. **Better Performance**: More granular re-renders and optimizations
6. **Type Safety**: Comprehensive TypeScript definitions
7. **Documentation**: Clear JSDoc comments and examples

## 🚀 Performance Optimizations

- **Memoization**: Expensive computations are memoized using `useMemo`
- **Callback Optimization**: Event handlers are optimized with `useCallback`
- **Granular Re-renders**: Each hook manages its own state to minimize unnecessary re-renders
- **Pure Functions**: Utility functions are pure and easily testable