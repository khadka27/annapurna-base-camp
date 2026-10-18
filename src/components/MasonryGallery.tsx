"use client";

import React, { useState } from "react";
import { useCms, GalleryItem } from "@/context/CmsContext";
import { ExternalLink, Image as ImageIcon, X, Camera } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function MasonryGallery() {
  const { gallery } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ["All", "Guest House", "Restaurant & Dining", "Mountains & Peaks", "Lodge Life"];

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="py-14 sm:py-16 bg-[#395371] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
              <ImageIcon className="w-3.5 h-3.5 text-[#4F9CF9]" />
              <span>Authentic Photo Gallery (4,130m)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Annapurna Guest House & Restaurant Gallery
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Real high-altitude photography from our base camp lodge — original carved signboard, heated restaurant dining hall, trekkers enjoying hot Dal Bhat, and panoramic Himalayan peaks.
            </p>
          </div>

          {/* Instagram Profile CTA Card */}
          <a
            href="https://www.instagram.com/annapurna_guest_house/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-pink-500/20 transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            <InstagramIcon className="w-4 h-4 text-white" />
            <span>Follow @annapurna_guest_house</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                  : "bg-white/10 text-slate-200 border border-white/15 hover:bg-white/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer border border-white/15 shadow-xl bg-slate-900/60 hover:shadow-2xl hover:border-[#4F9CF9]/50 transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono font-bold text-[#4F9CF9] uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h3>
                <span className="text-xs text-[#25D366] mt-2 flex items-center gap-1 font-semibold">
                  <span>Click for Full View</span> →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1E293B] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white"
          >
            <div className="relative bg-black flex items-center justify-center">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full max-h-[75vh] object-contain"
              />
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 border-t border-white/10">
              <div>
                <span className="text-xs font-mono text-[#4F9CF9] font-bold uppercase tracking-wider">
                  {activeLightbox.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  {activeLightbox.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/annapurna_guest_house/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 text-pink-300 font-bold text-xs flex items-center gap-1.5 transition-all border border-pink-500/30"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram @annapurna_guest_house</span>
                </a>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
