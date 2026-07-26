"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@annapurna.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok && !res?.error) {
        localStorage.setItem("admin_auth", "true");
        router.push("/admin/dashboard");
      } else {
        setErrorMsg(res?.error || "Invalid admin login credentials.");
      }
    } catch (err) {
      setErrorMsg("Network or server authentication error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#395371] text-white relative overflow-hidden">

      {/* Background Atmosphere Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4F9CF9] rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#16A34A] rounded-full blur-[140px]" />
      </div>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl space-y-6">
          {/* Header Badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F9CF9]/20 text-[#4F9CF9] text-xs font-mono font-bold uppercase tracking-wider border border-[#4F9CF9]/30">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>ANNAPURNA CMS AUTHENTICATION</span>
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Admin Portal Access
            </h1>
            <p className="text-xs text-slate-300">
              Enter your executive credentials to manage suites, bookings telemetry, hero CMS & coupons.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-slate-300 block mb-1 uppercase">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9] transition-all"
                placeholder="admin@annapurna.com"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-300 block mb-1 uppercase">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#4F9CF9] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#ea6200] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD →"}
            </button>
          </form>

          {/* Quick Demo Credentials Fill Button */}
          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <span className="text-[11px] text-slate-400 font-mono block">DEMO CREDENTIALS:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@annapurna.com");
                setPassword("admin123");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#4F9CF9] border border-white/10 transition-colors"
            >
              admin@annapurna.com / admin123
            </button>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Guesthouse Homepage
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
