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

const WINDING_CURVED_NODES: WaypointNode[] = [
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
            <span>Winding Alpine Mountain Switchback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Curved Mountain Route Pathway
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg">
            Organic curved SVG trail path weaving back and forth directly through every waypoint card pin from Pokhara (820m) up to the 4,130m summit with oxygen level telemetry.
          </p>
        </div>

        {/* CURVED SVG TRAIL ROADMAP CONTAINER */}
        <div className="relative max-w-5xl mx-auto py-10">
          {/* Organic SVG Bezier Curve Trail Path Directly Weaving Through Card Pins */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none block z-0"
            viewBox="0 0 1000 3100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curvedTrailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F9CF9" />
                <stop offset="35%" stopColor="#F97316" />
                <stop offset="65%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>

            {/* Curving SVG Path mathematically anchoring every card pin */}
            <path
              d="M 240 150 
                 C 500 150, 760 300, 760 460 
                 C 760 620, 200 620, 200 770 
                 C 200 920, 800 920, 800 1080 
                 C 800 1240, 240 1240, 240 1390 
                 C 240 1540, 760 1540, 760 1700 
                 C 760 1860, 500 1860, 500 2010 
                 C 500 2160, 220 2160, 220 2320 
                 C 220 2480, 780 2480, 780 2630 
                 C 780 2790, 500 2790, 500 2940"
              fill="none"
              stroke="url(#curvedTrailGrad)"
              strokeWidth="7"
              strokeDasharray="14 14"
              className="opacity-90"
            />
          </svg>

          {/* Cards Grid arranged along the winding curve */}
          <div className="space-y-16 relative z-10">
            {WINDING_CURVED_NODES.map((node) => {
              const isActive = node.id === activeStepId;
              const isSummit = node.stepNum === 7;
              const isLeft = node.align === "left";
              const isCenter = node.align === "center";

              // Desktop positioning alignment to match curved SVG coordinates
              let flexClass = "md:justify-start md:pl-4";
              if (node.align === "right") flexClass = "md:justify-end md:pr-4";
              if (isCenter) flexClass = "md:justify-center";

              return (
                <div key={node.id} className={`flex ${flexClass} items-center w-full relative`}>
                  {/* WAYPOINT CARD WITH EMBEDDED PIN THAT THE CURVED LINE WEAVES THROUGH */}
                  <div
                    onClick={() => setActiveStepId(node.id)}
                    className={`w-full md:w-[480px] bg-white rounded-3xl p-6 sm:p-7 border shadow-xl hover:shadow-2xl transition-all duration-300 space-y-4 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "border-[#0F172A] ring-4 ring-[#0F172A]/10 scale-105 bg-slate-50 z-20"
                        : "border-slate-200 hover:border-[#4F9CF9] z-10"
                    }`}
                  >
                    {/* Step Pin Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center font-mono font-extrabold text-xs transition-transform group-hover:scale-110 ${
                            isSummit
                              ? "bg-[#F97316] text-white ring-4 ring-[#F97316]/30 animate-pulse"
                              : "bg-[#0F172A] text-white"
                          }`}
                        >
                          {node.stepNum}
                        </div>
                        <span className="text-xs font-mono font-bold text-[#F97316] uppercase">
                          {node.dayTitle}
                        </span>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${node.oxygenColor}`}>
                        {node.oxygen}
                      </span>
                    </div>

                    {/* Location Title & Altitude Badge */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] group-hover:text-[#4F9CF9] transition-colors">
                          {node.location}
                        </h3>
                        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-mono font-bold shrink-0">
                          {node.altitude}
                        </span>
                      </div>
                    </div>

                    {/* Scenic Photo Thumbnail in Center */}
                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-inner">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
