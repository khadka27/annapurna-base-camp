"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms, RoomItem } from "@/context/CmsContext";
import { Building, Plus, Trash2, Folder, Loader2 } from "lucide-react";

export default function AdminRoomsPage() {
  const { rooms, addRoom, deleteRoom } = useCms();

  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState(250);
  const [newRoomCategory, setNewRoomCategory] = useState<RoomItem["category"]>("suite");
  const [newRoomImage, setNewRoomImage] = useState("https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80");
  const [uploadingRoomImage, setUploadingRoomImage] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadingRoomImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        setNewRoomImage(data.url);
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file to server");
    } finally {
      setUploadingRoomImage(false);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;
    await addRoom({
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

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Building className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Rooms CRUD & Catalog Manager
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                CREATE, UPDATE & MANAGE HIGH-ALTITUDE GLACIER SUITES
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold border border-[#16A34A]/30">
            {rooms.length} Suites Live
          </span>
        </div>

        {/* Add New Room Form */}
        <form onSubmit={handleCreateRoom} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Add New Suite to Catalog</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Room Name</label>
              <input
                type="text"
                required
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g. Dhaulagiri Horizon Suite"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Price / Night ($)</label>
              <input
                type="number"
                required
                value={newRoomPrice}
                onChange={(e) => setNewRoomPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
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
            <label className="text-xs font-bold text-slate-300 block mb-1">Suite Photo (URL or Device Upload)</label>
            <div className="space-y-2">
              <input
                type="text"
                required
                value={newRoomImage}
                onChange={(e) => setNewRoomImage(e.target.value)}
                placeholder="https://... or /uploads/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
              <label className="w-full px-4 py-2.5 rounded-xl bg-[#4F9CF9]/20 hover:bg-[#4F9CF9]/30 text-[#4F9CF9] border border-[#4F9CF9]/40 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                {uploadingRoomImage ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Uploading image to server...</span>
                ) : (
                  <span className="flex items-center gap-2"><Folder className="w-4 h-4 text-[#4F9CF9]" /> Choose & Upload Local Image File</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-bold text-xs shadow-lg transition-all"
          >
            Publish New Room Suite
          </button>
        </form>

        {/* Existing Rooms List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Active Catalog Suites ({rooms.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((r) => (
              <div key={r.id} className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <img src={r.images[0]} alt={r.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-2xl border border-white/15 shrink-0" />
                  <div className="min-w-0">
                    <strong className="text-white text-sm sm:text-base block truncate">{r.name}</strong>
                    <span className="text-xs text-[#4F9CF9] font-mono block">${r.pricePerNight} / night • {r.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteRoom(r.id)}
                  className="self-end sm:self-center px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold border border-red-500/30 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
