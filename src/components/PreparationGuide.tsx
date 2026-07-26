"use client";

import React, { useState } from "react";
import { Check, Activity, Calendar } from "lucide-react";

interface PackingItem {
  id: string;
  category: "footwear" | "clothing" | "gear" | "medical";
  name: string;
  essential: boolean;
}

const PACKING_ITEMS: PackingItem[] = [
  { id: "boots", category: "footwear", name: "Sturdy Waterproof Trekking Boots (Broken in)", essential: true },
  { id: "socks", category: "footwear", name: "4x Thermal Merino Wool Trekking Socks", essential: true },
  { id: "sandals", category: "footwear", name: "Lightweight Lodge Slippers / Camp Sandals", essential: false },
  { id: "down-jacket", category: "clothing", name: "Heavy Down Jacket (-10°C / 14°F rated)", essential: true },
  { id: "hard-shell", category: "clothing", name: "Windproof & Rainproof Hard Shell Jacket", essential: true },
  { id: "thermal-layers", category: "clothing", name: "2x Thermal Base Layers (Top & Bottom)", essential: true },
  { id: "trek-pants", category: "clothing", name: "2x Quick-dry Convertible Trekking Pants", essential: true },
  { id: "poles", category: "gear", name: "Adjustable Lightweight Trekking Poles", essential: true },
  { id: "sleeping-bag", category: "gear", name: "Four-Season Sleeping Bag (-10°C rated)", essential: true },
  { id: "headlamp", category: "gear", name: "LED Headlamp with extra batteries (For Poon Hill)", essential: true },
  { id: "water-bottle", category: "gear", name: "Reusable Water Bottle + Purification Tablets", essential: true },
  { id: "sun-protection", category: "gear", name: "UV Polarized Sunglasses + SPF 50+ Sunscreen", essential: true },
  { id: "diamox", category: "medical", name: "Acetazolamide (Diamox) for AMS Prevention", essential: true },
  { id: "first-aid", category: "medical", name: "Blister Plasters, Paracetamol & Antiseptic Wipes", essential: true },
  { id: "permits", category: "medical", name: "ACAP Permit & TIMS Card + Passport Copies", essential: true },
];

export function PreparationGuide() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    boots: true,
    "down-jacket": true,
    poles: true,
    "sleeping-bag": true,
    diamox: true,
    permits: true,
  });

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems =
    activeCategory === "all"
      ? PACKING_ITEMS
      : PACKING_ITEMS.filter((item) => item.category === activeCategory);

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / PACKING_ITEMS.length) * 100);

  return (
    <section id="preparation" className="py-14 sm:py-16 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold uppercase tracking-wider">
            <span>Safety & Equipment Readiness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Gear Checklist & Altitude Safety
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            Prepare for high-altitude conditions with our interactive packing checklist and medical AMS acclimatization protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Interactive Checklist Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">Essential Packing Checklist</h3>
                <p className="text-xs text-[#64748B]">Click items to mark them packed for your trek</p>
              </div>

              {/* Progress Bar Badge */}
              <div className="w-full sm:w-auto bg-[#F8FAFC] p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold text-sm">
                  {progressPercent}%
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#0F172A]">
                    {completedCount} of {PACKING_ITEMS.length} Packed
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    {progressPercent === 100 ? "Ready for Base Camp!" : "Check all items"}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {["all", "footwear", "clothing", "gear", "medical"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    activeCategory === cat
                      ? "bg-[#0F172A] text-white"
                      : "bg-[#F8FAFC] text-[#64748B] hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Items List */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
              {filteredItems.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-[#16A34A]/5 border-[#16A34A]/30 text-[#0F172A]"
                        : "bg-[#F8FAFC] border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                          isChecked ? "bg-[#16A34A] text-white" : "border border-slate-400 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${isChecked ? "line-through text-slate-500" : ""}`}>
                        {item.name}
                      </span>
                    </div>

                    {item.essential && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F97316]/10 text-[#F97316]">
                        ESSENTIAL
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Safety & Season Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* AMS Safety Protocol Card */}
            <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center text-xl font-bold">
                <Activity className="w-5 h-5 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-bold text-white">AMS Altitude Safety Guidelines</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Acute Mountain Sickness (AMS) can affect anyone above 2,500m regardless of fitness level. Our guides monitor oxygen saturation levels daily.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200">
                  <span className="text-[#16A34A] font-bold text-sm">1.</span>
                  <div>
                    <strong className="text-white block">Hydrate Constantly</strong>
                    Drink at least 3-4 Liters of clean water per day to assist blood oxygenation.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200">
                  <span className="text-[#16A34A] font-bold text-sm">2.</span>
                  <div>
                    <strong className="text-white block">Walk Pace &apos;Bistarai&apos; (Slowly)</strong>
                    Maintain a steady, slow rhythm without over-exertion on uphill climbs.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200">
                  <span className="text-[#16A34A] font-bold text-sm">3.</span>
                  <div>
                    <strong className="text-white block">Immediate Communication</strong>
                    Report headache, nausea, or dizziness immediately to your expedition leader.
                  </div>
                </div>
              </div>
            </div>

            {/* Best Season Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4F9CF9]" />
                <span>Recommended Seasons</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#4F9CF9]/10 border border-[#4F9CF9]/20">
                  <strong className="text-[#0F172A] block font-bold text-sm">Autumn (Oct - Nov)</strong>
                  <span className="text-[#64748B]">Crystal clear skies & sharp mountain views</span>
                </div>
                <div className="p-3 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/20">
                  <strong className="text-[#0F172A] block font-bold text-sm">Spring (Mar - May)</strong>
                  <span className="text-[#64748B]">Wild blooming rhododendron forests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
