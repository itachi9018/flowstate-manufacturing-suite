
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/LineChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FactoryIcon, Gauge, AlertCircle, Clock, Activity, PlayCircle, StopCircle, CheckCircle } from "lucide-react";

const Production = () => {
  // Sample data for production efficiency chart
  const efficiencyData = [
    { name: "Mar 1", efficiency: 78, target: 80 },
    { name: "Mar 2", efficiency: 82, target: 80 },
    { name: "Mar 3", efficiency: 86, target: 80 },
    { name: "Mar 4", efficiency: 75, target: 80 },
    { name: "Mar 5", efficiency: 80, target: 80 },
    { name: "Mar 6", efficiency: 84, target: 80 },
    { name: "Mar 7", efficiency: 87, target: 80 },
  ];
  
  // Sample data for production lines
  const productionLines = [
    { id: "PL001", name: "Assembly Line A", status: "Running", efficiency: 87, product: "Main Controller Units", target: 120, produced: 105 },
    { id: "PL002", name: "Assembly Line B", status: "Running", efficiency: 92, product: "Power Supply Units", target: 150, produced: 138 },
    { id: "PL003", name: "Machining Cell 1", status: "Maintenance", efficiency: 0, product: "Hydraulic Components", target: 85, produced: 0 },
    { id: "PL004", name: "Machining Cell 2", status: "Running", efficiency: 78, product: "Gear Assemblies", target: 90, produced: 70 },
    { id: "PL005", name: "Painting Line", status: "Idle", efficiency: 0, product: "Housing Components", target: 110, produced: 0 },
  ];
  
  // Machine status data
  const machineStatus = [
    { id: "M001", name: "CNC Machine #1", status: "Running", uptime: "18h 45m", efficiency: 92, nextMaintenance: "Mar 15" },
    { id: "M002", name: "CNC Machine #2", status: "Running", uptime: "12h 20m", efficiency: 88, nextMaintenance: "Mar 18" },
    { id: "M003", name: "Injection Mold #3", status: "Maintenance", uptime: "0h 0m", efficiency: 0, nextMaintenance: "In Progress" },
    { id: "M004", name: "Assembly Robot A", status: "Running", uptime: "22h 10m", efficiency: 95, nextMaintenance: "Mar 22" },
    { id: "M005", name: "Assembly Robot B", status: "Warning", uptime: "8h 15m", efficiency: 72, nextMaintenance: "Mar 14" },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Production Tracking</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Production Efficiency"
          value="83%"
          trend={{ value: 5, isPositive: true }}
          icon={<Gauge className="text-flow-blue" size={24} />}
        />
        <StatCard 
          title="Active Production Lines"
          value="4/6"
          icon={<FactoryIcon className="text-green-500" size={24} />}
        />
        <StatCard 
          title="Machines in Maintenance"
          value="2"
          icon={<AlertCircle className="text-amber-500" size={24} />}
        />
        <StatCard 
          title="Average Machine Uptime"
          value="16.4h"
          icon={<Clock className="text-flow-purple" size={24} />}
        />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-6">
        <Card className="glass-card p-6 col-span-8">
          <h3 className="font-semibold mb-4">Production Lines</h3>
          <div className="space-y-6">
            {productionLines.map((line) => (
              <div key={line.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{line.name}</p>
                    <p className="text-sm text-gray-500">{line.product}</p>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    line.status === "Running" 
                      ? "bg-green-100 text-green-800" 
                      : line.status === "Maintenance"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {line.status === "Running" && <PlayCircle size={14} className="mr-1" />}
                    {line.status === "Maintenance" && <AlertCircle size={14} className="mr-1" />}
                    {line.status === "Idle" && <StopCircle size={14} className="mr-1" />}
                    {line.status}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {line.produced}/{line.target} units</span>
                    <span className={line.status === "Running" ? "text-green-600" : "text-gray-500"}>
                      {Math.round(line.produced / line.target * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={line.produced / line.target * 100} 
                    className={`h-2 ${line.status !== "Running" ? "bg-gray-200" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="glass-card p-6 col-span-4">
          <LineChart 
            data={efficiencyData}
            title="Production Efficiency"
            subtitle="Last 7 days vs target"
            dataKey="efficiency"
            color="#33C3F0"
            comparison={{
              label: "Target",
              dataKey: "target",
              color: "#D6BCFA"
            }}
          />
        </Card>
      </div>
      
      <Card className="glass-card">
        <Tabs defaultValue="machine-status">
          <div className="border-b px-6 pt-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="machine-status">Machine Status</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
              <TabsTrigger value="alerts">Alerts & Warnings</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="machine-status" className="p-6 m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Machine Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Uptime</TableHead>
                  <TableHead>Efficiency</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineStatus.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell className="font-mono text-xs">{machine.id}</TableCell>
                    <TableCell className="font-medium">{machine.name}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        machine.status === "Running" 
                          ? "bg-green-100 text-green-800" 
                          : machine.status === "Maintenance"
                            ? "bg-amber-100 text-amber-800"
                            : machine.status === "Warning"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}>
                        {machine.status === "Running" && <PlayCircle size={12} className="mr-1" />}
                        {machine.status === "Maintenance" && <AlertCircle size={12} className="mr-1" />}
                        {machine.status === "Warning" && <AlertCircle size={12} className="mr-1" />}
                        {machine.status === "Idle" && <StopCircle size={12} className="mr-1" />}
                        {machine.status}
                      </div>
                    </TableCell>
                    <TableCell>{machine.uptime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={machine.efficiency} 
                          className="w-20 h-2" 
                        />
                        <span className="text-sm">{machine.efficiency}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{machine.nextMaintenance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="maintenance" className="p-6 m-0">
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-gray-500">Maintenance schedule information</p>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="p-6 m-0">
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-gray-500">System alerts and warnings</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default Production;
