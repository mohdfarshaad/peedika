import {
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-xl">
                P
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Peedika<span className="text-emerald-500">.</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your trusted destination for lifestyle products, fashion, and
              everyday artisanal essentials. High quality, sustainably sourced.
            </p>
            {/* <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition"
              >
                <Youtube size={16} />
              </a>
            </div> */}
          </div>

          <div className="lg:col-span-7 bg-slate-800/40 p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="text-emerald-400" size={18} /> Stay Updated
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Subscribe for exclusive discounts, new arrivals, and weekly
                curated picks.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex-1"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-1">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs pb-12 border-b border-slate-800">
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Electronics & Gadgets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Fashion Apparel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Home & Kitchen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Beauty & Care
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Help Center & FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  About Peedika
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              Legal & Privacy
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <p>
              © {new Date().getFullYear()} Peedika Store Inc. All rights
              reserved.
            </p>
            <div className="hidden sm:flex items-center gap-1 text-slate-400 border-l border-slate-800 pl-4">
              <Globe size={14} />
              <span>United States (USD $)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300">
              VISA
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300">
              PAYPAL
            </span>
            <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-300">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
