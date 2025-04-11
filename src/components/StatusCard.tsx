
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  status: string;
  progressValue: number;
  description: string;
  className?: string;
}

export function StatusCard({ title, status, progressValue, description, className }: StatusCardProps) {
  return (
    <Card className={cn("glass-dark", className)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300 mt-1">{status}</p>
        
        <div className="mt-4">
          <Progress value={progressValue} className="h-2 bg-white/10" />
        </div>
        
        <p className="text-sm text-gray-300 mt-3">{description}</p>
        
        <Button variant="outline" className="mt-4 w-full bg-white text-flow-dark hover:bg-gray-100">
          View status
        </Button>
      </div>
    </Card>
  );
}
