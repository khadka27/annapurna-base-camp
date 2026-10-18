"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { ItineraryExplorer } from "@/components/ItineraryExplorer";
import { PreparationGuide } from "@/components/PreparationGuide";
import { HighlightsGrid } from "@/components/HighlightsGrid";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";

export default function TrekClient() {
  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <GlassNavbar />
      <main className="flex-grow">
        {/* Trek Guide Header */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-[#395371] text-white text-center px-4 relative overflow-hidden border-b border-white/10 group">
          {/* Subtle Ambient Peak Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            style={{ backgroundImage: `url('/images/Annapurna-Base-Camp.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#395371]/90 via-[#395371]/80 to-[#395371] pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F97316] text-xs font-mono font-bold uppercase backdrop-blur-md border border-[#F97316]/30">
              <span>OFFICIAL EXPEDITION GUIDE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Annapurna Base Camp Trek (4,130m)
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Complete day-by-day 10-day route map, elevation scaling charts, gear preparation checklist, and AMS altitude safety protocols.
            </p>
          </div>
        </section>

        {/* 10-Day Route Map */}
        <ItineraryExplorer />

        {/* Highlights */}
        <HighlightsGrid />

        {/* Packing Checklist & AMS Safety */}
        <PreparationGuide />
      </main>
      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
