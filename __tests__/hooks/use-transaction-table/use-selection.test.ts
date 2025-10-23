import { renderHook, act } from '@testing-library/react';
import { useSelection } from '@/hooks/use-transaction-table/use-selection';
import type { Transaction } from '@/app/lib/types';

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Coffee',
    amount: 5,
    type: 'EXPENSE',
    category: 'Food',
    date: '2024-01-01',
    isRecurring: false,
  },
  {
    id: 'tx-2',
    description: 'Salary',
    amount: 3000,
    type: 'INCOME',
    category: 'Salary',
    date: '2024-01-01',
    isRecurring: true,
  },
] as Transaction[];

describe('useSelection', () => {
  it('should initialize with empty selection', () => {
    const { result } = renderHook(() => useSelection());
    
    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.selectedCount).toBe(0);
  });

  it('should toggle transaction selection', () => {
    const { result } = renderHook(() => useSelection());
    
    // Select transaction
    act(() => {
      result.current.handleSelect('tx-1');
    });
    
    expect(result.current.selectedIds).toContain('tx-1');
    expect(result.current.selectedCount).toBe(1);
    expect(result.current.isSelected('tx-1')).toBe(true);
    
    // Deselect transaction
    act(() => {
      result.current.handleSelect('tx-1');
    });
    
    expect(result.current.selectedIds).not.toContain('tx-1');
    expect(result.current.selectedCount).toBe(0);
    expect(result.current.isSelected('tx-1')).toBe(false);
  });

  it('should select all transactions', () => {
    const { result } = renderHook(() => useSelection());
    
    act(() => {
      result.current.handleSelectAll(true, mockTransactions);
    });
    
    expect(result.current.selectedIds).toEqual(['tx-1', 'tx-2']);
    expect(result.current.selectedCount).toBe(2);
    expect(result.current.isAllSelected(mockTransactions)).toBe(true);
    expect(result.current.isIndeterminate(mockTransactions)).toBe(false);
  });

  it('should deselect all transactions', () => {
    const { result } = renderHook(() => useSelection());
    
    // First select some
    act(() => {
      result.current.handleSelect('tx-1');
    });
    
    // Then clear all
    act(() => {
      result.current.handleSelectAll(false, mockTransactions);
    });
    
    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.selectedCount).toBe(0);
    expect(result.current.isAllSelected(mockTransactions)).toBe(false);
    expect(result.current.isIndeterminate(mockTransactions)).toBe(false);
  });

  it('should handle indeterminate state correctly', () => {
    const { result } = renderHook(() => useSelection());
    
    // Select only one transaction
    act(() => {
      result.current.handleSelect('tx-1');
    });
    
    expect(result.current.isAllSelected(mockTransactions)).toBe(false);
    expect(result.current.isIndeterminate(mockTransactions)).toBe(true);
  });

  it('should clear selection', () => {
    const { result } = renderHook(() => useSelection());
    
    // Select some transactions
    act(() => {
      result.current.handleSelect('tx-1');
      result.current.handleSelect('tx-2');
    });
    
    expect(result.current.selectedCount).toBe(2);
    
    // Clear selection
    act(() => {
      result.current.clearSelection();
    });
    
    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.selectedCount).toBe(0);
  });

  it('should handle empty transactions list for select all', () => {
    const { result } = renderHook(() => useSelection());
    
    act(() => {
      result.current.handleSelectAll(true, []);
    });
    
    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.isAllSelected([])).toBe(false);
    expect(result.current.isIndeterminate([])).toBe(false);
  });
});
