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
          </div>
        </div>
      </div>
    </section>
  );
}
