"use client";

import React, { useState } from "react";

interface WaypointNode {
  id: string;
  stepNum: number;
  dayTitle: string;
  location: string;
  altitude: string;
  oxygen: string;
  oxygenColor: string;
  scene: string;
  image: string;
  description: string;
  terrain: string;
  highlights: string[];
  align: "left" | "right" | "center";
}

const CENTERED_ROUTE_NODES: WaypointNode[] = [
  {
    id: "step-1",
    stepNum: 1,
    dayTitle: "Day 1: Expedition Start",
    location: "Pokhara (820m) → Nayapul → Tikhedhunga (1,540m)",
    altitude: "1,540m",
    oxygen: "84% O₂",
    oxygenColor: "text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30",
    scene: "Terraced Farmland & Modi Khola Suspension Bridges",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Drive along Modi Khola river, clear TIMS permits, and walk past cascading waterfalls into Tikhedhunga.",
    terrain: "Cobblestone trails & river banks",
    highlights: ["Scenic river drive", "Birethanti permit check", "Suspension bridge crossing"],
    align: "left",
  },
  {
    id: "step-2",
    stepNum: 2,
    dayTitle: "Day 2: Conquer 3,300 Ulleri Steps",
    location: "Tikhedhunga (1,540m) → Ulleri → Ghorepani (2,860m)",
    altitude: "2,860m",
    oxygen: "72% O₂",
    oxygenColor: "text-[#4F9CF9] bg-[#4F9CF9]/10 border-[#4F9CF9]/30",
    scene: "3,300 Ulleri Stone Steps & Blooming Rhododendron Forests",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80",
    description: "Climb the famous 3,300 stone steps of Ulleri into dense oak and red rhododendron mountain forests.",
    terrain: "3,300 Stone stairs & alpine forest",
    highlights: ["Ulleri staircase ascent", "National flower blooms", "First view of Hiunchuli"],
    align: "right",
  },
  {
    id: "step-3",
    stepNum: 3,
    dayTitle: "Day 3: Pre-Dawn Poon Hill Sunrise",
    location: "Ghorepani → Poon Hill (3,210m) → Tadapani (2,630m)",
    altitude: "3,210m Viewpoint",
    oxygen: "68% O₂",
    oxygenColor: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30",
    scene: "360° Golden Sunrise over Dhaulagiri & Annapurna I",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Pre-dawn hike to Poon Hill to watch morning sun rays paint 14 Himalayan giants gold before trekking to Tadapani.",
    terrain: "Mountain ridges & pine forest",
    highlights: ["Poon Hill 3,210m summit", "Dhaulagiri & Annapurna I panorama", "Deurali Pass ridge walk"],
    align: "left",
  },
  {
    id: "step-4",
    stepNum: 4,
    dayTitle: "Day 4: Descent into Kimrong Gorge",
    location: "Tadapani (2,630m) → Kimrong Khola → Chhomrong (2,170m)",
    altitude: "2,170m",
    oxygen: "78% O₂",
    oxygenColor: "text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30",
    scene: "Kimrong River Gorge & Close-up View of Sacred Fishtail",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Descend into sub-tropical river canyon and climb up to Chhomrong village sitting under Machhapuchhre.",
    terrain: "Gorge descent & stone stair ascent",
    highlights: ["Fishtail peak close-up", "Gurung culture", "Kimrong wooden bridge"],
    align: "right",
  },
  {
    id: "step-5",
    stepNum: 5,
    dayTitle: "Day 5: Chhomrong Steps & Bamboo",
    location: "Chhomrong (2,170m) → Sinuwa → Dovan (2,600m)",
    altitude: "2,600m",
    oxygen: "74% O₂",
    oxygenColor: "text-[#4F9CF9] bg-[#4F9CF9]/10 border-[#4F9CF9]/30",
    scene: "2,500 Chhomrong Stone Steps & Fragrant Bamboo Sanctuary",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description: "Descend Chhomrong's stone staircase, cross the river, climb Sinuwa ridge, and enter deep bamboo thickets.",
    terrain: "2,500 Stone stairs & bamboo sanctuary",
    highlights: ["2,500 Chhomrong steps", "Cool bamboo canyon", "Langur monkey spot"],
    align: "left",
  },
  {
    id: "step-6",
    stepNum: 6,
    dayTitle: "Day 6: Canyon Ascent to Deurali",
    location: "Dovan (2,600m) → Hinku Cave → Deurali (3,200m)",
    altitude: "3,200m",
    oxygen: "68% O₂",
    oxygenColor: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30",
    scene: "Hinku Cave Overhang & Glacial Rock Amphitheater",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    description: "Trek along Modi River gorge past Hinku Cave where trees give way to alpine rocks and glacial walls.",
    terrain: "Glacial river canyon & alpine scrub",
    highlights: ["Hinku Cave overhang", "Modi Khola gorge", "Transition to alpine zone"],
    align: "right",
  },
  {
    id: "step-7",
    stepNum: 7,
    dayTitle: "Day 7: Machhapuchhre BC & ABC Summit",
    location: "Deurali (3,200m) → MBC (3,700m) → ABC (4,130m)",
    altitude: "4,130m Peak Base Camp",
    oxygen: "62% O₂",
    oxygenColor: "text-red-400 bg-red-500/10 border-red-500/30 font-bold animate-pulse",
    scene: "360° Sacred Annapurna Mountain Sanctuary Amphitheater",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate expedition milestone! Enter the sacred 360-degree sanctuary surrounded by 8,000m summits.",
    terrain: "Glacial moraine & snow/ice paths",
    highlights: ["Machhapuchhre BC 3,700m", "360° 8,091m Annapurna I view", "Annapurna Guesthouse stay"],
    align: "center",
  },
  {
    id: "step-8",
    stepNum: 8,
    dayTitle: "Day 8: Morning Glacier Descent",
    location: "ABC (4,130m) → MBC → Deurali → Bamboo (2,310m)",
    altitude: "2,310m",
    oxygen: "76% O₂",
    oxygenColor: "text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30",
    scene: "Sunrise Light Over Glaciers & Valley Descent",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    description: "Enjoy sunrise photos at 4,130m before beginning the long, satisfying descent back into Bamboo valley.",
    terrain: "Descending mountain paths & stone steps",
    highlights: ["ABC sunrise photos", "Rapid oxygen recovery", "Bamboo Eco Lodge"],
    align: "left",
  },
  {
    id: "step-9",
    stepNum: 9,
    dayTitle: "Day 9: Jhinu Geothermal Hot Springs",
    location: "Bamboo (2,310m) → Chhomrong → Jhinu Danda (1,780m)",
    altitude: "1,780m",
    oxygen: "82% O₂",
    oxygenColor: "text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30",
    scene: "Riverside Geothermal Hot Springs & Suspension Bridge",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Trek over Chhomrong ridge down to Jhinu Danda and soak tired muscles in natural hot thermal pools.",
    terrain: "Stone stairs & riverside trail",
    highlights: ["Natural hot spring bath", "Jhinu suspension bridge", "Gurung dinner"],
    align: "right",
  },
  {
    id: "step-10",
    stepNum: 10,
    dayTitle: "Day 10: Circuit Conclusion Drive",
    location: "Jhinu Danda → Nayapul → Pokhara Lakeside (820m)",
    altitude: "820m Finish",
    oxygen: "91% O₂",
    oxygenColor: "text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/30",
    scene: "Modi Khola Circuit Conclusion & Celebration",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    description: "Final short walk along Modi Khola to Nayapul and private vehicle transfer to Pokhara Lakeside.",
    terrain: "Flat river trail & paved highway drive",
    highlights: ["Circuit completion", "Celebration meal", "Pokhara lake relaxation"],
    align: "center",
  },
];

