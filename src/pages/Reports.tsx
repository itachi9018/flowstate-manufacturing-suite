
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reporting & Analytics</h1>
        <Button>
          <BarChart3 className="mr-2" size={16} /> Generate Report
        </Button>
      </div>
      
      <Card className="glass-card p-8 text-center">
        <div className="py-12 flex flex-col items-center">
          <BarChart3 size={48} className="text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Advanced Analytics Dashboard</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Access real-time data visualizations, custom reports, and actionable insights to drive better business decisions.
          </p>
          <Button>View Reports</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Reports;
