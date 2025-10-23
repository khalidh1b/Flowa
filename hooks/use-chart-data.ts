import { useMemo } from 'react';
import { ChartData, Transaction, DateRangeKey } from '@/app/types/chart';
import { 
  filterTransactionsByDateRange, 
  groupTransactionsByDate, 
  calculateTotals 
} from '@/utils/chart-data-processor';

interface UseChartDataReturn {
  filteredData: ChartData[];
  totals: { income: number; expense: number };
}

export function useChartData(
  transactions: Transaction[],
  dateRange: DateRangeKey
): UseChartDataReturn {
  const filteredData = useMemo(() => {
    const filtered = filterTransactionsByDateRange(transactions, dateRange);
    return groupTransactionsByDate(filtered);
  }, [transactions, dateRange]);

  const totals = useMemo(
    () => calculateTotals(filteredData),
    [filteredData]
  );

  return {
    filteredData,
    totals
  };
}
