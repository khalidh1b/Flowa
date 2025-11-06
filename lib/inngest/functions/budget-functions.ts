import { inngest } from "../client";
import { DatabaseUtils } from "../utils/database-utils";
import { DateUtils } from "../utils/date-utils";
import { EmailService } from "../services/email-service";
import { CRON_SCHEDULES, BUDGET_THRESHOLDS } from "../config/constants";

const emailService = new EmailService();

export const checkBudgetAlert = inngest.createFunction(
  { 
    id: "check-budget-alert",
    name: "Check Budget Alerts" 
  },
  { cron: CRON_SCHEDULES.BUDGET_ALERT },
  async ({ step }) => {
    const budgets = await step.run("fetch-budgets", async () => {
      return await DatabaseUtils.getBudgetsWithUsers();
    });

    const { startDate, endDate } = DateUtils.getCurrentMonthRange();
    const results = [];

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      const result = await step.run(`check-budget-${budget.id}`, async () => {
        try {
          const totalExpenses = await DatabaseUtils.getMonthlyExpenses(
            budget.userId,
            defaultAccount.id,
            { startDate, endDate }
          );

          const budgetAmount = Number(budget.amount);
          
          const percentageUsed = (totalExpenses / budgetAmount) * 100;

          if (percentageUsed >= BUDGET_THRESHOLDS.ALERT_PERCENTAGE && 
              (!budget.lastAlertSent || DateUtils.isNewMonth(budget.lastAlertSent, new Date()))) {
            
            const alertData = {
              percentageUsed,
              budgetAmount,
              totalExpenses,
              month: new Date().toLocaleString("default", { month: "long" }),
              stats: {
                totalIncome: 0,
                totalExpenses,
              }
            };

            const emailSent = await emailService.sendBudgetAlert(alertData);
            
            if (emailSent) {
              await DatabaseUtils.updateBudgetAlert(budget.id);
            }

            return { 
              budgetId: budget.id, 
              alertSent: emailSent, 
              percentageUsed 
            };
          }

          return { 
            budgetId: budget.id, 
            alertSent: false, 
            percentageUsed,
            reason: percentageUsed < BUDGET_THRESHOLDS.ALERT_PERCENTAGE ? 'below_threshold' : 'already_sent'
          };
        } catch (error) {
          console.error(`Error processing budget ${budget.id}:`, error);
          return { 
            budgetId: budget.id, 
            alertSent: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      results.push(result);
    }

    return { 
      processed: budgets.length,
      results,
      summary: {
        alertsSent: results.filter(r => r.alertSent).length,
        errors: results.filter((r: any) => r.error).length
      }
    };
  }
);