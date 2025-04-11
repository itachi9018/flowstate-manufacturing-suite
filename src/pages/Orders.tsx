
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Orders = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Processing</h1>
        <Button>
          <ShoppingCart className="mr-2" size={16} /> New Order
        </Button>
      </div>
      
      <Card className="glass-card p-8 text-center">
        <div className="py-12 flex flex-col items-center">
          <ShoppingCart size={48} className="text-flow-blue mb-4" />
          <h2 className="text-xl font-semibold mb-2">Order Processing System</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Manage customer orders, track order status, and streamline your order fulfillment process with our comprehensive order management system.
          </p>
          <Button>View Orders</Button>
        </div>
      </Card>
    </Layout>
  );
};

export default Orders;
