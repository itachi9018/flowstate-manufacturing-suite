
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Production from "./pages/Production";
import Orders from "./pages/Orders";
import Employees from "./pages/Employees";
import Finance from "./pages/Finance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const App = () => {
  // Create a new QueryClient instance for each app render
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/flowstate-manufacturing-suite/" element={<Dashboard />} />
            <Route path="/flowstate-manufacturing-suite/inventory" element={<Inventory />} />
            <Route path="/flowstate-manufacturing-suite/production" element={<Production />} />
            <Route path="/flowstate-manufacturing-suite/orders" element={<Orders />} />
            <Route path="/flowstate-manufacturing-suite/employees" element={<Employees />} />
            <Route path="/flowstate-manufacturing-suite/finance" element={<Finance />} />
            <Route path="/flowstate-manufacturing-suite/reports" element={<Reports />} />
            <Route path="/flowstate-manufacturing-suite/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
