"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCms, RoomItem } from "@/context/CmsContext";
import { getRoomSlug } from "@/app/rooms/[slug]/page";

export function RoomShowcase() {
  const { rooms, bookings } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredRooms =
    activeCategory === "all"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  return (
    <section id="rooms" className="py-14 sm:py-16 bg-[#395371] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
              <span>Sanctuary Accommodations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Comfortable Mountain Accommodation
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Choose from cozy private and shared rooms designed to provide warmth and comfort after a rewarding day on the trail.
            </p>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-2 max-w-full md:justify-end">
            {[
              { id: "all", label: "All Rooms" },
              { id: "suite", label: "Glacier Suites" },
              { id: "panorama", label: "Panorama Rooms" },
              { id: "deluxe", label: "Deluxe Twin" },
              { id: "lodge", label: "Alpine Lodge" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => {
            const slug = getRoomSlug(room);
            const roomBookings = bookings.filter((b) => b.roomId === room.id && b.status === "Confirmed");
            const activeBooking = roomBookings[0];

            return (
              <div
                key={room.id}
                className="glass-card-dark rounded-3xl overflow-hidden border border-white/15 hover:border-[#4F9CF9]/50 transition-all duration-500 group flex flex-col justify-between"
              >
                {/* Room Image Container */}
                <Link href={`/rooms/${slug}`} className="relative h-64 sm:h-72 overflow-hidden block">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#395371] via-transparent to-black/30" />

                  {/* Badge Overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    {activeBooking ? (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white shadow-md flex items-center gap-1 animate-pulse">
                        <span>🔴 BOOKED ({activeBooking.checkIn} to {activeBooking.checkOut})</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md">
                        ✓ AVAILABLE
                      </span>
                    )}

                    {room.discountBadge && (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#F97316] text-white shadow-md">
                        {room.discountBadge}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{room.rating} Rating</span>
                    </span>
                  </div>

                  {/* Capacity & View Pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{room.capacity} Guests • {room.size}</span>
                    </span>
                    <span className="bg-[#16A34A]/80 backdrop-blur-md px-3 py-1 rounded-lg font-bold text-white">
                      {room.view}
                    </span>
                  </div>
                </Link>

                {/* Room Body */}
                <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <Link href={`/rooms/${slug}`} className="block">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#4F9CF9] transition-colors">
                        {room.name}
                      </h3>
                    </Link>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                      {room.description}
                    </p>

                    {/* Amenities List */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1"
                        >
                          <svg className="w-3 h-3 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Booking CTA */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">NIGHTLY RATE</span>
                      <span className="text-2xl font-extrabold text-white">
                        ${room.pricePerNight} <span className="text-xs font-normal text-slate-400">/ night</span>
                      </span>
                    </div>

                    <Link
                      href={`/rooms/${slug}`}
                      className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] shadow-lg shadow-[#F97316]/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                    >
                      <span>Book Suite</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
