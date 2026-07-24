"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { ExperiencesTimeline } from "@/components/ExperiencesTimeline";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white pt-16">
      <GlassNavbar />
      <main className="flex-grow">
        {/* Experiences Header */}
        <section className="py-16 text-center px-4 relative overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#16A34A] text-xs font-mono font-bold uppercase">
              <span>SANCTUARY HOSPITALITY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
              Curated Sanctuary Experiences
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              From morning tea on the heated viewing deck watching golden sunrise over 8,000m summits to zero-light stargazing with high-altitude telescopes.
            </p>
          </div>
        </section>

        {/* Timeline Component */}
        <ExperiencesTimeline />
      </main>
      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
