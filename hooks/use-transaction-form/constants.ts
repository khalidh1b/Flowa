export const DEFAULT_TRANSACTION_TYPE = "EXPENSE" as const;
export const DEFAULT_CURRENCY = "USD" as const;

export const SUCCESS_MESSAGES = {
    create: "Transaction created successfully",
    update: "Transaction updated successfully",
} as const;

export const ERROR_MESSAGES = {
    transactionFailed: "Transaction failed. Please try again.",
    submissionError: "Failed to process transaction. Please try again.",
    receiptScanError: "Couldn't detect any valid receipt information.",
    receiptProcessingError: "Failed to process receipt information.",
    receiptScanSuccess: "Receipt information extracted successfully",
    amountValidation: "Amount must be greater than 0",
} as const;