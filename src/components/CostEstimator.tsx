"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";

export function CostEstimator() {
  const [packageType, setPackageType] = useState<"standard" | "comfort" | "luxury">("standard");
  const [groupSize, setGroupSize] = useState<number>(2);
  const [includePorter, setIncludePorter] = useState<boolean>(true);
  const [includeGearRental, setIncludeGearRental] = useState<boolean>(false);
  const [includeHotelExtension, setIncludeHotelExtension] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Base Prices per person
  const packagePrices = {
    standard: 790,
    comfort: 1150,
    luxury: 2290,
  };

  const basePricePerPerson = packagePrices[packageType];
  const porterCost = includePorter ? 180 : 0;
  const gearRentalCost = includeGearRental ? 45 : 0;
  const hotelExtensionCost = includeHotelExtension ? 140 : 0;

  // Group discount (10% off for 4+ trekkers)
  const isGroupDiscount = groupSize >= 4;
  const subtotalPerPerson = basePricePerPerson + porterCost + gearRentalCost + hotelExtensionCost;
  const finalPricePerPerson = isGroupDiscount ? Math.round(subtotalPerPerson * 0.9) : subtotalPerPerson;
  const totalGrandPrice = finalPricePerPerson * groupSize;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="calculator" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F97316] text-xs font-bold uppercase tracking-wider border border-white/15">
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Annapurna Trek Cost Calculator
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Customize your expedition package, group size, and add-ons to calculate your instant estimated cost.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form Panel */}
          <div className="lg:col-span-7 glass-card-dark p-6 sm:p-8 rounded-3xl border border-white/15 space-y-8">
            {/* Step 1: Choose Package Tier */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-white uppercase tracking-wider block">
                1. Select Expedition Tier
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Standard */}
                <button
                  type="button"
                  onClick={() => setPackageType("standard")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    packageType === "standard"
                      ? "bg-[#4F9CF9]/20 border-[#4F9CF9] text-white shadow-lg"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-[#4F9CF9] block font-mono">POPULAR</span>
                  <strong className="text-lg text-white block mt-1">Standard</strong>
                  <span className="text-sm font-bold text-white">$790 / person</span>
                  <p className="text-[11px] text-slate-400 mt-2">Tea house lodges, guide & all permit fees.</p>
                </button>

                {/* Comfort */}
                <button
                  type="button"
                  onClick={() => setPackageType("comfort")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    packageType === "comfort"
                      ? "bg-[#4F9CF9]/20 border-[#4F9CF9] text-white shadow-lg"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-[#16A34A] block font-mono">ENHANCED</span>
                  <strong className="text-lg text-white block mt-1">Comfort</strong>
                  <span className="text-sm font-bold text-white">$1,150 / person</span>
                  <p className="text-[11px] text-slate-400 mt-2">Attached bath, private Pokhara transfers & hot showers.</p>
                </button>

                {/* Luxury */}
                <button
                  type="button"
                  onClick={() => setPackageType("luxury")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    packageType === "luxury"
                      ? "bg-[#4F9CF9]/20 border-[#4F9CF9] text-white shadow-lg"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <span className="text-xs font-bold text-[#F97316] block font-mono">VIP</span>
                  <strong className="text-lg text-white block mt-1">Heli Return</strong>
                  <span className="text-sm font-bold text-white">$2,290 / person</span>
                  <p className="text-[11px] text-slate-400 mt-2">Fly back via scenic Helicopter from ABC to Pokhara.</p>
                </button>
              </div>
            </div>

            {/* Step 2: Group Size Counter */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white uppercase tracking-wider block">
                  2. Number of Trekkers
                </label>
                {isGroupDiscount && (
                  <span className="text-xs font-bold text-[#16A34A] px-2.5 py-1 rounded-full bg-[#16A34A]/20 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>10% Group Discount Applied</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
                >
                  -
                </button>

                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold text-white">{groupSize}</span>
                  <span className="text-xs text-slate-400 block font-mono">
                    {groupSize === 1 ? "Solo Trekker" : `${groupSize} Group Trekkers`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setGroupSize(Math.min(10, groupSize + 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-white uppercase tracking-wider block">
                3. Optional Add-ons & Services
              </label>

              <div className="space-y-3">
                {/* Porter */}
                <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includePorter}
                      onChange={(e) => setIncludePorter(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#F97316]"
                    />
                    <div>
                      <strong className="text-sm text-white block">Personal Porter Service</strong>
                      <span className="text-xs text-slate-400">Carries up to 20kg of gear throughout trek</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#4F9CF9]">+$180</span>
                </label>

                {/* Gear Rental */}
                <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeGearRental}
                      onChange={(e) => setIncludeGearRental(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#F97316]"
                    />
                    <div>
                      <strong className="text-sm text-white block">Four-Season Gear Rental</strong>
                      <span className="text-xs text-[#64748B] text-slate-400">Down jacket + -10°C sleeping bag</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#4F9CF9]">+$45</span>
                </label>

                {/* Hotel Extension */}
                <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeHotelExtension}
                      onChange={(e) => setIncludeHotelExtension(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#F97316]"
                    />
                    <div>
                      <strong className="text-sm text-white block">Pokhara Lakeside Hotel Stay</strong>
                      <span className="text-xs text-slate-400">2 Extra nights in 4-Star Resort + Breakfast</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#4F9CF9]">+$140</span>
                </label>
              </div>
            </div>
          </div>

          {/* Price Summary & Instant Booking Modal Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F172A] border border-[#4F9CF9]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-[#4F9CF9] uppercase">ESTIMATE BREAKDOWN</span>
                <span className="text-xs px-2.5 py-1 rounded bg-[#16A34A]/20 text-[#16A34A] font-bold">ALL PERMITS INCLUDED</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Base Package ({packageType}):</span>
                  <span className="font-mono">${basePricePerPerson}</span>
                </div>
                {includePorter && (
                  <div className="flex justify-between text-slate-300">
                    <span>Porter Service:</span>
                    <span className="font-mono">+$180</span>
                  </div>
                )}
                {includeGearRental && (
                  <div className="flex justify-between text-slate-300">
                    <span>Gear Rental:</span>
                    <span className="font-mono">+$45</span>
                  </div>
                )}
                {includeHotelExtension && (
                  <div className="flex justify-between text-slate-300">
                    <span>Lakeside Hotel Extension:</span>
                    <span className="font-mono">+$140</span>
                  </div>
                )}

                {isGroupDiscount && (
                  <div className="flex justify-between text-[#16A34A] font-bold">
                    <span>Group Discount (10% OFF):</span>
                    <span className="font-mono">-${Math.round(subtotalPerPerson * 0.1)} / person</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-300">Price Per Person:</span>
                  <span className="text-2xl font-extrabold text-[#4F9CF9]">${finalPricePerPerson}</span>
                </div>
                <div className="flex items-baseline justify-between text-slate-400 text-xs">
                  <span>Total for {groupSize} Trekker(s):</span>
                  <span className="text-lg font-bold text-white">${totalGrandPrice} USD</span>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-[#4F9CF9] text-sm"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-[#4F9CF9] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-[#F97316] hover:bg-[#ea6200] shadow-xl shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Reserve Expedition Quote</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              {submitted && (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#16A34A] text-[#16A34A] text-xs text-center font-bold animate-fade-in flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Booking inquiry submitted! Our Himalayan expedition leader will email your detailed itinerary within 2 hours.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
