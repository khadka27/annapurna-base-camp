"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms } from "@/context/CmsContext";
import { Tag, Plus, CheckCircle2 } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon } = useCms();

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    await addCoupon({
      code: newCouponCode.toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      active: true,
    });
    const code = newCouponCode.toUpperCase();
    setNewCouponCode("");
    alert(`Created coupon ${code} (${newCouponDiscount}% OFF)!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Tag className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Discount Coupons & Promo Engine
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                CREATE & ACTIVATE SPECIAL PROMO CODES FOR GUESTS
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold border border-[#16A34A]/30">
            {coupons.length} Active Promo Codes
          </span>
        </div>

        {/* Add Coupon Form */}
        <form onSubmit={handleCreateCoupon} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create New Discount Coupon Code</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Coupon Code (Uppercase)</label>
              <input
                type="text"
                required
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                placeholder="e.g. HIMALAYA2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-mono text-sm uppercase"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Discount Percentage (%)</label>
              <input
                type="number"
                min={1}
                max={90}
                required
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-bold text-xs shadow-lg transition-all"
          >
            Activate Promo Code
          </button>
        </form>

        {/* Existing Coupons Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Active Promotional Codes ({coupons.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.code} className="p-5 rounded-3xl bg-white/5 border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-[#4F9CF9] font-mono block">{c.code}</span>
                  <span className="text-xs text-slate-300 font-bold">{c.discountPercent}% OFF Total Invoice</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold flex items-center gap-1.5 border border-[#16A34A]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
