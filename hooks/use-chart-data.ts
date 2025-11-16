import { useMemo } from 'react';
import { ChartData, Transaction, DateRangeKey } from '@/app/types/chart';
import { 
  filterTransactionsByDateRange, 
  groupTransactionsByDate, 
  calculateTotals 
} from '@/utils/chart-data-processor';

interface UseChartDataReturn {
  readonly filteredData: ChartData[];
  readonly totals: { readonly income: number; readonly expense: number };
}

// processing transaction data into chart-ready format
export function useChartData(
  transactions: Transaction[] | undefined,
  dateRange: DateRangeKey
): UseChartDataReturn {
  
  // memoize filtered and grouped data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!transactions?.length) return [];
    
    try {
      const filtered = filterTransactionsByDateRange(transactions, dateRange);
      return groupTransactionsByDate(filtered);
    } catch (error) {
      console.error('error processing chart data:', error);
      return [];
    }
  }, [transactions, dateRange]);

  // calculate totals only when filtered data changes
  const totals = useMemo(
    () => calculateTotals(filteredData),
    [filteredData]
  );

  return {
    filteredData,
    totals
  };
};