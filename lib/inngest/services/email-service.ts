import { sendEmail } from "@/app/actions/send-email";
import { MonthlyReportData, BudgetAlertData } from "../types";

export class EmailService {
  private maxRetries = 3;
  private retryDelay = 1000;

  async sendBudgetAlert(data: BudgetAlertData): Promise<boolean> {
    const subject = `Budget Alert: ${data.percentageUsed.toFixed(1)}% of budget used`;
    
    const emailData = {
      to: data.stats,
      subject,
      template: "budget-alert",
      data: {
        percentageUsed: data.percentageUsed,
        budgetAmount: data.budgetAmount,
        totalExpenses: data.totalExpenses,
        month: data.month,
        stats: data.stats,
        insights: data.insights || [],
      },
    };

    return this.sendWithRetry(emailData);
  }

  async sendMonthlyReport(data: MonthlyReportData): Promise<boolean> {
    const subject = `Your Monthly Financial Report - ${data.month}`;
    
    const emailData = {
      to: data.stats,
      subject,
      template: "monthly-report",
      data: {
        month: data.month,
        stats: data.stats,
        insights: data.insights || [],
      },
    };

    return this.sendWithRetry(emailData);
  }

  private async sendWithRetry(emailData: any, attempt = 1): Promise<boolean> {
    try {
      await sendEmail();
      console.log(`Email sent successfully on attempt ${attempt}`);
      return true;
    } catch (error) {
      console.error(`Email service attempt ${attempt} failed:`, error);
      
      if (attempt >= this.maxRetries) {
        console.error("All email retry attempts exhausted");
        return false;
      }
      
      // Exponential backoff
      await this.delay(this.retryDelay * Math.pow(2, attempt - 1));
      return this.sendWithRetry(emailData, attempt + 1);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};