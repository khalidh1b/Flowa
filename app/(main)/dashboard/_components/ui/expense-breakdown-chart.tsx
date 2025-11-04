import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { PieChartData } from '@/app/types/dashboard';

interface ExpenseBreakdownChartProps {
  data: PieChartData[];
  currency: string;
  getChartColors: (index: number) => string;
}

export const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({
  data,
  currency,
  getChartColors,
}) => {
  if (data.length === 0) {
    return (
      <p className='text-center text-muted-foreground py-4'>
        No expenses this month
      </p>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data as any[]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={(props: any) => {
              const { name, value } = props;
              return `${name}: ${currency} ${Number(value).toFixed(2)}`;
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getChartColors(index)}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};