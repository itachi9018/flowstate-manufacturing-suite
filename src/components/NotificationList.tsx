
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";

interface Notification {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  message: string;
  time: string;
}

interface NotificationListProps {
  title: string;
  notifications: Notification[];
  className?: string;
}

export function NotificationList({ title, notifications, className }: NotificationListProps) {
  return (
    <Card className={cn("glass-card", className)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        
        <div className="space-y-1">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              {index > 0 && <Separator className="my-3" />}
              <NotificationItem notification={notification} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface NotificationItemProps {
  notification: Notification;
}

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <div className="bg-flow-purple font-medium text-sm">
          {notification.sender.name.charAt(0)}
        </div>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">{notification.sender.name}</p>
          <span className="text-xs text-gray-400">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600">{notification.message}</p>
      </div>
    </div>
  );
}
