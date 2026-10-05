import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          Free shipping on orders over $50 | Use code{" "}
          <strong className="text-amber-300">PEEDIKA20</strong> for 20% off
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition"
              >
                <Menu size={22} />
              </button>
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                  P
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Peedika<span className="text-emerald-600">.</span>
                </span>
              </a>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search for electronics, fashion, home essentials..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
              <a
                href="#"
                className="flex items-center gap-2 p-2 text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
              >
                <User size={20} />
                <span className="hidden xl:inline text-xs font-semibold">
                  Account
                </span>
              </a>
              <a
                href="#"
                className="relative p-2 text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-50 transition"
              >
                <Heart size={20} />
                <span className="absolute top-1 right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
              >
                <ShoppingBag size={18} />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  2
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Category Nav Links */}
        <nav className="hidden lg:block border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 text-xs font-semibold text-slate-700 py-2.5">
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-700 transition"
            >
              Electronics <ChevronDown size={14} className="text-slate-400" />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-700 transition"
            >
              Fashion & Apparel{" "}
              <ChevronDown size={14} className="text-slate-400" />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-700 transition"
            >
              Home & Living <ChevronDown size={14} className="text-slate-400" />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 hover:text-emerald-700 transition"
            >
              Beauty & Wellness{" "}
              <ChevronDown size={14} className="text-slate-400" />
            </a>
            <a
              href="#"
              className="text-amber-600 font-bold flex items-center gap-1 hover:text-amber-700 transition"
            >
              <Sparkles size={14} /> Festive Deals & Offers
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
