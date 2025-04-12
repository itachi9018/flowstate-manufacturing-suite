
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Filter, 
  ArrowUpDown, 
  Check, 
  Clock, 
  Package, 
  Truck, 
  XCircle 
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock order data
const orders = [
  { id: "ORD-7829", customer: "Acme Corp", date: "2023-04-10", total: 2540.00, status: "completed" },
  { id: "ORD-7830", customer: "TechGiant Inc", date: "2023-04-10", total: 1250.50, status: "processing" },
  { id: "ORD-7831", customer: "Global Ventures", date: "2023-04-09", total: 3780.25, status: "shipped" },
  { id: "ORD-7832", customer: "Local Factory", date: "2023-04-08", total: 890.75, status: "processing" },
  { id: "ORD-7833", customer: "Excel Industries", date: "2023-04-07", total: 1678.40, status: "cancelled" },
  { id: "ORD-7834", customer: "Summit LLC", date: "2023-04-06", total: 4320.90, status: "completed" },
  { id: "ORD-7835", customer: "Pinnacle Systems", date: "2023-04-06", total: 2157.30, status: "shipped" },
];

// Status badge component
const OrderStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <Check className="mr-1" size={12} />;
      case "processing":
        return <Clock className="mr-1" size={12} />;
      case "shipped":
        return <Truck className="mr-1" size={12} />;
      case "cancelled":
        return <XCircle className="mr-1" size={12} />;
      default:
        return null;
    }
  };

  return (
    <Badge variant="outline" className={`flex items-center ${getStatusStyles()}`}>
      {getStatusIcon()}
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [orderStatus, setOrderStatus] = useState("processing");
  const { toast } = useToast();
  
  // Filter orders based on search query
  const filteredOrders = orders.filter(
    order => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate order statistics
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === "completed").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const cancelledOrders = orders.filter(order => order.status === "cancelled").length;
  
  const handleAddOrder = () => {
    // Generate a new order ID (in a real app, this would be handled by the backend)
    const newOrderId = `ORD-${Math.floor(7836 + Math.random() * 100)}`;
    
    // Create new order object
    const newOrder = {
      id: newOrderId,
      customer: customerName,
      date: new Date().toISOString().split('T')[0], // Today's date
      total: parseFloat(orderTotal),
      status: orderStatus
    };
    
    // In a real app, this would be an API call
    // For now, we'll just log it
    console.log("New order created:", newOrder);
    
    // Reset form fields
    setCustomerName("");
    setOrderTotal("");
    setOrderStatus("processing");
    
    // Close dialog
    setNewOrderOpen(false);
    
    // Show success toast
    toast({
      title: "Order Created",
      description: `New order ${newOrderId} has been created successfully.`,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Processing</h1>
        <Dialog open={newOrderOpen} onOpenChange={setNewOrderOpen}>
          <DialogTrigger asChild>
            <Button>
              <ShoppingCart className="mr-2" size={16} /> New Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Enter the details for the new customer order.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input
                  id="customer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total" className="text-right">
                  Total ($)
                </Label>
                <Input
                  id="total"
                  type="number"
                  value={orderTotal}
                  onChange={(e) => setOrderTotal(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={orderStatus}
                  onValueChange={setOrderStatus}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewOrderOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOrder}>Create Order</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={<ShoppingCart className="text-blue-500" size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Completed" 
          value={completedOrders}
          icon={<Check className="text-green-500" size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Processing" 
          value={processingOrders}
          icon={<Package className="text-amber-500" size={24} />}
        />
        <StatCard 
          title="Cancelled" 
          value={cancelledOrders}
          icon={<XCircle className="text-red-500" size={24} />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Orders Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage and process customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium flex items-center">
                    Order ID
                    <ArrowUpDown size={14} className="ml-1" />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50/10">
                    <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.customer}</td>
                    <td className="px-4 py-3 text-sm">{order.date}</td>
                    <td className="px-4 py-3 text-sm">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Orders;
