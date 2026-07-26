"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";

export function ContactFormClient() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("Room Reservation");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please enter your full name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg("Please write your message (minimum 10 characters).");
      return;
    }

    setLoading(true);

    // Simulate sending message or dispatching
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-center space-y-4 animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-white">Message Dispatched Successfully!</h3>
          <p className="text-xs text-slate-200">
            Thank you, <strong className="text-white">{fullName}</strong>! Our Himalayan Concierge desk has received your inquiry regarding <strong>{inquiryType}</strong> and will respond to <span className="font-mono text-emerald-300">{email}</span> within 2 hours.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFullName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500 text-red-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 block">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Liam Hemsworth"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 block">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="liam@adventure.com"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 block">Phone / WhatsApp (Optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 019-2834"
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
          />
        </div>

        <CustomSelect
          label="Inquiry Type"
          value={inquiryType}
          onChange={setInquiryType}
          options={[
            { value: "Room Reservation", label: "Room Reservation" },
            { value: "Trekking Guide Package", label: "Trekking Guide Package" },
            { value: "Altitude & Weather Guidance", label: "Altitude & Weather Guidance" },
            { value: "Emergency Rescue Support", label: "Emergency Rescue Support" },
            { value: "General Inquiry", label: "General Inquiry" },
          ]}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-300 block">Your Inquiry Message</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Detail your request, trek dates, guest count, or custom inquiries..."
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#4F9CF9]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-[#F97316] hover:bg-[#ea6200] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Direct Message to Base Camp</span>
          </>
        )}
      </button>
    </form>
  );
}
