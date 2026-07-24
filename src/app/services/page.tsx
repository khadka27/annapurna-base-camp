"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { Footer } from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white pt-20">
      <GlassNavbar />

      {/* Header Banner */}
      <div className="relative py-20 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F9CF9] rounded-full blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-[#4F9CF9]/30">
            <span>ANNAPURNA BASE CAMP • 4,130M SANCTUARY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            High-Altitude Luxury & Safety Services
          </h1>

          <p className="max-w-3xl mx-auto text-slate-300 text-base sm:text-lg">
            Discover our full range of alpine medical oxygen chambers, thermal soaking tubs, direct helicopter charter access, satellite broadband, and authentic Sherpa dining.
          </p>
        </div>
      </div>

      <main className="flex-grow">
        <ServicesShowcase />
      </main>

      <Footer />
    </div>
  );
}
