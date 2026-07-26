"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms } from "@/context/CmsContext";
import { Settings, Save, Check } from "lucide-react";

export default function AdminHeroPage() {
  const { heroConfig, updateHeroConfig } = useCms();

  const [heroTitle, setHeroTitle] = useState(heroConfig.title);
  const [heroSubtitle, setHeroSubtitle] = useState(heroConfig.subtitle);
  const [heroBadge, setHeroBadge] = useState(heroConfig.badge);
  const [autoSpeed, setAutoSpeed] = useState(heroConfig.autoSlideSpeed);
  const [whatsappNumber, setWhatsappNumber] = useState(heroConfig.whatsappNumber || "9779851055520");
  const [saved, setSaved] = useState(false);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHeroConfig({
      title: heroTitle,
      subtitle: heroSubtitle,
      badge: heroBadge,
      autoSlideSpeed: Number(autoSpeed),
      whatsappNumber: whatsappNumber,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Settings className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Hero Content & System Settings CMS
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                LIVE BRANDING, HERO BANNER & OFFICIAL WHATSAPP DISPATCH NUMBER
              </span>
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-[#16A34A]/20 border border-[#16A34A] text-[#16A34A] text-sm font-bold flex items-center gap-2 animate-fade-in">
            <Check className="w-5 h-5" />
            <span>Settings saved successfully to PostgreSQL database!</span>
          </div>
        )}

        {/* Hero & Settings Form */}
        <form onSubmit={handleSaveHero} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider">
            General Website & Hero Banner Settings
          </h2>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Main Hero Heading</label>
            <input
              type="text"
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Subtitle Description</label>
            <textarea
              rows={3}
              required
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Hero Top Badge Text</label>
              <input
                type="text"
                required
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Auto-Slide Duration (ms)</label>
              <input
                type="number"
                required
                value={autoSpeed}
                onChange={(e) => setAutoSpeed(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
          </div>

          {/* Official WhatsApp Dispatch Number */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <label className="text-xs text-[#25D366] font-bold block uppercase tracking-wider">
              Expedition Official WhatsApp Phone Number (e.g. 9779851055520)
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="9779851055520"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-[#25D366]/30 text-white text-sm focus:border-[#25D366]"
            />
            <span className="text-xs text-slate-400 block font-mono">
              When guests submit reservations on the website, booking details will be dispatched to this WhatsApp contact.
            </span>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#ea6200] text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Live</span>
          </button>
        </form>
      </main>
    </div>
  );
}
