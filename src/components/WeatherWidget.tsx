"use client";

import React, { useState } from "react";
import {
  ThermometerSnowflake,
  Wind,
  Navigation,
  Eye,
  Sun,
  Droplets,
  Activity,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export function WeatherWidget() {
  const [weather] = useState({
    temp: -4,
    feelsLike: -11,
    condition: "Clear Mountain Skies",
    oxygenPercent: 62,
    windSpeed: "14 km/h",
    humidity: "42%",
    visibility: "100% Unobstructed",
    lastUpdated: "Live Feed • Synced 2m ago",
  });

  return (
    <section id="weather" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F9CF9]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#16A34A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden space-y-10">
          {/* Subtle Corner Accent Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#4F9CF9]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Section: Header & Live Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sanctuary Conditions Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/15 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-[#4F9CF9]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>LIVE BASE CAMP TELEMETRY</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Annapurna Sanctuary Conditions
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Real-time high-altitude weather and oxygen telemetry streamed directly from our Base Camp sanctuary station at 4,130m.
                </p>
              </div>

              {/* Station Elevation & Sync Status */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">STATION ELEVATION:</span>
                  <span className="text-[#4F9CF9] font-bold">4,130M (13,549 FT)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">ATMOSPHERIC STATUS:</span>
                  <span className="text-[#16A34A] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>OPTICAL CLARITY</span>
                  </span>
                </div>
                <div className="pt-1 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 border-t border-white/5">
                  <RefreshCw className="w-3 h-3 text-[#4F9CF9] animate-spin" />
                  <span>{weather.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Metric Telemetry Cards */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Temperature */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-[#4F9CF9]/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Temperature
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#4F9CF9]/20 flex items-center justify-center text-[#4F9CF9]">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white group-hover:text-[#4F9CF9] transition-colors">
                    {weather.temp}°C
                  </div>
                  <span className="text-[11px] text-[#4F9CF9] font-mono block mt-0.5">
                    Feels like {weather.feelsLike}°C
                  </span>
                </div>
              </div>

              {/* Oxygen Level */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-[#16A34A]/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Oxygen Level
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#16A34A]/20 flex items-center justify-center text-[#16A34A]">
                    <Wind className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#16A34A] group-hover:scale-105 transition-transform origin-left">
                    {weather.oxygenPercent}%
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Relative to Sea Level
                  </span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-amber-400/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Wind Speed
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                    <Navigation className="w-4 h-4 rotate-45" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {weather.windSpeed}
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Direction: NW
                  </span>
                </div>
              </div>

              {/* Visibility */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-emerald-400/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Visibility
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-white leading-tight">
                    100% Unobstructed
                  </div>
                  <span className="text-[11px] text-[#16A34A] font-mono block mt-0.5">
                    Perfect Summit Optics
                  </span>
                </div>
              </div>

              {/* Sky Condition */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-amber-400/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Sky Condition
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                    <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-white">
                    Clear Sky
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Optimal Sunrise View
                  </span>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-[#4F9CF9]/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Humidity
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#4F9CF9]/20 flex items-center justify-center text-[#4F9CF9]">
                    <Droplets className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {weather.humidity}
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Crisp Mountain Air
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 24-Hour Diurnal Temperature & Oxygen Telemetry Curve */}
          <div className="bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    24-Hour Diurnal Telemetry Curve (4,130m Elevation)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Continuous atmospheric temperature & blood oxygen saturation correlation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <span className="flex items-center gap-2 text-[#4F9CF9] font-bold">
                  <span className="w-3 h-1 bg-[#4F9CF9] rounded-full inline-block" /> Temp (°C)
                </span>
                <span className="flex items-center gap-2 text-[#16A34A] font-bold">
                  <span className="w-3 h-1 bg-[#16A34A] rounded-full inline-block" /> Oxygen (%)
                </span>
              </div>
            </div>

            {/* Glowing SVG Telemetry Chart */}
            <div className="relative w-full h-36 pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tempCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4F9CF9" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#4F9CF9" />
                  </linearGradient>
                  <linearGradient id="tempFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4F9CF9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="oxCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#16A34A" />
                    <stop offset="100%" stopColor="#4F9CF9" />
                  </linearGradient>
                </defs>

                {/* Shaded Area under Temperature Curve */}
                <path
                  d="M 0 70 C 70 80, 120 40, 200 25 C 280 10, 360 50, 420 65 C 470 75, 500 70, 500 70 L 500 90 L 0 90 Z"
                  fill="url(#tempFillGrad)"
                />

                {/* Temperature Curve Line */}
                <path
                  d="M 0 70 C 70 80, 120 40, 200 25 C 280 10, 360 50, 420 65 C 470 75, 500 70, 500 70"
                  fill="none"
                  stroke="url(#tempCurveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Oxygen Curve Line */}
                <path
                  d="M 0 35 C 90 25, 170 40, 250 30 C 330 20, 410 45, 500 38"
                  fill="none"
                  stroke="url(#oxCurveGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Glowing Data Dots */}
                <circle cx="200" cy="25" r="4" fill="#F97316" className="animate-pulse" />
                <circle cx="250" cy="30" r="4" fill="#16A34A" className="animate-pulse" />
              </svg>
            </div>

            {/* Time Marker Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">00:00 MIDNIGHT</span>
                <span className="text-white font-bold text-xs">-12°C • 60% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">06:00 DAWN SUNRISE</span>
                <span className="text-[#4F9CF9] font-bold text-xs">-8°C • 62% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 space-y-0.5">
                <span className="text-amber-400 block text-[10px] font-bold">12:00 NOON PEAK</span>
                <span className="text-white font-bold text-xs">-2°C • 65% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">18:00 DUSK SUNSET</span>
                <span className="text-white font-bold text-xs">-6°C • 63% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">24:00 MIDNIGHT</span>
                <span className="text-slate-300 font-bold text-xs">-11°C • 61% O₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