export function ItineraryExplorer() {
  const [activeStepId, setActiveStepId] = useState<string>("step-7");

  return (
    <section id="itinerary" className="py-24 bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider">
            <span>Alpine Mountain Route Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Annapurna Expedition Route Pathway
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            Continuous mountain trail connecting every expedition stop from Pokhara (820m) up to the 4,130m base camp summit with real-time oxygen level telemetry.
          </p>
        </div>

        {/* CENTERED TRAIL ROADMAP CONTAINER WITH DASHED LINE TOUCHING EVERY NODE PIN */}
        <div className="relative max-w-5xl mx-auto py-6">
          {/* Continuous Center Dashed Trail Line */}
          <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-1.5 border-l-4 border-dashed border-[#F97316] transform -translate-x-1/2 z-0 pointer-events-none" />

          <div className="space-y-16 relative z-10">
            {CENTERED_ROUTE_NODES.map((node) => {
              const isActive = node.id === activeStepId;
              const isSummit = node.stepNum === 7;
              const isLeft = node.align === "left";
              const isCenter = node.align === "center";

              return (
                <div key={node.id} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* CENTER TRAIL PIN CIRCLE - DIRECTLY ON THE LINE */}
                  <div
                    onClick={() => setActiveStepId(node.id)}
                    className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-30 cursor-pointer group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-4 shadow-xl flex items-center justify-center font-mono font-extrabold text-xs transition-transform duration-300 group-hover:scale-125 ${
                        isSummit
                          ? "bg-[#F97316] text-white border-white ring-4 ring-[#F97316]/30 animate-bounce"
                          : isActive
                          ? "bg-[#0F172A] text-white border-[#4F9CF9] scale-110"
                          : "bg-white text-[#0F172A] border-[#0F172A]"
                      }`}
                    >
                      {node.stepNum}
                    </div>
                  </div>

                  {/* DESKTOP CONNECTOR DOTTED BRANCH LINE TOUCHING CARD TO CENTER PIN */}
                  {!isCenter && (
                    <div
                      className={`hidden md:block absolute top-6 z-20 border-t-2 border-dashed border-[#F97316] w-24 ${
                        isLeft ? "right-1/2 mr-6" : "left-1/2 ml-6"
                      }`}
                    />
                  )}

                  {/* WAYPOINT CARD CONTAINER */}
                  <div
                    className={`w-full md:w-[calc(50%-4rem)] ml-14 md:ml-0 ${
                      isCenter
                        ? "md:mx-auto md:w-[540px] pt-14 md:pt-16"
                        : isLeft
                        ? "md:mr-auto"
                        : "md:ml-auto"
                    }`}
                  >
                    <div
                      onClick={() => setActiveStepId(node.id)}
                      className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4 cursor-pointer relative overflow-hidden group ${
                        isActive
                          ? "border-[#0F172A] ring-4 ring-[#0F172A]/10 scale-105 bg-slate-50"
                          : "border-slate-200 hover:border-[#4F9CF9]"
                      }`}
                    >
                      {/* Step Header Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#0F172A] text-white text-[11px] font-mono font-bold">
                          {node.dayTitle}
                        </span>

                        <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${node.oxygenColor}`}>
                          {node.oxygen}
                        </span>
                      </div>

                      {/* Location & Altitude */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] group-hover:text-[#4F9CF9] transition-colors">
                            {node.location}
                          </h3>
                          <span className="px-2.5 py-1 rounded-lg bg-[#4F9CF9]/10 text-[#4F9CF9] text-xs font-mono font-bold shrink-0">
                            {node.altitude}
                          </span>
                        </div>
                      </div>

                      {/* Image Thumbnail in Center of Card */}
                      <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-inner">
                        <img
                          src={node.image}
                          alt={node.dayTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white font-bold text-xs flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{node.scene}</span>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        {node.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                        {node.highlights.map((h, hIdx) => (
                          <span key={hIdx} className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[11px] font-semibold text-[#0F172A] border border-slate-200">
                            ✓ {h}
                          </span>
                        ))}
                      </div>

                      {isSummit && (
                        <div className="absolute top-0 right-0 bg-[#F97316] text-white px-4 py-1 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg">
                          ANNAPURNA SANCTUARY 4,130m
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
