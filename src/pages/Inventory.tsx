
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/StatCard";
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpDown, 
  MoreHorizontal, 
  RefreshCw, 
  Package2, 
  Truck,
  Save,
  X,
  Check,
  ChevronDown
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const Inventory = () => {
  // State for dialog and form
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Raw Materials",
    quantity: 0,
    value: ""
  });
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    minQuantity: "",
    maxQuantity: ""
  });
  
  // Active tab
  const [activeTab, setActiveTab] = useState("all");
  
  const { toast } = useToast();

  // Sample inventory data
  const [inventoryItems, setInventoryItems] = useState([
    { id: "INV001", name: "Steel Pipes", category: "Raw Materials", quantity: 1250, status: "In Stock", value: "$12,500" },
    { id: "INV002", name: "Aluminum Sheets", category: "Raw Materials", quantity: 320, status: "Low Stock", value: "$6,400" },
    { id: "INV003", name: "Hydraulic Pumps", category: "Components", quantity: 75, status: "In Stock", value: "$22,500" },
    { id: "INV004", name: "Electric Motors", category: "Components", quantity: 42, status: "In Stock", value: "$8,400" },
    { id: "INV005", name: "Bearings", category: "Components", quantity: 620, status: "In Stock", value: "$3,100" },
    { id: "INV006", name: "Control Panels", category: "Finished Goods", quantity: 35, status: "In Stock", value: "$17,500" },
    { id: "INV007", name: "Power Supply Units", category: "Components", quantity: 15, status: "Low Stock", value: "$4,500" },
    { id: "INV008", name: "Assembly Kits", category: "Finished Goods", quantity: 28, status: "In Stock", value: "$14,000" },
  ]);
  
  // Filtered inventory based on search term and filters
  const [filteredInventory, setFilteredInventory] = useState(inventoryItems);

  // Apply filters and search whenever relevant state changes
  useEffect(() => {
    let filtered = [...inventoryItems];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter based on tabs
    if (activeTab !== "all") {
      const categoryMap = {
        "raw": "Raw Materials",
        "components": "Components",
        "finished": "Finished Goods"
      };
      filtered = filtered.filter(item => item.category === categoryMap[activeTab as keyof typeof categoryMap]);
    }
    
    // Apply additional filters
    if (filters.category !== "all") {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    
    if (filters.status !== "all") {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    
    if (filters.minQuantity) {
      filtered = filtered.filter(item => item.quantity >= Number(filters.minQuantity));
    }
    
    if (filters.maxQuantity) {
      filtered = filtered.filter(item => item.quantity <= Number(filters.maxQuantity));
    }
    
    setFilteredInventory(filtered);
  }, [inventoryItems, searchTerm, filters, activeTab]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    });
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setNewItem({
      ...newItem,
      category: value
    });
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle filter select changes
  const handleFilterSelectChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      minQuantity: "",
      maxQuantity: ""
    });
    setIsFilterDialogOpen(false);
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
      duration: 3000,
    });
  };

  // Add new inventory item
  const handleAddItem = () => {
    // Generate a new ID
    const newId = `INV${String(inventoryItems.length + 1).padStart(3, '0')}`;
    
    // Create the new item
    const itemToAdd = {
      id: newId,
      name: newItem.name,
      category: newItem.category,
      quantity: newItem.quantity,
      status: newItem.quantity < 50 ? "Low Stock" : "In Stock",
      value: newItem.value.startsWith('$') ? newItem.value : `$${newItem.value}`
    };
    
    // Update inventory
    setInventoryItems([...inventoryItems, itemToAdd]);
    
    // Reset form and close dialog
    setNewItem({ name: "", category: "Raw Materials", quantity: 0, value: "" });
    setIsAddDialogOpen(false);
    
    // Show success notification
    toast({
      title: "Item Added",
      description: `${itemToAdd.name} has been added to inventory.`,
      duration: 3000,
    });
  };
  
  // Export inventory to CSV
  const exportToCSV = () => {
    // Create a CSV string from the filtered inventory data
    const headers = ["ID", "Item Name", "Category", "Quantity", "Status", "Value"];
    const csvContent = [
      headers.join(","),
      ...filteredInventory.map(item => 
        [
          item.id, 
          `"${item.name}"`, 
          `"${item.category}"`, 
          item.quantity, 
          `"${item.status}"`, 
          item.value
        ].join(",")
      )
    ].join("\n");
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_export.csv");
    document.body.appendChild(link);
    
    // Trigger download and cleanup
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Inventory data has been exported to CSV.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
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
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
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
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-10 w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsFilterDialogOpen(true)}
              >
                <Filter size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={exportToCSV}
              >
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
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>View Details</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Edit Item</DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem className="text-red-600">Delete Item</DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No inventory items found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="raw" className="m-0">
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
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No raw materials found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="components" className="m-0">
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
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No components found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="finished" className="m-0">
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
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No finished goods found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Enter the details of the new inventory item below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Item Name
              </Label>
              <Input
                id="item-name"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter item name"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-category" className="text-right">
                Category
              </Label>
              <Select 
                value={newItem.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="col-span-3" id="item-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Components">Components</SelectItem>
                  <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="item-quantity"
                name="quantity"
                type="number"
                value={newItem.quantity}
                onChange={handleInputChange}
                className="col-span-3"
                min={0}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-value" className="text-right">
                Value
              </Label>
              <Input
                id="item-value"
                name="value"
                value={newItem.value}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="$0.00"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                <X size={16} className="mr-2" /> Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleAddItem}>
              <Save size={16} className="mr-2" /> Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Inventory</DialogTitle>
            <DialogDescription>
              Set filters to narrow down your inventory view.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-category" className="text-right">
                Category
              </Label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => handleFilterSelectChange("category", value)}
              >
                <SelectTrigger className="col-span-3" id="filter-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Components">Components</SelectItem>
                  <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filter-status" className="text-right">
                Status
              </Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => handleFilterSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3" id="filter-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="min-quantity" className="text-right">
                Min Quantity
              </Label>
              <Input
                id="min-quantity"
                name="minQuantity"
                type="number"
                value={filters.minQuantity}
                onChange={handleFilterChange}
                className="col-span-3"
                min={0}
                placeholder="Minimum quantity"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="max-quantity" className="text-right">
                Max Quantity
              </Label>
              <Input
                id="max-quantity"
                name="maxQuantity"
                type="number"
                value={filters.maxQuantity}
                onChange={handleFilterChange}
                className="col-span-3"
                min={0}
                placeholder="Maximum quantity"
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" type="button" onClick={resetFilters}>
              <X size={16} className="mr-2" /> Reset Filters
            </Button>
            
            <DialogClose asChild>
              <Button onClick={() => setIsFilterDialogOpen(false)}>
                <Check size={16} className="mr-2" /> Apply Filters
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Inventory;
