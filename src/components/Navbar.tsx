"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Globe, Sparkles, Database, ShieldCheck, ArrowRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Resume Analyzer", href: "/analyze", icon: Sparkles },
    { name: "Global Jobs (US/CA/UK)", href: "/jobs", icon: Globe, badge: "USA • CA • UK" },
    { name: "Resume Builder", href: "/builder", icon: FileText },
    { name: "Database & Backend", href: "/database", icon: Database },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                ResumePulse
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5">Global ATS Analyzer & Jobs</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/analyze"
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Scan Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
