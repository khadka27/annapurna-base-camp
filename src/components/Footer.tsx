"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold">
                🏔️
              </div>
              <span className="font-bold text-lg text-white">
                ANNAPURNA <span className="text-[#4F9CF9]">ABC</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official Annapurna Sanctuary Trekking Expeditions based in Pokhara & Kathmandu, Nepal. Dedicated to sustainable high-altitude tourism.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#overview" className="hover:text-white transition-colors">Trek Overview</a></li>
              <li><a href="#itinerary" className="hover:text-white transition-colors">10-Day Route Map</a></li>
              <li><a href="#highlights" className="hover:text-white transition-colors">Key Highlights</a></li>
              <li><a href="#preparation" className="hover:text-white transition-colors">Gear & AMS Safety</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Cost Estimator</a></li>
            </ul>
          </div>

          {/* Permit & Safety Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#16A34A] uppercase tracking-wider">Trekking Permits</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>ACAP (Annapurna Conservation Area Permit)</li>
              <li>TIMS (Trekkers&apos; Information Management System)</li>
              <li>Emergency Evacuation & Helicopter Response</li>
              <li>Certified Nepal Mountaineering Association Guides</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F97316] uppercase tracking-wider">Himalayan Base Office</h4>
            <div className="text-xs text-slate-300 space-y-1.5 font-mono">
              <p>Lakeside-6, Pokhara 33700, Nepal</p>
              <p>Phone: +977 61 465890</p>
              <p>Email: expedition@annapurna-abc.com</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & palette preview badge */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Annapurna Base Camp Trekking. All rights reserved.</p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>THEME:</span>
            <span className="w-3 h-3 rounded-full bg-[#0F172A] border border-white/20" title="Deep Alpine Blue" />
            <span className="w-3 h-3 rounded-full bg-[#4F9CF9]" title="Glacier Blue" />
            <span className="w-3 h-3 rounded-full bg-[#16A34A]" title="Emerald Pine" />
            <span className="w-3 h-3 rounded-full bg-[#F97316]" title="Sunrise Orange" />
            <span className="w-3 h-3 rounded-full bg-[#F8FAFC]" title="Snow White" />
          </div>
        </div>
      </div>
    </footer>
  );
}
