import { DateRange } from "../types";

export class DateUtils {
  static getMonthRange(date: Date): DateRange {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { startDate, endDate };
  }

  static getLastMonthRange(): DateRange {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return this.getMonthRange(lastMonth);
  }

  static getCurrentMonthRange(): DateRange {
    return this.getMonthRange(new Date());
  }

  static isNewMonth(lastAlertDate: Date | string, currentDate: Date): boolean {
    const alertDate = typeof lastAlertDate === 'string' ? new Date(lastAlertDate) : lastAlertDate;
    return (
      alertDate.getMonth() !== currentDate.getMonth() || 
      alertDate.getFullYear() !== currentDate.getFullYear()
    );
  }

  static calculateNextRecurringDate(startDate: Date, interval: string): Date {
    const date = new Date(startDate);

    switch (interval) {
      case "DAILY":
        date.setDate(date.getDate() + 1);
        break;
      case "WEEKLY":
        date.setDate(date.getDate() + 7);
        break;
      case "MONTHLY":
        date.setMonth(date.getMonth() + 1);
        break;
      case "YEARLY":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        throw new Error(`Invalid recurring interval: ${interval}`);
    }
    
    return date;
  }

  static isTransactionDue(transaction: { lastProcessed: Date | null; nextRecurringDate: Date | null }): boolean {
    if (!transaction.lastProcessed) {
      return true;
    }

    const today = new Date();
    const nextDue = transaction.nextRecurringDate;

    return nextDue ? nextDue <= today : false;
  }
};