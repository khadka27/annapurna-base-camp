"use client";

import React from "react";
import { Mountain, Clock, Footprints, Sun } from "lucide-react";

export function HeroSection() {
  return (
    <section id="overview" className="relative bg-[#395371] text-white pt-12 pb-24 md:py-28 overflow-hidden">
      {/* Background Alpine Atmosphere Graphic Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#4F9CF9] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#16A34A] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#F97316] rounded-full blur-[150px]" />
      </div>

      {/* SVG Smooth Curved Alpine Peaks & Wave Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-36 opacity-20 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F9CF9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#16A34A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Smooth Curved Mountain Base Fill */}
          <path
            d="M 0,120 C 100,50 200,90 320,45 C 440,0 540,85 680,30 C 820,-25 940,65 1060,20 C 1140,-10 1180,25 1200,35 L 1200,120 Z"
            fill="currentColor"
          />

          {/* Flowing Curved Accent Stroke */}
          <path
            d="M 0,90 C 150,30 280,100 420,35 C 560,-30 720,70 880,15 C 1020,-35 1120,40 1200,20"
            fill="none"
            stroke="url(#heroCurveGrad)"
            strokeWidth="4"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Information */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Altitude Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#4F9CF9] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Annapurna Sanctuary Expedition • 4,130M</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Journey into the <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F9CF9] via-white to-[#16A34A]">
                Heart of the Himalayas
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto lg:mx-0 leading-relaxed text-slate-300">
              Trek through rhododendron forests, authentic Gurung mountain villages, and dramatic glacial canyons into the 360° natural mountain amphitheater of Annapurna Base Camp (ABC).
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#calculator"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-[#F97316] hover:bg-[#ea6200] shadow-xl shadow-[#F97316]/30 transition-all flex items-center justify-center gap-3 text-base"
              >
                <span>Calculate Trek Cost</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="#itinerary"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base"
              >
                <svg
                  className="w-5 h-5 text-[#4F9CF9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <span>Explore 10-Day Route</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certified Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ACAP & TIMS Included</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>99.4% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Key Metrics / Glass Feature Card Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {/* Stat Card 1: Altitude */}
            <div className="glass-card-dark p-5 rounded-2xl border border-white/15 space-y-2 hover:border-[#4F9CF9]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center font-bold">
                <Mountain className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white group-hover:text-[#4F9CF9] transition-colors">
                4,130 <span className="text-sm font-normal text-slate-400">m</span>
              </div>
              <div className="text-xs font-medium text-slate-400">Max Altitude (ABC)</div>
              <div className="text-[11px] text-[#4F9CF9] font-mono">13,549 ft Peak Point</div>
            </div>

            {/* Stat Card 2: Duration */}
            <div className="glass-card-dark p-5 rounded-2xl border border-white/15 space-y-2 hover:border-[#F97316]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white group-hover:text-[#F97316] transition-colors">
                10 - 12 <span className="text-sm font-normal text-slate-400">Days</span>
              </div>
              <div className="text-xs font-medium text-slate-400">Trek Duration</div>
              <div className="text-[11px] text-[#F97316] font-mono">Optimal Acclimatization</div>
            </div>

            {/* Stat Card 3: Distance */}
            <div className="glass-card-dark p-5 rounded-2xl border border-white/15 space-y-2 hover:border-[#16A34A]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center font-bold">
                <Footprints className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white group-hover:text-[#16A34A] transition-colors">
                115 <span className="text-sm font-normal text-slate-400">km</span>
              </div>
              <div className="text-xs font-medium text-slate-400">Total Distance</div>
              <div className="text-[11px] text-[#16A34A] font-mono">71.5 Miles Roundtrip</div>
            </div>

            {/* Stat Card 4: Season */}
            <div className="glass-card-dark p-5 rounded-2xl border border-white/15 space-y-2 hover:border-white/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold">
                <Sun className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                Oct - May
              </div>
              <div className="text-xs font-medium text-slate-400">Prime Trek Seasons</div>
              <div className="text-[11px] text-slate-300 font-mono">Spring & Autumn</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
