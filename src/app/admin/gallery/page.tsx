"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms, GalleryItem } from "@/context/CmsContext";
import { Camera, Plus, Trash2, Folder, Loader2 } from "lucide-react";

export default function AdminGalleryPage() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useCms();

  const [newGalTitle, setNewGalTitle] = useState("");
  const [newGalCategory, setNewGalCategory] = useState<GalleryItem["category"]>("Sanctuary");
  const [newGalUrl, setNewGalUrl] = useState("");
  const [uploadingGalImage, setUploadingGalImage] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadingGalImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        setNewGalUrl(data.url);
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file to server");
    } finally {
      setUploadingGalImage(false);
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) return;
    await addGalleryItem({
      title: newGalTitle,
      category: newGalCategory,
      imageUrl: newGalUrl,
    });
    setNewGalTitle("");
    setNewGalUrl("");
    alert("Gallery photo published live!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Camera className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Media & Photo Gallery Manager
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                PUBLISH HIGH-RESOLUTION PHOTOGRAPHY & SUMMIT MEDIA
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold border border-[#16A34A]/30">
            {gallery.length} Published Photos
          </span>
        </div>

        {/* Add Photo Form */}
        <form onSubmit={handleCreateGallery} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Publish New Photo to Gallery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Title / Caption</label>
              <input
                type="text"
                required
                value={newGalTitle}
                onChange={(e) => setNewGalTitle(e.target.value)}
                placeholder="e.g. Sunrise over Machapuchare Peak"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
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
            <label className="text-xs font-bold text-slate-300 block mb-1">Photo Image (URL or Local Upload)</label>
            <div className="space-y-2">
              <input
                type="text"
                required
                value={newGalUrl}
                onChange={(e) => setNewGalUrl(e.target.value)}
                placeholder="https://... or /uploads/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
              <label className="w-full px-4 py-2.5 rounded-xl bg-[#4F9CF9]/20 hover:bg-[#4F9CF9]/30 text-[#4F9CF9] border border-[#4F9CF9]/40 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                {uploadingGalImage ? (
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
            Publish Media Item
          </button>
        </form>

        {/* Existing Gallery Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Published Gallery Items ({gallery.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((g) => (
              <div key={g.id} className="bg-white/5 rounded-3xl overflow-hidden border border-white/15 group relative space-y-3 p-4">
                <img src={g.imageUrl} alt={g.title} className="w-full h-44 object-cover rounded-2xl border border-white/10" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{g.title}</h3>
                    <span className="text-xs text-[#4F9CF9] font-mono">{g.category}</span>
                  </div>
                  <button
                    onClick={() => deleteGalleryItem(g.id)}
                    className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
