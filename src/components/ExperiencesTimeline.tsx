"use client";

import React from "react";

const EXPERIENCES = [
  {
    time: "05:30 AM",
    title: "Summit Sunrise Deck Tea & Coffee",
    tag: "MORNING RITUAL",
    description:
      "Sip hot Himalayan masala tea or single-origin espresso on our glass-encased heated deck as golden dawn light hits the 8,091m summit of Annapurna I.",
    accent: "border-[#F97316] text-[#F97316]",
    iconSvg: (
      <svg className="w-5 h-5 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    time: "01:00 PM",
    title: "Gourmet High-Altitude Dining",
    tag: "CULINARY EXCELLENCE",
    description:
      "Relish organic Sherpa stew, truffle yak cheese fondue, and freshly baked mountain apple pies prepared by our expedition chef at 4,130m.",
    accent: "border-[#16A34A] text-[#16A34A]",
    iconSvg: (
      <svg className="w-5 h-5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    time: "04:30 PM",
    title: "Oxygen-Enriched Thermal Bathing",
    tag: "RECOVERY & SPA",
    description:
      "Relax in our private heated thermal tubs equipped with supplementary oxygen diffusion to ensure optimal acclimatization.",
    accent: "border-[#4F9CF9] text-[#4F9CF9]",
    iconSvg: (
      <svg className="w-5 h-5 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    time: "08:30 PM",
    title: "Zero Light-Pollution Stargazing",
    tag: "ASTRO EXPEDITION",
    description:
      "Observe the crystal-clear Milky Way galaxy and shooting stars above the Himalayan peak silhouette through our high-power telescope.",
    accent: "border-white text-white",
    iconSvg: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export function ExperiencesTimeline() {
  return (
    <section id="experiences" className="py-24 bg-[#395371] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
            <span>Sanctuary Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Experience the Majesty of the Himalayas
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Surrounded by Annapurna I, Machhapuchhre, Hiunchuli, and Annapurna South, every moment at Annapurna Guesthouse offers breathtaking scenery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="glass-card-dark p-6 sm:p-8 rounded-3xl border border-white/15 hover:border-white/30 transition-all duration-300 space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-300">
                    {exp.time}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {exp.iconSvg}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`text-[10px] font-mono font-bold block ${exp.accent}`}>
                    {exp.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4F9CF9] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                Inclusive for Guesthouse Guests
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
