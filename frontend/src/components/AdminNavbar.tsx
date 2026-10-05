import { Search, Menu, Bell, User } from "lucide-react";

interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

export function AdminNavbar({ onToggleSidebar }: AdminNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={22} />
          </button>

          <a href="/admin" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Peedika<span className="text-emerald-600">.</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-2">
                Admin
              </span>
            </span>
          </a>
        </div>

        {/* Middle Section: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search products, orders, or customers..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Right Section: Admin Actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-sm">
              <User size={18} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800">Admin User</p>
              <p className="text-[10px] text-slate-500">admin@peedika.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
