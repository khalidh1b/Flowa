export interface Account {
    id: string
    name: string
    type: string
    currency: string
    balance: number
    isDefault: boolean
};

export interface AccountCardProps {
    account: Account
};

export interface UpdatedAccount {
    success: boolean;
};

export interface Transaction {
  id: string
  accountId: string
  amount: number
  date: string
  type: string
  category: string
  currency: string
  description?: string
};

export interface DashboardOverviewProps {
  accounts: Account[]
  transactions: Transaction[]
};

export interface PieChartData {
  name: string
  value: number
};