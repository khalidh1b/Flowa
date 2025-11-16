export const serializeAmount = (amount: { toNumber: () => number } | number): number => {
  return typeof amount === "number" ? amount : amount.toNumber();
};

export const serializeTransaction = (transaction: any) => ({
  ...transaction,
  balance: transaction.balance ? serializeAmount(transaction.balance) : undefined,
  amount: transaction.amount ? serializeAmount(transaction.amount) : undefined,
});

export const serializeAccount = (account: any) => ({
  ...account,
  balance: account.balance ? serializeAmount(account.balance) : undefined,
});