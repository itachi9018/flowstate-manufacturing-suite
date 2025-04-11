
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Calendar,
  ChevronDown,
  CircleDollarSign,
  Wallet
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock financial data
const transactions = [
  { 
    id: "TRX-7829", 
    description: "Raw Materials Purchase", 
    date: "2023-04-10", 
    amount: -12540.00, 
    category: "Inventory",
    account: "Operations Account"
  },
  { 
    id: "TRX-7830", 
    description: "Customer Payment - Invoice #INV-2022", 
    date: "2023-04-09", 
    amount: 8750.50, 
    category: "Sales",
    account: "Sales Account"
  },
  { 
    id: "TRX-7831", 
    description: "Equipment Maintenance", 
    date: "2023-04-08", 
    amount: -1280.25, 
    category: "Maintenance",
    account: "Operations Account"
  },
  { 
    id: "TRX-7832", 
    description: "Customer Payment - Invoice #INV-2023", 
    date: "2023-04-07", 
    amount: 5690.75, 
    category: "Sales",
    account: "Sales Account"
  },
  { 
    id: "TRX-7833", 
    description: "Employee Payroll", 
    date: "2023-04-06", 
    amount: -8478.40, 
    category: "Payroll",
    account: "Payroll Account"
  },
  { 
    id: "TRX-7834", 
    description: "Utility Bills", 
    date: "2023-04-05", 
    amount: -1320.90, 
    category: "Utilities",
    account: "Operations Account"
  },
];

// Budget data
const budgetItems = [
  { category: "Raw Materials", allocated: 50000, spent: 32500, remaining: 17500 },
  { category: "Equipment", allocated: 25000, spent: 10800, remaining: 14200 },
  { category: "Utilities", allocated: 8000, spent: 5600, remaining: 2400 },
  { category: "Payroll", allocated: 120000, spent: 90000, remaining: 30000 },
  { category: "Marketing", allocated: 15000, spent: 7500, remaining: 7500 },
];

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate financial statistics
  const totalRevenue = transactions
    .filter(trx => trx.amount > 0)
    .reduce((sum, trx) => sum + trx.amount, 0);
  
  const totalExpenses = transactions
    .filter(trx => trx.amount < 0)
    .reduce((sum, trx) => sum + Math.abs(trx.amount), 0);

  const netCashFlow = totalRevenue - totalExpenses;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <Button>
          <CreditCard className="mr-2" size={16} /> New Transaction
        </Button>
      </div>
      
      {/* Financial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={<TrendingUp className="text-green-500" size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Total Expenses" 
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<TrendingDown className="text-red-500" size={24} />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard 
          title="Net Cash Flow" 
          value={`$${netCashFlow.toLocaleString()}`}
          icon={<DollarSign className={netCashFlow >= 0 ? "text-green-500" : "text-red-500"} size={24} />}
          trend={{ value: 3, isPositive: netCashFlow >= 0 }}
        />
        <StatCard 
          title="Outstanding Invoices" 
          value="$24,580"
          icon={<FileText className="text-amber-500" size={24} />}
          description="4 invoices pending"
        />
      </div>

      {/* Finance Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cash Flow Card */}
            <Card className="glass-card col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>Monthly revenue vs expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex flex-col justify-center items-center">
                  <Wallet size={48} className="text-flow-blue mb-4" />
                  <h3 className="text-xl font-semibold">Cash Flow Chart</h3>
                  <p className="text-gray-500 mb-4 max-w-md text-center">
                    This area would display a time-series chart showing revenue and expenses over time.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>April 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <p className="text-2xl font-semibold">$45,280</p>
                    </div>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight size={20} />
                      <span className="text-sm font-medium">12%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Expenses</p>
                      <p className="text-2xl font-semibold">$23,620</p>
                    </div>
                    <div className="flex items-center text-red-500">
                      <ArrowDownRight size={20} />
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Profit</p>
                      <p className="text-2xl font-semibold">$21,660</p>
                    </div>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight size={20} />
                      <span className="text-sm font-medium">18%</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Calendar size={16} className="mr-2" /> View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>View and manage financial transactions</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <FileText size={16} className="mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Transaction ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Account</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50/10">
                        <td className="px-4 py-3 text-sm font-medium">{transaction.id}</td>
                        <td className="px-4 py-3 text-sm">{transaction.description}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="bg-gray-100/20">
                            {transaction.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{transaction.account}</td>
                        <td className="px-4 py-3 text-sm">{transaction.date}</td>
                        <td className={`px-4 py-3 text-sm text-right font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="text-sm h-8 gap-1">
                    <span>10</span>
                    <span>per page</span> 
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budgets Tab */}
        <TabsContent value="budgets">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Budget Tracking</CardTitle>
                  <CardDescription>Monitor department budgets and expenditures</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <CircleDollarSign size={16} className="mr-2" /> Adjust Budget
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetItems.map((item, index) => {
                  const spentPercentage = (item.spent / item.allocated) * 100;
                  const isOverBudget = spentPercentage > 80;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{item.category}</h3>
                        <div className="text-sm text-gray-500">
                          ${item.spent.toLocaleString()} / ${item.allocated.toLocaleString()}
                        </div>
                      </div>
                      <Progress 
                        value={spentPercentage} 
                        className={`h-2 ${isOverBudget ? 'bg-red-200' : 'bg-gray-200'}`}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>${item.remaining.toLocaleString()} remaining</span>
                        <span className={isOverBudget ? 'text-red-500 font-medium' : ''}>
                          {spentPercentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Finance;
