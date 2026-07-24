"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { RoomShowcase } from "@/components/RoomShowcase";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";

export default function RoomsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white pt-16">
      <GlassNavbar />
      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="py-16 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/90 to-[#0F172A] text-center px-4 relative overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase">
              <span>EXPLORE ALL SUITES & LODGES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
              Glacier Suites & Accommodations
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Perched at 4,130m inside the Annapurna Sanctuary. Every room features panoramic double-pane windows, radiant floor warming, and private en-suite thermal baths.
            </p>
          </div>
        </section>

        {/* Room Showcase Component */}
        <RoomShowcase />
      </main>
      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
