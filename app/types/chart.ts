export type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
};

export type Account = {
  currency: string;
};

export type ChartData = {
  date: string;
  income: number;
  expense: number;
};

export type DateRangeKey = "7D" | "1M" | "3M" | "6M" | "ALL";

export type DateRange = {
  label: string;
  days: number | null;
};
