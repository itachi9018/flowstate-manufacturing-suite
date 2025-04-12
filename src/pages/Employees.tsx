
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail,
  Phone,
  Building,
  Clock,
  Briefcase,
  Calendar
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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

// Mock employee data
const employees = [
  { 
    id: "EMP-001", 
    name: "Alex Johnson", 
    position: "Production Manager", 
    department: "Operations", 
    joinDate: "2020-05-15", 
    status: "active",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "AJ"
  },
  { 
    id: "EMP-002", 
    name: "Sarah Williams", 
    position: "Quality Control Specialist", 
    department: "Quality Assurance", 
    joinDate: "2021-02-10", 
    status: "active",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "SW"
  },
  { 
    id: "EMP-003", 
    name: "Michael Brown", 
    position: "Machine Operator", 
    department: "Production", 
    joinDate: "2019-11-22", 
    status: "on-leave",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "MB"
  },
  { 
    id: "EMP-004", 
    name: "Emily Davis", 
    position: "Supply Chain Analyst", 
    department: "Logistics", 
    joinDate: "2022-01-05", 
    status: "active",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "ED"
  },
  { 
    id: "EMP-005", 
    name: "David Miller", 
    position: "Maintenance Technician", 
    department: "Maintenance", 
    joinDate: "2019-08-15", 
    status: "inactive",
    email: "david.miller@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "DM"
  },
];

// Status badge component
const EmployeeStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "on-leave":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusStyles()}`}>
      <span className="relative flex h-2 w-2 mr-1">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'active' ? 'bg-green-400' : status === 'on-leave' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'active' ? 'bg-green-500' : status === 'on-leave' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
      </span>
      <span className="capitalize">{status.replace('-', ' ')}</span>
    </Badge>
  );
};

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newEmployeeOpen, setNewEmployeeOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("Operations");
  const [employeeStatus, setEmployeeStatus] = useState("active");
  const { toast } = useToast();
  
  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    employee => 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate employee statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === "active").length;
  const onLeaveEmployees = employees.filter(emp => emp.status === "on-leave").length;
  const inactiveEmployees = employees.filter(emp => emp.status === "inactive").length;
  
  const handleAddEmployee = () => {
    // Generate a new employee ID (in a real app, this would be handled by the backend)
    const newEmployeeId = `EMP-${Math.floor(100 + Math.random() * 900)}`;
    
    // Get initials from name for avatar
    const initials = employeeName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    // Create new employee object
    const newEmployee = {
      id: newEmployeeId,
      name: employeeName,
      position: employeePosition,
      department: employeeDepartment,
      joinDate: new Date().toISOString().split('T')[0], // Today's date
      status: employeeStatus,
      email: employeeEmail,
      phone: "+1 (555) 000-0000", // Default phone number
      avatar: initials
    };
    
    // In a real app, this would be an API call
    // For now, we'll just log it
    console.log("New employee created:", newEmployee);
    
    // Reset form fields
    setEmployeeName("");
    setEmployeeEmail("");
    setEmployeePosition("");
    setEmployeeDepartment("Operations");
    setEmployeeStatus("active");
    
    // Close dialog
    setNewEmployeeOpen(false);
    
    // Show success toast
    toast({
      title: "Employee Added",
      description: `${employeeName} has been added successfully.`,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Dialog open={newEmployeeOpen} onOpenChange={setNewEmployeeOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2" size={16} /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the details for the new employee.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Input
                  id="position"
                  value={employeePosition}
                  onChange={(e) => setEmployeePosition(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select
                  value={employeeDepartment}
                  onValueChange={setEmployeeDepartment}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={employeeStatus}
                  onValueChange={setEmployeeStatus}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewEmployeeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Employee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Employees" 
          value={totalEmployees} 
          icon={<Users className="text-flow-purple" size={24} />}
        />
        <StatCard 
          title="Active" 
          value={activeEmployees}
          icon={<Briefcase className="text-green-500" size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="On Leave" 
          value={onLeaveEmployees}
          icon={<Calendar className="text-amber-500" size={24} />}
        />
        <StatCard 
          title="Inactive" 
          value={inactiveEmployees}
          icon={<Clock className="text-red-500" size={24} />}
        />
      </div>

      {/* Employees Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>Manage employee information, attendance, and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
              <Button variant="outline" size="sm">
                Department ▼
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Employee</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Position</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Join Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50/10">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3 bg-flow-purple text-white">
                          <span>{employee.avatar}</span>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{employee.name}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{employee.position}</td>
                    <td className="px-4 py-3 text-sm">{employee.department}</td>
                    <td className="px-4 py-3 text-sm">{employee.joinDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <EmployeeStatusBadge status={employee.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Employee Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center">
                            <Mail className="mr-2" size={14} /> Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Phone className="mr-2" size={14} /> Call
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Building className="mr-2" size={14} /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center text-red-500">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing {filteredEmployees.length} of {employees.length} employees</p>
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

export default Employees;
