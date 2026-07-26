"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { GlassNavbar } from "@/components/GlassNavbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useCms, RoomItem, BookingRecord } from "@/context/CmsContext";
import { Check } from "lucide-react";

export function getRoomSlug(room: RoomItem): string {
  return room.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DynamicRoomBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { rooms, addBooking, coupons } = useCms();

  // Find room by matching slug or ID
  const room =
    rooms.find((r) => getRoomSlug(r) === slug || r.id === slug) ||
    rooms.find((r) => r.id === "room-1") ||
    rooms[0];

  // Booking Form State
  const [checkIn, setCheckIn] = useState("2026-10-10");
  const [checkOut, setCheckOut] = useState("2026-10-13");
  const [guestsCount, setGuestsCount] = useState(room ? room.capacity : 2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
        <Link href="/rooms" className="px-6 py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-sm">
          Return to Rooms Catalog
        </Link>
      </div>
    );
  }

  // Calculate nights & pricing
  const dateIn = new Date(checkIn);
  const dateOut = new Date(checkOut);
  const diffTime = Math.max(1, dateOut.getTime() - dateIn.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseTotal = room.pricePerNight * nights;
  const discountAmount = appliedCoupon ? Math.round((baseTotal * appliedCoupon.percent) / 100) : 0;
  const grandTotal = Math.max(0, baseTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const cleanCode = couponInput.trim().toUpperCase();
    const match = coupons.find((c) => c.code === cleanCode && c.active);

    if (match) {
      setAppliedCoupon({ code: match.code, percent: match.discountPercent });
    } else if (cleanCode === "ANNAPURNA10") {
      setAppliedCoupon({ code: "ANNAPURNA10", percent: 10 });
    } else {
      setCouponError("Invalid or expired discount coupon code.");
    }
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const newRec = await addBooking({
      guestName,
      guestEmail,
      guestPhone,
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guestsCount: Number(guestsCount),
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      discountAmount,
      totalAmount: grandTotal,
      status: "Confirmed",
    });

    setConfirmedBooking(newRec);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white pt-20">
      <GlassNavbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors border border-white/15"
          >
            ← Back to All Rooms
          </Link>
        </div>

        {/* Main Grid: Room Showcase & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Room Photos & Information (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Featured Photo */}
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
              <img
                src={room.images[selectedImageIdx] || room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />

              {/* Price & Rating Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#16A34A] text-white font-extrabold text-xs shadow-lg">
                  ${room.pricePerNight} / night
                </span>
                {room.discountBadge && (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#F97316] text-white font-extrabold text-xs shadow-lg">
                    {room.discountBadge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/20 font-bold">
                  ⭐ {room.rating} Rating • {room.size}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-[#4F9CF9] border border-white/20 font-bold">
                  {room.view}
                </span>
              </div>
            </div>

            {/* Thumbnail Carousel if multiple images */}
            {room.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {room.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIdx === idx ? "border-[#4F9CF9] ring-2 ring-[#4F9CF9]/30" : "border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Description */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-[#4F9CF9]/30">
                <span>Sanctuary Suite Telemetry</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {room.name}
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Specs & Amenities Grid */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Included Suite Amenities & High-Altitude Comfort
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Suite Booking Engine (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Instant Suite Reservation</h3>
                  <span className="text-xs text-[#4F9CF9] font-mono">LIVE DYNAMIC PAGE BOOKING</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-[#16A34A]">${room.pricePerNight}</span>
                  <span className="text-xs text-slate-400 block font-mono">per night</span>
                </div>
              </div>

              {confirmedBooking ? (
                /* CONFIRMED BOOKING RECEIPT SCREEN */
                <div className="space-y-6 text-center animate-fade-in py-4">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/20 text-[#16A34A] flex items-center justify-center mx-auto ring-4 ring-[#16A34A]/30">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#16A34A] uppercase font-bold">RESERVATION CONFIRMED</span>
                    <h4 className="text-2xl font-extrabold text-white">Booking Ref: {confirmedBooking.id}</h4>
                    <p className="text-xs text-slate-300">
                      Thank you, <strong className="text-white">{confirmedBooking.guestName}</strong>! Your stay at Annapurna Base Camp has been reserved live.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-left text-xs space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reserved Suite:</span>
                      <span className="text-white font-bold">{confirmedBooking.roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Check-In:</span>
                      <span className="text-white">{confirmedBooking.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Check-Out:</span>
                      <span className="text-white">{confirmedBooking.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Guests:</span>
                      <span className="text-white">{confirmedBooking.guestsCount} Trekkers</span>
                    </div>
                    {confirmedBooking.discountAmount > 0 && (
                      <div className="flex justify-between text-[#16A34A]">
                        <span>Coupon Discount:</span>
                        <span>-${confirmedBooking.discountAmount} USD</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-white/10 pt-2 text-sm">
                      <span className="text-slate-300 font-bold">Grand Total Paid:</span>
                      <span className="text-[#16A34A] font-extrabold">${confirmedBooking.totalAmount} USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmedBooking(null)}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    Make Another Booking
                  </button>
                </div>
              ) : (
                /* INTERACTIVE BOOKING FORM */
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  {/* Check-In / Check-Out */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Check-In</label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Check-Out</label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-[10px] font-mono text-[#4F9CF9] block uppercase font-bold mb-1">Guests Count</label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-[#4F9CF9] transition-all cursor-pointer shadow-sm"
                    >
                      <option value={1} className="bg-[#0F172A]">1 Guest</option>
                      <option value={2} className="bg-[#0F172A]">2 Guests</option>
                      <option value={3} className="bg-[#0F172A]">3 Guests</option>
                      <option value={4} className="bg-[#0F172A]">4 Guests</option>
                    </select>
                  </div>

                  {/* Guest Info */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Coupon Input */}
                  <div className="pt-2">
                    <label className="text-[10px] font-mono text-slate-300 block uppercase font-bold mb-1">Promo Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try: ANNAPURNA10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-mono uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 rounded-xl bg-[#4F9CF9] hover:bg-[#3b82f6] text-white text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedCoupon && (
                      <span className="text-[11px] font-mono text-[#16A34A] flex items-center gap-1 mt-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Applied {appliedCoupon.code} ({appliedCoupon.percent}% OFF)</span>
                      </span>
                    )}
                    {couponError && (
                      <span className="text-[11px] text-red-400 block mt-1 font-mono">
                        {couponError}
                      </span>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs space-y-2 font-mono pt-3">
                    <div className="flex justify-between text-slate-300">
                      <span>Rate (${room.pricePerNight} x {nights} nights):</span>
                      <span>${baseTotal} USD</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#16A34A]">
                        <span>Promo Discount ({appliedCoupon?.percent}%):</span>
                        <span>-${discountAmount} USD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-extrabold text-white border-t border-white/10 pt-2">
                      <span>Grand Total:</span>
                      <span className="text-[#16A34A]">${grandTotal} USD</span>
                    </div>
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#ea6200] text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm & Book Suite Now</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BookingModal />
      <AdminDashboard />
    </div>
  );
}
