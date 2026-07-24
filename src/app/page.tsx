"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassNavbar } from "@/components/GlassNavbar";
import { DynamicHero } from "@/components/DynamicHero";
import { WeatherWidget } from "@/components/WeatherWidget";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";
import { useCms } from "@/context/CmsContext";

export default function Home() {
  const { rooms, setSelectedRoomForBooking } = useCms();
  const featuredRooms = rooms.slice(0, 2);

  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is advance booking required?",
      a: "Booking is recommended during spring and autumn trekking seasons due to high demand.",
    },
    {
      q: "Do you provide meals?",
      a: "Yes, we serve breakfast, lunch, dinner, hot drinks, and snacks throughout the day.",
    },
    {
      q: "Is Wi-Fi available?",
      a: "Yes, Wi-Fi is available, though connectivity may vary depending on weather conditions.",
    },
    {
      q: "Can I charge my devices?",
      a: "Yes, charging facilities are available for guests.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      {/* Navbar with 20px padding */}
      <GlassNavbar />

      <main className="flex-grow space-y-20 pb-16">
        {/* Hero Section */}
        <DynamicHero />

        {/* Welcome Section */}
        <section id="welcome" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/15 shadow-2xl text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider">
              <span>Welcome to Annapurna Guesthouse</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Your Mountain Home at Annapurna Base Camp
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Located at 4,130 meters in the breathtaking Annapurna Sanctuary, Annapurna Guesthouse offers trekkers a comfortable place to rest, recharge, and experience authentic Himalayan hospitality. Surrounded by towering snow-covered peaks, our guesthouse combines warm local service with spectacular mountain scenery, creating memories that last a lifetime.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether you&apos;re reaching the base camp after days of trekking or simply soaking in the incredible Himalayan views, every stay is designed to be peaceful, welcoming, and unforgettable.
            </p>
          </div>
        </section>

        {/* Why Stay With Us */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Choose Annapurna Guesthouse?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-[#4F9CF9]/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Prime Location</h3>
              <p className="text-slate-300 text-sm">Stay just steps away from the iconic Annapurna Base Camp viewpoint.</p>
            </div>

            {/* 2 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-[#F97316]/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Warm Dining Hall</h3>
              <p className="text-slate-300 text-sm">Relax beside a cozy communal dining area after your day&apos;s adventure.</p>
            </div>

            {/* 3 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-[#16A34A]/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Fresh Local Meals</h3>
              <p className="text-slate-300 text-sm">Enjoy nutritious Nepali and international dishes prepared daily.</p>
            </div>

            {/* 4 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-white/30 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Comfortable Rooms</h3>
              <p className="text-slate-300 text-sm">Clean mountain accommodation designed for trekkers.</p>
            </div>

            {/* 5 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-[#4F9CF9]/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9]/20 text-[#4F9CF9] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Wi-Fi Available</h3>
              <p className="text-slate-300 text-sm">Stay connected with family and friends whenever weather permits.</p>
            </div>

            {/* 6 */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 hover:border-[#F97316]/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Incredible Sunrise Views</h3>
              <p className="text-slate-300 text-sm">Witness unforgettable Himalayan sunrises directly from the guesthouse.</p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A] border border-white/15 p-8 sm:p-12 rounded-3xl space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-mono font-bold uppercase">
              <span>Himalayan Panoramic Majesty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Experience the Majesty of the Himalayas
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Surrounded by Annapurna I, Machhapuchhre, Hiunchuli, and Annapurna South, every moment at Annapurna Guesthouse offers breathtaking scenery. Watch clouds drift across snow-covered peaks, enjoy crisp mountain air, and experience one of the world&apos;s most spectacular trekking destinations.
            </p>
          </div>
        </section>

        {/* Featured Rooms Teaser */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#4F9CF9] uppercase font-bold">ACCOMMODATIONS</span>
              <h2 className="text-3xl font-extrabold text-white">Comfortable Mountain Accommodation</h2>
              <p className="text-slate-300 text-sm">
                Choose from cozy private and shared rooms designed to provide warmth and comfort after a rewarding day on the trail.
              </p>
            </div>

            <Link
              href="/rooms"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] transition-all shrink-0"
            >
              View All Rooms
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredRooms.map((room) => (
              <div key={room.id} className="bg-white/5 rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between">
                <img src={room.images[0]} alt={room.name} className="w-full h-64 object-cover" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{room.name}</h3>
                    <span className="text-lg font-extrabold text-[#4F9CF9]">${room.pricePerNight} / night</span>
                  </div>
                  <p className="text-slate-300 text-sm">{room.description}</p>
                  <button
                    onClick={() => setSelectedRoomForBooking(room)}
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#F97316] text-white hover:bg-[#ea6200] transition-colors"
                  >
                    Book Your Stay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#16A34A] text-xs font-bold uppercase">
              <span>Trekker Amenities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need After a Long Trek
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Comfortable Beds",
              "Warm Blankets",
              "Mountain View Rooms",
              "Fresh Meals",
              "Tea & Coffee",
              "Hot Drinks",
              "Charging Station",
              "Wi-Fi",
              "Shared Bathrooms",
              "Friendly Staff",
              "Clean Dining Hall",
              "Trekker Information",
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-white">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Live Weather Station */}
        <WeatherWidget />

        {/* Gallery Section Teaser */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono text-[#4F9CF9] uppercase font-bold">PHOTOGRAPHY</span>
              <h2 className="text-3xl font-extrabold text-white">Moments from Annapurna Base Camp</h2>
              <p className="text-slate-300 text-sm">
                Explore stunning photographs of our guesthouse, cozy interiors, mountain landscapes, nearby trails, and unforgettable Himalayan sunrises.
              </p>
            </div>

            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#4F9CF9] hover:bg-[#398ae8] transition-colors shrink-0"
            >
              View Gallery
            </Link>
          </div>
        </section>

        {/* Trek Information */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-[#0F172A] to-[#1E293B] p-8 sm:p-12 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono text-[#F97316] uppercase font-bold">EXPEDITION GUIDE</span>
              <h2 className="text-3xl font-extrabold text-white">Planning the Annapurna Base Camp Trek?</h2>
              <p className="text-slate-300 text-sm">
                Whether you&apos;re starting your journey from Pokhara or already exploring the Annapurna region, Annapurna Guesthouse is the perfect overnight destination before celebrating your arrival at one of Nepal&apos;s most famous base camps. Our experienced team can also provide local trekking information and recommendations during your stay.
              </p>
            </div>

            <Link
              href="/trek"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] transition-colors shrink-0"
            >
              ABC Trek Guide
            </Link>
          </div>
        </section>

        {/* Dining */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-mono text-[#16A34A] uppercase font-bold">FRESH MEALS</span>
              <h2 className="text-3xl font-extrabold text-white">Authentic Himalayan Cuisine</h2>
              <p className="text-slate-300 text-sm">
                Recharge with freshly prepared meals featuring traditional Nepali favorites, warming soups, pasta, rice dishes, tea, coffee, and hearty breakfasts made especially for trekkers exploring the Annapurna region.
              </p>
            </div>

            <button
              onClick={() => setSelectedRoomForBooking(rooms[0])}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#16A34A] hover:bg-[#12883d] transition-colors shrink-0"
            >
              Explore Our Menu
            </button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase">
              <span>Guest Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Stories From Fellow Trekkers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm italic">
                &ldquo;The hospitality was incredible. Waking up surrounded by the Annapurna range was something I&apos;ll never forget.&rdquo;
              </p>
              <span className="text-xs font-bold text-[#4F9CF9] block">— Sarah, Australia</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm italic">
                &ldquo;Warm rooms, delicious food, and breathtaking mountain views. Highly recommended.&rdquo;
              </p>
              <span className="text-xs font-bold text-[#4F9CF9] block">— David, United Kingdom</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 text-sm italic">
                &ldquo;Our favorite stay during the entire ABC trek. Friendly staff and an unforgettable atmosphere.&rdquo;
              </p>
              <span className="text-xs font-bold text-[#4F9CF9] block">— Mika, Japan</span>
            </div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#16A34A] text-xs font-bold uppercase">
              <span>Explore The Sanctuary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Discover the Annapurna Region
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Annapurna Base Camp",
              "Machhapuchhre Base Camp",
              "Annapurna Glacier",
              "Jhinu Hot Springs",
              "Chhomrong Village",
              "Bamboo Forest",
              "Deurali",
              "Annapurna Sanctuary",
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                <svg className="w-5 h-5 text-[#4F9CF9] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold text-white block">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/trek"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>Explore Attractions</span>
              <svg className="w-4 h-4 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase">
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="bg-white/5 p-5 rounded-2xl border border-white/15 cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{faq.q}</h3>
                  <span className="text-slate-400 font-bold">{faqOpen === idx ? "−" : "+"}</span>
                </div>
                {faqOpen === idx && (
                  <p className="text-slate-300 text-sm leading-relaxed pt-2 border-t border-white/10">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/trek"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>View All FAQs</span>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 sm:p-14 rounded-3xl border border-white/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Your Himalayan Adventure Starts Here
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Experience authentic mountain hospitality, breathtaking Himalayan landscapes, and unforgettable memories at Annapurna Guesthouse. Reserve your stay today and make your Annapurna Base Camp journey even more special.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setSelectedRoomForBooking(rooms[0])}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base text-white bg-[#F97316] hover:bg-[#ea6200] shadow-xl shadow-[#F97316]/30 transition-all"
              >
                Book Your Stay
              </button>

              <Link
                href="/trek"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
