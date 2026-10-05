import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  X,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Categories", path: "/admin/categories", icon: FolderTree },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </span>
        <button
          onClick={onClose}
          className="p-1 text-slate-500 hover:text-slate-800 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
