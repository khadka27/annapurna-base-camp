"use client";

import React from "react";

interface HighlightItem {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  badgeBg: string;
  icon: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: "sanctuary",
    title: "360° Mountain Sanctuary",
    category: "Natural Wonder",
    description:
      "Stand in the middle of a colossal mountain basin enclosed by Annapurna I (8,091m), Annapurna South (7,219m), Hiunchuli, and Fishtail Peak.",
    badge: "4,130m Altitude",
    badgeBg: "bg-[#4F9CF9] text-white",
    icon: "🏔️",
  },
  {
    id: "fishtail",
    title: "Sacred Fishtail Peak",
    category: "Iconic Mountain",
    description:
      "Gaze up at Machhapuchhre (6,993m), the sacred unclimbed holy peak revered as the home of Lord Shiva.",
    badge: "Sacred Peak",
    badgeBg: "bg-[#0F172A] text-white",
    icon: "🏔️",
  },
  {
    id: "poonhill",
    title: "Poon Hill Sunrise",
    category: "Panoramic Viewpoint",
    description:
      "Experience one of the world's most famous Himalayan sunrise viewpoints with views spanning Dhaulagiri and Annapurna massifs.",
    badge: "3,210m Viewpoint",
    badgeBg: "bg-[#F97316] text-white",
    icon: "🌅",
  },
  {
    id: "hotsprings",
    title: "Jhinu Hot Springs",
    category: "Relaxation",
    description:
      "Soothe your legs in natural geothermal hot spring pools nestled directly on the banks of the rushing Modi Khola river.",
    badge: "Riverside Thermal",
    badgeBg: "bg-[#16A34A] text-white",
    icon: "♨️",
  },
  {
    id: "gurung",
    title: "Gurung Heritage & Lodges",
    category: "Culture",
    description:
      "Stay in warm, family-operated mountain tea houses, savor traditional Dal Bhat, and experience Gurung culture.",
    badge: "Local Culture",
    badgeBg: "bg-[#0F172A] text-white",
    icon: "🏡",
  },
  {
    id: "rhododendron",
    title: "Rhododendron Blooms",
    category: "Nature",
    description:
      "Trek through ancient spring forests bursting with scarlet, pink, and white national flowers of Nepal.",
    badge: "Spring Highlight",
    badgeBg: "bg-[#16A34A] text-white",
    icon: "🌺",
  },
];

export function HighlightsGrid() {
  return (
    <section id="highlights" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Decorative Atmosphere */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4F9CF9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
            <span>Expedition Wonders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Unforgettable Highlights of ABC Trek
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From hot thermal springs to golden mountain sunrises and 8,000m summits, experience the finest trekking features Nepal has to offer.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              className="glass-card-dark rounded-3xl p-8 border border-white/15 hover:border-[#4F9CF9]/40 transition-all duration-300 transform hover:-translate-y-1.5 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#4F9CF9] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4F9CF9] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                <span>Explore Details</span>
                <span className="text-[#4F9CF9] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
