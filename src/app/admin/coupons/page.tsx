"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms, CouponItem } from "@/context/CmsContext";
import { Tag, Plus, CheckCircle2, XCircle, Trash2, Edit3, Save, X } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, toggleCouponActive, updateCoupon, deleteCoupon } = useCms();

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  // Edit Mode State
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editFormCode, setEditFormCode] = useState("");
  const [editFormDiscount, setEditFormDiscount] = useState(10);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) {
      alert("Please enter a valid coupon code.");
      return;
    }
    if (newCouponDiscount <= 0 || newCouponDiscount > 100) {
      alert("Discount percentage must be between 1% and 100%.");
      return;
    }

    const code = newCouponCode.trim().toUpperCase();

    // Check duplicate
    if (coupons.some((c) => c.code.toUpperCase() === code)) {
      alert(`Coupon code "${code}" already exists in the system.`);
      return;
    }

    await addCoupon({
      code,
      discountPercent: Number(newCouponDiscount),
      active: true,
    });

    setNewCouponCode("");
    alert(`Created & Activated promo code "${code}" (${newCouponDiscount}% OFF)!`);
  };

  const startEdit = (coupon: CouponItem) => {
    setEditingCode(coupon.code);
    setEditFormCode(coupon.code);
    setEditFormDiscount(coupon.discountPercent);
  };

  const handleSaveEdit = async (originalCode: string) => {
    if (!editFormCode.trim()) {
      alert("Coupon code cannot be empty.");
      return;
    }
    if (editFormDiscount <= 0 || editFormDiscount > 100) {
      alert("Discount percentage must be between 1% and 100%.");
      return;
    }

    await updateCoupon(originalCode, {
      code: editFormCode.trim().toUpperCase(),
      discountPercent: Number(editFormDiscount),
    });

    setEditingCode(null);
    alert("Discount coupon updated successfully!");
  };

  const handleDelete = async (code: string) => {
    if (confirm(`Are you sure you want to permanently delete coupon "${code}"?`)) {
      await deleteCoupon(code);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Tag className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Discount Coupons CRUD & Promo Engine
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                CREATE, EDIT, ACTIVATE & DEACTIVATE PROMO CODES
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold border border-[#16A34A]/30">
            {coupons.filter((c) => c.active).length} Active / {coupons.length} Total
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
                placeholder="e.g. ANNAPURNA2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-mono text-sm uppercase focus:outline-none focus:border-[#4F9CF9]"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Activate Promo Code</span>
          </button>
        </form>

        {/* Existing Coupons Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            All System Promo Codes ({coupons.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((c) => {
              const isEditing = editingCode === c.code;

              return (
                <div
                  key={c.code}
                  className={`p-6 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 transition-all ${
                    c.active
                      ? "bg-white/5 border-white/15 hover:border-[#4F9CF9]/40"
                      : "bg-white/5 border-slate-700/60 opacity-75"
                  }`}
                >
                  {isEditing ? (
                    /* EDIT FORM */
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-300 uppercase block font-bold mb-1">
                          Edit Code
                        </label>
                        <input
                          type="text"
                          value={editFormCode}
                          onChange={(e) => setEditFormCode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-sm uppercase"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-300 uppercase block font-bold mb-1">
                          Edit Discount %
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={90}
                          value={editFormDiscount}
                          onChange={(e) => setEditFormDiscount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleSaveEdit(c.code)}
                          className="flex-1 py-2 rounded-xl bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingCode(null)}
                          className="px-3 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-bold hover:bg-white/20 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* VIEW CARD */
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xl font-extrabold text-[#4F9CF9] font-mono block tracking-wider">
                            {c.code}
                          </span>
                          <span className="text-sm text-slate-200 font-bold">
                            {c.discountPercent}% OFF Total Booking
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                            c.active
                              ? "bg-[#16A34A]/20 text-[#16A34A] border-[#16A34A]/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          }`}
                        >
                          {c.active ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                              <span>ACTIVE</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>DEACTIVATED</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Action Bar: Toggle Active, Edit, Delete */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleCouponActive(c.code, !c.active)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                            c.active
                              ? "bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/30"
                              : "bg-[#16A34A]/20 hover:bg-[#16A34A]/40 text-emerald-300 border border-[#16A34A]/30"
                          }`}
                        >
                          {c.active ? "Deactivate" : "Activate Code"}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEdit(c)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Coupon"
                          >
                            <Edit3 className="w-4 h-4 text-[#4F9CF9]" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.code)}
                            className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
