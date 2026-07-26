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
      className={`fixed top-4 inset-x-0 z-50 transition-all duration-300 w-[95%] sm:w-[92%] lg:w-[90%] max-w-7xl mx-auto rounded-2xl border ${
        scrolled
          ? "bg-[#395371]/95 backdrop-blur-2xl border-white/20 shadow-2xl shadow-black/40 py-2.5 px-4 sm:px-6"
          : "bg-[#395371]/90 backdrop-blur-xl border-white/15 shadow-xl py-3 px-4 sm:px-6"
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Logo & Altitude */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#4F9CF9] to-[#F97316] p-0.5 shadow-lg shadow-[#4F9CF9]/25 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F9CF9]"
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
            <div className="min-w-0">
              <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-white flex items-center gap-1.5 truncate">
                ANNAPURNA <span className="text-[#4F9CF9] font-normal hidden xs:inline">GUESTHOUSE</span>
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#4F9CF9] block font-mono tracking-widest uppercase truncate">
                SANCTUARY • 4,130M
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
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === "/contact"
                  ? "bg-[#4F9CF9] text-white font-bold"
                  : "text-[#4F9CF9] font-bold hover:text-white hover:bg-[#4F9CF9]/20"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center gap-3">
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
        <div className="lg:hidden mt-3 bg-[#395371]/95 backdrop-blur-2xl border border-white/15 rounded-2xl px-5 sm:px-6 pt-4 pb-6 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
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
            Luxury Rooms
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-white text-base font-semibold"
          >
            Services & Perks
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
