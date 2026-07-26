/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trees, Star, Award, Phone, Camera, Check, Sparkles, X, CheckSquare, MessageSquare } from "lucide-react";
import { useCms } from "@/context/CmsContext";

export function Footer() {
  const { heroConfig } = useCms();
  const [cookieAccepted, setCookieAccepted] = useState<boolean>(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookie consent
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setCookieAccepted(false);
    }
  }, []);

  const handleDismissCookie = () => {
    localStorage.setItem("cookie_consent", "true");
    setCookieAccepted(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setSubscriberName("");
      setSubscriberEmail("");
    }, 5000);
  };



  return (
    <footer className="relative bg-[#395371] text-white">
      {/* 1. TOP BANNER BOX: Did not find the perfect trip? No worries! */}
      <div className="bg-[#B6C7D5] pt-10 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-[#395371] rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-5 text-center md:text-left">
            {/* SVG Compass & Peak Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-[#486488] flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l9-18 9 18H3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Did not find the perfect trip? No worries!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact us to start planning your tailor-made dream trip!
              </p>
            </div>
          </div>

          <a
            href="#calculator"
            className="px-6 py-3 rounded-xl bg-[#CBD7E3] hover:bg-white text-[#1E293B] font-extrabold text-xs tracking-wider uppercase shadow-lg transition-all whitespace-nowrap"
          >
            PLAN YOUR TRIP
          </a>
        </div>
      </div>

      {/* 2. ASSOCIATED WITH & RECOMMENDED ON SECTION */}
      <div className="bg-[#B6C7D5] py-8 border-b border-slate-400/30 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Associated with */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Associated with
            </h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
              {/* Logo 1: Nepal Gov / TAAN emblem */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
                  🇳🇵
                </div>
                <div className="text-[10px] font-bold text-slate-800 leading-tight">
                  GOV / TAAN
                  <span className="block text-[8px] font-normal text-slate-500">MEMBER</span>
                </div>
              </div>

              {/* Logo 2: NTB (Nepal Tourism Board) */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <svg className="w-6 h-6 text-[#1E3E66]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" />
                </svg>
                <div className="text-[10px] font-bold text-slate-800 leading-tight">
                  NTB NEPAL
                  <span className="block text-[8px] font-normal text-slate-500">TOURISM BOARD</span>
                </div>
              </div>

              {/* Logo 3: NMA */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <div className="w-6 h-6 rounded bg-[#1E3E66] text-white font-mono font-bold text-[9px] flex items-center justify-center">
                  NMA
                </div>
                <div className="text-[10px] font-bold text-slate-800 leading-tight">
                  NMA NEPAL
                  <span className="block text-[8px] font-normal text-slate-500">MOUNTAINEERING</span>
                </div>
              </div>

              {/* Logo 4: KEEP */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                  <Trees className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] font-bold text-slate-800 leading-tight">
                  KEEP PROJECT
                  <span className="block text-[8px] font-normal text-slate-500">KATHMANDU ECO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended On */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Recommended On
            </h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Google Reviews Badge */}
              <div className="bg-white/90 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2.5">
                <div className="text-lg font-black text-blue-600">G</div>
                <div>
                  <div className="text-[9px] font-extrabold uppercase text-slate-700 tracking-wider">
                    CUSTOMER REVIEWS ON
                  </div>
                  <div className="text-[11px] font-extrabold text-blue-600 tracking-widest leading-none">
                    GOOGLE
                  </div>
                  <div className="flex text-amber-400 text-[10px] gap-0.5 mt-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                  </div>
                </div>
              </div>

              {/* TripAdvisor Badge */}
              <div className="bg-white/90 px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#34E0A1] text-[#004F32] font-extrabold text-xs flex items-center justify-center">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#004F32] tracking-tight">
                    tripadvisor
                  </div>
                  <div className="flex text-[#34E0A1] text-[10px] gap-0.5">
                    ●●●●●
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LAYERED MOUNTAIN SILHOUETTE GRAPHIC OVERLAY */}
      <div className="bg-[#B6C7D5] relative h-20 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-full text-[#102542]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Layer 1 - Light Blue Mountain Ridge */}
          <path
            d="M0,120 L0,70 Q 200,20 400,60 T 800,40 T 1200,80 L1200,120 Z"
            fill="#7998B8"
            opacity="0.5"
          />
          {/* Layer 2 - Medium Mountain Ridge */}
          <path
            d="M0,120 L0,85 Q 300,30 600,75 T 1200,50 L1200,120 Z"
            fill="#3B5980"
            opacity="0.75"
          />
          {/* Layer 3 - Main Dark Footer Base Silhouette */}
          <path
            d="M0,120 L0,95 Q 250,55 500,85 T 1000,70 L1200,90 L1200,120 Z"
            fill="#102542"
          />
        </svg>
      </div>

      {/* 4. MAIN NAVY BLUE FOOTER CONTENT */}
      <div className="bg-[#102542] pt-6 pb-16 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Column 1: NEED HELP? (4 cols) */}
            <div className="md:col-span-4 space-y-6">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
                NEED HELP?
              </h4>

              {/* Phone Contacts */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-white block">
                  Call us, we&apos;re at your service
                </span>
                <div className="space-y-1 text-xs text-slate-300 font-mono">
                  <a
                    href={`https://wa.me/${(heroConfig.whatsappNumber || "9779851055520").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> +{heroConfig.whatsappNumber || "977 98510 55520"} (WhatsApp)
                  </a>
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> +977 9841 986923 (Rajendra)
                  </p>
                </div>
              </div>

              {/* Email Drop Message */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">
                  Drop a Message
                </span>
                <a
                  href="mailto:info@nepalgatewaytrekking.com"
                  className="text-xs text-slate-300 hover:text-[#4F9CF9] transition-colors block font-mono"
                >
                  info@nepalgatewaytrekking.com
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-white block">
                  Stay Connected
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877F2] hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    f
                  </a>
                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-black hover:bg-slate-900 border border-slate-700 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    𝕏
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#0A66C2] hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    in
                  </a>
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#FF0000] hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    ▶
                  </a>
                  {/* Pinterest */}
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#E60023] hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-all shadow-md"
                  >
                    P
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: QUICK EXPLORE (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
                QUICK EXPLORE
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                {/* Sub-column 1 */}
                <ul className="space-y-2.5">
                  <li><Link href="/" className="hover:text-white transition-colors">Destinations</Link></li>
                  <li><Link href="/rooms" className="hover:text-white transition-colors">Luxury Suites</Link></li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/trek" className="hover:text-white transition-colors">Trekking Route</Link></li>
                  <li><Link href="/experiences" className="hover:text-white transition-colors">Sanctuary Experience</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors font-bold text-[#4F9CF9]">Contact Us</Link></li>
                </ul>

                {/* Sub-column 2 */}
                <ul className="space-y-2.5">
                  <li><Link href="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link></li>
                  <li><Link href="/experiences" className="hover:text-white transition-colors font-semibold">Reviews & Telemetry</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/cancellation-policy" className="hover:text-white transition-colors text-amber-300 font-semibold">Cancellation Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 4: SUBSCRIBE OUR NEWSLETTER (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
                SUBSCRIBE OUR NEWSLETTER
              </h4>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={subscriberName}
                    onChange={(e) => setSubscriberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#223B5C]/70 border border-slate-600/50 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F9CF9] transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#223B5C]/70 border border-slate-600/50 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F9CF9] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  {subscribed ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[3]" /> SUBSCRIBED!
                    </span>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </form>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Get regular travel inspiration and deals straight to your inbox from NGT experts
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* 6. BOTTOM COOKIE CONSENT BAR (Fixed at bottom) */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#E2E8F0] border-t border-slate-300 py-3 px-4 sm:px-8 text-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl text-xs">
          {/* Cookie text */}
          <div className="text-center md:text-left text-slate-700">
            We use cookies to ensure that we give you the best experience on our website.
          </div>

          {/* Accepted Payment Icons in Center */}
          <div className="flex items-center gap-2 opacity-80">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">WE ACCEPT:</span>
            <span className="px-2 py-0.5 rounded bg-white text-[10px] font-extrabold text-blue-900 border border-slate-300">VISA</span>
            <span className="px-2 py-0.5 rounded bg-white text-[10px] font-extrabold text-red-600 border border-slate-300">MC</span>
            <span className="px-2 py-0.5 rounded bg-white text-[10px] font-extrabold text-blue-600 border border-slate-300">AMEX</span>
            <span className="px-2 py-0.5 rounded bg-white text-[10px] font-extrabold text-emerald-700 border border-slate-300">eSewa</span>
          </div>

          {/* Actions on Right */}
          <div className="flex items-center gap-3">
            <a href="#welcome" className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold underline text-xs">
              <CheckSquare className="w-3.5 h-3.5 text-slate-700" /> Privacy Policy
            </a>

            <button
              onClick={handleDismissCookie}
              className="px-4 py-1.5 rounded-lg bg-[#102542] hover:bg-[#1A3860] text-white font-bold text-xs transition-colors shadow-sm"
            >
              Allow Cookies
            </button>

            <button
              onClick={handleDismissCookie}
              className="w-6 h-6 rounded-full bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-xs flex items-center justify-center transition-colors"
              aria-label="Close Cookie Banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
