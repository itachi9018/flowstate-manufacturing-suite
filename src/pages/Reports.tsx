
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Download, 
  Share2, 
  Calendar, 
  Filter,
  PieChart,
  LineChart,
  ArrowDownCircle,
  RefreshCw,
  Printer,
  Clock,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("production");
  const [timeframe, setTimeframe] = useState("month");

  const handleGenerateReport = () => {
    // This would normally handle report generation
    console.log("Generating report for:", activeTab, "with timeframe:", timeframe);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reporting & Analytics</h1>
        <Button onClick={handleGenerateReport}>
          <BarChart3 className="mr-2" size={16} /> Generate Report
        </Button>
      </div>
      
      {/* Report Controls */}
      <Card className="mb-6 glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Report Type</p>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="production">Production</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                    <TabsTrigger value="employee">Employee</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Timeframe</p>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Daily</SelectItem>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar size={16} className="mr-2" /> Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" /> Filters
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <div className="grid grid-cols-1 gap-6">
        {/* Production Reports */}
        <TabsContent value="production" className="mt-0" hidden={activeTab !== "production"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Production Efficiency</CardTitle>
                    <CardDescription>Monthly production output vs capacity</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Download size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex flex-col justify-center items-center">
                  <BarChart3 size={48} className="text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold">Efficiency Chart</h3>
                  <p className="text-gray-500 mb-4 max-w-md text-center">
                    This area would display a bar chart comparing production output against capacity.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Production by Department</CardTitle>
                    <CardDescription>Output distribution across departments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Download size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw size={18} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex flex-col justify-center items-center">
                  <PieChart size={48} className="text-flow-blue mb-4" />
                  <h3 className="text-xl font-semibold">Department Distribution</h3>
                  <p className="text-gray-500 mb-4 max-w-md text-center">
                    This area would display a pie chart showing the distribution of production across departments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Production Metrics Over Time</CardTitle>
                  <CardDescription>Key performance indicators tracked over time</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Printer size={16} className="mr-2" /> Print Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex flex-col justify-center items-center">
                <LineChart size={48} className="text-green-500 mb-4" />
                <h3 className="text-xl font-semibold">Production Trends</h3>
                <p className="text-gray-500 mb-4 max-w-md text-center">
                  This area would display a line chart showing production metrics over time.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Reports */}
        <Card className="glass-card mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Saved Reports</CardTitle>
              <Button variant="ghost" size="sm">
                <RefreshCw size={16} className="mr-2" /> Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Q1 2023 Production Summary", date: "2023-04-01", type: "Production" },
                { name: "Monthly Inventory Status - March 2023", date: "2023-04-05", type: "Inventory" },
                { name: "Q1 2023 Financial Report", date: "2023-04-10", type: "Financial" },
                { name: "Employee Performance Q1 2023", date: "2023-04-12", type: "Employee" }
              ].map((report, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50/10 rounded-md hover:bg-gray-100/10">
                  <div className="flex items-center">
                    <FileText size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-gray-100/20 text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" /> {report.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowDownCircle size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
