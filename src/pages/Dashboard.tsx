import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { LineChart } from "@/components/LineChart";
import { TaskList } from "@/components/TaskList";
import { NotificationList } from "@/components/NotificationList";
import { StatusCard } from "@/components/StatusCard";
import { DollarSign, Clock, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  // State for dialog 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data for the dashboard
  const revenueData = [
    { name: "Feb 14", value: 12000, previous: 10000 },
    { name: "Feb 15", value: 10000, previous: 12000 },
    { name: "Feb 16", value: 14000, previous: 11000 },
    { name: "Feb 17", value: 13000, previous: 14000 },
    { name: "Feb 18", value: 15000, previous: 13500 },
    { name: "Feb 19", value: 16000, previous: 14000 },
    { name: "Feb 20", value: 18000, previous: 15500 },
  ];

  const tasks = [
    { id: "1", title: "Run payroll", time: "6 at 5:00 pm" },
    { id: "2", title: "Review time off request", time: "7 at 2:00 pm" },
    { id: "3", title: "Sign board resolution", time: "11 at 9:30 am" },
    { id: "4", title: "Finish onboarding Tony", time: "12 at 1:00 pm" },
  ];

  const notifications = [
    { 
      id: "1", 
      sender: { name: "Hannah Morgan" }, 
      message: "Meeting scheduled", 
      time: "3:30 PM" 
    },
    { 
      id: "2", 
      sender: { name: "Megan Clark" }, 
      message: "Update on marketing campaign", 
      time: "12:32 PM" 
    },
    { 
      id: "3", 
      sender: { name: "Brandon Williams" }, 
      message: "Design 2.0 is about to launch", 
      time: "Yesterday at 8:57 PM" 
    },
    { 
      id: "4", 
      sender: { name: "Reid Smith" }, 
      message: "My friend Julie loves FlowState!", 
      time: "Yesterday at 5:45 PM" 
    },
  ];

  // Formation status details
  const formationDetails = {
    company: "FlowState Inc.",
    status: "In progress",
    filingDate: "April 19, 2025",
    estimatedCompletion: "April 25, 2025",
    documentsPending: ["Certificate of Formation", "Operating Agreement"],
    nextSteps: "Review and sign operating agreement when ready"
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-6">
        {/* Top row stats */}
        <StatCard 
          title="Your bank balance"
          value="$143,624"
          description="Total available funds"
          icon={<DollarSign className="text-flow-blue" size={24} />}
        />
        <StatCard 
          title="Unassigned transactions"
          value="12"
          description="Transactions requiring review"
          icon={<Clock className="text-flow-purple" size={24} />}
        />
        <StatCard 
          title="Employees"
          value="7"
          description="Workers actively today"
          icon={<Users className="text-green-500" size={24} />}
        />
        <StatCard 
          title="This week's total spending"
          value="$3,287.49"
          description="Pending approvals"
          icon={<DollarSign className="text-amber-500" size={24} />}
        />
        
        {/* Middle row */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <StatCard 
              title="New clients"
              value="54"
              trend={{ value: 18.7, isPositive: true }}
            />
            <StatCard 
              title="Invoices overdue"
              value="6"
              trend={{ value: 2.7, isPositive: false }}
              icon={<AlertCircle className="text-red-500" size={24} />}
            />
          </div>
          
          <div className="mt-6">
            <LineChart 
              data={revenueData}
              title="Revenue"
              subtitle="Last 7 days VS prior week"
              dataKey="value"
              comparison={{
                label: "Previous period",
                dataKey: "previous",
                color: "#D6BCFA"
              }}
            />
          </div>
        </div>
        
        <div className="col-span-2">
          <NotificationList 
            title="Recent emails"
            notifications={notifications}
            className="h-full"
          />
        </div>
        
        {/* Right sidebar */}
        <div className="col-span-1 col-start-4 row-span-2 row-start-1 flex flex-col gap-6">
          <StatusCard 
            title="Formation status"
            status="In progress"
            progressValue={60}
            description="Estimated processing 4-5 business days"
            onClick={() => setIsDialogOpen(true)}
          />
          
          <TaskList 
            title="Your to-Do list"
            tasks={tasks}
          />
        </div>
      </div>

      {/* Formation Status Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Formation Status</DialogTitle>
            <DialogDescription>
              Details about your company formation process
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Company</h4>
              <p className="text-sm text-gray-500">{formationDetails.company}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Status</h4>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <p className="text-sm">{formationDetails.status}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Filing Date</h4>
              <p className="text-sm text-gray-500">{formationDetails.filingDate}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Estimated Completion</h4>
              <p className="text-sm text-gray-500">{formationDetails.estimatedCompletion}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Documents Pending</h4>
              <ul className="list-disc pl-5 text-sm text-gray-500">
                {formationDetails.documentsPending.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Next Steps</h4>
              <p className="text-sm text-gray-500">{formationDetails.nextSteps}</p>
            </div>

            <div className="space-y-2 pt-2">
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
