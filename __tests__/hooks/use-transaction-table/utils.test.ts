import {
  filterTransactions,
  sortTransactions,
  processTransactions,
  getPaginatedTransactions,
  getTotalPages,
} from '@/hooks/use-transaction-table/utils';
import type { Transaction } from '@/app/lib/types';
import type { SortConfig, FilterConfig } from '@/hooks/use-transaction-table/types';

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Coffee Shop',
    amount: 5,
    type: 'EXPENSE',
    category: 'Food',
    date: '2024-01-15',
    isRecurring: false,
  },
  {
    id: 'tx-2',
    description: 'Monthly Salary',
    amount: 3000,
    type: 'INCOME',
    category: 'Salary',
    date: '2024-01-01',
    isRecurring: true,
  },
  {
    id: 'tx-3',
    description: 'Netflix Subscription',
    amount: 15,
    type: 'EXPENSE',
    category: 'Entertainment',
    date: '2024-01-10',
    isRecurring: true,
  },
] as Transaction[];

describe('Transaction Utils', () => {
  describe('filterTransactions', () => {
    it('should filter by search term', () => {
      const filters: FilterConfig = {
        searchTerm: 'coffee',
        typeFilter: '',
        recurringFilter: '',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tx-1');
    });

    it('should filter by type', () => {
      const filters: FilterConfig = {
        searchTerm: '',
        typeFilter: 'INCOME',
        recurringFilter: '',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tx-2');
    });

    it('should filter by recurring status', () => {
      const filters: FilterConfig = {
        searchTerm: '',
        typeFilter: '',
        recurringFilter: 'recurring',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(2);
      expect(result.map((t: Transaction) => t.id)).toEqual(['tx-2', 'tx-3']);
    });

    it('should filter by non-recurring status', () => {
      const filters: FilterConfig = {
        searchTerm: '',
        typeFilter: '',
        recurringFilter: 'non-recurring',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tx-1');
    });

    it('should apply multiple filters', () => {
      const filters: FilterConfig = {
        searchTerm: 'subscription',
        typeFilter: 'EXPENSE',
        recurringFilter: 'recurring',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tx-3');
    });

    it('should return all transactions when no filters are applied', () => {
      const filters: FilterConfig = {
        searchTerm: '',
        typeFilter: '',
        recurringFilter: '',
      };

      const result = filterTransactions(mockTransactions, filters);
      
      expect(result).toHaveLength(3);
    });
  });

  describe('sortTransactions', () => {
    it('should sort by date ascending', () => {
      const sortConfig: SortConfig = {
        field: 'date',
        direction: 'asc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-2'); // 2024-01-01
      expect(result[1].id).toBe('tx-3'); // 2024-01-10
      expect(result[2].id).toBe('tx-1'); // 2024-01-15
    });

    it('should sort by date descending', () => {
      const sortConfig: SortConfig = {
        field: 'date',
        direction: 'desc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-1'); // 2024-01-15
      expect(result[1].id).toBe('tx-3'); // 2024-01-10
      expect(result[2].id).toBe('tx-2'); // 2024-01-01
    });

    it('should sort by amount ascending', () => {
      const sortConfig: SortConfig = {
        field: 'amount',
        direction: 'asc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-1'); // 5
      expect(result[1].id).toBe('tx-3'); // 15
      expect(result[2].id).toBe('tx-2'); // 3000
    });

    it('should sort by amount descending', () => {
      const sortConfig: SortConfig = {
        field: 'amount',
        direction: 'desc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-2'); // 3000
      expect(result[1].id).toBe('tx-3'); // 15
      expect(result[2].id).toBe('tx-1'); // 5
    });

    it('should sort by category ascending', () => {
      const sortConfig: SortConfig = {
        field: 'category',
        direction: 'asc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-3'); // Entertainment
      expect(result[1].id).toBe('tx-1'); // Food
      expect(result[2].id).toBe('tx-2'); // Salary
    });

    it('should sort by category descending', () => {
      const sortConfig: SortConfig = {
        field: 'category',
        direction: 'desc',
      };

      const result = sortTransactions(mockTransactions, sortConfig);
      
      expect(result[0].id).toBe('tx-2'); // Salary
      expect(result[1].id).toBe('tx-1'); // Food
      expect(result[2].id).toBe('tx-3'); // Entertainment
    });
  });

  describe('processTransactions', () => {
    it('should apply both filtering and sorting', () => {
      const filters: FilterConfig = {
        searchTerm: '',
        typeFilter: 'EXPENSE',
        recurringFilter: '',
      };

      const sortConfig: SortConfig = {
        field: 'amount',
        direction: 'desc',
      };

      const result = processTransactions(mockTransactions, filters, sortConfig);
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('tx-3'); // 15
      expect(result[1].id).toBe('tx-1'); // 5
    });
  });

  describe('getPaginatedTransactions', () => {
    it('should return first page', () => {
      const result = getPaginatedTransactions(mockTransactions, 1, 2);
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('tx-1');
      expect(result[1].id).toBe('tx-2');
    });

    it('should return second page', () => {
      const result = getPaginatedTransactions(mockTransactions, 2, 2);
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('tx-3');
    });

    it('should return empty array for page beyond range', () => {
      const result = getPaginatedTransactions(mockTransactions, 5, 2);
      
      expect(result).toHaveLength(0);
    });

    it('should use default items per page', () => {
      const result = getPaginatedTransactions(mockTransactions, 1);
      
      expect(result).toHaveLength(3); // Default is 20, so all items
    });
  });

  describe('getTotalPages', () => {
    it('should calculate total pages correctly', () => {
      expect(getTotalPages(10, 3)).toBe(4); // 3, 3, 3, 1
      expect(getTotalPages(10, 5)).toBe(2); // 5, 5
      expect(getTotalPages(10, 10)).toBe(1); // 10
      expect(getTotalPages(10, 15)).toBe(1); // 10
      expect(getTotalPages(0, 5)).toBe(0); // 0
    });

    it('should use default items per page', () => {
      expect(getTotalPages(30)).toBe(2); // Default is 25, so 25, 5
    });
  });
});