"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCms, RoomItem } from "@/context/CmsContext";
import {
  Calendar as CalendarIcon,
  Users,
  BedDouble,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Zap,
  X,
  ArrowRight,
} from "lucide-react";

// --- Date Helpers ---
const getTodayStr = () => new Date().toISOString().split("T")[0];
const getDefaultOutDate = () =>
  new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

const addDaysToStr = (dateStr: string, days: number) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().split("T")[0];
};

const formatDateObj = (dateStr: string) => {
  if (!dateStr) return { day: "", date: "" };
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const day = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const formatted = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return { day, date: formatted, year: dateObj.getFullYear() };
  } catch {
    return { day: "", date: dateStr, year: "" };
  }
};

const calculateNights = (dIn: string, dOut: string) => {
  try {
    const tIn = new Date(dIn).getTime();
    const tOut = new Date(dOut).getTime();
    const diff = Math.ceil((tOut - tIn) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// --- Compact AI Glassmorphic Calendar Popover ---
interface CustomCalendarProps {
  checkIn: string;
  checkOut: string;
  activePicker: "checkIn" | "checkOut";
  setActivePicker: (picker: "checkIn" | "checkOut") => void;
  onSelectDate: (dateStr: string) => void;
  onApplyPresetNights: (nights: number) => void;
  onClose: () => void;
}

function CustomCalendar({
  checkIn,
  checkOut,
  activePicker,
  setActivePicker,
  onSelectDate,
  onApplyPresetNights,
  onClose,
}: CustomCalendarProps) {
  const referenceDateStr = activePicker === "checkIn" ? checkIn : checkOut;
  const [initY, initM] = referenceDateStr.split("-").map(Number);

  const [viewYear, setViewYear] = useState<number>(initY || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(
    typeof initM === "number" ? initM - 1 : new Date().getMonth()
  );

  const todayStr = getTodayStr();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Generate calendar cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  const nights = calculateNights(checkIn, checkOut);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-1/2 -translate-x-1/2 lg:left-2 lg:translate-x-0 bottom-full mb-2.5 z-50 w-[calc(100vw-2.5rem)] max-w-[315px] bg-[#0c1222]/95 backdrop-blur-3xl border border-cyan-500/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.2),inset_0_1px_2px_rgba(255,255,255,0.35)] p-3 text-white animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Prismatic AI Top Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full mb-2 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />

      {/* Target Selector Tabs: In vs Out */}
      <div className="grid grid-cols-2 gap-1.5 p-0.5 bg-white/10 rounded-xl border border-white/15 mb-2">
        <button
          type="button"
          onClick={() => setActivePicker("checkIn")}
          className={`py-1.5 px-2.5 rounded-lg text-left transition-all cursor-pointer ${
            activePicker === "checkIn"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-[1.02]"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <div className="text-[9px] uppercase tracking-wider opacity-85 font-semibold">Check-In</div>
          <div className="text-[11px] font-extrabold truncate">
            {formatDateObj(checkIn).date || "Select"}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActivePicker("checkOut")}
          className={`py-1.5 px-2.5 rounded-lg text-left transition-all cursor-pointer ${
            activePicker === "checkOut"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-[0_0_12px_rgba(147,51,234,0.5)] scale-[1.02]"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <div className="text-[9px] uppercase tracking-wider opacity-85 font-semibold">Check-Out</div>
          <div className="text-[11px] font-extrabold truncate">
            {formatDateObj(checkOut).date || "Select"}
          </div>
        </button>
      </div>

      {/* Month & Year Navigation */}
      <div className="flex items-center justify-between pb-1.5 px-1 border-b border-white/10 mb-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 rounded-lg hover:bg-white/15 text-cyan-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-xs font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 rounded-lg hover:bg-white/15 text-cyan-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Next Month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-0.5 text-center font-bold text-[10px] text-cyan-300/90 py-0.5">
        {WEEKDAY_NAMES.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-y-0.5 gap-x-0.5 text-center text-xs py-0.5">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-7 w-7" />;
          }

          const cellDateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;

          const isPast = cellDateStr < todayStr;
          const isCheckIn = cellDateStr === checkIn;
          const isCheckOut = cellDateStr === checkOut;
          const isInRange = cellDateStr > checkIn && cellDateStr < checkOut;
          const isToday = cellDateStr === todayStr;

          let cellClass =
            "w-7 h-7 sm:w-7.5 sm:h-7.5 text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer ";

          if (isPast) {
            cellClass += "text-slate-500/60 cursor-not-allowed pointer-events-none";
          } else if (isCheckIn) {
            cellClass +=
              "bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-extrabold rounded-l-full shadow-[0_0_10px_rgba(6,182,212,0.7)] scale-105 z-10 ring-1 ring-white/60";
          } else if (isCheckOut) {
            cellClass +=
              "bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold rounded-r-full shadow-[0_0_10px_rgba(147,51,234,0.7)] scale-105 z-10 ring-1 ring-white/60";
          } else if (isInRange) {
            cellClass += "bg-gradient-to-r from-cyan-500/25 to-purple-500/25 text-cyan-200 font-semibold rounded-none";
          } else {
            cellClass += "hover:bg-white/20 text-slate-100 rounded-full";
            if (isToday) {
              cellClass += " ring-1 ring-cyan-400 text-cyan-300 font-bold";
            }
          }

          return (
            <button
              key={cellDateStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(cellDateStr)}
              className={cellClass}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Quick Stay Length Shortcuts */}
      <div className="pt-2 mt-1.5 border-t border-white/10 flex items-center justify-between text-[10px]">
        <div className="text-slate-300 font-medium">
          <span className="text-cyan-300 font-bold">{nights}</span> {nights === 1 ? "Night" : "Nights"}
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onApplyPresetNights(num)}
              className={`px-1.5 py-0.5 rounded-md border text-[9px] transition-all cursor-pointer ${
                nights === num
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-transparent font-bold shadow-sm"
                  : "bg-white/5 border-white/15 text-slate-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              {num}N
            </button>
          ))}
          <button
            type="button"
            onClick={onClose}
            className="ml-1 px-2 py-0.5 rounded-md bg-cyan-500/25 hover:bg-cyan-500/40 border border-cyan-400/40 text-cyan-300 font-bold text-[9px] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Compact AI Glassmorphic Guests Popover ---
interface CustomGuestsDropdownProps {
  guests: number;
  setGuests: (val: number) => void;
  onClose: () => void;
}

function CustomGuestsDropdown({ guests, setGuests, onClose }: CustomGuestsDropdownProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-1/2 -translate-x-1/2 lg:left-1/3 lg:translate-x-0 bottom-full mb-2.5 z-50 w-[calc(100vw-2.5rem)] max-w-[295px] bg-[#0c1222]/95 backdrop-blur-3xl border border-indigo-500/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(99,102,241,0.2),inset_0_1px_2px_rgba(255,255,255,0.35)] p-3 text-white animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full mb-2.5 shadow-[0_0_10px_rgba(99,102,241,0.7)]" />

      <div className="px-1 pb-2 border-b border-white/10 flex items-center justify-between">
        <div className="text-xs font-bold text-white">Trekkers Party Size</div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          Max 10
        </span>
      </div>

      {/* Stepper Control */}
      <div className="py-2.5 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">Adults / Trekkers</div>
          <div className="text-[9px] text-slate-400">Heated Bed & Meal Access</div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 border border-white/15">
          <button
            type="button"
            disabled={guests <= 1}
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5 text-white" />
          </button>
          <span className="w-5 text-center font-black text-xs text-cyan-300">{guests}</span>
          <button
            type="button"
            disabled={guests >= 10}
            onClick={() => setGuests(Math.min(10, guests + 1))}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="pt-1.5 border-t border-white/10 space-y-1">
        {[
          { count: 1, label: "Solo Trekker", subtitle: "Single bed accommodation" },
          { count: 2, label: "2 Guests (Pair / Couple)", subtitle: "Twin or King panoramic bed" },
          { count: 3, label: "3 Trekkers Group", subtitle: "Triple room or suite" },
          { count: 4, label: "4+ Expedition Team", subtitle: "Expedition suite with gear locker" },
        ].map((item) => (
          <button
            key={item.count}
            type="button"
            onClick={() => {
              setGuests(item.count);
              onClose();
            }}
            className={`w-full flex items-center justify-between p-1.5 rounded-lg text-left transition-all cursor-pointer ${
              guests === item.count
                ? "bg-gradient-to-r from-cyan-500/25 to-indigo-600/25 border border-cyan-400/40 text-white font-bold"
                : "hover:bg-white/10 text-slate-300"
            }`}
          >
            <div>
              <div className="text-[11px] font-semibold">{item.label}</div>
              <div className="text-[9px] text-slate-400">{item.subtitle}</div>
            </div>
            {guests === item.count && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
          </button>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-cyan-300/80">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>Thermal duvets included</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-bold transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// --- Glassmorphic Available Rooms Panel (Revealed on Search) ---
interface AvailableRoomsPanelProps {
  rooms: RoomItem[];
  checkIn: string;
  checkOut: string;
  guests: number;
  onSelectAndBookRoom: (room: RoomItem) => void;
  onClose: () => void;
}

function AvailableRoomsPanel({
  rooms,
  checkIn,
  checkOut,
  guests,
  onSelectAndBookRoom,
  onClose,
}: AvailableRoomsPanelProps) {
  const nights = calculateNights(checkIn, checkOut);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 w-[calc(100vw-24px)] sm:w-[580px] max-w-[620px] bg-[#0c1222]/95 backdrop-blur-3xl border border-cyan-500/35 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.25),inset_0_1px_2px_rgba(255,255,255,0.4)] p-4 sm:p-5 text-white animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Prismatic AI Header Line */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full mb-3.5 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />

      {/* Header with Search Parameters Summary */}
      <div className="flex items-start justify-between pb-3 border-b border-white/15 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-purple-200">
              Available Sanctuary Rooms
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/35">
              {rooms.length} Suites Found
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-cyan-300 font-semibold mt-1">
            <span>📅 {formatDateObj(checkIn).date} – {formatDateObj(checkOut).date}</span>
            <span>•</span>
            <span>🌙 {nights} {nights === 1 ? "Night" : "Nights"}</span>
            <span>•</span>
            <span>👥 {guests} {guests === 1 ? "Guest" : "Guests"}</span>
            <span>•</span>
            <span className="text-slate-300">🏔️ Elevation 4,130m</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
          aria-label="Close rooms panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Room Cards List */}
      <div className="py-2.5 space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
        {rooms.map((room) => {
          const isAvailable = room.available !== false;
          const totalPrice = room.pricePerNight * nights;

          return (
            <div
              key={room.id}
              className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isAvailable
                  ? "bg-white/10 hover:bg-white/15 border-white/15 hover:border-cyan-400/50 shadow-md"
                  : "bg-white/5 border-white/10 opacity-70"
              }`}
            >
              {/* Room Details */}
              <div className="flex items-start gap-3 min-w-0">
                {room.images && room.images[0] ? (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-white/20 shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/20">
                    <BedDouble className="w-6 h-6 text-cyan-400" />
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {room.name}
                    </h4>
                    {isAvailable ? (
                      <span className="px-1.5 py-0.2 rounded-md text-[8px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ✓ AVAILABLE
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded-md text-[8px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        BOOKED
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-300 mt-0.5 flex flex-wrap items-center gap-x-1.5">
                    <span>{room.size || "Panoramic"}</span>
                    <span>•</span>
                    <span>Max {room.capacity || 2} Guests</span>
                    {room.view && (
                      <>
                        <span>•</span>
                        <span className="text-cyan-300 font-medium">🏔️ {room.view}</span>
                      </>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Thermal duvets, solar hot bath, Starlink Wi-Fi</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10 shrink-0 gap-1.5">
                <div className="text-left sm:text-right">
                  <div className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                    ${room.pricePerNight}
                    <span className="text-[10px] font-normal text-slate-300"> / nt</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium">
                    ${totalPrice} total ({nights}N)
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => onSelectAndBookRoom(room)}
                  className={`px-3.5 py-2 rounded-xl font-extrabold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    isAvailable
                      ? "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white shadow-md shadow-indigo-500/30 hover:scale-[1.03] active:scale-[0.98]"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/10"
                  }`}
                >
                  <span>{isAvailable ? "Reserve Suite" : "Sold Out"}</span>
                  {isAvailable && <ArrowRight className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-white/15 flex flex-wrap items-center justify-between text-[10px] text-slate-300">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Official Sanctuary Guesthouse Best Rate Guarantee</span>
        </div>
        <div className="text-cyan-300 font-medium">Instant Confirmation</div>
      </div>
    </div>
  );
}

// --- Main Luxury Glassmorphic Hero Booking Bar ---
export function HeroBookingBar() {
  const { rooms, setSelectedRoomForBooking, setBookingDraft } = useCms();

  const [checkIn, setCheckIn] = useState(getTodayStr);
  const [checkOut, setCheckOut] = useState(getDefaultOutDate);
  const [guests, setGuests] = useState(2);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activePicker, setActivePicker] = useState<"checkIn" | "checkOut">("checkIn");
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [roomsPanelOpen, setRoomsPanelOpen] = useState(false);

  const barRef = useRef<HTMLDivElement | null>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
        setGuestsOpen(false);
        setRoomsPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOpenCalendar = (target: "checkIn" | "checkOut") => {
    setActivePicker(target);
    setCalendarOpen(true);
    setGuestsOpen(false);
    setRoomsPanelOpen(false);
  };

  const handleSelectDate = (dateStr: string) => {
    if (activePicker === "checkIn") {
      setCheckIn(dateStr);
      if (dateStr >= checkOut) {
        setCheckOut(addDaysToStr(dateStr, 1));
      }
      // Auto-advance to select checkout date
      setActivePicker("checkOut");
    } else {
      if (dateStr > checkIn) {
        setCheckOut(dateStr);
        setCalendarOpen(false);
      } else {
        // User picked date before checkin -> treat as new checkin
        setCheckIn(dateStr);
        setCheckOut(addDaysToStr(dateStr, 1));
        setActivePicker("checkOut");
      }
    }
  };

  const handleApplyPresetNights = (nights: number) => {
    setCheckOut(addDaysToStr(checkIn, nights));
    setCalendarOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCalendarOpen(false);
    setGuestsOpen(false);
    // Reveal the available rooms panel!
    setRoomsPanelOpen(true);
  };

  const handleSelectAndBookRoom = (room: RoomItem) => {
    setBookingDraft({
      checkIn,
      checkOut,
      guestsCount: guests,
    });
    setSelectedRoomForBooking(room);
    setRoomsPanelOpen(false);
  };

  const nightsCount = calculateNights(checkIn, checkOut);

  return (
    <div ref={barRef} className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 relative z-30">
      {/* Prismatic AI Backlight Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-fuchsia-500/25 rounded-2xl lg:rounded-full blur-lg opacity-75 -z-10 pointer-events-none" />

      {/* Frosted Glass Floating Dock Container */}
      <div className="relative bg-[#0c1222]/80 backdrop-blur-3xl rounded-2xl sm:rounded-3xl lg:rounded-full border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.15),inset_0_1px_2px_rgba(255,255,255,0.35)] p-1.5 sm:p-2.5 transition-all">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col lg:flex-row items-stretch lg:items-center text-left"
        >
          {/* Mobile 2-column Check-In & Check-Out group with divide border */}
          <div className="grid grid-cols-2 lg:flex lg:flex-[2.2] items-stretch divide-x divide-white/15">
            {/* Segment 1: CHECK-IN */}
            <button
              type="button"
              onClick={() => handleOpenCalendar("checkIn")}
              className={`w-full relative group px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl lg:rounded-l-full transition-all duration-200 cursor-pointer focus:outline-none text-left ${
                calendarOpen && activePicker === "checkIn"
                  ? "bg-white/20 ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CalendarIcon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase truncate">
                  Check-In
                </span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight flex items-baseline gap-1">
                <span>{formatDateObj(checkIn).date}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300">
                  ({formatDateObj(checkIn).day})
                </span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium truncate mt-0.5">Arrival 4,130m</div>
            </button>

            {/* Segment 2: CHECK-OUT */}
            <button
              type="button"
              onClick={() => handleOpenCalendar("checkOut")}
              className={`w-full relative group px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none text-left ${
                calendarOpen && activePicker === "checkOut"
                  ? "bg-white/20 ring-2 ring-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CalendarIcon className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase truncate">
                  Check-Out
                </span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight flex items-baseline gap-1">
                <span>{formatDateObj(checkOut).date}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-300">
                  ({formatDateObj(checkOut).day})
                </span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                {nightsCount} {nightsCount === 1 ? "Night" : "Nights"} stay
              </div>
            </button>
          </div>

          {/* Desktop divider */}
          <div className="hidden lg:block w-[1px] h-9 bg-white/20 my-auto shrink-0" />

          {/* Segment 3: GUESTS */}
          <button
            type="button"
            onClick={() => {
              setGuestsOpen(!guestsOpen);
              setCalendarOpen(false);
              setRoomsPanelOpen(false);
            }}
            className={`w-full lg:w-auto relative flex-[1] group px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none text-left border-t lg:border-t-0 border-white/10 ${
              guestsOpen
                ? "bg-white/20 ring-2 ring-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                  Guests
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                  guestsOpen ? "rotate-180 text-purple-400" : ""
                }`}
              />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </div>
              <div className="text-[10px] text-cyan-300 font-semibold truncate">
                {guests === 1
                  ? "Solo Trekker"
                  : guests === 2
                  ? "Pair / Couple"
                  : `${guests} Trekkers Group`}
              </div>
            </div>
          </button>

          {/* Segment 4: SEARCH AVAILABILITY CTA BUTTON */}
          <div className="p-1 sm:p-1.5 shrink-0 border-t lg:border-t-0 border-white/10 w-full lg:w-auto">
            <button
              type="submit"
              className="w-full lg:w-auto h-full px-6 sm:px-8 py-3.5 sm:py-3.5 rounded-xl lg:rounded-full font-black text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/35 hover:shadow-cyan-500/50 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Search className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-200 shrink-0" />
              <span className="tracking-wide uppercase text-xs sm:text-sm font-extrabold">Search Availability</span>
            </button>
          </div>
        </form>

        {/* Compact AI Custom Calendar Popover (Positioned upward) */}
        {calendarOpen && (
          <CustomCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            onSelectDate={handleSelectDate}
            onApplyPresetNights={handleApplyPresetNights}
            onClose={() => setCalendarOpen(false)}
          />
        )}

        {/* Compact AI Custom Guests Popover (Positioned upward) */}
        {guestsOpen && (
          <CustomGuestsDropdown
            guests={guests}
            setGuests={setGuests}
            onClose={() => setGuestsOpen(false)}
          />
        )}

        {/* Custom AI Glassmorphic Available Rooms Panel (Revealed on Search) */}
        {roomsPanelOpen && (
          <AvailableRoomsPanel
            rooms={rooms}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            onSelectAndBookRoom={handleSelectAndBookRoom}
            onClose={() => setRoomsPanelOpen(false)}
          />
        )}
      </div>

      {/* Micro Trust & Luxury Badges */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-[11px] text-slate-200/90 font-medium drop-shadow">
        <div className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span>Real-Time Sanctuary Availability</span>
        </div>
        <div className="hidden sm:inline-block text-white/30">•</div>
        <div className="inline-flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Instant Booking Confirmation</span>
        </div>
        <div className="hidden sm:inline-block text-white/30">•</div>
        <div className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Direct Guesthouse Best Rate</span>
        </div>
      </div>
    </div>
  );
}
