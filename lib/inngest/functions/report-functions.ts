import { inngest } from "../client";
import { DatabaseUtils } from "../utils/database-utils";
import { DateUtils } from "../utils/date-utils";
import { EmailService } from "../services/email-service";
import { AIService } from "../services/ai-service";
import { CRON_SCHEDULES } from "../config/constants";

const emailService = new EmailService();
const aiService = new AIService();

export const generateMonthlyReports = inngest.createFunction({
  id: "generate-monthly-reports",
  name: "Generate Monthly Reports",
}, { cron: CRON_SCHEDULES.MONTHLY_REPORTS }, async ({ step }) => {
  const users = await step.run("fetch-users", async () => {
    return await DatabaseUtils.getAllUsersWithAccounts();
  });

  const { startDate: lastMonthStart, endDate: lastMonthEnd } = DateUtils.getLastMonthRange();
  const monthName = lastMonthStart.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const results = [];

  for (const user of users) {
    const result = await step.run(`generate-report-${user.id}`, async () => {
      try {
        const stats = await DatabaseUtils.getMonthlyStats(user.id, lastMonthStart);
        
        // Generate insights using AI service
        const insights = await aiService.generateFinancialInsights(stats, monthName);

        const reportData = {
          month: monthName,
          stats,
          insights,
          totalExpenses: stats.totalExpenses,
          budgetAmount: 0, 
          percentageUsed: 0
        };

        const emailSent = await emailService.sendMonthlyReport(reportData);

        return {
          userId: user.id,
          emailSent,
          totalIncome: stats.totalIncome,
          totalExpenses: stats.totalExpenses,
          transactionCount: stats.transactionCount,
          insightsGenerated: insights.length
        };
      } catch (error) {
        console.error(`Error generating report for user ${user.id}:`, error);
        return {
          userId: user.id,
          emailSent: false,
          error: error instanceof Error ? error.message : "Unknown error"
        };
      }
    });

    results.push(result);
  }

  return {
    processed: users.length,
    month: monthName,
    dateRange: {
      start: lastMonthStart.toISOString(),
      end: lastMonthEnd.toISOString()
    },
    results,
    summary: {
      emailsSent: results.filter(r => r.emailSent).length,
      errors: results.filter((r: any) => r.error).length,
      totalIncome: results.reduce((sum, r: any) => sum + (r.totalIncome || 0), 0),
      totalExpenses: results.reduce((sum, r: any) => sum + (r.totalExpenses || 0), 0)
    }
  };
});