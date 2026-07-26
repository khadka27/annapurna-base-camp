"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCms } from "@/context/CmsContext";

export function DynamicHero() {
  const { heroConfig, setSelectedRoomForBooking, rooms } = useCms();
  const [currentSlide, setCurrentSlide] = useState(0);

  const todayStr = new Date().toISOString().split("T")[0];
  const defaultOutDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(defaultOutDate);
  const [guests, setGuests] = useState(2);
  const [selectedRoomType, setSelectedRoomType] = useState("suite");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!heroConfig.slides || heroConfig.slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroConfig.slides.length);
    }, heroConfig.autoSlideSpeed || 5000);
    return () => clearInterval(interval);
  }, [heroConfig.slides, heroConfig.autoSlideSpeed]);

  // Snow Canvas Overlay Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particlesCount = 45;
    const particles = Array.from({ length: particlesCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      density: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(248, 250, 252, ${p.opacity})`;
        ctx.fill();

        p.y += p.density * 0.8;
        p.x += Math.sin(p.y / 30) * 0.5;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = rooms.find((r) => r.category === selectedRoomType) || rooms[0];
    setSelectedRoomForBooking(match);
  };

  const activeSlideObj = heroConfig.slides[currentSlide] || heroConfig.slides[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#395371]">
      {/* Background Slideshow */}
      {heroConfig.slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms]"
          />
          {heroConfig.showOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#395371] via-[#395371]/60 to-[#395371]/30" />
          )}
        </div>
      ))}

      {/* Snow Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-70" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Mountain Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-xl">
          <svg className="w-4 h-4 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{heroConfig.badge || "Stay Above the Clouds • Annapurna Base Camp • 4,130m"}</span>
        </div>

        {/* Hero Copy */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            {heroConfig.title || "Wake Up Among the Himalayas"}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {heroConfig.subtitle}
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setSelectedRoomForBooking(rooms[0])}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-[#F97316] hover:bg-[#ea6200] shadow-xl shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2.5 text-base"
          >
            <span>Book Your Stay</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <Link
            href="/rooms"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base"
          >
            <span>Explore Rooms</span>
            <svg className="w-5 h-5 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </Link>
        </div>

        {/* Booking Search Widget */}
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-white/25 shadow-2xl space-y-3 mt-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
            {/* Check-In */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold">Check-In</label>
              <input
                type="date"
                min={todayStr}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-white font-semibold text-sm focus:outline-none cursor-pointer"
              />
            </div>

            {/* Check-Out */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold">Check-Out</label>
              <input
                type="date"
                min={checkIn || todayStr}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-white font-semibold text-sm focus:outline-none cursor-pointer"
              />
            </div>

            {/* Guests */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <label className="text-[10px] font-mono text-[#4F9CF9] block uppercase font-bold mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-1.5 text-white font-semibold text-xs transition-all focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-[#395371]">1 Guest</option>
                <option value={2} className="bg-[#395371]">2 Guests</option>
                <option value={3} className="bg-[#395371]">3 Guests</option>
                <option value={4} className="bg-[#395371]">4+ Guests</option>
              </select>
            </div>

            {/* Room Type */}
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15">
              <label className="text-[10px] font-mono text-[#4F9CF9] block uppercase font-bold mb-1">Room Type</label>
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-1.5 text-white font-semibold text-xs transition-all focus:outline-none cursor-pointer"
              >
                <option value="suite" className="bg-[#395371]">Glacier Suite</option>
                <option value="panorama" className="bg-[#395371]">Panorama Room</option>
                <option value="deluxe" className="bg-[#395371]">Deluxe Twin</option>
                <option value="lodge" className="bg-[#395371]">Alpine Lodge</option>
              </select>
            </div>

            {/* Search Availability CTA */}
            <button
              type="submit"
              className="w-full h-full py-3 sm:py-0 rounded-2xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] shadow-lg shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Search Availability</span>
            </button>
          </form>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {heroConfig.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? "w-8 bg-[#4F9CF9]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
