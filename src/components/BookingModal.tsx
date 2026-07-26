"use client";

import React, { useState } from "react";
import { useCms, BookingRecord } from "@/context/CmsContext";
import { X, MessageCircle } from "lucide-react";
import { getWhatsAppBookingUrl } from "@/lib/whatsapp";

export function BookingModal() {
  const { selectedRoomForBooking, setSelectedRoomForBooking, addBooking, coupons, heroConfig, bookings } = useCms();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [checkIn, setCheckIn] = useState("2026-10-10");
  const [checkOut, setCheckOut] = useState("2026-10-13");
  const [guestsCount, setGuestsCount] = useState(2);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponStatusMsg, setCouponStatusMsg] = useState("");

  const [formError, setFormError] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!selectedRoomForBooking) return null;

  const dateIn = new Date(checkIn);
  const dateOut = new Date(checkOut);
  const diffTime = Math.max(1, dateOut.getTime() - dateIn.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseTotal = nights * selectedRoomForBooking.pricePerNight;
  const discountAmount = Math.round((baseTotal * appliedDiscount) / 100);
  const finalTotal = Math.max(0, baseTotal - discountAmount);

  const overlappingBooking = bookings.find((b) => {
    if (b.roomId !== selectedRoomForBooking.id || b.status === "Cancelled") return false;
    return checkIn < b.checkOut && checkOut > b.checkIn;
  });

  const isAlreadyBooked = Boolean(overlappingBooking);

  const handleApplyCoupon = () => {
    const match = coupons.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (match) {
      setAppliedDiscount(match.discountPercent);
      setCouponStatusMsg(`Applied ${match.discountPercent}% Promo Discount!`);
    } else {
      setAppliedDiscount(0);
      setCouponStatusMsg("Invalid or expired coupon code");
    }
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!guestName.trim() || guestName.trim().length < 2) {
      setFormError("Please enter a valid guest full name (minimum 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail.trim())) {
      setFormError("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    if (!guestPhone.trim() || guestPhone.trim().length < 6) {
      setFormError("Please enter a valid contact phone number.");
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    if (checkIn < todayStr) {
      setFormError("Check-in date cannot be in the past. Please select today or a future date.");
      return;
    }

    if (checkOut <= checkIn) {
      setFormError("Check-out date must be at least 1 day after check-in.");
      return;
    }

    if (guestsCount < 1) {
      setFormError("Number of guests must be at least 1 person.");
      return;
    }

    if (isAlreadyBooked) {
      setFormError("This suite is already reserved for these dates. Please choose different dates.");
      return;
    }

    const record = await addBooking({
      guestName,
      guestEmail,
      guestPhone,
      roomId: selectedRoomForBooking.id,
      roomName: selectedRoomForBooking.name,
      checkIn,
      checkOut,
      guestsCount,
      couponCode: appliedDiscount > 0 ? couponCode : undefined,
      discountAmount,
      totalAmount: finalTotal,
      status: "Pending",
    });

    const waUrl = getWhatsAppBookingUrl({
      bookingId: record.id,
      roomName: record.roomName,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      totalAmount: finalTotal,
      discountAmount,
      couponCode: appliedDiscount > 0 ? couponCode : undefined,
    }, heroConfig.whatsappNumber);

    try {
      window.open(waUrl, "_blank");
    } catch (e) {
      console.error(e);
    }

    setConfirmedBooking(record);
  };

  const closeModal = () => {
    setConfirmedBooking(null);
    setSelectedRoomForBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="bg-[#395371] border border-white/20 rounded-3xl w-full max-w-2xl text-white overflow-hidden shadow-2xl relative my-4 sm:my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <span className="text-xs font-mono font-bold text-[#4F9CF9] uppercase">RESERVATION CHECKOUT</span>
            <h3 className="text-xl font-bold text-white">{selectedRoomForBooking.name}</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen with Toast Status */
          <div className="p-6 sm:p-8 space-y-6 text-left overflow-y-auto flex-grow">
            {/* Success Toast Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400 text-center space-y-2 animate-bounce">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <span className="text-lg">⏳</span>
              </div>
              <h4 className="text-lg font-extrabold text-amber-300">Booking Submitted! Status: Pending Admin Approval</h4>
              <p className="text-xs text-slate-200">
                Booking ID: <strong className="font-mono text-white">{confirmedBooking.id}</strong> • Logged as <span className="font-bold text-amber-300 uppercase">Pending</span> in database & dispatched via WhatsApp.
              </p>
            </div>

            {/* Instant Automated Desk Auto-Reply Toast */}
            <div className="p-5 rounded-2xl bg-white/10 border border-amber-400/40 shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest block">
                    ⚡ AUTOMATIC INSTANT CONCIERGE AUTO-REPLY
                  </span>
                  <h5 className="text-sm font-extrabold text-white">Annapurna Base Camp Desk</h5>
                </div>
              </div>
              <div className="bg-[#1E293B]/80 p-4 rounded-xl border border-white/10 text-xs text-slate-200 leading-relaxed font-sans shadow-inner">
                &ldquo;Namaste <strong>{confirmedBooking.guestName}</strong>! 🙏 Your booking request for <strong>{confirmedBooking.roomName}</strong> from <strong>{confirmedBooking.checkIn}</strong> to <strong>{confirmedBooking.checkOut}</strong> (ID: <span className="font-mono text-amber-300">{confirmedBooking.id}</span>) is now <strong>PENDING ADMIN APPROVAL</strong>. The admin will review and confirm your reservation shortly!&rdquo;
              </div>
            </div>

            {/* Printable Invoice Box */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 font-sans">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="font-bold text-sm text-[#4F9CF9]">ANNAPURNA GUESTHOUSE INVOICE</span>
                <span className="text-xs font-mono text-slate-400">{confirmedBooking.createdAt}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Guest Name</span>
                  <span className="font-bold text-white">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Contact</span>
                  <span className="font-bold text-white">{confirmedBooking.guestPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Check-In / Out</span>
                  <span className="font-bold text-white">{confirmedBooking.checkIn} to {confirmedBooking.checkOut}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Guests</span>
                  <span className="font-bold text-white">{confirmedBooking.guestsCount} Person(s)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-300">Total Invoice Amount:</span>
                <span className="text-2xl font-extrabold text-[#4F9CF9]">${confirmedBooking.totalAmount} USD</span>
              </div>
            </div>

            {/* Send to WhatsApp Direct Action */}
            <a
              href={getWhatsAppBookingUrl({
                bookingId: confirmedBooking.id,
                roomName: confirmedBooking.roomName,
                guestName: confirmedBooking.guestName,
                guestEmail: confirmedBooking.guestEmail,
                guestPhone: confirmedBooking.guestPhone,
                checkIn: confirmedBooking.checkIn,
                checkOut: confirmedBooking.checkOut,
                guestsCount: confirmedBooking.guestsCount,
                totalAmount: confirmedBooking.totalAmount,
                discountAmount: confirmedBooking.discountAmount,
                couponCode: confirmedBooking.couponCode,
              }, heroConfig.whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Booking Details to WhatsApp</span>
            </a>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4 text-[#4F9CF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Invoice</span>
              </button>

              <button
                onClick={closeModal}
                className="flex-1 py-3.5 rounded-xl font-bold bg-[#F97316] hover:bg-[#ea6200] text-white transition-colors text-sm"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleReservationSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500 text-red-200 text-xs font-semibold flex items-center gap-2">
                <span>⚠️ {formError}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="sarah@expedition.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#4F9CF9] block mb-1">Number of Guests (Custom)</label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  required
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="Enter custom guest count"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Check-In Date</label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Check-Out Date</label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
              </div>
            </div>

            {/* Availability Warning Banner */}
            {isAlreadyBooked && (
              <div className="p-4 rounded-2xl bg-red-500/20 border border-red-500 text-red-200 text-xs font-semibold space-y-1">
                <strong className="block text-red-400 font-bold uppercase tracking-wider text-xs">
                  🔴 ROOM IS ALREADY BOOKED FOR THESE DATES
                </strong>
                <p>
                  This suite is already reserved from <span className="font-mono text-white">{overlappingBooking?.checkIn}</span> to <span className="font-mono text-white">{overlappingBooking?.checkOut}</span>. Please choose different dates or select another suite.
                </p>
              </div>
            )}

            {/* Coupon Code Row */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">Promo / Coupon Code (Try: ANNAPURNA10)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="ANNAPURNA10"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2.5 rounded-xl bg-[#4F9CF9] text-white font-bold text-xs hover:bg-[#388be0]"
                >
                  Apply
                </button>
              </div>
              {couponStatusMsg && (
                <span className="text-xs font-bold block mt-1 text-[#16A34A]">{couponStatusMsg}</span>
              )}
            </div>

            {/* Summary Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{selectedRoomForBooking.name} ({nights} Night{nights > 1 ? "s" : ""}, {guestsCount} Guest{guestsCount > 1 ? "s" : ""})</span>
                <span className="font-mono">${baseTotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#16A34A] font-bold">
                  <span>Promo Discount ({appliedDiscount}% OFF):</span>
                  <span className="font-mono">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white font-bold text-base">
                <span>Grand Total:</span>
                <span className="text-2xl text-[#4F9CF9] font-mono">${finalTotal} USD</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAlreadyBooked}
              className="w-full py-4 rounded-2xl font-extrabold text-base text-white bg-[#F97316] hover:bg-[#ea6200] disabled:bg-slate-600 disabled:cursor-not-allowed shadow-xl shadow-[#F97316]/30 transition-all uppercase tracking-wider cursor-pointer"
            >
              {isAlreadyBooked ? "🔴 Room Booked for Selected Dates" : "Confirm Reservation & Dispatch WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
