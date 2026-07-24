import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ItineraryExplorer } from "@/components/ItineraryExplorer";
import { HighlightsGrid } from "@/components/HighlightsGrid";
import { PreparationGuide } from "@/components/PreparationGuide";
import { CostEstimator } from "@/components/CostEstimator";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ItineraryExplorer />
        <HighlightsGrid />
        <PreparationGuide />
        <CostEstimator />
      </main>
      <Footer />
    </div>
  );
}
