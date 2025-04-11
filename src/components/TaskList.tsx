
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  completed?: boolean;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  className?: string;
}

export function TaskList({ title, tasks, className }: TaskListProps) {
  return (
    <Card className={cn("glass-dark", className)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={task.id}>
              {index > 0 && <Separator className="my-3 bg-white/10" />}
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center">
        <Clock size={14} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{task.title}</p>
        <p className="text-xs text-gray-300">Mar {task.time}</p>
      </div>
    </div>
  );
}
