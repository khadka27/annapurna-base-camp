"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { useCms, ServiceItem } from "@/context/CmsContext";
import { Zap, Plus, Trash2 } from "lucide-react";
import { DynamicIcon } from "@/components/DynamicIcon";

export default function AdminServicesPage() {
  const { services, addService, deleteService } = useCms();

  const [newSrvTitle, setNewSrvTitle] = useState("");
  const [newSrvCategory, setNewSrvCategory] = useState<ServiceItem["category"]>("Wellness & Safety");
  const [newSrvPrice, setNewSrvPrice] = useState(0);
  const [newSrvIcon, setNewSrvIcon] = useState("mountain");
  const [newSrvDescription, setNewSrvDescription] = useState("");
  const [newSrvIncluded, setNewSrvIncluded] = useState(true);

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
    setNewSrvTitle("");
    setNewSrvDescription("");
    alert(`Published service "${newSrvTitle}"!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#0F172A] flex items-center justify-center font-bold shadow-lg">
              <Zap className="w-6 h-6 text-[#0F172A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guesthouse Services Manager
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                ADD & CONFIGURE HIGH-ALTITUDE LUXURY & MEDICAL PERKS
              </span>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[#16A34A]/20 text-[#16A34A] text-xs font-mono font-bold border border-[#16A34A]/30">
            {services.length} Active Services
          </span>
        </div>

        {/* Add Service Form */}
        <form onSubmit={handleCreateService} className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-5">
          <h2 className="text-base font-bold text-[#4F9CF9] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Add New Guesthouse Service</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Service Title</label>
              <input
                type="text"
                required
                value={newSrvTitle}
                onChange={(e) => setNewSrvTitle(e.target.value)}
                placeholder="e.g. Helicopter Charter Service"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Category</label>
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
              <label className="text-xs font-bold text-slate-300 block mb-1">Lucide Icon Key</label>
              <input
                type="text"
                required
                value={newSrvIcon}
                onChange={(e) => setNewSrvIcon(e.target.value)}
                placeholder="mountain, helicopter, wifi, flame"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Price ($0 for Complimentary)</label>
              <input
                type="number"
                value={newSrvPrice}
                onChange={(e) => setNewSrvPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Perk Type</label>
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
            <label className="text-xs font-bold text-slate-300 block mb-1">Description</label>
            <textarea
              rows={2}
              value={newSrvDescription}
              onChange={(e) => setNewSrvDescription(e.target.value)}
              placeholder="Describe service features..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-bold text-xs shadow-lg transition-all"
          >
            Publish Service Perk
          </button>
        </form>

        {/* Existing Services List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Active Services ({services.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-5 rounded-3xl bg-white/5 border border-white/15 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/10 text-[#4F9CF9]">
                    <DynamicIcon name={srv.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="text-white text-base block">{srv.title}</strong>
                    <span className="text-xs text-slate-400 font-mono">{srv.category} • {srv.included ? "Complimentary" : `$${srv.price}`}</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteService(srv.id)}
                  className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold border border-red-500/30 transition-all flex items-center gap-1.5"
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
