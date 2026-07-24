"use client";

import React, { useState } from "react";

interface ItineraryDay {
  day: number;
  title: string;
  startElev: string;
  endElev: string;
  altitudeGain: string;
  distance: string;
  duration: string;
  terrain: string;
  overnight: string;
  highlights: string[];
  description: string;
}

const ITINERARY_DATA: ItineraryDay[] = [
  {
    day: 1,
    title: "Pokhara to Nayapul Drive & Trek to Tikhedhunga",
    startElev: "820m",
    endElev: "1,540m",
    altitudeGain: "+720m",
    distance: "9 km",
    duration: "4 hours",
    terrain: "Cobblestone trails, river banks & terraced farmland",
    overnight: "Tikhedhunga Tea House Lodge",
    highlights: [
      "Scenic drive from Pokhara along Modi Khola river",
      "Check-in at Birethanti ACAP & TIMS permits counter",
      "Crossing suspension bridges over Bhurungdi Stream",
    ],
    description:
      "Your journey begins with a 1.5-hour drive from Pokhara to Nayapul. Clear check-in formalities and begin walking along gentle terraced slopes and cascading waterfalls towards Tikhedhunga.",
  },
  {
    day: 2,
    title: "Tikhedhunga to Ghorepani via Ulleri Steps",
    startElev: "1,540m",
    endElev: "2,860m",
    altitudeGain: "+1,320m",
    distance: "13 km",
    duration: "6 hours",
    terrain: "3,300+ Stone Steps, Oak & Rhododendron Forest",
    overnight: "Ghorepani Village Tea House",
    highlights: [
      "Conquering the famous 3,300 Ulleri stone staircases",
      "Dense oak and blooming red rhododendron forests",
      "First panoramic glimpses of Annapurna South & Hiunchuli",
    ],
    description:
      "Trek steeply upward via the iconic 3,300 stone steps of Ulleri. Ascend through lush alpine forest ecosystems into the traditional Magar village of Ghorepani.",
  },
  {
    day: 3,
    title: "Poon Hill Sunrise (3,210m) & Trek to Tadapani",
    startElev: "2,860m",
    endElev: "2,630m",
    altitudeGain: "Peak 3,210m",
    distance: "11 km",
    duration: "6 hours",
    terrain: "Ridge walks, pine forest, forest descends",
    overnight: "Tadapani Mountain View Lodge",
    highlights: [
      "Dawn hike to Poon Hill (3,210m) for golden sunrise over Dhaulagiri & Annapurna I",
      "360-degree panorama of over 14 Himalayan giants",
      "Enchanting forest ridge walk through Deurali Pass",
    ],
    description:
      "Early 4:30 AM pre-dawn trek to Poon Hill to watch golden rays illuminate Dhaulagiri (8,167m) and Annapurna I (8,091m). Return to Ghorepani for breakfast before trekking onwards to Tadapani.",
  },
  {
    day: 4,
    title: "Tadapani to Chhomrong Village",
    startElev: "2,630m",
    endElev: "2,170m",
    altitudeGain: "-460m net",
    distance: "10 km",
    duration: "5 hours",
    terrain: "River gorge descends & stone steps ascent",
    overnight: "Chhomrong Gurung Lodge",
    highlights: [
      "Close-up views of Machhapuchhre (Fishtail, 6,993m)",
      "Crossing the Kimrong Khola river via wooden bridge",
      "Exploring Chhomrong - gateway village to the Annapurna Sanctuary",
    ],
    description:
      "Descend into the steep Kimrong Khola gorge through sub-tropical forest, followed by a steady stair climb to Chhomrong village perched right underneath Fishtail peak.",
  },
  {
    day: 5,
    title: "Chhomrong to Dovan via Bamboo Forest",
    startElev: "2,170m",
    endElev: "2,600m",
    altitudeGain: "+430m",
    distance: "11 km",
    duration: "6 hours",
    terrain: "Steep gorge steps, dense bamboo thickets",
    overnight: "Dovan Riverside Lodge",
    highlights: [
      "2,500 Chhomrong stone steps descent into Modi Khola Valley",
      "Dense fragrant bamboo and damp mossy oak sanctuaries",
      "Passing Sinuwa ridge viewpoint and spot monkeys & alpine wildlife",
    ],
    description:
      "Descend Chhomrong's stone staircase and cross the Chhomrong Khola. Ascend Sinuwa ridge and plunge deep into the narrow, cool Modi Khola river valley.",
  },
  {
    day: 6,
    title: "Dovan to Deurali Alpine Sanctuary Base",
    startElev: "2,600m",
    endElev: "3,200m",
    altitudeGain: "+600m",
    distance: "8 km",
    duration: "5 hours",
    terrain: "Narrow river canyon, avalanche paths, rocky trails",
    overnight: "Deurali Guest House",
    highlights: [
      "Himalaya Hotel & Hinku Cave natural overhang",
      "Transition from dense tree line to alpine scrub landscape",
      "Rushing glacier melt river and dramatic sheer rock walls",
    ],
    description:
      "Trek steadily upwards alongside the roaring Modi River. Pass Hinku Cave and reach Deurali where the alpine valley opens up into dramatic glacial rock amphitheaters.",
  },
  {
    day: 7,
    title: "Deurali to Machhapuchhre BC & Annapurna Base Camp",
    startElev: "3,200m",
    endElev: "4,130m",
    altitudeGain: "+930m",
    distance: "9 km",
    duration: "6 hours",
    terrain: "Glacial moraine, alpine meadow, snow/ice paths",
    overnight: "Annapurna Base Camp Sanctuary Lodge",
    highlights: [
      "Reaching Machhapuchhre Base Camp (MBC - 3,700m)",
      "Entering the sacred 360-degree Annapurna Mountain Sanctuary",
      "Sunset over Annapurna I (8,091m) & Annapurna South directly above",
    ],
    description:
      "A monumentally rewarding day! Trek up the narrow valley floor to MBC (3,700m), then make the final gradual climb into Annapurna Base Camp (4,130m) surrounded by towering 8,000m summits.",
  },
  {
    day: 8,
    title: "ABC Sunrise View & Descend to Bamboo",
    startElev: "4,130m",
    endElev: "2,310m",
    altitudeGain: "-1,820m",
    distance: "15 km",
    duration: "7 hours",
    terrain: "Descending mountain trails & stone steps",
    overnight: "Bamboo Eco Lodge",
    highlights: [
      "Unforgettable sunrise over the Annapurna glacier massifs",
      "360 degree morning photography at 4,130m altitude",
      "Descending through MBC, Deurali, and Himalaya down to Bamboo",
    ],
    description:
      "Wake up early to catch the golden morning light painting Annapurna I, South, and Machhapuchhre. After breakfast, begin the long descending journey back to Bamboo village.",
  },
  {
    day: 9,
    title: "Bamboo to Jhinu Danda Hot Springs",
    startElev: "2,310m",
    endElev: "1,780m",
    altitudeGain: "-530m",
    distance: "10 km",
    duration: "5 hours",
    terrain: "Stone stairs, river bridge, forest path",
    overnight: "Jhinu Danda Hot Spring Lodge",
    highlights: [
      "Ascending Sinuwa and Chhomrong stairs",
      "Soaking sore trekking muscles in natural riverside geothermal hot springs",
      "Walk across the spectacular long Jhinu suspension bridge",
    ],
    description:
      "Trek back up and over Sinuwa and Chhomrong village, then descend steeply to Jhinu Danda. Spend the afternoon soaking in natural hot springs right beside the Modi River.",
  },
  {
    day: 10,
    title: "Jhinu Danda to Nayapul & Drive back to Pokhara",
    startElev: "1,780m",
    endElev: "820m",
    altitudeGain: "-960m",
    distance: "9 km",
    duration: "4 hours",
    terrain: "Dirt roads, river valley trail & drive",
    overnight: "Pokhara Lakeside Hotel",
    highlights: [
      "Final stretch walking past Gurung farmlands and mountain rivers",
      "Completion of 115 km Annapurna Sanctuary Circuit",
      "Celebration dinner and lake relaxation in Pokhara",
    ],
    description:
      "Walk the final easy trail along the Modi Khola to Nayapul/Siwai. Meet private transport for a scenic 2-hour drive back to Pokhara, marking the triumphant conclusion of your trek!",
  },
];

