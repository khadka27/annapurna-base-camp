"use client";

import React, { useState } from "react";

export function WeatherWidget() {
  const [weather] = useState({
    temp: -4,
    feelsLike: -11,
    condition: "Clear Mountain Skies",
    oxygenPercent: 62,
    windSpeed: "14 km/h",
    humidity: "42%",
    visibility: "100% Unobstructed",
    lastUpdated: "Just now",
  });

  return (
    <section id="weather" className="py-20 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F9CF9]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                <span>LIVE BASE CAMP WEATHER STATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Annapurna Sanctuary Conditions
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Real-time telemetry gathered directly from our high-altitude telemetry sensors at 4,130 meters.
              </p>
              <div className="text-xs text-[#4F9CF9] font-mono">
                Station Elevation: 4,130m (13,549 ft) • Updated {weather.lastUpdated}
              </div>
            </div>

            {/* Right Telemetry Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Temperature */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">TEMPERATURE</span>
                <span className="text-3xl font-extrabold text-white">{weather.temp}°C</span>
                <span className="text-[11px] text-[#4F9CF9] block">Feels like {weather.feelsLike}°C</span>
              </div>

              {/* Oxygen Level */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">OXYGEN LEVEL</span>
                <span className="text-3xl font-extrabold text-[#16A34A]">{weather.oxygenPercent}%</span>
                <span className="text-[11px] text-slate-300 block">Relative to Sea Level</span>
              </div>

              {/* Wind Speed */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">WIND SPEED</span>
                <span className="text-2xl font-extrabold text-white">{weather.windSpeed}</span>
                <span className="text-[11px] text-slate-300 block">Direction: NW</span>
              </div>

              {/* Visibility */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">VISIBILITY</span>
                <span className="text-lg font-bold text-white">{weather.visibility}</span>
                <span className="text-[11px] text-[#16A34A] block">Perfect Summit Optics</span>
              </div>

              {/* Sky Condition */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">SKY CONDITION</span>
                <span className="text-lg font-bold text-white flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                  </svg>
                  <span>Clear Sky</span>
                </span>
                <span className="text-[11px] text-slate-300 block">Optimal Sunrise View</span>
              </div>

              {/* Humidity */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-1">
                <span className="text-xs text-slate-400 font-mono block">HUMIDITY</span>
                <span className="text-2xl font-extrabold text-white">{weather.humidity}</span>
                <span className="text-[11px] text-slate-300 block font-mono">Crisp Mountain Air</span>
              </div>
            </div>

            {/* 24-Hour Diurnal Temperature & Oxygen Telemetry Curve */}
            <div className="lg:col-span-12 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4F9CF9] animate-pulse" />
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    24-Hour Diurnal Temperature & Oxygen Curve (4,130m)
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-[#4F9CF9]">
                    <span className="w-3 h-0.5 bg-[#4F9CF9] rounded-full inline-block" /> Temp Curve (°C)
                  </span>
                  <span className="flex items-center gap-1 text-[#16A34A]">
                    <span className="w-3 h-0.5 bg-[#16A34A] rounded-full inline-block" /> Oxygen Curve (%)
                  </span>
                </div>
              </div>

              {/* Curved SVG Telemetry Chart */}
              <div className="relative w-full h-28 pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="tempCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F9CF9" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#4F9CF9" />
                    </linearGradient>
                    <linearGradient id="oxCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#16A34A" />
                      <stop offset="100%" stopColor="#4F9CF9" />
                    </linearGradient>
                  </defs>

                  {/* Temperature Curve */}
                  <path
                    d="M 0 65 C 70 75, 120 40, 200 25 C 280 10, 360 45, 420 60 C 470 72, 500 68, 500 65"
                    fill="none"
                    stroke="url(#tempCurveGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Oxygen Curve */}
                  <path
                    d="M 0 30 C 90 20, 170 35, 250 25 C 330 15, 410 40, 500 32"
                    fill="none"
                    stroke="url(#oxCurveGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2">
                <span>00:00 (Midnight -12°C)</span>
                <span>06:00 (Dawn Sunrise -8°C)</span>
                <span>12:00 (Noon Sun -2°C)</span>
                <span>18:00 (Dusk -6°C)</span>
                <span>24:00 (Midnight -11°C)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
