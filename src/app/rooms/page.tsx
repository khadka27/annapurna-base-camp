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
        {/* Page Hero Header with Lodge Image Background */}
        <section className="relative py-20 text-center px-4 overflow-hidden border-b border-white/15 group">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('/images/Lodge-in-Annapurna-base-camp.jpg')` }}
          />
          {/* Dark Gradient & Glass Backdrop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/85 to-[#0F172A]/95 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase backdrop-blur-md border border-[#4F9CF9]/30">
              <span>EXPLORE ALL SUITES & LODGES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
              Glacier Suites & Accommodations
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
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
