import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Transaction } from '@/app/types/dashboard';

interface RecentTransactionsListProps {
  transactions: Transaction[];
  currency: string;
  formatTransactionDate: (date: string) => string;
  getTransactionIcon: (type: string) => string;
  getTransactionColor: (type: string) => string;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
  currency,
  formatTransactionDate,
  getTransactionIcon,
  getTransactionColor,
}) => {
  if (transactions.length === 0) {
    return (
      <p className='text-center text-muted-foreground py-4'>
        No recent transactions
      </p>
    );
  }

  return (
    <div className='space-y-4'>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.description || "Untitled Transaction"}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatTransactionDate(transaction.date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("flex items-center", getTransactionColor(transaction.type))}>
              {getTransactionIcon(transaction.type) === "ArrowDownRight" ? (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              ) : (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              )}
              {currency} {transaction.amount.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
