
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  
  let greeting = "Good evening";
  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  }

  return (
    <header className="flex justify-between items-center py-4 px-6">
      <div>
        <h1 className="text-2xl font-bold text-flow-dark">
          {greeting}, {username}!
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 bg-white border-gray-200" 
          />
        </div>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={20} className="text-gray-600" />
        </button>
        
        <div className="h-10 w-10 rounded-full bg-flow-blue flex items-center justify-center text-white">
          {username.charAt(0)}
        </div>
      </div>
    </header>
  );
}
