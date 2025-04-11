
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/StatCard";
import { Package, Search, Filter, Download, Plus, ArrowUpDown, MoreHorizontal, RefreshCw, Package2, Truck } from "lucide-react";

const Inventory = () => {
  // Sample inventory data
  const inventoryItems = [
    { id: "INV001", name: "Steel Pipes", category: "Raw Materials", quantity: 1250, status: "In Stock", value: "$12,500" },
    { id: "INV002", name: "Aluminum Sheets", category: "Raw Materials", quantity: 320, status: "Low Stock", value: "$6,400" },
    { id: "INV003", name: "Hydraulic Pumps", category: "Components", quantity: 75, status: "In Stock", value: "$22,500" },
    { id: "INV004", name: "Electric Motors", category: "Components", quantity: 42, status: "In Stock", value: "$8,400" },
    { id: "INV005", name: "Bearings", category: "Components", quantity: 620, status: "In Stock", value: "$3,100" },
    { id: "INV006", name: "Control Panels", category: "Finished Goods", quantity: 35, status: "In Stock", value: "$17,500" },
    { id: "INV007", name: "Power Supply Units", category: "Components", quantity: 15, status: "Low Stock", value: "$4,500" },
    { id: "INV008", name: "Assembly Kits", category: "Finished Goods", quantity: 28, status: "In Stock", value: "$14,000" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Items"
          value="2,385"
          icon={<Package size={24} className="text-flow-blue" />}
        />
        <StatCard 
          title="Low Stock Items"
          value="42"
          trend={{ value: 8, isPositive: false }}
          icon={<Package2 size={24} className="text-amber-500" />}
        />
        <StatCard 
          title="Expected Deliveries"
          value="12"
          trend={{ value: 3, isPositive: true }}
          icon={<Truck size={24} className="text-green-500" />}
        />
      </div>

      <Card className="glass-card p-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="raw">Raw Materials</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="finished">Finished Goods</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search inventory..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Download size={16} />
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Item Name <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Low Stock" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {item.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="raw" className="m-0">
            <div className="h-[200px] flex items-center justify-center border-t">
              <p className="text-gray-500">Raw Materials inventory view</p>
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="m-0">
            <div className="h-[200px] flex items-center justify-center border-t">
              <p className="text-gray-500">Components inventory view</p>
            </div>
          </TabsContent>
          
          <TabsContent value="finished" className="m-0">
            <div className="h-[200px] flex items-center justify-center border-t">
              <p className="text-gray-500">Finished Goods inventory view</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default Inventory;
