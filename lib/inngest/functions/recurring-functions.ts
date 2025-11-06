import { inngest } from "../client";
import { DatabaseUtils } from "../utils/database-utils";
import { DateUtils } from "../utils/date-utils";
import { CRON_SCHEDULES, THROTTLE_LIMITS } from "../config/constants";
import { RecurringTransactionEvent } from "../types";

export const triggerRecurringTransactions = inngest.createFunction({
  id: "trigger-recurring-transactions",
  name: "Trigger Recurring Transactions",
}, { cron: CRON_SCHEDULES.RECURRING_TRANSACTIONS },
  async ({ step }) => {
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await DatabaseUtils.getRecurringTransactions();
      }
    );

    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: { 
          transactionId: transaction.id, 
          userId: transaction.userId 
        },
      } as RecurringTransactionEvent));

      await step.run("send-events", async () => {
        await inngest.send(events);
      });
    }

    return { 
      triggered: recurringTransactions.length,
      transactions: recurringTransactions.map(t => ({
        id: t.id,
        userId: t.userId,
        description: t.description
      }))
    };
  });

  
export const processRecurringTransactions = inngest.createFunction({
  id: "process-recurring-transaction",
  throttle: THROTTLE_LIMITS.RECURRING_TRANSACTIONS,
}, {
  event: "transaction.recurring.process"
}, async ({ event, step }) => {
  
  // Validate event data
  if (!event?.data?.transactionId || !event?.data?.userId) {
    console.error("Invalid event data:", event);
    return { error: "Missing required event data" };
  }

  return await step.run("process-transaction", async () => {
    try {
      const transaction = await DatabaseUtils.getTransactionById(
        event.data.transactionId,
        event.data.userId
      );

      if (!transaction) {
        console.error(`Transaction not found: ${event.data.transactionId}`);
        return { error: "Transaction not found" };
      }

      if (!DateUtils.isTransactionDue(transaction)) {
        return { 
          transactionId: transaction.id,
          status: "skipped",
          reason: "not_due"
        };
      }

      await DatabaseUtils.createRecurringTransaction(transaction);

      return { 
        transactionId: transaction.id,
        status: "processed",
        amount: Number(transaction.amount),
        type: transaction.type
      };
    } catch (error) {
      console.error(`Error processing transaction ${event.data.transactionId}:`, error);
      return { 
        transactionId: event.data.transactionId,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });
});