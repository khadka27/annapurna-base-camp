import React from "react";
import { Metadata } from "next";
import { GlassNavbar } from "@/components/GlassNavbar";
import { Footer } from "@/components/Footer";
import { RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Annapurna Base Camp Guesthouse",
  description:
    "Official Cancellation & Refund Policy for room reservations at Annapurna Base Camp Guesthouse. Learn about refund percentages, weather rescheduling, and cancellation rules.",
  openGraph: {
    title: "Cancellation & Refund Policy | Annapurna Base Camp Guesthouse",
    description: "Transparent reservation cancellation timeline and weather refund rules.",
    url: "https://annapurnabasecamp.com/cancellation-policy",
  },
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white pt-24">
      <GlassNavbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        {/* Header */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
            <RefreshCw className="w-4 h-4 text-[#4F9CF9]" />
            <span>Transparent Refund Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs font-mono text-slate-300">
            TRANSPARENT RESERVATION CANCELLATION TIMELINE • REVISED JULY 2026
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-8 leading-relaxed text-sm text-slate-200">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4F9CF9]" /> 1. Standard Cancellation Timeline
            </h2>
            <p>
              We understand that high-altitude trekking plans may change due to physical condition, mountain weather, or flight schedules. Cancellations are subject to the following scale:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/5 p-4 rounded-2xl border border-emerald-500/40 text-center space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-bold block">7+ DAYS BEFORE CHECK-IN</span>
                <span className="text-2xl font-extrabold text-emerald-300 block">100% Refund</span>
                <span className="text-[11px] text-slate-300">Full refund or free date modification</span>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/40 text-center space-y-1">
                <span className="text-xs font-mono text-amber-400 font-bold block">3 TO 6 DAYS BEFORE CHECK-IN</span>
                <span className="text-2xl font-extrabold text-amber-300 block">75% Refund</span>
                <span className="text-[11px] text-slate-300">25% administrative fee retained</span>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-red-500/40 text-center space-y-1">
                <span className="text-xs font-mono text-red-400 font-bold block">LESS THAN 48 HOURS</span>
                <span className="text-2xl font-extrabold text-red-300 block">50% Credit</span>
                <span className="text-[11px] text-slate-300">Credit voucher for future season</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#16A34A]" /> 2. Weather & Flight Interruption Exceptions
            </h2>
            <p>
              If your cancellation or delay is caused by severe snowstorms, avalanche warnings, Pokhara/Kathmandu flight cancellations, or ACAP trail closures:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li>You may reschedule your room dates to any alternative day in the current or upcoming trekking season without penalty.</li>
              <li>Or receive a <strong>100% full refund</strong> with official flight/weather cancellation documentation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#4F9CF9]" /> 3. How to Request a Cancellation
            </h2>
            <p>
              To cancel or modify a booking, email us at <a href="mailto:bookings@annapurnabasecamp.com" className="text-[#4F9CF9] font-mono underline">bookings@annapurnabasecamp.com</a> or message our WhatsApp desk at <strong className="text-emerald-400 font-mono">+977 9851000000</strong> with your Booking Reference ID. Refunds are returned to the original payment method within 3–5 business days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
