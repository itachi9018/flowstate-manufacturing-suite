
import { Card } from "@/components/ui/card";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { cn } from "@/lib/utils";

interface LineChartProps {
  data: Array<Record<string, any>>;
  title: string;
  subtitle?: string;
  className?: string;
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  comparison?: {
    label: string;
    dataKey: string;
    color: string;
  };
}

export function LineChart({ 
  data, 
  title, 
  subtitle,
  className,
  dataKey,
  xAxisKey = "name",
  color = "#33C3F0",
  comparison
}: LineChartProps) {
  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
              {comparison && (
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={comparison.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={comparison.color} stopOpacity={0}/>
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
            />
            {comparison && (
              <Line 
                type="monotone" 
                dataKey={comparison.dataKey} 
                stroke={comparison.color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 6, fill: comparison.color, stroke: 'white', strokeWidth: 2 }}
              />
            )}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};
