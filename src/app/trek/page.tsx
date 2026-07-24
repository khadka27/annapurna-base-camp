"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { ItineraryExplorer } from "@/components/ItineraryExplorer";
import { PreparationGuide } from "@/components/PreparationGuide";
import { HighlightsGrid } from "@/components/HighlightsGrid";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";

export default function TrekPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pt-16">
      <GlassNavbar />
      <main className="flex-grow">
        {/* Trek Guide Header */}
        <section className="py-16 bg-[#0F172A] text-white text-center px-4 relative overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F97316] text-xs font-mono font-bold uppercase">
              <span>OFFICIAL EXPEDITION GUIDE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
              Annapurna Base Camp Trek (4,130m)
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
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
