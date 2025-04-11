
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Employees = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Button>
          <Users className="mr-2" size={16} /> Add Employee
        </Button>
      </div>
      
      <Card className="glass-card p-8 text-center">
        <div className="py-12 flex flex-col items-center">
          <Users size={48} className="text-flow-purple mb-4" />
          <h2 className="text-xl font-semibold mb-2">Employee Management System</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Manage employee records, time tracking, performance reviews, and payroll all in one integrated system.
          </p>
          <Button>View Employees</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Employees;
