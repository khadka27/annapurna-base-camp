"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HeroConfig {
  title: string;
  subtitle: string;
  badge: string;
  seasonalBanner: string;
  autoSlideSpeed: number;
  showOverlay: boolean;
  slides: { id: string; image: string; tag: string }[];
}

export interface RoomItem {
  id: string;
  name: string;
  category: "suite" | "panorama" | "deluxe" | "lodge";
  pricePerNight: number;
  capacity: number;
  size: string;
  view: string;
  rating: number;
  description: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  available: boolean;
  discountBadge?: string;
}

export interface BookingRecord {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  couponCode?: string;
  discountAmount: number;
  totalAmount: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Sanctuary" | "Suites" | "Dining" | "Peaks";
  imageUrl: string;
}

export interface CouponItem {
  code: string;
  discountPercent: number;
  active: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: "Wellness & Safety" | "Logistics & Transport" | "Dining & Comfort" | "Connectivity";
  price: number;
  icon: string;
  description: string;
  included: boolean;
}

interface CmsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;

  heroConfig: HeroConfig;
  updateHeroConfig: (newConfig: Partial<HeroConfig>) => Promise<void>;

  rooms: RoomItem[];
  addRoom: (room: Omit<RoomItem, "id">) => Promise<void>;
  updateRoom: (id: string, room: Partial<RoomItem>) => void;
  deleteRoom: (id: string) => Promise<void>;

  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, "id" | "createdAt">) => Promise<BookingRecord>;
  updateBookingStatus: (id: string, status: BookingRecord["status"]) => Promise<void>;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  coupons: CouponItem[];
  addCoupon: (coupon: CouponItem) => Promise<void>;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, "id">) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  selectedRoomForBooking: RoomItem | null;
  setSelectedRoomForBooking: (room: RoomItem | null) => void;

  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
}

const DEFAULT_HERO: HeroConfig = {
  title: "Annapurna Base Camp Sanctuary Guesthouse",
  subtitle:
    "Experience high-altitude luxury at 4,130m elevation in the heart of the Himalayas with heated suites, panoramic glacier views & authentic Sherpa hospitality.",
  badge: "4,130M HIGHEST LUXURY LODGE IN NEPAL",
  seasonalBanner: "2026 TREK SEASON OPEN — RESERVE GLACIER SUITES ONLINE",
  autoSlideSpeed: 5000,
  showOverlay: true,
  slides: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80",
      tag: "ANNAPURNA SANCTUARY • 4,130M",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      tag: "FISHTAIL SUNRISE PANORAMA",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=80",
      tag: "ALPINE LUXURY LODGING",
    },
  ],
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Fetch Live Data from PostgreSQL Database on Mount
  useEffect(() => {
    async function loadDatabaseData() {
      try {
        const [roomsRes, bookingsRes, galleryRes, couponsRes, heroRes, servicesRes] = await Promise.all([
          fetch("/api/rooms").then((r) => r.json()),
          fetch("/api/bookings").then((r) => r.json()),
          fetch("/api/gallery").then((r) => r.json()),
          fetch("/api/coupons").then((r) => r.json()),
          fetch("/api/hero").then((r) => r.json()),
          fetch("/api/services").then((r) => r.json()),
        ]);

        if (roomsRes.success && Array.isArray(roomsRes.rooms)) {
          setRooms(roomsRes.rooms);
        }
        if (bookingsRes.success && Array.isArray(bookingsRes.bookings)) {
          setBookings(bookingsRes.bookings);
        }
        if (galleryRes.success && Array.isArray(galleryRes.gallery)) {
          setGallery(galleryRes.gallery);
        }
        if (couponsRes.success && Array.isArray(couponsRes.coupons)) {
          setCoupons(couponsRes.coupons);
        }
        if (servicesRes.success && Array.isArray(servicesRes.services)) {
          setServices(servicesRes.services);
        }
        if (heroRes.success && heroRes.hero) {
          setHeroConfig((prev) => ({
            ...prev,
            title: heroRes.hero.title || prev.title,
            subtitle: heroRes.hero.subtitle || prev.subtitle,
            badge: heroRes.hero.badge || prev.badge,
            autoSlideSpeed: heroRes.hero.autoSlideSpeed || prev.autoSlideSpeed,
          }));
        }
      } catch (err) {
        console.error("Error fetching live PostgreSQL data:", err);
      }
    }

    loadDatabaseData();
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const updateHeroConfig = async (newConfig: Partial<HeroConfig>) => {
    setHeroConfig((prev) => ({ ...prev, ...newConfig }));
    try {
      await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
    } catch (err) {
      console.error("Failed to update hero config in DB:", err);
    }
  };

  const addRoom = async (roomData: Omit<RoomItem, "id">) => {
    try {
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });
      const data = await res.json();
      if (data.success && data.room) {
        setRooms((prev) => [data.room, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add room to database:", err);
    }
  };

  const updateRoom = (id: string, roomData: Partial<RoomItem>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...roomData } : r)));
  };

  const deleteRoom = async (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch(`/api/rooms?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete room from database:", err);
    }
  };

  const addBooking = async (bookingData: Omit<BookingRecord, "id" | "createdAt">): Promise<BookingRecord> => {
    const tempRec: BookingRecord = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setBookings((prev) => [tempRec, ...prev]);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setBookings((prev) => prev.map((b) => (b.id === tempRec.id ? data.booking : b)));
        return data.booking;
      }
    } catch (err) {
      console.error("Failed to persist booking to database:", err);
    }

    return tempRec;
  };

  const updateBookingStatus = async (id: string, status: BookingRecord["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch (err) {
      console.error("Failed to update booking status in database:", err);
    }
  };

  const addGalleryItem = async (itemData: Omit<GalleryItem, "id">) => {
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (data.success && data.item) {
        setGallery((prev) => [data.item, ...prev]);
      }
    } catch (err) {
      console.error("Failed to add gallery item to database:", err);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete gallery item from database:", err);
    }
  };

  const addCoupon = async (coupon: CouponItem) => {
    setCoupons((prev) => [coupon, ...prev]);
    try {
      await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coupon),
      });
    } catch (err) {
      console.error("Failed to save coupon in database:", err);
    }
  };

  const addService = async (serviceData: Omit<ServiceItem, "id">) => {
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });
      const data = await res.json();
      if (data.success && data.service) {
        setServices((prev) => [...prev, data.service]);
      }
    } catch (err) {
      console.error("Failed to add service to database:", err);
    }
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    try {
      await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete service from database:", err);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        heroConfig,
        updateHeroConfig,
        rooms,
        addRoom,
        updateRoom,
        deleteRoom,
        bookings,
        addBooking,
        updateBookingStatus,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        coupons,
        addCoupon,
        services,
        addService,
        deleteService,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        adminOpen,
        setAdminOpen,
      }}
    >
      <div className={darkMode ? "dark bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-[#0F172A]"}>
        {children}
      </div>
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used within a CmsProvider");
  return context;
};
