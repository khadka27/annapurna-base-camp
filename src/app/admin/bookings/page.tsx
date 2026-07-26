"use client";

import React from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms } from "@/context/CmsContext";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useCms();

  const totalRevenue = bookings.reduce((sum, b) => (b.status === "Confirmed" ? sum + b.totalAmount : sum), 0);
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Calendar className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guest Bookings & Reservations Engine
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                LIVE RESERVATION STATUS, INVOICES & TELEMETRY
              </span>
            </div>
          </div>
          <div className="text-right font-mono">
            <span className="text-2xl font-extrabold text-[#16A34A] block">${totalRevenue} USD</span>
            <span className="text-xs text-slate-400">Total Confirmed Revenue</span>
          </div>
        </div>

        {/* Status Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/15 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono block">CONFIRMED BOOKINGS</span>
              <span className="text-3xl font-extrabold text-[#16A34A]">{confirmedCount}</span>
            </div>
            <CheckCircle className="w-8 h-8 text-[#16A34A]" />
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/15 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono block">PENDING INQUIRIES</span>
              <span className="text-3xl font-extrabold text-amber-400">{pendingCount}</span>
            </div>
            <Clock className="w-8 h-8 text-amber-400" />
          </div>

          <div className="bg-white/5 p-5 rounded-2xl border border-white/15 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono block">TOTAL RECORDED</span>
              <span className="text-3xl font-extrabold text-[#4F9CF9]">{bookings.length}</span>
            </div>
            <Calendar className="w-8 h-8 text-[#4F9CF9]" />
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            All Guest Reservation Records ({bookings.length})
          </h2>

          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="p-6 rounded-3xl bg-white/5 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-[#4F9CF9]/20 text-[#4F9CF9] font-mono font-bold text-xs">
                      {b.id}
                    </span>
                    <strong className="text-white text-lg">{b.guestName}</strong>
                  </div>
                  <div className="text-xs text-slate-300 space-x-3">
                    <span>Suite: <strong className="text-white">{b.roomName}</strong></span>
                    <span>•</span>
                    <span>Dates: {b.checkIn} to {b.checkOut}</span>
                    <span>•</span>
                    <span>{b.guestsCount} Trekkers</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Email: {b.guestEmail} • Phone: {b.guestPhone}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-[#16A34A] block font-mono">${b.totalAmount} USD</span>
                    {b.discountAmount > 0 && (
                      <span className="text-[10px] text-slate-400 font-mono block">Saved ${b.discountAmount} with coupon</span>
                    )}
                  </div>

                  {b.status === "Pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateBookingStatus(b.id, "Confirmed")}
                        className="px-4 py-2 rounded-xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-extrabold text-xs shadow-lg shadow-[#16A34A]/25 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve Booking</span>
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b.id, "Cancelled")}
                        className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 font-bold text-xs border border-red-500/30 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs border flex items-center gap-1.5 ${
                          b.status === "Confirmed"
                            ? "bg-[#16A34A]/20 border-[#16A34A]/40 text-emerald-300"
                            : "bg-red-500/20 border-red-500/40 text-red-300"
                        }`}
                      >
                        {b.status === "Confirmed" ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>APPROVED</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-400" />
                            <span>REJECTED</span>
                          </>
                        )}
                      </span>
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs focus:outline-none focus:border-[#4F9CF9] transition-all cursor-pointer shadow-sm"
                      >
                        <option value="Confirmed" className="bg-[#0F172A]">Confirmed</option>
                        <option value="Pending" className="bg-[#0F172A]">Pending</option>
                        <option value="Cancelled" className="bg-[#0F172A]">Cancelled</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
