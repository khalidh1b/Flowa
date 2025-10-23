import { DateRange, DateRangeKey } from '@/app/types/chart';

export const DATE_RANGES: Record<DateRangeKey, DateRange> = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  "ALL": { label: "All Time", days: null },
};
