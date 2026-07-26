"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  dark?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  label,
  className = "",
  placeholder,
  required,
  id,
  dark = true,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} id={id}>
      {label && (
        <label className="text-xs font-bold text-[#4F9CF9] block mb-1.5 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none ${
          open
            ? "border-[#4F9CF9] bg-[#4F9CF9]/10 shadow-[0_0_0_3px_rgba(79,156,249,0.25)]"
            : dark
            ? "border-white/20 bg-white/10 hover:bg-white/15 hover:border-[#4F9CF9]/60"
            : "border-slate-300 bg-white hover:border-[#4F9CF9]"
        }`}
      >
        <span className={selected ? "text-white" : "text-slate-400"}>
          {selected ? selected.label : placeholder || "Select an option"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#4F9CF9] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-white/20 bg-[#0F172A] shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl animate-in">
          {/* Header accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[#395371] via-[#4F9CF9] to-[#395371]" />

          <div className="py-1.5 max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-left transition-all duration-150 cursor-pointer group ${
                    isSelected
                      ? "bg-[#4F9CF9]/20 text-[#4F9CF9]"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#4F9CF9] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
