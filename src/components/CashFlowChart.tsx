
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Mock data for the cash flow chart
const cashFlowData = [
  { month: 'Jan', revenue: 38000, expenses: 22000, profit: 16000 },
  { month: 'Feb', revenue: 42000, expenses: 24000, profit: 18000 },
  { month: 'Mar', revenue: 45280, expenses: 23620, profit: 21660 },
  { month: 'Apr', revenue: 47500, expenses: 25800, profit: 21700 },
  { month: 'May', revenue: 41200, expenses: 22400, profit: 18800 },
  { month: 'Jun', revenue: 52300, expenses: 28900, profit: 23400 },
];

interface CashFlowChartProps {
  title?: string;
  description?: string;
}

export const CashFlowChart = ({ 
  title = "Cash Flow", 
  description = "Monthly revenue vs expenses" 
}: CashFlowChartProps) => {
  const chartConfig = {
    revenue: { 
      label: "Revenue",
      theme: { light: "#8884d8", dark: "#8884d8" }
    },
    expenses: { 
      label: "Expenses",
      theme: { light: "#82ca9d", dark: "#82ca9d" }
    },
    profit: { 
      label: "Profit",
      theme: { light: "#ffc658", dark: "#ffc658" }
    }
  };

  return (
    <Card className="glass-card col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-revenue)" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="var(--color-expenses)" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="var(--color-profit)" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
