"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, KeyRound, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminAccountSettingsPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/admin/credentials");
      const data = await res.json();
      if (data.success && data.email) {
        setCurrentEmail(data.email);
        setNewEmail(data.email);
      }
    } catch (err) {
      console.error("Failed to load admin email", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!currentPassword) {
      setStatusMsg({ type: "error", text: "Please enter your current password to verify identity." });
      return;
    }

    if (!newEmail || !newPassword) {
      setStatusMsg({ type: "error", text: "New email and new password cannot be blank." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "New password and confirmation password do not match!" });
      return;
    }

    if (newPassword.length < 4) {
      setStatusMsg({ type: "error", text: "Password should be at least 4 characters long." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newEmail,
          newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatusMsg({
          type: "success",
          text: data.message || "Admin email & password credentials updated successfully in PostgreSQL!",
        });
        setCurrentEmail(data.email || newEmail);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setStatusMsg({ type: "error", text: data.message || "Failed to update credentials." });
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "Network error updating admin credentials." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white">
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Header Bar */}
        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4F9CF9] text-[#395371] flex items-center justify-center font-bold shadow-lg">
              <ShieldCheck className="w-6 h-6 text-[#395371]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Admin Account & Credentials Settings
              </h1>
              <span className="text-xs font-mono text-[#4F9CF9]">
                POSTGRESQL DB AUTHENTICATION & LOGIN SECURITY
              </span>
            </div>
          </div>
        </div>

        {/* Credentials Form Panel */}
        <div className="bg-white/5 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#4F9CF9]" /> Change Admin Login Credentials
            </h2>
            <p className="text-xs text-slate-300">
              Update the master admin email and login password stored securely in your PostgreSQL database.
            </p>
          </div>

          {/* Feedback Status Alert */}
          {statusMsg && (
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold ${
                statusMsg.type === "success"
                  ? "bg-[#16A34A]/20 border-[#16A34A]/40 text-emerald-200"
                  : "bg-red-500/20 border-red-500/40 text-red-200"
              }`}
            >
              {statusMsg.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Email Display */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Current Registered Admin Email
              </label>
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-slate-200 font-mono text-sm flex items-center justify-between">
                <span>{fetching ? "Loading..." : currentEmail || "admin@annapurna.com"}</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 uppercase">ACTIVE</span>
              </div>
            </div>

            {/* Step 1: Verification */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-[#F97316] uppercase tracking-wider block">
                1. Verify Identity (Current Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                <input
                  type="password"
                  required
                  placeholder="Enter current admin password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#F97316] text-sm"
                />
              </div>
            </div>

            {/* Step 2: New Email & Password */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-[#4F9CF9] uppercase tracking-wider block">
                2. New Login Credentials
              </label>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 block font-medium">New Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                  <input
                    type="email"
                    required
                    placeholder="admin@annapurna.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#4F9CF9] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 block font-medium">New Password</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <input
                      type="password"
                      required
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#4F9CF9] text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 block font-medium">Confirm New Password</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#4F9CF9] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#138a3e] text-white font-extrabold text-sm shadow-xl shadow-[#16A34A]/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save New Admin Credentials"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
