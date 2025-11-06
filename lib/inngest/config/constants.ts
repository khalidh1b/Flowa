export const CRON_SCHEDULES = {
  BUDGET_ALERT: "0 */6 * * *",
  RECURRING_TRANSACTIONS: "0 0 * * *",
  MONTHLY_REPORTS: "0 0 1 * *",
} as const;

export const THROTTLE_LIMITS = {
  RECURRING_TRANSACTIONS: {
    limit: 10,
    period: "1m",
    key: "event.data.userId",
  },
} as const;

export const BUDGET_THRESHOLDS = {
  ALERT_PERCENTAGE: 80,
} as const;

export const RECURRING_INTERVALS = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
} as const;

export const DEFAULT_INSIGHTS = [
  "Your highest expense category this month might need attention.",
  "Consider setting up a budget for better financial management.",
  "Track your recurring expenses to identify potential savings.",
] as const;