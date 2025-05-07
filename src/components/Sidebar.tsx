
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  FactoryIcon
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-flow-dark flex flex-col border-r border-r-sidebar-border transition-all duration-300 z-30",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <span className="text-xl font-bold text-white">FlowState</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 bg-sidebar-accent rounded-md text-white hover:bg-opacity-80 transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 pt-4">
          <NavItem
            to="/flowstate-manufacturing-suite/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/inventory"
            icon={<Box size={20} />}
            label="Inventory"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/production"
            icon={<FactoryIcon size={20} />}
            label="Production"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/orders"
            icon={<ShoppingCart size={20} />}
            label="Orders"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/employees"
            icon={<Users size={20} />}
            label="Employees"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/finance"
            icon={<CreditCard size={20} />}
            label="Finance"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/reports"
            icon={<BarChart3 size={20} />}
            label="Reports"
            collapsed={collapsed}
          />
          <NavItem
            to="/flowstate-manufacturing-suite/settings"
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed}
          />
        </nav>

        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-flow-blue flex items-center justify-center text-white font-semibold">
              JS
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium text-white">James Smith</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function NavItem({ to, icon, label, collapsed }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-white hover:bg-sidebar-accent transition-colors",
        to === window.location.pathname && "bg-sidebar-accent"
      )}
    >
      <div>{icon}</div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