export function ItineraryExplorer() {
  const [selectedDay, setSelectedDay] = useState<number>(7);

  const activeDayData =
    ITINERARY_DATA.find((d) => d.day === selectedDay) || ITINERARY_DATA[6];

  return (
    <section id="itinerary" className="py-24 bg-[#F8FAFC] text-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider">
            <span>Detailed Day-by-Day Trekking Route</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            10-Day Annapurna Base Camp Route Map
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            Follow the elevation profile from sub-tropical valley floors at 820m up into the glacier amphitheater of ABC at 4,130m.
          </p>
        </div>

        {/* Day Buttons Horizontal Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {ITINERARY_DATA.map((item) => {
            const isSelected = item.day === selectedDay;
            const isApexDay = item.day === 7;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`flex-shrink-0 px-4 py-3 rounded-2xl transition-all text-left flex flex-col justify-between border ${
                  isSelected
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-lg shadow-[#0F172A]/20 scale-105"
                    : "bg-white text-[#0F172A] border-slate-200 hover:border-[#4F9CF9]/50 hover:bg-white/80"
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span
                    className={`font-mono font-bold ${
                      isSelected ? "text-[#4F9CF9]" : "text-[#64748B]"
                    }`}
                  >
                    DAY {item.day}
                  </span>
                  {isApexDay && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F97316] text-white">
                      SUMMIT
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold mt-1 line-clamp-1 max-w-[140px]">
                  {item.endElev}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Detail Panel */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold font-mono text-[#F97316] uppercase tracking-wider">
                  Day {activeDayData.day} of 10
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A] mt-1">
                  {activeDayData.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#F8FAFC] px-4 py-2 rounded-xl border border-slate-200 text-center">
                  <span className="block text-[10px] font-mono text-[#64748B]">Target Altitude</span>
                  <span className="text-lg font-bold text-[#0F172A]">{activeDayData.endElev}</span>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <div>
                <span className="text-xs text-[#64748B] block">Walking Time</span>
                <span className="text-sm font-bold text-[#0F172A]">{activeDayData.duration}</span>
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">Distance</span>
                <span className="text-sm font-bold text-[#0F172A]">{activeDayData.distance}</span>
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">Elevation Gain</span>
                <span className="text-sm font-bold text-[#16A34A]">{activeDayData.altitudeGain}</span>
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">Overnight Stay</span>
                <span className="text-sm font-bold text-[#4F9CF9]">{activeDayData.overnight}</span>
              </div>
            </div>

            {/* Day Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Trek Overview</h4>
              <p className="text-[#64748B] leading-relaxed text-base">
                {activeDayData.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDayData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-[#0F172A] bg-[#F8FAFC] p-3 rounded-xl border border-slate-200">
                    <span className="text-[#16A34A] font-bold mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terrain Bar */}
            <div className="pt-2 text-xs text-[#64748B] flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">Terrain:</span>
              <span>{activeDayData.terrain}</span>
            </div>
          </div>

          {/* Right Altitude Visualizer & Stats Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dark Alpine Summary Card */}
            <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F9CF9]/20 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold flex items-center justify-between">
                <span>Elevation Profile</span>
                <span className="text-xs font-mono text-[#4F9CF9]">ABC HIGHWAY</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Pokhara (820m)</span>
                  <span className="font-bold text-[#F97316]">ABC (4,130m)</span>
                </div>

                {/* Simulated Altitude Chart Bar */}
                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-[#4F9CF9] via-[#16A34A] to-[#F97316] transition-all duration-500"
                    style={{
                      width: `${(activeDayData.day / 10) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Progress: {activeDayData.day * 10}%</span>
                  <span>Max Peak: 4,130m</span>
                </div>
              </div>

              {/* Acclimatization Note */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-[#4F9CF9] flex items-center gap-1.5">
                  <span>🛡️ Safety Acclimatization</span>
                </div>
                <p>
                  Our route incorporates gradual altitude scaling with safety stops at Ghorepani (2,860m) and Deurali (3,200m) before pushing to 4,130m.
                </p>
              </div>

              <a
                href="#calculator"
                className="w-full py-3.5 rounded-xl font-bold text-center block bg-[#4F9CF9] hover:bg-[#3b8beb] text-white transition-colors"
              >
                Customize This Itinerary
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
