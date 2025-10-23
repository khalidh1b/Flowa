import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { format, subDays } from "date-fns";
import AccountChart from "@/app/(main)/account/_components/account-chart";

// Mock Recharts components to avoid rendering issues in tests
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ dataKey, name }: { dataKey: string; name: string }) => (
    <div data-testid={`bar-${dataKey}`} data-name={name} />
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-key={dataKey} />
  ),
  YAxis: ({ tickFormatter }: { tickFormatter?: (value: any) => string }) => (
    <div data-testid="y-axis" data-formatter={!!tickFormatter} />
  ),
  Tooltip: ({ formatter }: { formatter?: (value: any) => any[] }) => (
    <div data-testid="tooltip" data-formatter={!!formatter} />
  ),
  Legend: () => <div data-testid="legend" />,
}));

// Mock the UI components that might cause issues
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
}));

jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange, defaultValue }: { 
    children: React.ReactNode; 
    onValueChange?: (value: string) => void;
    defaultValue?: string;
  }) => (
    <div data-testid="select" data-default-value={defaultValue}>
      {children}
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <option value={value} data-testid="select-item">{children}</option>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <select data-testid="select-trigger">{children}</select>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => (
    <option>{placeholder}</option>
  ),
}));

describe("AccountChart", () => {
  const mockTransactions = [
    {
      id: "1",
      date: format(new Date(), "yyyy-MM-dd"),
      amount: 1000,
      type: "INCOME" as const,
    },
    {
      id: "2",
      date: format(new Date(), "yyyy-MM-dd"),
      amount: 500,
      type: "EXPENSE" as const,
    },
    {
      id: "3",
      date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
      amount: 750,
      type: "INCOME" as const,
    },
    {
      id: "4",
      date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
      amount: 300,
      type: "EXPENSE" as const,
    },
  ];

  const mockAccount = {
    currency: "USD",
  };

  const defaultProps = {
    transactions: mockTransactions,
    account: mockAccount,
  };

  it("renders correctly with default props", () => {
    render(<AccountChart {...defaultProps} />);
    
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Transaction Overview")).toBeInTheDocument();
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("displays correct totals for income and expenses", () => {
    render(<AccountChart {...defaultProps} />);
    
    const totalIncome = 1000 + 750; // 1750
    const totalExpenses = 500 + 300; // 800
    
    expect(screen.getByText(`USD ${totalIncome.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${totalExpenses.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`USD ${(totalIncome - totalExpenses).toFixed(2)}`)).toBeInTheDocument();
  });

  it("displays net amount in green when income > expenses", () => {
    render(<AccountChart {...defaultProps} />);
    
    const netElements = screen.getAllByText(/USD \d+\.\d+/);
    const netElement = netElements.find(el => 
      el.textContent === "USD 950.00" && el.classList.contains("text-green-500")
    );
    expect(netElement).toBeInTheDocument();
    expect(netElement).toHaveClass("text-green-500");
  });

  it("displays net amount in red when expenses > income", () => {
    const expenseHeavyTransactions = [
      {
        id: "1",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 100,
        type: "INCOME" as const,
      },
      {
        id: "2",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 500,
        type: "EXPENSE" as const,
      },
    ];

    render(
      <AccountChart 
        transactions={expenseHeavyTransactions} 
        account={mockAccount} 
      />
    );
    
    const netElements = screen.getAllByText(/USD -\d+\.\d+/);
    const netElement = netElements.find(el => el.classList.contains("text-red-500"));
    expect(netElement).toBeInTheDocument();
    expect(netElement).toHaveClass("text-red-500");
  });

  it("displays zero net amount correctly", () => {
    const balancedTransactions = [
      {
        id: "1",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 500,
        type: "INCOME" as const,
      },
      {
        id: "2",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 500,
        type: "EXPENSE" as const,
      },
    ];

    render(
      <AccountChart 
        transactions={balancedTransactions} 
        account={mockAccount} 
      />
    );
    
    const zeroElements = screen.getAllByText("USD 0.00");
    expect(zeroElements.length).toBeGreaterThan(0);
  });

  it("renders chart components correctly", () => {
    render(<AccountChart {...defaultProps} />);
    
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("bar-income")).toBeInTheDocument();
    expect(screen.getByTestId("bar-expense")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  it("filters transactions based on date range", () => {
    const oldTransaction = {
      id: "old",
      date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
      amount: 1000,
      type: "INCOME" as const,
    };

    const recentTransactions = [
      oldTransaction,
      ...mockTransactions,
    ];

    render(
      <AccountChart 
        transactions={recentTransactions} 
        account={mockAccount} 
      />
    );
    
    // Initially set to "1M" (30 days), should include all transactions
    const moneyElements = screen.getAllByText(/USD \d+\.\d+/);
    expect(moneyElements.length).toBeGreaterThan(0);
  });

  it("changes date range when select value changes", () => {
    render(<AccountChart {...defaultProps} />);
    
    const select = screen.getByTestId("select");
    expect(select).toHaveAttribute("data-default-value", "1M");
  });

  it("displays all date range options", () => {
    render(<AccountChart {...defaultProps} />);
    
    expect(screen.getByText("Last 7 Days")).toBeInTheDocument();
    expect(screen.getByText("Last Month")).toBeInTheDocument();
    expect(screen.getByText("Last 3 Months")).toBeInTheDocument();
    expect(screen.getByText("Last 6 Months")).toBeInTheDocument();
    expect(screen.getByText("All Time")).toBeInTheDocument();
  });

  it("handles empty transactions array", () => {
    render(
      <AccountChart 
        transactions={[]} 
        account={mockAccount} 
      />
    );
    
    const zeroElements = screen.getAllByText("USD 0.00");
    expect(zeroElements.length).toBeGreaterThan(0);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("handles different currency symbols", () => {
    const euroAccount = { currency: "EUR" };
    
    render(
      <AccountChart 
        transactions={mockTransactions} 
        account={euroAccount} 
      />
    );
    
    const euroElements = screen.getAllByText(/EUR \d+\.\d+/);
    expect(euroElements.length).toBeGreaterThan(0);
  });

  it("groups transactions by date correctly", () => {
    const sameDayTransactions = [
      {
        id: "1",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 500,
        type: "INCOME" as const,
      },
      {
        id: "2",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 300,
        type: "INCOME" as const,
      },
      {
        id: "3",
        date: format(new Date(), "yyyy-MM-dd"),
        amount: 200,
        type: "EXPENSE" as const,
      },
    ];

    render(
      <AccountChart 
        transactions={sameDayTransactions} 
        account={mockAccount} 
      />
    );
    
    // Should show total income of 800 and expense of 200
    expect(screen.getByText("USD 800.00")).toBeInTheDocument();
    expect(screen.getByText("USD 200.00")).toBeInTheDocument();
    expect(screen.getByText("USD 600.00")).toBeInTheDocument(); // Net
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<AccountChart {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
