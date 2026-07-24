"use client";

import React, { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Elevation Badge */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F172A] via-[#4F9CF9] to-[#F97316] flex items-center justify-center p-0.5 shadow-md shadow-[#4F9CF9]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
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
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                ANNAPURNA <span className="text-[#4F9CF9] font-normal">ABC</span>
              </span>
              <span className="text-xs text-[#64748B] block font-mono">
                ELEVATION 4,130M • NEPAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <a
              href="#overview"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#4F9CF9] hover:bg-white/5 rounded-lg transition-colors"
            >
              Overview
            </a>
            <a
              href="#itinerary"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#4F9CF9] hover:bg-white/5 rounded-lg transition-colors"
            >
              10-Day Route
            </a>
            <a
              href="#highlights"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#4F9CF9] hover:bg-white/5 rounded-lg transition-colors"
            >
              Highlights
            </a>
            <a
              href="#preparation"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#4F9CF9] hover:bg-white/5 rounded-lg transition-colors"
            >
              Gear & AMS Safety
            </a>
            <a
              href="#calculator"
              className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#4F9CF9] hover:bg-white/5 rounded-lg transition-colors"
            >
              Cost Estimator
            </a>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#calculator"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] shadow-lg shadow-[#F97316]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Book Expedition</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card-dark border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            Overview
          </a>
          <a
            href="#itinerary"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            10-Day Route
          </a>
          <a
            href="#highlights"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            Highlights
          </a>
          <a
            href="#preparation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            Gear & AMS Safety
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10"
          >
            Cost Estimator
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full mt-4 px-5 py-3 rounded-xl font-semibold text-white bg-[#F97316]"
          >
            Book Expedition
          </a>
        </div>
      )}
    </header>
  );
}
