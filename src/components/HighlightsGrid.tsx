"use client";

import React from "react";

interface HighlightItem {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  badgeBg: string;
  iconSvg: React.ReactNode;
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
    iconSvg: (
      <svg className="w-6 h-6 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "fishtail",
    title: "Sacred Fishtail Peak",
    category: "Iconic Mountain",
    description:
      "Gaze up at Machhapuchhre (6,993m), the sacred unclimbed holy peak revered as the home of Lord Shiva.",
    badge: "Sacred Peak",
    badgeBg: "bg-[#0F172A] text-white",
    iconSvg: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
      </svg>
    ),
  },
  {
    id: "poonhill",
    title: "Poon Hill Sunrise",
    category: "Panoramic Viewpoint",
    description:
      "Experience one of the world's most famous Himalayan sunrise viewpoints with views spanning Dhaulagiri and Annapurna massifs.",
    badge: "3,210m Viewpoint",
    badgeBg: "bg-[#F97316] text-white",
    iconSvg: (
      <svg className="w-6 h-6 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: "hotsprings",
    title: "Jhinu Hot Springs",
    category: "Relaxation",
    description:
      "Soothe your legs in natural geothermal hot spring pools nestled directly on the banks of the rushing Modi Khola river.",
    badge: "Riverside Thermal",
    badgeBg: "bg-[#16A34A] text-white",
    iconSvg: (
      <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "gurung",
    title: "Gurung Heritage & Lodges",
    category: "Culture",
    description:
      "Stay in warm, family-operated mountain tea houses, savor traditional Dal Bhat, and experience Gurung culture.",
    badge: "Local Culture",
    badgeBg: "bg-[#0F172A] text-white",
    iconSvg: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "rhododendron",
    title: "Rhododendron Blooms",
    category: "Nature",
    description:
      "Trek through ancient spring forests bursting with scarlet, pink, and white national flowers of Nepal.",
    badge: "Spring Highlight",
    badgeBg: "bg-[#16A34A] text-white",
    iconSvg: (
      <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export function HighlightsGrid() {
  return (
    <section id="highlights" className="py-14 sm:py-16 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              className="glass-card-dark rounded-3xl p-8 border border-white/15 hover:border-[#4F9CF9]/40 transition-all duration-300 transform hover:-translate-y-1.5 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.iconSvg}
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
                <span className="text-[#4F9CF9]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
