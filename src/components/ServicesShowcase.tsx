"use client";

import React, { useState } from "react";
import { useCms } from "@/context/CmsContext";
import { DynamicIcon } from "@/components/DynamicIcon";

export function ServicesShowcase() {
  const { services } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-14 sm:py-16 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#4F9CF9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#16A34A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
              <span>High-Altitude Alpine Amenities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Comprehensive Sanctuary Services
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Tailored high-altitude wellness, emergency logistics, mountain dining, and low-latency broadband designed for comfort at 4,130m.
            </p>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-2 max-w-full md:justify-end">
            {[
              { id: "all", label: "All Services" },
              { id: "Wellness & Safety", label: "Wellness & Safety" },
              { id: "Logistics & Transport", label: "Logistics & Transport" },
              { id: "Dining & Comfort", label: "Dining & Comfort" },
              { id: "Connectivity", label: "Connectivity" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/15 hover:border-[#4F9CF9]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-3xl flex items-center justify-center group-hover:scale-110 transition-transform text-[#4F9CF9]">
                    <DynamicIcon name={service.icon} className="w-7 h-7" />
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                      service.included
                        ? "bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30"
                        : "bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30"
                    }`}
                  >
                    {service.included ? "Complimentary Perk" : `$${service.price} Add-On`}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#4F9CF9] uppercase font-bold tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4F9CF9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Sanctuary Standard</span>
                <span className="text-white font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  Available Daily
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
