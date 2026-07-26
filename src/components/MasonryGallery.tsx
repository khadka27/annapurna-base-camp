"use client";

import React, { useState } from "react";
import { useCms, GalleryItem } from "@/context/CmsContext";

export function MasonryGallery() {
  const { gallery } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" className="py-14 sm:py-16 bg-[#395371] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
              <span>Visual Journey</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Annapurna Sanctuary Gallery
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore photography of our luxury suites, mountain view deck, gourmet dishes, and 8,000m summits.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {["All", "Sanctuary", "Suites", "Dining", "Peaks"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#0F172A] text-white shadow-md"
                    : "bg-white text-[#64748B] border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 shadow-md bg-white hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] font-mono font-bold text-[#4F9CF9] uppercase">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                <span className="text-xs text-slate-300 mt-2 flex items-center gap-1 font-semibold">
                  <span>Click for Lightbox</span> →
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
            className="relative max-w-4xl w-full bg-[#0F172A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white"
          >
            <img
              src={activeLightbox.imageUrl}
              alt={activeLightbox.title}
              className="w-full max-h-[75vh] object-cover"
            />
            <div className="p-6 flex items-center justify-between bg-white/5 border-t border-white/10">
              <div>
                <span className="text-xs font-mono text-[#4F9CF9] font-bold uppercase">
                  {activeLightbox.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeLightbox.title}</h3>
              </div>

              <button
                onClick={() => setActiveLightbox(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
