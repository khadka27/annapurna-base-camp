/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useCms, RoomItem, GalleryItem } from "@/context/CmsContext";

export function AdminDashboard() {
  const {
    adminOpen,
    setAdminOpen,
    heroConfig,
    updateHeroConfig,
    rooms,
    addRoom,
    deleteRoom,
    bookings,
    updateBookingStatus,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    coupons,
    addCoupon,
  } = useCms();

  const [activeTab, setActiveTab] = useState<"analytics" | "rooms" | "bookings" | "hero" | "gallery" | "coupons">("analytics");

  // Hero form state
  const [heroTitle, setHeroTitle] = useState(heroConfig.title);
  const [heroSubtitle, setHeroSubtitle] = useState(heroConfig.subtitle);
  const [heroBadge, setHeroBadge] = useState(heroConfig.badge);
  const [autoSpeed, setAutoSpeed] = useState(heroConfig.autoSlideSpeed);

  // New Room Form state
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState(250);
  const [newRoomCategory, setNewRoomCategory] = useState<RoomItem["category"]>("suite");
  const [newRoomImage, setNewRoomImage] = useState("https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80");

  // New Gallery Form state
  const [newGalTitle, setNewGalTitle] = useState("");
  const [newGalCategory, setNewGalCategory] = useState<GalleryItem["category"]>("Sanctuary");
  const [newGalUrl, setNewGalUrl] = useState("");

  // New Coupon state
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  if (!adminOpen) return null;

  const totalRevenue = bookings.reduce((sum, b) => (b.status === "Confirmed" ? sum + b.totalAmount : sum), 0);
  const activeBookingsCount = bookings.filter((b) => b.status === "Confirmed").length;

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig({
      title: heroTitle,
      subtitle: heroSubtitle,
      badge: heroBadge,
      autoSlideSpeed: Number(autoSpeed),
    });
    alert("Hero section CMS updated live!");
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;
    addRoom({
      name: newRoomName,
      category: newRoomCategory,
      pricePerNight: Number(newRoomPrice),
      capacity: 2,
      size: "42 m²",
      view: "Mountain Sanctuary View",
      rating: 4.9,
      description: "Custom luxury room configured via Admin CMS.",
      images: [newRoomImage],
      amenities: ["Radiant Floor Heating", "Panoramic Window", "Oxygen Pure Air"],
      featured: true,
      available: true,
    });
    setNewRoomName("");
    alert("New room added to luxury catalog!");
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) return;
    addGalleryItem({
      title: newGalTitle,
      category: newGalCategory,
      imageUrl: newGalUrl,
    });
    setNewGalTitle("");
    setNewGalUrl("");
    alert("Gallery item published!");
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      active: true,
    });
    setNewCouponCode("");
    alert(`Created coupon ${newCouponCode.toUpperCase()} (${newCouponDiscount}% OFF)`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="bg-[#0F172A] border border-white/20 rounded-3xl w-full max-w-5xl text-white overflow-hidden shadow-2xl relative my-6">
        {/* Top Bar */}
        <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold">
              <svg className="w-5 h-5 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Annapurna Guesthouse CMS Admin</h2>
              <span className="text-xs font-mono text-[#4F9CF9]">LIVE PERSISTENT DASHBOARD</span>
            </div>
          </div>

          <button
            onClick={() => setAdminOpen(false)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-slate-200"
          >
            Close Dashboard ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 overflow-x-auto">
          {[
            { id: "analytics", label: "Analytics Overview" },
            { id: "rooms", label: "Rooms CRUD" },
            { id: "bookings", label: "Bookings Engine" },
            { id: "hero", label: "Hero Content CMS" },
            { id: "gallery", label: "Gallery Manager" },
            { id: "coupons", label: "Discount Coupons" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#4F9CF9] text-[#4F9CF9] bg-white/5"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-slate-400 block font-mono">TOTAL REVENUE</span>
                  <span className="text-3xl font-extrabold text-[#16A34A]">${totalRevenue} USD</span>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-slate-400 block font-mono">CONFIRMED BOOKINGS</span>
                  <span className="text-3xl font-extrabold text-[#4F9CF9]">{activeBookingsCount}</span>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-slate-400 block font-mono">TOTAL ROOM SUITES</span>
                  <span className="text-3xl font-extrabold text-white">{rooms.length}</span>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-xs text-slate-400 block font-mono">ESTIMATED OCCUPANCY</span>
                  <span className="text-3xl font-extrabold text-[#F97316]">94%</span>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Guest Logs</h3>
                <div className="space-y-2 text-xs">
                  {bookings.map((b) => (
                    <div key={b.id} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <strong className="text-white block">{b.guestName} ({b.roomName})</strong>
                        <span className="text-slate-400">{b.checkIn} → {b.checkOut} • {b.guestEmail}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#4F9CF9] text-sm block">${b.totalAmount}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.status === "Confirmed" ? "bg-[#16A34A]/20 text-[#16A34A]" : "bg-red-500/20 text-red-400"}`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ROOMS MANAGER */}
          {activeTab === "rooms" && (
            <div className="space-y-8">
              <form onSubmit={handleCreateRoom} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">+ Add New Suite to Catalog</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Room Name</label>
                    <input
                      type="text"
                      required
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="e.g. Dhaulagiri Horizon Suite"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Price / Night ($)</label>
                    <input
                      type="number"
                      required
                      value={newRoomPrice}
                      onChange={(e) => setNewRoomPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Category</label>
                    <select
                      value={newRoomCategory}
                      onChange={(e) => setNewRoomCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    >
                      <option value="suite" className="bg-[#0F172A]">Glacier Suite</option>
                      <option value="panorama" className="bg-[#0F172A]">Panorama Room</option>
                      <option value="deluxe" className="bg-[#0F172A]">Deluxe Twin</option>
                      <option value="lodge" className="bg-[#0F172A]">Alpine Lodge</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    required
                    value={newRoomImage}
                    onChange={(e) => setNewRoomImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs hover:bg-[#138a3e]"
                >
                  Publish New Room
                </button>
              </form>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Rooms Catalog ({rooms.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rooms.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <strong className="text-white block text-sm">{r.name}</strong>
                        <span className="text-xs text-slate-400">${r.pricePerNight} / night • {r.category}</span>
                      </div>
                      <button
                        onClick={() => deleteRoom(r.id)}
                        className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Guest Reservations Engine</h3>
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#4F9CF9]">{b.id}</span>
                        <strong className="text-white text-sm">{b.guestName}</strong>
                      </div>
                      <span className="text-slate-300 block">{b.roomName} • {b.checkIn} to {b.checkOut} ({b.guestsCount} Guests)</span>
                      <span className="text-slate-400 block">{b.guestEmail} • Phone: {b.guestPhone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-lg text-white">${b.totalAmount}</span>

                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white font-bold"
                      >
                        <option value="Confirmed" className="bg-[#0F172A]">Confirmed</option>
                        <option value="Pending" className="bg-[#0F172A]">Pending</option>
                        <option value="Cancelled" className="bg-[#0F172A]">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HERO CMS */}
          {activeTab === "hero" && (
            <form onSubmit={handleSaveHero} className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">Edit Hero Section CMS</h3>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Main Hero Heading</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Subtitle Description</label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Hero Top Badge Text</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Auto-Slide Duration (ms)</label>
                <input
                  type="number"
                  value={autoSpeed}
                  onChange={(e) => setAutoSpeed(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#F97316] text-white font-bold text-xs hover:bg-[#ea6200]"
              >
                Save Hero Settings Live
              </button>
            </form>
          )}

          {/* GALLERY CMS */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <form onSubmit={handleCreateGallery} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">+ Add Photo to Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Title / Caption</label>
                    <input
                      type="text"
                      required
                      value={newGalTitle}
                      onChange={(e) => setNewGalTitle(e.target.value)}
                      placeholder="e.g. Base Camp Viewpoint"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Category</label>
                    <select
                      value={newGalCategory}
                      onChange={(e) => setNewGalCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    >
                      <option value="Sanctuary" className="bg-[#0F172A]">Sanctuary</option>
                      <option value="Suites" className="bg-[#0F172A]">Suites</option>
                      <option value="Dining" className="bg-[#0F172A]">Dining</option>
                      <option value="Peaks" className="bg-[#0F172A]">Peaks</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={newGalUrl}
                    onChange={(e) => setNewGalUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs">
                  Upload Gallery Item
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="relative rounded-xl overflow-hidden group border border-white/10">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-24 object-cover" />
                    <button
                      onClick={() => deleteGalleryItem(g.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-red-600 text-white text-[10px] font-bold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COUPONS CMS */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <form onSubmit={handleCreateCoupon} className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">+ Create Promo Discount Coupon</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      required
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      placeholder="e.g. VIPEXPEDITION15"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Discount %</label>
                    <input
                      type="number"
                      required
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                </div>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs">
                  Create Active Coupon
                </button>
              </form>

              <div className="space-y-2">
                {coupons.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-white text-sm">{c.code}</span>
                    <span className="text-[#16A34A] font-bold">{c.discountPercent}% OFF ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
