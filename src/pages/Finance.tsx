
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Finance = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <Button>
          <CreditCard className="mr-2" size={16} /> New Transaction
        </Button>
      </div>
      
      <Card className="glass-card p-8 text-center">
        <div className="py-12 flex flex-col items-center">
          <CreditCard size={48} className="text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Financial Management System</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Track expenses, manage invoicing, create budgets, and gain financial insights with our integrated financial management tools.
          </p>
          <Button>View Finances</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Finance;
