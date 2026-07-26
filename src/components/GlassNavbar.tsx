"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCms } from "@/context/CmsContext";
import { X, Menu } from "lucide-react";

export function GlassNavbar() {
  const { darkMode, toggleDarkMode, setAdminOpen, setSelectedRoomForBooking, rooms } = useCms();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openQuickBooking = () => {
    setSelectedRoomForBooking(rooms[0]);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled
          ? "bg-[#0F172A]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full px-[20px]">
        <div className="flex items-center justify-between">
          {/* Logo & Altitude */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#4F9CF9] to-[#F97316] p-0.5 shadow-lg shadow-[#4F9CF9]/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#4F9CF9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                ANNAPURNA <span className="text-[#4F9CF9] font-normal">GUESTHOUSE</span>
              </span>
              <span className="text-[11px] text-[#4F9CF9] block font-mono tracking-widest uppercase">
                SANCTUARY • 4,130M • NEPAL
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/rooms"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              Luxury Rooms
            </Link>
            <Link
              href="/services"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/services"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              Services
            </Link>
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/gallery"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/experiences"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/experiences"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              Experiences
            </Link>
            <Link
              href="/trek"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/trek"
                  ? "bg-white/15 text-white font-bold"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              ABC Trek Guide
            </Link>
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-3">

            {/* Admin Dashboard CMS Button */}
            <Link
              href="/admin/dashboard"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#4F9CF9] bg-[#4F9CF9]/15 border border-[#4F9CF9]/30 hover:bg-[#4F9CF9]/25 transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Admin CMS</span>
            </Link>

            {/* Book Stay CTA */}
            <button
              onClick={openQuickBooking}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] shadow-lg shadow-[#F97316]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Book Stay</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/dashboard"
              className="px-2.5 py-1.5 text-xs font-bold text-[#4F9CF9] bg-[#4F9CF9]/15 rounded-lg"
            >
              CMS
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 bg-white/10 border border-white/15"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A]/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-8 space-y-4 shadow-2xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            Home Overview
          </Link>
          <Link
            href="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            Luxury Rooms Page
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            Photo & Video Gallery
          </Link>
          <Link
            href="/experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            Sanctuary Experiences
          </Link>
          <Link
            href="/trek"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            10-Day ABC Trek Guide
          </Link>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-slate-200 flex items-center gap-2"
            >
              {darkMode ? "Light Theme" : "Dark Theme"}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuickBooking();
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#F97316]"
            >
              Book Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
