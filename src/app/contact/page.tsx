import React from "react";
import { Metadata } from "next";
import { GlassNavbar } from "@/components/GlassNavbar";
import { Footer } from "@/components/Footer";
import { ContactFormClient } from "./ContactFormClient";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Annapurna Base Camp Guesthouse & Trekking",
  description:
    "Get in touch with Annapurna Base Camp Guesthouse (4,130m). Contact us for room reservations, trekking inquiries, altitude guidance, or emergency support.",
  keywords: [
    "Contact Annapurna Guesthouse",
    "Annapurna Base Camp phone number",
    "Nepal trekking inquiry",
    "Himalayan lodge booking contact",
    "Kaski Nepal guesthouse",
  ],
  openGraph: {
    title: "Contact Annapurna Base Camp Guesthouse (4,130m)",
    description:
      "Direct inquiries for luxury Himalayan lodging, trekking guide bookings, and emergency altitude support.",
    url: "https://annapurnabasecamp.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white pt-24">
      <GlassNavbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
            <Compass className="w-4 h-4 text-[#4F9CF9]" />
            <span>24/7 High-Altitude Expedition Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Connect with Annapurna Base Camp
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have questions about room availability, trek preparation, weather telemetry, or emergency rescue? Our sanctuary concierge team is ready to assist you.
          </p>
        </header>

        {/* Top Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl space-y-4 hover:border-[#4F9CF9]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Direct Phone & WhatsApp</h2>
              <p className="text-xs text-slate-300 mt-1">Direct satellite & mobile contact at Base Camp</p>
            </div>
            <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-sm">
              <a href="tel:+9779851000000" className="block text-white hover:text-[#4F9CF9] font-bold">
                +977 9851000000
              </a>
              <a href="https://wa.me/9779851000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#25D366] font-bold text-xs">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl space-y-4 hover:border-[#4F9CF9]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Official Email Inquiries</h2>
              <p className="text-xs text-slate-300 mt-1">Reservations, group bookings & press</p>
            </div>
            <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-sm">
              <a href="mailto:info@annapurnabasecamp.com" className="block text-white hover:text-[#4F9CF9] font-bold">
                info@annapurnabasecamp.com
              </a>
              <span className="text-xs text-slate-400 block">Response within 2 hours</span>
            </div>
          </div>

          <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-xl space-y-4 hover:border-[#4F9CF9]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Base Camp Coordinates</h2>
              <p className="text-xs text-slate-300 mt-1">Himalayan Sanctuary Altitude Desk</p>
            </div>
            <div className="pt-2 border-t border-white/10 text-xs text-slate-300 space-y-1 font-mono">
              <span className="block font-bold text-white">Annapurna Base Camp (4,130m)</span>
              <span>Ghandruk / Kaski District, Nepal</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Interactive Form & Emergency Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-300">
                Fill out the inquiry form below for custom itineraries, room reservations, or altitude support.
              </p>
            </div>

            <ContactFormClient />
          </div>

          {/* Right Column: High Altitude Emergency & Map Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#395371] p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Altitude Rescue & Emergency Desk</h3>
                  <span className="text-[10px] font-mono text-red-300 uppercase">SATELLITE SOS CONNECTIVITY</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our guesthouse is equipped with satellite emergency radio and direct liaison with Pokhara Helicopter Rescue Services. For urgent altitude sickness or emergency medical evacuation assistance while on the trek, contact our emergency line immediately.
              </p>
              <div className="bg-black/40 p-4 rounded-2xl border border-white/10 text-xs font-mono space-y-1">
                <span className="text-slate-400 block">Emergency Helicopter Line:</span>
                <span className="text-emerald-400 font-bold text-sm block">+977 9801234567</span>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 space-y-3">
              <h4 className="text-sm font-bold text-[#4F9CF9] flex items-center gap-2">
                <Clock className="w-4 h-4" /> Operational Timings
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 font-mono">
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>Front Desk:</span>
                  <span className="text-white">24 Hours / 7 Days</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-1">
                  <span>Dining Hall:</span>
                  <span className="text-white">5:00 AM – 9:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sat Phone Desk:</span>
                  <span className="text-white">6:00 AM – 9:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
