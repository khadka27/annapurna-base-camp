"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCms, RoomItem } from "@/context/CmsContext";
import { getRoomSlug } from "@/lib/room-utils";
import {
  Calendar,
  Users,
  Search,
  X,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  BedDouble,
  Info,
  Clock,
  RotateCcw,
} from "lucide-react";

// --- Date Helpers ---
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

export function RoomShowcase() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { rooms, bookings, setSelectedRoomForBooking, setBookingDraft, bookingDraft } = useCms();

  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "booked">("all");
  const [isEditingSearch, setIsEditingSearch] = useState(false);

  // Extract search criteria from URL query params (or fallback to bookingDraft)
  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlGuests = searchParams.get("guests") || "";

  const searchCheckIn = urlCheckIn || bookingDraft?.checkIn || "";
  const searchCheckOut = urlCheckOut || bookingDraft?.checkOut || "";
  const searchGuests = urlGuests ? parseInt(urlGuests, 10) : (bookingDraft?.guestsCount || 2);

  const hasSearch = Boolean(searchCheckIn && searchCheckOut);
  const nightsCount = hasSearch ? calculateNights(searchCheckIn, searchCheckOut) : 1;

  // Local draft state for the inline quick editor
  const [editCheckIn, setEditCheckIn] = useState(searchCheckIn);
  const [editCheckOut, setEditCheckOut] = useState(searchCheckOut);
  const [editGuests, setEditGuests] = useState(searchGuests);

  // Keep local editor in sync with URL changes
  useEffect(() => {
    if (searchCheckIn) setEditCheckIn(searchCheckIn);
    if (searchCheckOut) setEditCheckOut(searchCheckOut);
    if (searchGuests) setEditGuests(searchGuests);
  }, [searchCheckIn, searchCheckOut, searchGuests]);

  // Check if a room is booked (for searched dates if search is active, else global confirmed status)
  const isRoomBooked = (room: RoomItem) => {
    if (room.available === false) return true;
    if (hasSearch) {
      return bookings.some((b) => {
        if (b.roomId !== room.id || b.status === "Cancelled") return false;
        return searchCheckIn < b.checkOut && searchCheckOut > b.checkIn;
      });
    }
    return bookings.some((b) => b.roomId === room.id && b.status === "Confirmed");
  };

  const matchesCapacity = (room: RoomItem) => {
    if (!hasSearch) return true;
    return room.capacity >= searchGuests;
  };

  const capacityMatchingRooms = rooms.filter(matchesCapacity);
  const hasCapacityFilter = hasSearch && capacityMatchingRooms.length > 0;
  const baseRooms = hasCapacityFilter ? capacityMatchingRooms : rooms;

  const bookedCount = baseRooms.filter(isRoomBooked).length;
  const availableCount = baseRooms.length - bookedCount;

  const filteredRooms = baseRooms.filter((room) => {
    const booked = isRoomBooked(room);
    if (availabilityFilter === "available") return !booked;
    if (availabilityFilter === "booked") return booked;
    return true;
  });

  const handleClearSearch = () => {
    setBookingDraft(null);
    router.push("/rooms");
    setIsEditingSearch(false);
  };

  const handleApplyUpdatedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDraft({
      checkIn: editCheckIn,
      checkOut: editCheckOut,
      guestsCount: editGuests,
    });
    const params = new URLSearchParams({
      checkIn: editCheckIn,
      checkOut: editCheckOut,
      guests: editGuests.toString(),
    });
    router.push(`/rooms?${params.toString()}`);
    setIsEditingSearch(false);
  };

  const checkInFormatted = formatDateObj(searchCheckIn);
  const checkOutFormatted = formatDateObj(searchCheckOut);

  return (
    <section id="rooms" className="py-12 sm:py-16 bg-[#395371] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================= */}
        {/* ACTIVE USER SEARCH BANNER & FILTER SUMMARY                 */}
        {/* ========================================================= */}
        {hasSearch && (
          <div className="relative rounded-3xl bg-[#0c1222]/90 border border-cyan-500/35 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
            {/* Prismatic ambient glow */}
            <div className="absolute -right-24 -top-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold tracking-wider border border-cyan-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>ACTIVE SANCTUARY SEARCH</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono font-medium border border-white/15">
                    <Clock className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{nightsCount} {nightsCount === 1 ? "Night" : "Nights"} stay</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{availableCount} of {baseRooms.length} Available</span>
                  </span>
                </div>

                {/* Right controls: Modify & Clear */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingSearch(!isEditingSearch)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{isEditingSearch ? "Close Edit" : "Modify Search"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-bold text-rose-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Clear search filter and show all rooms"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Filter</span>
                  </button>
                </div>
              </div>

              {/* Main Search Filter Chips Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {/* Check-In Chip */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                      Check-In Date
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {checkInFormatted.date}{" "}
                      <span className="text-xs font-medium text-cyan-200">
                        ({checkInFormatted.day})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Check-Out Chip */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider font-semibold">
                      Check-Out Date
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {checkOutFormatted.date}{" "}
                      <span className="text-xs font-medium text-indigo-200">
                        ({checkOutFormatted.day})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guests Count Chip */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-purple-300 uppercase tracking-wider font-semibold">
                      Party Size
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {searchGuests} {searchGuests === 1 ? "Guest" : "Guests"}
                      <span className="text-xs font-medium text-slate-300 ml-1.5">
                        {searchGuests === 1 ? "• Solo" : searchGuests === 2 ? "• Couple" : "• Trekkers"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Capacity & Pricing Context */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                      Lodge Rate Mode
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      {nightsCount} {nightsCount === 1 ? "Night Total" : "Nights Total"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Inline Quick Search Modifier Form */}
              {isEditingSearch && (
                <form
                  onSubmit={handleApplyUpdatedSearch}
                  className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
                >
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={editCheckIn}
                      onChange={(e) => setEditCheckIn(e.target.value)}
                      required
                      className="w-full bg-[#1e293b] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={editCheckOut}
                      min={editCheckIn}
                      onChange={(e) => setEditCheckOut(e.target.value)}
                      required
                      className="w-full bg-[#1e293b] border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-300 uppercase mb-1">
                      Party Size
                    </label>
                    <div className="flex items-center gap-2 bg-[#1e293b] border border-white/20 rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setEditGuests((g) => Math.max(1, g - 1))}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-xs font-bold text-cyan-300">
                        {editGuests} {editGuests === 1 ? "Guest" : "Guests"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditGuests((g) => Math.min(10, g + 1))}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Apply Search</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Party size guidance if capacity mismatch */}
              {hasSearch && !hasCapacityFilter && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Individual suites at Annapurna Base Camp comfortably accommodate up to 2-3 trekkers each due to sanctuary high-altitude lodge regulations. For a party of <strong>{searchGuests} guests</strong>, consider reserving multiple adjacent suites.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION HEADER & AVAILABILITY TABS                        */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#4F9CF9] text-xs font-bold uppercase tracking-wider border border-white/15">
              <span>Sanctuary Accommodations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Comfortable Mountain Accommodation
            </h2>
            <p className="text-slate-200 text-base sm:text-lg">
              {hasSearch ? (
                <>
                  Showing real-time room availability for{" "}
                  <strong className="text-cyan-300 font-semibold">{checkInFormatted.date}</strong> to{" "}
                  <strong className="text-cyan-300 font-semibold">{checkOutFormatted.date}</strong> ({nightsCount} {nightsCount === 1 ? "night" : "nights"}).
                </>
              ) : (
                "Explore available mountain rooms and suites at Annapurna Base Camp (4,130m)."
              )}
            </p>
          </div>

          {/* Availability Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 max-w-full md:justify-end">
            <button
              onClick={() => setAvailabilityFilter("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                availabilityFilter === "all"
                  ? "bg-[#4F9CF9] text-white shadow-lg shadow-[#4F9CF9]/30"
                  : "bg-white/5 text-slate-200 border border-white/15 hover:bg-white/10"
              }`}
            >
              <span>All Rooms</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/30 text-white font-bold">
                {baseRooms.length}
              </span>
            </button>

            <button
              onClick={() => setAvailabilityFilter("available")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                availabilityFilter === "available"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/40"
                  : "bg-white/5 text-slate-200 border border-white/15 hover:bg-white/10"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available {hasSearch ? "for Dates" : "Rooms"}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/30 text-white font-bold">
                {availableCount}
              </span>
            </button>

            <button
              onClick={() => setAvailabilityFilter("booked")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                availabilityFilter === "booked"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400/40"
                  : "bg-white/5 text-slate-200 border border-white/15 hover:bg-white/10"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Booked {hasSearch ? "for Dates" : "Rooms"}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/30 text-white font-bold">
                {bookedCount}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROOM CARDS GRID                                           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full py-16 px-6 text-center rounded-3xl bg-white/5 border border-white/10 space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-3xl">
                🏔️
              </div>
              <h3 className="text-xl font-bold text-white">
                {availabilityFilter === "booked"
                  ? "No Booked Rooms for Selected Dates"
                  : availabilityFilter === "available"
                  ? "All Suites Reserved for Your Dates"
                  : "No Rooms Matching Search"}
              </h3>
              <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                {availabilityFilter === "booked"
                  ? "Great news! All mountain rooms are open and available for instant reservation for your dates."
                  : availabilityFilter === "available"
                  ? "All suites are reserved for the selected period. Please try shifting your arrival date or contact the sanctuary front desk."
                  : "Try clearing or modifying your search filter to browse all mountain accommodations."}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {availabilityFilter !== "all" && (
                  <button
                    onClick={() => setAvailabilityFilter("all")}
                    className="px-5 py-2.5 rounded-xl bg-[#4F9CF9] text-white text-xs font-bold shadow-lg cursor-pointer"
                  >
                    View All Filtered Rooms ({baseRooms.length})
                  </button>
                )}
                {hasSearch && (
                  <button
                    onClick={handleClearSearch}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold cursor-pointer"
                  >
                    Reset Search Filter
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredRooms.map((room) => {
              const slug = getRoomSlug(room);
              const booked = isRoomBooked(room);
              const totalPrice = room.pricePerNight * nightsCount;

              // Booking details for tooltip/display
              const roomBookings = bookings.filter((b) => b.roomId === room.id && b.status === "Confirmed");
              const activeBooking = roomBookings[0];

              const handleBookRoomClick = () => {
                // Ensure draft context is primed with user's search criteria
                setBookingDraft({
                  checkIn: searchCheckIn || new Date().toISOString().split("T")[0],
                  checkOut: searchCheckOut || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                  guestsCount: searchGuests || 2,
                });
                setSelectedRoomForBooking(room);
              };

              return (
                <div
                  key={room.id}
                  className="glass-card-dark rounded-3xl overflow-hidden border border-white/15 hover:border-[#4F9CF9]/50 transition-all duration-500 group flex flex-col justify-between"
                >
                  {/* Room Image Container */}
                  <Link href={`/rooms/${slug}`} className="relative h-64 sm:h-72 overflow-hidden block">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#395371] via-transparent to-black/30" />

                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      {booked ? (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-md flex items-center gap-1.5 border border-rose-400/30">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span>
                            {hasSearch
                              ? "BOOKED FOR SELECTED DATES"
                              : `BOOKED ${activeBooking ? `(${activeBooking.checkIn} to ${activeBooking.checkOut})` : ""}`}
                          </span>
                        </span>
                      ) : (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md flex items-center gap-1.5 border border-emerald-400/30">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span>
                            {hasSearch ? "✓ AVAILABLE FOR YOUR DATES" : "✓ AVAILABLE"}
                          </span>
                        </span>
                      )}

                      {room.discountBadge && (
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#F97316] text-white shadow-md">
                          {room.discountBadge}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{room.rating} Rating</span>
                      </span>
                    </div>

                    {/* Capacity & View Pill */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#4F9CF9]" />
                        <span>{room.capacity} Guests • {room.size}</span>
                      </span>
                      <span className="bg-[#16A34A]/80 backdrop-blur-md px-3 py-1 rounded-lg font-bold text-white">
                        {room.view}
                      </span>
                    </div>
                  </Link>

                  {/* Room Body */}
                  <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <Link href={`/rooms/${slug}`} className="block">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#4F9CF9] transition-colors">
                          {room.name}
                        </h3>
                      </Link>
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                        {room.description}
                      </p>

                      {/* Amenities List */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {room.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs flex items-center gap-1"
                          >
                            <svg className="w-3 h-3 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Booking CTA */}
                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">
                          {hasSearch ? `NIGHTLY RATE • ${nightsCount} NIGHTS` : "NIGHTLY RATE"}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-white">
                            ${room.pricePerNight} <span className="text-xs font-normal text-slate-400">/ night</span>
                          </span>
                        </div>
                        {hasSearch && (
                          <div className="text-xs font-bold text-cyan-300 mt-0.5">
                            Total for {nightsCount} {nightsCount === 1 ? "night" : "nights"}: ${totalPrice} USD
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {booked ? (
                          <Link
                            href={`/rooms/${slug}`}
                            className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs text-white bg-slate-700/80 hover:bg-slate-700 border border-white/20 transition-all flex items-center justify-center gap-2"
                          >
                            <span>Booked (View Details)</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={handleBookRoomClick}
                              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#F97316] hover:bg-[#ea6200] shadow-lg shadow-[#F97316]/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                            >
                              <span>Book Room</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link
                              href={`/rooms/${slug}${hasSearch ? `?checkIn=${encodeURIComponent(searchCheckIn)}&checkOut=${encodeURIComponent(searchCheckOut)}&guests=${searchGuests}` : ""}`}
                              className="px-3.5 py-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                              title="Full Suite Details"
                            >
                              Details
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
