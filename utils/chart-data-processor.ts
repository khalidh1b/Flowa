import { endOfDay, format, startOfDay, subDays } from 'date-fns';
import { ChartData, Transaction, DateRangeKey } from '@/app/types/chart';
import { DATE_RANGES } from './chart-constants';

export function filterTransactionsByDateRange(
  transactions: Transaction[],
  dateRange: DateRangeKey
): Transaction[] {
  const range = DATE_RANGES[dateRange];
  const now = new Date();
  const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0));

  return transactions.filter(
    (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
  );
}

export function groupTransactionsByDate(transactions: Transaction[]): ChartData[] {
  const grouped = transactions.reduce<Record<string, ChartData>>((acc, transaction) => {
    const date = format(new Date(transaction.date), "MMM dd");

    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }

    if (transaction.type === "INCOME") {
      acc[date].income += transaction.amount;
    } else {
      acc[date].expense += transaction.amount;
    }

    return acc;
  }, {});

  return Object.values(grouped).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function calculateTotals(data: ChartData[]): { income: number; expense: number } {
  return data.reduce(
    (acc, day) => ({
      income: acc.income + day.income,
      expense: acc.expense + day.expense,
    }),
    { income: 0, expense: 0 }
  );
}
