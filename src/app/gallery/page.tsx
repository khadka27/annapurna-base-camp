"use client";

import React from "react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { MasonryGallery } from "@/components/MasonryGallery";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pt-16">
      <GlassNavbar />
      <main className="flex-grow">
        {/* Gallery Header */}
        <section className="py-16 bg-[#0F172A] text-white text-center px-4 relative overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase">
              <span>HIMALAYAN PHOTOGRAPHY & MEDIA</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
              Guesthouse Media Gallery
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Browse high-resolution imagery of Annapurna Base Camp, our luxury suites, dining room dishes, thermal bath house, and 8,000m summits.
            </p>
          </div>
        </section>

        {/* Pinterest Style Masonry Gallery Component */}
        <MasonryGallery />
      </main>
      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
