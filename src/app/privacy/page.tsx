import React from "react";
import { Metadata } from "next";
import { GlassNavbar } from "@/components/GlassNavbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Annapurna Base Camp Guesthouse",
  description:
    "Official Privacy Policy for Annapurna Base Camp Guesthouse (4,130m). Learn how we collect, protect, and handle guest reservation and contact data.",
  openGraph: {
    title: "Privacy Policy | Annapurna Base Camp Guesthouse",
    description: "Data privacy practices and protection standards at Annapurna Base Camp Guesthouse.",
    url: "https://annapurnabasecamp.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white pt-24">
      <GlassNavbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        {/* Page Header */}
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
            <Lock className="w-4 h-4 text-[#4F9CF9]" />
            <span>Data Protection & Privacy Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-300">
            LAST REVISED: JULY 2026 • ANNAPURNA SANCTUARY EXPEDITIONS
          </p>
        </header>

        {/* Content Section */}
        <div className="bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-8 leading-relaxed text-sm text-slate-200">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#4F9CF9]" /> 1. Overview & Data Controller
            </h2>
            <p>
              Annapurna Base Camp Guesthouse (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates high-altitude mountain lodging at 4,130 meters in the Annapurna Sanctuary, Kaski, Nepal. This Privacy Policy explains how we collect, store, and safeguard guest information submitted through our official web application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4F9CF9]" /> 2. Information We Collect
            </h2>
            <p>When you book a room or contact our expedition desk, we collect:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li><strong>Contact Information:</strong> Full name, email address, and WhatsApp/phone number.</li>
              <li><strong>Reservation Details:</strong> Check-in/check-out dates, room suite category, guest count, and promotional coupon codes.</li>
              <li><strong>Emergency Contact Details:</strong> Emergency contact information required for altitude safety and helicopter rescue liaisons.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#4F9CF9]" /> 3. How We Use Your Data
            </h2>
            <p>Your information is strictly processed for the following operational purposes:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-300">
              <li>Processing, confirming, and managing your high-altitude room reservations.</li>
              <li>Communicating via satellite dispatch and WhatsApp regarding trek conditions, room keys, and weather updates.</li>
              <li>Coordinating emergency medical evacuation with Annapurna Helicopter Rescue Desk if altitude illness occurs.</li>
              <li>We <strong>never sell, rent, or lease</strong> guest personal information to third-party advertisers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#4F9CF9]" /> 4. Data Security & Storage
            </h2>
            <p>
              All guest reservation records are stored in encrypted PostgreSQL database instances protected by SSL encryption. Access is restricted to authorized guesthouse administration staff.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-lg font-bold text-white">5. Contact Us Regarding Your Privacy</h2>
            <p className="text-xs">
              If you have any questions or wish to delete your reservation records, contact our Privacy Desk at <a href="mailto:privacy@annapurnabasecamp.com" className="text-[#4F9CF9] font-mono underline">privacy@annapurnabasecamp.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
