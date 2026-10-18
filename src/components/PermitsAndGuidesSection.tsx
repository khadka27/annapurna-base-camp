"use client";

import React, { useState } from "react";
import {
  FileText,
  Compass,
  UserCheck,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export function PermitsAndGuidesSection() {
  const [activeTab, setActiveTab] = useState<"permits" | "guides">("permits");

  return (
    <section id="permits-guides" className="py-14 sm:py-16 bg-[#395371] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-bold uppercase tracking-wider border border-[#16A34A]/30">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Permits & Mountain Support</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Trek Permits & Guide / Porter Facilities
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Essential guide on obtaining your ACAP & TIMS trekking permits, plus certified local mountain guide and trustworthy porter arrangements for the Annapurna Base Camp trek.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("permits")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "permits"
                  ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Permits Guide (ACAP & TIMS)</span>
            </button>
            <button
              onClick={() => setActiveTab("guides")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "guides"
                  ? "bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Guides & Porters Facility</span>
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === "permits" ? (
          /* Permits Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* ACAP Permit Card */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#4F9CF9]/20 text-[#4F9CF9] border border-[#4F9CF9]/30">
                    MANDATORY CONSERVATION PERMIT
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  1. ACAP (Annapurna Conservation Area Permit)
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Required for all individuals entering the Annapurna Sanctuary protected conservation area. The permit fee directly funds environmental protection, local trail maintenance, and waste management.
                </p>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Foreign Nationals:</span>
                    <strong className="text-emerald-400 font-mono text-sm">NPR 3,000 (~$23 USD)</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">SAARC Citizens:</span>
                    <strong className="text-white font-mono text-sm">NPR 1,000 (~$8 USD)</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Children under 10 years:</span>
                    <strong className="text-cyan-300 font-mono text-sm">FREE of charge</strong>
                  </div>
                </div>

                {/* Steps to get */}
                <div className="space-y-2.5 text-xs text-slate-200">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                    How & Where to Obtain:
                  </h4>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Pokhara:</strong> Nepal Tourism Board (NTB) office at Damside, Pokhara (Sunday to Friday, 9:00 AM – 5:00 PM).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Kathmandu:</strong> Nepal Tourism Board (NTB) at Bhrikutimandap, Kathmandu.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>
                      <strong>Documents needed:</strong> Original Passport, 2 passport-sized photos, and entry/exit trail dates.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Make sure to get your permit before starting. Checkpoints at Birethanti, Chhomrong & ABC check permits strictly.</span>
              </div>
            </div>

            {/* TIMS Card Card */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30">
                    TREKKER SAFETY REGISTRATION
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  2. TIMS (Trekkers’ Information Management System)
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  The TIMS card records your itinerary, emergency contacts, and insurance details to guarantee swift coordination in case of weather storms or medical helicopter evacuation.
                </p>

                {/* Important Rules */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Organized Trekker TIMS:</span>
                    <strong className="text-emerald-400 font-mono text-sm">NPR 2,000 (~$15 USD)</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">SAARC National TIMS:</span>
                    <strong className="text-white font-mono text-sm">NPR 1,000</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Government Guideline:</span>
                    <strong className="text-[#4F9CF9] text-xs">Licensed guide required through registered agency</strong>
                  </div>
                </div>

                {/* Required checklist */}
                <div className="space-y-2.5 text-xs text-slate-200">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                    What You Need to Provide:
                  </h4>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Clear copy of passport and valid Nepal tourist visa.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Two passport-sized photographs (digital or printed).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>Travel insurance policy number covering high-altitude helicopter rescue up to 5,000m.</span>
                  </div>
                </div>
              </div>

              {/* Assistance CTA */}
              <div className="p-4 rounded-2xl bg-[#4F9CF9]/10 border border-[#4F9CF9]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-200">
                  Need help arranging permits before arriving in Pokhara?
                </span>
                <a
                  href="https://wa.me/9779846063557?text=Namaste!%20I%20need%20information%20and%20assistance%20with%20ACAP%20and%20TIMS%20permits%20for%20Annapurna%20Base%20Camp."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Guides & Porters Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Mountain Guides */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30">
                    EXPERIENCED LOCAL GUIDES
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  Certified Himalayan Mountain Guides
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  We arrange friendly, experienced local trekking guides certified by the Nepal Tourism Board and Trekking Agencies Association of Nepal (TAAN).
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Trail & Weather Navigation</strong>
                      <span className="text-slate-300">Knows the seasonal trail conditions, avalanche zones, stone steps, and safest river crossings.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Altitude & Health Telemetry</strong>
                      <span className="text-slate-300">Monitors your daily oxygen saturation, pulse rates, water intake, and acclimatization pacing.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Local Culture & Lodge Coordination</strong>
                      <span className="text-slate-300">Gurung cultural insights, lodge room reservations ahead of time, and meal scheduling.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Standard Guide Rate:</span>
                <span className="text-white font-mono font-bold">$25 – $35 / day (includes guide food, lodge, wage & insurance)</span>
              </div>
            </div>

            {/* Reliable Porters */}
            <div className="lg:col-span-6 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30">
                    STRONG & TRUSTED PORTERS
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#F97316]" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  Trustworthy Luggage Porters (Potter Facility)
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Trekking up to 4,130m with a heavy 15-20 kg backpack puts immense pressure on your knees and lungs. Our trustworthy local porters carry your main luggage safely, leaving you free to enjoy the hike with only a light daypack.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Luggage Capacity</strong>
                      <span className="text-slate-300">Carries up to 20 – 25 kg per porter (often shared between 2 trekkers, 10–12 kg each).</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Fair Wages & Proper Equipment</strong>
                      <span className="text-slate-300">We respect ethical porter rights — guaranteed warm clothing, proper shoes, medical care, and fair compensation.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-white block">Pickup Points</strong>
                      <span className="text-slate-300">Available from Pokhara, Nayapul, Birethanti, Siwai, or Ghandruk.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="p-4 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-emerald-300 font-bold block">
                    Book Guide or Porter for ABC Trek:
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Call Main: +977 9866060057 • Hotel: +977 9844920552
                  </span>
                </div>
                <a
                  href="https://wa.me/9779846063557?text=Namaste!%20I%20would%20like%20to%20arrange%20a%20licensed%20Guide%20and%20Porter%20for%20the%20Annapurna%20Base%20Camp%20trek."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
