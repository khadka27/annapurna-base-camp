"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ShieldCheck, ExternalLink, LogOut } from "lucide-react";

interface AdminNavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
}

export function AdminNavbar({ activeTab, setActiveTab }: AdminNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("admin_auth");
    await signOut({ callbackUrl: "/admin/login" });
  };

  const navItems = [
    { label: "Analytics Overview", href: "/admin/dashboard", id: "analytics" },
    { label: "Rooms CRUD", href: "/admin/rooms", id: "rooms" },
    { label: "Bookings Engine", href: "/admin/bookings", id: "bookings" },
    { label: "Services Manager", href: "/admin/services", id: "services" },
    { label: "Gallery Manager", href: "/admin/gallery", id: "gallery" },
    { label: "Discount Coupons", href: "/admin/coupons", id: "coupons" },
    { label: "Hero Settings", href: "/admin/hero", id: "hero" },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 transition-all duration-300 w-[95%] sm:w-[92%] lg:w-[90%] max-w-7xl mx-auto rounded-2xl border border-white/20 bg-[#0F172A]/90 backdrop-blur-2xl shadow-2xl py-3 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        {/* Left: Admin Shield Logo & Badge */}
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E293B] via-[#4F9CF9] to-[#16A34A] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#4F9CF9]" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
              ANNAPURNA <span className="text-[#4F9CF9] font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-[#4F9CF9]/20 border border-[#4F9CF9]/30">ADMIN PORTAL</span>
            </span>
            <span className="text-[10px] text-slate-400 block font-mono tracking-widest uppercase">
              EXECUTIVE CMS • 4,130M
            </span>
          </div>
        </Link>

        {/* Center: Admin Navigation Routes & Tabs */}
        <nav className="hidden xl:flex items-center space-x-1 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = setActiveTab
              ? activeTab === item.id
              : pathname === item.href;

            if (setActiveTab) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-[#4F9CF9] text-[#0F172A] shadow-md shadow-[#4F9CF9]/30"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  isActive
                    ? "bg-[#4F9CF9] text-[#0F172A] shadow-md shadow-[#4F9CF9]/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* View Live Public Site */}
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#4F9CF9]" />
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-300 bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
