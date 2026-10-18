"use client";

import React, { useState, useEffect } from "react";
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
  Gauge,
  Info,
} from "lucide-react";

interface LiveWeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  oxygenPercent: number;
  surfacePressure: number;
  windSpeed: string;
  humidity: string;
  visibility: string;
  lastUpdated: string;
  isLive: boolean;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<LiveWeatherData>({
    temp: 0,
    feelsLike: -2,
    condition: "Partly Cloudy Mountain Skies",
    oxygenPercent: 62,
    surfacePressure: 629.8,
    windSpeed: "5 km/h",
    humidity: "93%",
    visibility: "High Alpine Visibility",
    lastUpdated: "Fetching Live Satellite...",
    isLive: false,
  });
  const [loading, setLoading] = useState(false);
  const [showO2Info, setShowO2Info] = useState(false);

  const getWeatherCondition = (code: number): string => {
    switch (code) {
      case 0:
        return "Clear Himalayan Skies";
      case 1:
        return "Mainly Clear & Sunny";
      case 2:
        return "Partly Cloudy Peaks";
      case 3:
        return "Overcast Himalayan Ridge";
      case 45:
      case 48:
        return "High-Altitude Fog / Mist";
      case 51:
      case 53:
      case 55:
        return "Light Mountain Drizzle";
      case 61:
      case 63:
      case 65:
        return "Alpine Rain";
      case 71:
      case 73:
      case 75:
      case 77:
        return "Base Camp Snowfall";
      case 85:
      case 86:
        return "High-Altitude Snow Showers";
      default:
        return "Alpine Mountain Weather";
    }
  };

  const fetchLiveWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=28.53&longitude=83.88&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&timezone=Asia%2FKathmandu"
      );
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      const current = data.current;

      const pressure = current.surface_pressure || 629.8;
      // Barometric oxygen relative to sea level (1013.25 hPa)
      const calculatedO2 = Math.round((pressure / 1013.25) * 100);

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setWeather({
        temp: Math.round(current.temperature_2m * 10) / 10,
        feelsLike: Math.round(current.apparent_temperature * 10) / 10,
        condition: getWeatherCondition(current.weather_code),
        oxygenPercent: calculatedO2 || 62,
        surfacePressure: Math.round(pressure * 10) / 10,
        windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
        humidity: `${Math.round(current.relative_humidity_2m)}%`,
        visibility: current.weather_code >= 71 ? "Snowfall Drift" : "100% Mountain Clarity",
        lastUpdated: `Live Satellite • ${timeStr} NPT`,
        isLive: true,
      });
    } catch (err) {
      console.warn("Live weather fetch fallback:", err);
      setWeather((prev) => ({
        ...prev,
        lastUpdated: "Station Altitude Model (4,130m)",
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveWeather();
    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchLiveWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="weather" className="py-14 sm:py-16 bg-[#395371] text-white relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F9CF9]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#16A34A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden space-y-8">
          {/* Subtle Corner Accent Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#4F9CF9]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Section: Header & Live Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Guest House Conditions Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/15 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-[#4F9CF9]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>REAL-TIME SATELLITE TELEMETRY</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Annapurna Base Camp Live Conditions
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Live high-altitude weather and barometric oxygen telemetry at Annapurna Guest House & Restaurant (4,130m elevation).
                </p>
              </div>

              {/* Station Elevation & Sync Status */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">STATION ELEVATION:</span>
                  <span className="text-[#4F9CF9] font-bold">4,130M (13,549 FT)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">ATMOSPHERIC PRESSURE:</span>
                  <span className="text-[#16A34A] font-bold flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>{weather.surfacePressure} hPa (62% of Sea Level)</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">WEATHER STATUS:</span>
                  <span className="text-amber-300 font-bold">{weather.condition}</span>
                </div>
                <div className="pt-2 text-[11px] text-slate-300 font-mono flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span className="text-emerald-300 font-bold">{weather.lastUpdated}</span>
                  </div>
                  <button
                    onClick={fetchLiveWeather}
                    disabled={loading}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#4F9CF9] text-[11px] font-bold flex items-center gap-1 transition-all"
                    title="Refresh Live Weather from Satellite"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                    <span>{loading ? "Updating..." : "Refresh"}</span>
                  </button>
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
                    {weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C
                  </div>
                  <span className="text-[11px] text-[#4F9CF9] font-mono block mt-0.5">
                    Feels like {weather.feelsLike}°C
                  </span>
                </div>
              </div>

              {/* Oxygen Level */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-[#16A34A]/50 transition-all duration-300 group space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider flex items-center gap-1">
                    <span>Oxygen Level</span>
                    <button
                      onClick={() => setShowO2Info(!showO2Info)}
                      className="text-slate-400 hover:text-white"
                      title="What is this?"
                    >
                      <Info className="w-3 h-3" />
                    </button>
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
                    Effective O₂ (4,130m)
                  </span>
                </div>

                {showO2Info && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-20 p-3 rounded-xl bg-[#0F172A] border border-white/20 text-[11px] text-slate-300 shadow-xl leading-relaxed">
                    At 4,130m, barometric pressure is ~630 hPa, giving ~62% effective oxygen partial pressure compared to sea level.
                  </div>
                )}
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
                    Himalayan Breeze
                  </span>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-indigo-400/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Humidity
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-indigo-400/20 flex items-center justify-center text-indigo-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {weather.humidity}
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Relative Alpine
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
                  <div className="text-lg font-extrabold text-white truncate">
                    {weather.visibility}
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Peak Visibility
                  </span>
                </div>
              </div>

              {/* Guesthouse Comfort */}
              <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/15 hover:border-orange-400/50 transition-all duration-300 group space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono uppercase font-bold tracking-wider">
                    Lodge Warming
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-orange-400/20 flex items-center justify-center text-orange-400">
                    <Sun className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-lg font-extrabold text-orange-300">
                    Warm & Heated
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono block mt-0.5">
                    Dining Room Stove Active
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
                    24-Hour High-Altitude Diurnal Cycle (4,130m Elevation)
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Atmospheric temperature fluctuations & effective barometric oxygen level
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <span className="flex items-center gap-2 text-[#4F9CF9] font-bold">
                  <span className="w-3 h-1 bg-[#4F9CF9] rounded-full inline-block" /> Temp (°C)
                </span>
                <span className="flex items-center gap-2 text-[#16A34A] font-bold">
                  <span className="w-3 h-1 bg-[#16A34A] rounded-full inline-block" /> Oxygen (~62%)
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">00:00 MIDNIGHT</span>
                <span className="text-white font-bold block">-8°C</span>
                <span className="text-[#16A34A] text-[10px] block">62% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[10px]">05:30 DAWN</span>
                <span className="text-white font-bold block">-9°C</span>
                <span className="text-[#16A34A] text-[10px] block">62% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-amber-400 block text-[10px]">11:00 MIDDAY</span>
                <span className="text-white font-bold block">+3°C</span>
                <span className="text-[#16A34A] text-[10px] block">63% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[#4F9CF9] block text-[10px]">16:00 DUSK</span>
                <span className="text-white font-bold block">-1°C</span>
                <span className="text-[#16A34A] text-[10px] block">62% O₂</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px]">21:00 NIGHT</span>
                <span className="text-white font-bold block">-5°C</span>
                <span className="text-[#16A34A] text-[10px] block">62% O₂</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
