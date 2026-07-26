"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { GlassNavbar } from "@/components/GlassNavbar";
import { useCms, RoomItem, GalleryItem, ServiceItem } from "@/context/CmsContext";
import { Building, Eye, LogOut, Folder, Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
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
    services,
    addService,
    deleteService,
  } = useCms();

  const [activeTab, setActiveTab] = useState<"analytics" | "rooms" | "bookings" | "hero" | "gallery" | "coupons" | "services">("analytics");

  // New Service state
  const [newSrvTitle, setNewSrvTitle] = useState("");
  const [newSrvCategory, setNewSrvCategory] = useState<ServiceItem["category"]>("Wellness & Safety");
  const [newSrvPrice, setNewSrvPrice] = useState(0);
  const [newSrvIcon, setNewSrvIcon] = useState("🫁");
  const [newSrvDescription, setNewSrvDescription] = useState("");
  const [newSrvIncluded, setNewSrvIncluded] = useState(true);

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

  // Uploading Loading State
  const [uploadingRoomImage, setUploadingRoomImage] = useState(false);
  const [uploadingGalImage, setUploadingGalImage] = useState(false);

  // New Coupon state
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  const handleFileUpload = async (
    file: File,
    setUrl: (url: string) => void,
    setUploading: (uploading: boolean) => void
  ) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setUrl(data.url);
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file to server");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      const isAuthFallback = localStorage.getItem("admin_auth") === "true";
      if (!isAuthFallback) {
        router.push("/admin/login");
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center p-6">
        <div className="text-center space-y-3 font-mono">
          <span className="w-3 h-3 rounded-full bg-[#4F9CF9] animate-ping inline-block" />
          <p className="text-sm text-slate-300">Validating NextAuth Session Security...</p>
        </div>
      </div>
    );
  }

  const totalRevenue = bookings.reduce((sum, b) => (b.status === "Confirmed" ? sum + b.totalAmount : sum), 0);
  const activeBookingsCount = bookings.filter((b) => b.status === "Confirmed").length;

  const handleLogout = async () => {
    localStorage.removeItem("admin_auth");
    await signOut({ callbackUrl: "/admin/login" });
  };

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
    alert("New room added to luxury catalog & database!");
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

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle) return;
    await addService({
      title: newSrvTitle,
      category: newSrvCategory,
      price: Number(newSrvPrice),
      icon: newSrvIcon || "mountain",
      description: newSrvDescription || `${newSrvTitle} service at Annapurna Base Camp Sanctuary.`,
      included: newSrvIncluded,
    });
    const title = newSrvTitle;
    setNewSrvTitle("");
    setNewSrvDescription("");
    alert(`Published service "${title}"!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white pt-20">
      <GlassNavbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        {/* Top Header Bar */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Building className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Annapurna Admin Executive Dashboard
                </h1>
              </div>
              <span className="text-xs font-mono text-[#4F9CF9]">
                LIVE PRISMA & POSTGRESQL MANAGEMENT PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-slate-200 transition-colors border border-white/15 flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-[#4F9CF9]" />
              <span>View Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 font-bold text-xs border border-red-500/30 transition-colors flex items-center gap-1.5"
            >
              <span>Sign Out</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10">
          {[
            { id: "analytics", label: "Analytics Overview" },
            { id: "rooms", label: "Rooms CRUD" },
            { id: "services", label: "Services Manager" },
            { id: "bookings", label: "Bookings Engine" },
            { id: "hero", label: "Hero Content CMS" },
            { id: "gallery", label: "Gallery Manager" },
            { id: "coupons", label: "Discount Coupons" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
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

              {/* Curved Line Revenue Analytics Graph */}
              <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue & Reservation Growth Curve</h3>
                    <p className="text-xs text-slate-400">Smooth curved performance telemetry (2026 Himalayan Trek Season)</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold">
                    +34.2% Growth Curve
                  </span>
                </div>

                {/* SVG Smooth Curved Line Chart */}
                <div className="relative w-full h-48 pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="smoothCurveAreaDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4F9CF9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#4F9CF9" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="smoothLineGradDash" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4F9CF9" />
                        <stop offset="50%" stopColor="#16A34A" />
                        <stop offset="100%" stopColor="#F97316" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                    <path
                      d="M 0 140 C 80 120, 140 90, 200 100 C 260 110, 320 40, 380 50 C 440 60, 500 20, 600 15 L 600 150 L 0 150 Z"
                      fill="url(#smoothCurveAreaDash)"
                    />

                    <path
                      d="M 0 140 C 80 120, 140 90, 200 100 C 260 110, 320 40, 380 50 C 440 60, 500 20, 600 15"
                      fill="none"
                      stroke="url(#smoothLineGradDash)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Guest Logs</h3>
                <div className="space-y-2 text-xs">
                  {bookings.map((b) => (
                    <div key={b.id} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
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
              <form onSubmit={handleCreateRoom} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="suite" className="bg-[#0F172A]">Glacier Suite</option>
                      <option value="panorama" className="bg-[#0F172A]">Panorama Room</option>
                      <option value="deluxe" className="bg-[#0F172A]">Deluxe Twin</option>
                      <option value="lodge" className="bg-[#0F172A]">Alpine Lodge</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Suite Photo (URL or Upload from Device)</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newRoomImage}
                        onChange={(e) => setNewRoomImage(e.target.value)}
                        placeholder="https://... or /uploads/..."
                        className="flex-grow px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                      />
                      <label className="px-4 py-2 rounded-xl bg-[#4F9CF9]/20 hover:bg-[#4F9CF9]/30 text-[#4F9CF9] border border-[#4F9CF9]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap">
                        <span>
                          {uploadingRoomImage ? (
                            <span className="flex items-center gap-1.5"><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</span>
                          ) : (
                            <span className="flex items-center gap-1.5"><Folder className="w-4 h-4 text-[#4F9CF9]" /> Upload Local File</span>
                          )}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], setNewRoomImage, setUploadingRoomImage);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {newRoomImage && (
                      <div className="flex items-center gap-3 pt-1">
                        <img src={newRoomImage} alt="Room Preview" className="w-14 h-10 object-cover rounded-lg border border-white/20" />
                        <span className="text-[10px] font-mono text-slate-400 truncate">Saved to: {newRoomImage}</span>
                      </div>
                    )}
                  </div>
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

          {/* SERVICES MANAGER */}
          {activeTab === "services" && (
            <div className="space-y-8">
              <form onSubmit={handleCreateService} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">+ Add New Guesthouse Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Service Title</label>
                    <input
                      type="text"
                      required
                      value={newSrvTitle}
                      onChange={(e) => setNewSrvTitle(e.target.value)}
                      placeholder="e.g. Helicopter Charter Service"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Category</label>
                    <select
                      value={newSrvCategory}
                      onChange={(e) => setNewSrvCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="Wellness & Safety" className="bg-[#0F172A]">Wellness & Safety</option>
                      <option value="Logistics & Transport" className="bg-[#0F172A]">Logistics & Transport</option>
                      <option value="Dining & Comfort" className="bg-[#0F172A]">Dining & Comfort</option>
                      <option value="Connectivity" className="bg-[#0F172A]">Connectivity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Icon / Emoji</label>
                    <input
                      type="text"
                      required
                      value={newSrvIcon}
                      onChange={(e) => setNewSrvIcon(e.target.value)}
                      placeholder="activity or helicopter"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Price ($0 for Complimentary)</label>
                    <input
                      type="number"
                      required
                      value={newSrvPrice}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setNewSrvPrice(val);
                        setNewSrvIncluded(val === 0);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Perk Type</label>
                    <select
                      value={newSrvIncluded ? "true" : "false"}
                      onChange={(e) => setNewSrvIncluded(e.target.value === "true")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="true" className="bg-[#0F172A]">Complimentary Perk</option>
                      <option value="false" className="bg-[#0F172A]">Add-On Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Service Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newSrvDescription}
                    onChange={(e) => setNewSrvDescription(e.target.value)}
                    placeholder="Describe service features..."
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs hover:bg-[#138a3e]"
                >
                  Publish Service
                </button>
              </form>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Services ({services.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div key={srv.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-white/10">{srv.icon}</span>
                        <div>
                          <strong className="text-white block text-sm">{srv.title}</strong>
                          <span className="text-xs text-slate-400">{srv.category} • {srv.included ? "Complimentary" : `$${srv.price}`}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteService(srv.id)}
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
                  <div key={b.id} className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
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
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs focus:outline-none cursor-pointer"
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
            <form onSubmit={handleSaveHero} className="space-y-4 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10">
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
              <form onSubmit={handleCreateGallery} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="Sanctuary" className="bg-[#0F172A]">Sanctuary</option>
                      <option value="Suites" className="bg-[#0F172A]">Suites</option>
                      <option value="Dining" className="bg-[#0F172A]">Dining</option>
                      <option value="Peaks" className="bg-[#0F172A]">Peaks</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Gallery Photo (URL or Upload from Device)</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newGalUrl}
                        onChange={(e) => setNewGalUrl(e.target.value)}
                        placeholder="https://... or /uploads/..."
                        className="flex-grow px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                      />
                      <label className="px-4 py-2 rounded-xl bg-[#4F9CF9]/20 hover:bg-[#4F9CF9]/30 text-[#4F9CF9] border border-[#4F9CF9]/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap">
                        <span>
                          {uploadingGalImage ? (
                            <span className="flex items-center gap-1.5"><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</span>
                          ) : (
                            <span className="flex items-center gap-1.5"><Folder className="w-4 h-4 text-[#4F9CF9]" /> Upload Local File</span>
                          )}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], setNewGalUrl, setUploadingGalImage);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {newGalUrl && (
                      <div className="flex items-center gap-3 pt-1">
                        <img src={newGalUrl} alt="Gallery Preview" className="w-14 h-10 object-cover rounded-lg border border-white/20" />
                        <span className="text-[10px] font-mono text-slate-400 truncate">Saved to: {newGalUrl}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs hover:bg-[#138a3e]"
                >
                  Publish Gallery Photo
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="relative rounded-2xl overflow-hidden group border border-white/10 h-40">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-white">{g.title}</span>
                      <button
                        onClick={() => deleteGalleryItem(g.id)}
                        className="px-2 py-1 rounded bg-red-500/80 text-white text-[10px] font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COUPONS */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <form onSubmit={handleCreateCoupon} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#4F9CF9] uppercase tracking-wider">+ Create Promo Discount Coupon</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      required
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      placeholder="e.g. HIMALAYA20"
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Discount Percent (%)</label>
                    <input
                      type="number"
                      required
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#16A34A] text-white font-bold text-xs hover:bg-[#138a3e]"
                >
                  Create Coupon Code
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coupons.map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="font-mono text-sm text-[#4F9CF9] block">{c.code}</strong>
                      <span className="text-xs text-slate-400">{c.discountPercent}% OFF</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#16A34A]/20 text-[#16A34A] text-[10px] font-bold">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
