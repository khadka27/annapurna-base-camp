import React from "react";
import { Metadata } from "next";
import { GlassNavbar } from "@/components/GlassNavbar";
import { Footer } from "@/components/Footer";
import { Scale, AlertTriangle, CheckCircle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Annapurna Base Camp Guesthouse",
  description:
    "Official Terms of Service and Stay Conditions at Annapurna Base Camp Guesthouse (4,130m). Read reservation guidelines, altitude safety rules, and stay terms.",
  openGraph: {
    title: "Terms & Conditions | Annapurna Base Camp Guesthouse",
    description: "Terms of service, altitude safety disclaimers, and room stay policies.",
    url: "https://annapurnabasecamp.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white pt-24">
      <GlassNavbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        {/* Header */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
            <Scale className="w-4 h-4 text-[#4F9CF9]" />
            <span>Official Guest Stay Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs font-mono text-slate-300">
            SANCTUARY LODGING GOVERNANCE • REVISED JULY 2026
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-8 leading-relaxed text-sm text-slate-200">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#4F9CF9]" /> 1. Reservation & Confirmation
            </h2>
            <p>
              By booking a suite at Annapurna Base Camp Guesthouse (4,130m), guests agree to abide by these Terms & Conditions. All room reservations submitted online enter an initial <strong>Pending</strong> status and become binding upon Admin confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F97316]" /> 2. Altitude Safety & Medical Disclaimer
            </h2>
            <p>
              Annapurna Base Camp is situated at 4,130 meters above sea level where atmospheric pressure is significantly reduced. Guests acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li>Acute Mountain Sickness (AMS) and high-altitude health risks are inherent to trekking in the Annapurna Sanctuary.</li>
              <li>Guests are responsible for their physical fitness, proper acclimatization, and appropriate thermal gear.</li>
              <li>Our guesthouse staff reserve the right to recommend immediate descent or emergency helicopter evacuation if a guest shows severe symptoms of HAPE or HACE.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4F9CF9]" /> 3. Guest Conduct & Sanctuary Rules
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li><strong>Environmental Preservation:</strong> Single-use plastic disposal and littering inside the Annapurna Conservation Area (ACAP) are strictly prohibited.</li>
              <li><strong>Quiet Hours:</strong> To ensure rest for trekkers, quiet hours are enforced in all suites and dormitories from 9:30 PM to 5:00 AM.</li>
              <li><strong>Check-In / Check-Out:</strong> Standard check-in begins at 12:00 PM; check-out is by 10:00 AM on the morning of departure.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-lg font-bold text-white">4. Force Majeure & Weather Delays</h2>
            <p className="text-xs">
              Extreme Himalayan weather, avalanches, landslide path closures, or emergency government advisories are events of Force Majeure. While we assist with rescheduling, the guesthouse is not liable for indirect travel delay expenses.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
