"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms } from "@/context/CmsContext";
import { Building, Plus, Trash2, Folder, Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function AdminRoomsPage() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useCms();

  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomPrice, setNewRoomPrice] = useState(250);
  const [newRoomCapacity, setNewRoomCapacity] = useState(2);
  const [newRoomImage, setNewRoomImage] = useState(
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
  );
  const [uploadingRoomImage, setUploadingRoomImage] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "booked">("all");

  const availableCount = rooms.filter((r) => r.available !== false).length;
  const bookedCount = rooms.length - availableCount;

  const displayedRooms = rooms.filter((r) => {
    if (statusFilter === "available") return r.available !== false;
    if (statusFilter === "booked") return r.available === false;
    return true;
  });

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
    if (!newRoomName.trim() || newRoomName.trim().length < 3) {
      alert("Please enter a valid room title (at least 3 characters).");
      return;
    }
    if (Number(newRoomPrice) <= 0) {
      alert("Price per night must be a positive number greater than 0.");
      return;
    }
    if (!newRoomImage.trim()) {
      alert("Please upload or enter a room image URL.");
      return;
    }

    await addRoom({
      name: newRoomName.trim(),
      pricePerNight: Number(newRoomPrice),
      capacity: Number(newRoomCapacity || 2),
      size: "42 m²",
      view: "Mountain Sanctuary View",
      rating: 4.9,
      description: "Comfortable mountain room configured via Admin CMS.",
      images: [newRoomImage],
      amenities: ["Radiant Floor Heating", "Panoramic Window", "Oxygen Pure Air"],
      featured: true,
      available: true,
    });
    setNewRoomName("");
    alert("New room added and published live to website!");
  };

  const handleToggleAvailability = async (id: string, currentAvailable: boolean) => {
    await updateRoom(id, { available: !currentAvailable });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <AdminNavbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Building className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Rooms Management
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                ADD ROOMS DIRECTLY & CONTROL LIVE AVAILABILITY
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
              {availableCount} Available
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/30">
              {bookedCount} Booked
            </span>
          </div>
        </div>

        {/* Add New Room Form */}
        <form onSubmit={handleCreateRoom} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Add New Room (Direct Display)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Room Name</label>
              <input
                type="text"
                required
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g. Dhaulagiri Horizon Room"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Price / Night ($)</label>
              <input
                type="number"
                required
                value={newRoomPrice}
                onChange={(e) => setNewRoomPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Guest Capacity</label>
              <input
                type="number"
                required
                min={1}
                max={10}
                value={newRoomCapacity}
                onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Room Photo (URL or Device Upload)</label>
            <div className="space-y-2">
              <input
                type="text"
                required
                value={newRoomImage}
                onChange={(e) => setNewRoomImage(e.target.value)}
                placeholder="https://... or /uploads/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9]"
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
            Publish New Room Live
          </button>
        </form>

        {/* Existing Rooms List with Status Filter & Availability Toggle */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Rooms Catalog ({rooms.length})
            </h2>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === "all"
                    ? "bg-[#4F9CF9] text-white shadow-md shadow-[#4F9CF9]/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                All ({rooms.length})
              </button>
              <button
                onClick={() => setStatusFilter("available")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === "available"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                Available ({availableCount})
              </button>
              <button
                onClick={() => setStatusFilter("booked")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === "booked"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                Booked ({bookedCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedRooms.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white/5 rounded-3xl border border-white/10 text-slate-300 text-sm">
                No rooms match the selected filter ({statusFilter}).
              </div>
            ) : (
              displayedRooms.map((r) => {
                const isAvailable = r.available !== false;
                return (
                  <div
                    key={r.id}
                    className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <img
                        src={r.images[0]}
                        alt={r.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-white/15 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <strong className="text-white text-sm sm:text-base block truncate">
                          {r.name}
                        </strong>
                        <span className="text-xs text-[#4F9CF9] font-mono block">
                          ${r.pricePerNight} / night • {r.capacity} Guests
                        </span>
                        <div>
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Available</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              <XCircle className="w-3 h-3" />
                              <span>Booked</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleToggleAvailability(r.id, isAvailable)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isAvailable
                            ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/30"
                            : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30"
                        }`}
                        title={isAvailable ? "Mark as Booked" : "Mark as Available"}
                      >
                        {isAvailable ? "Mark Booked" : "Mark Available"}
                      </button>

                      <button
                        onClick={() => deleteRoom(r.id)}
                        className="px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold border border-red-500/30 transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

