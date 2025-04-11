
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-flow-text">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {icon && <div>{icon}</div>}
        </div>

        {trend && (
          <div className="mt-4 flex items-center">
            <div
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="glass-card p-6">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-16 bg-gray-300 rounded mt-2 animate-pulse"></div>
      <div className="h-3 w-32 bg-gray-200 rounded mt-2 animate-pulse"></div>
    </Card>
  );
}
