"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold">
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-extrabold text-lg text-white">
                ANNAPURNA <span className="text-[#4F9CF9]">GUESTHOUSE</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs italic font-semibold">
              A Warm Welcome Above the Clouds.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Experience authentic Himalayan hospitality at Annapurna Base Camp, where every sunrise brings unforgettable mountain views and every stay becomes part of your adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Luxury Rooms</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Photo & Video Gallery</Link></li>
              <li><Link href="/experiences" className="hover:text-white transition-colors">Sanctuary Experiences</Link></li>
              <li><Link href="/trek" className="hover:text-white transition-colors">10-Day ABC Trek Guide</Link></li>
            </ul>
          </div>

          {/* Permits & Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#16A34A] uppercase tracking-wider">Trekking Info</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>ACAP & TIMS Permit Information</li>
              <li>Spring & Autumn Expedition Booking</li>
              <li>Emergency Evacuation Protocol</li>
              <li>Certified Himalayan Guides</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#F97316] uppercase tracking-wider">Base Camp Office</h4>
            <div className="text-xs text-slate-300 space-y-1.5 font-mono">
              <p>Annapurna Base Camp (4,130m), Nepal</p>
              <p>Phone: +977 61 465890</p>
              <p>Email: stay@annapurna-guesthouse.com</p>
            </div>
          </div>
        </div>

        {/* SEO Text Banner */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
          <strong className="text-white block font-bold text-sm">Stay at Annapurna Guesthouse, Annapurna Base Camp</strong>
          <p className="leading-relaxed text-slate-400">
            Looking for comfortable accommodation at Annapurna Base Camp? Annapurna Guesthouse offers cozy mountain lodging, warm hospitality, delicious local meals, and breathtaking Himalayan views at 4,130 meters. Book your stay and experience the beauty of Nepal&apos;s iconic Annapurna Sanctuary.
          </p>
        </div>

        {/* Bottom copyright & palette preview badge */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Annapurna Guesthouse. All rights reserved.</p>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>PALETTE:</span>
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
