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

interface CmsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;

  heroConfig: HeroConfig;
  updateHeroConfig: (newConfig: Partial<HeroConfig>) => void;

  rooms: RoomItem[];
  addRoom: (room: Omit<RoomItem, "id">) => void;
  updateRoom: (id: string, room: Partial<RoomItem>) => void;
  deleteRoom: (id: string) => void;

  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, "id" | "createdAt">) => BookingRecord;
  updateBookingStatus: (id: string, status: BookingRecord["status"]) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;

  coupons: CouponItem[];
  addCoupon: (coupon: CouponItem) => void;

  selectedRoomForBooking: RoomItem | null;
  setSelectedRoomForBooking: (room: RoomItem | null) => void;

  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
}

const DEFAULT_HERO: HeroConfig = {
  title: "Wake Up Among the Himalayas",
  subtitle:
    "Experience unforgettable mountain hospitality at Annapurna Guesthouse, nestled in the heart of Annapurna Base Camp. Wake to breathtaking Himalayan sunrises, enjoy warm hospitality, and relax after your trek in one of Nepal's most iconic destinations.",
  badge: "Stay Above the Clouds • Annapurna Base Camp • 4,130m",
  seasonalBanner: "Spring 2026 Himalayan Expedition Season Open • Exclusive Booking",
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

const DEFAULT_ROOMS: RoomItem[] = [
  {
    id: "room-1",
    name: "Royal Annapurna Glacier Suite",
    category: "suite",
    pricePerNight: 480,
    capacity: 2,
    size: "65 m²",
    view: "360° Unobstructed Peak View",
    rating: 4.98,
    description:
      "Our signature glass suite perched at 4,130m. Features heated floors, private outdoor deck, panoramic skylight stargazing, and private oxygen enrichment.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Heated Floors", "Oxygen System", "Private Balcony", "King Bed", "En-suite Thermal Bath"],
    featured: true,
    available: true,
    discountBadge: "MOST LUXURIOUS",
  },
  {
    id: "room-2",
    name: "Fishtail Horizon Panorama Room",
    category: "panorama",
    pricePerNight: 340,
    capacity: 2,
    size: "48 m²",
    view: "Machhapuchhre Twin Summit",
    rating: 4.95,
    description:
      "Direct floor-to-ceiling glass wall framing Machhapuchhre (6,993m). Includes wool duvets, gourmet breakfast service, and private workstation.",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Floor-to-Ceiling Windows", "Floor Heating", "Merino Wool Duvets", "Mountain Teas"],
    featured: true,
    available: true,
  },
  {
    id: "room-3",
    name: "Highland Sanctuary Twin Deluxe",
    category: "deluxe",
    pricePerNight: 240,
    capacity: 2,
    size: "36 m²",
    view: "Annapurna South Massif",
    rating: 4.89,
    description:
      "Spacious twin bedding tailored for mountain expedition partners. Cozy pine wood finish, electric blanket warming, and hot shower access.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Dual Twin Beds", "Thermal Heating", "Electric Blankets", "Mountain Water Purifier"],
    featured: false,
    available: true,
  },
  {
    id: "room-4",
    name: "Base Camp Alpine Lodge Room",
    category: "lodge",
    pricePerNight: 160,
    capacity: 2,
    size: "28 m²",
    view: "Valley Glacier Stream",
    rating: 4.85,
    description:
      "Cozy luxury lodge room combining authentic Sherpa/Gurung timber architecture with warm insulated comfort.",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["Organic Cotton Linens", "Hydronic Heating", "Daily Tea Service"],
    featured: false,
    available: true,
  },
];

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-8492",
    guestName: "Elena Rostova",
    guestEmail: "elena@luxurytrips.com",
    guestPhone: "+1 (555) 234-5678",
    roomId: "room-1",
    roomName: "Royal Annapurna Glacier Suite",
    checkIn: "2026-10-10",
    checkOut: "2026-10-13",
    guestsCount: 2,
    couponCode: "ANNAPURNA10",
    discountAmount: 144,
    totalAmount: 1296,
    status: "Confirmed",
    createdAt: "2026-07-20",
  },
  {
    id: "BK-9014",
    guestName: "Marcus Vance",
    guestEmail: "marcus.vance@expedition.org",
    guestPhone: "+44 20 7946 0912",
    roomId: "room-2",
    roomName: "Fishtail Horizon Panorama Room",
    checkIn: "2026-10-15",
    checkOut: "2026-10-17",
    guestsCount: 2,
    discountAmount: 0,
    totalAmount: 680,
    status: "Confirmed",
    createdAt: "2026-07-22",
  },
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sunrise over Annapurna I (8,091m)",
    category: "Sanctuary",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-2",
    title: "Glacier Suite Evening Panorama",
    category: "Suites",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-3",
    title: "Gourmet Dining Room at 4,130m",
    category: "Dining",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-4",
    title: "Machhapuchhre Sacred Summit",
    category: "Peaks",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-5",
    title: "Heated Thermal Bath with Mountain View",
    category: "Suites",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gal-6",
    title: "Night Stargazing over Base Camp",
    category: "Sanctuary",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
  },
];

const DEFAULT_COUPONS: CouponItem[] = [
  { code: "ANNAPURNA10", discountPercent: 10, active: true },
  { code: "VIPEXPEDITION15", discountPercent: 15, active: true },
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [rooms, setRooms] = useState<RoomItem[]>(DEFAULT_ROOMS);
  const [bookings, setBookings] = useState<BookingRecord[]>(DEFAULT_BOOKINGS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [coupons, setCoupons] = useState<CouponItem[]>(DEFAULT_COUPONS);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedHero = localStorage.getItem("abc_hero");
      if (savedHero) setHeroConfig(JSON.parse(savedHero));

      const savedRooms = localStorage.getItem("abc_rooms");
      if (savedRooms) setRooms(JSON.parse(savedRooms));

      const savedBookings = localStorage.getItem("abc_bookings");
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedGallery = localStorage.getItem("abc_gallery");
      if (savedGallery) setGallery(JSON.parse(savedGallery));
    } catch {
      // Fallback
    }
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const updateHeroConfig = (newConfig: Partial<HeroConfig>) => {
    setHeroConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem("abc_hero", JSON.stringify(updated));
      return updated;
    });
  };

  const addRoom = (roomData: Omit<RoomItem, "id">) => {
    const newRoom: RoomItem = { ...roomData, id: `room-${Date.now()}` };
    setRooms((prev) => {
      const updated = [newRoom, ...prev];
      localStorage.setItem("abc_rooms", JSON.stringify(updated));
      return updated;
    });
  };

  const updateRoom = (id: string, roomData: Partial<RoomItem>) => {
    setRooms((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, ...roomData } : r));
      localStorage.setItem("abc_rooms", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem("abc_rooms", JSON.stringify(updated));
      return updated;
    });
  };

  const addBooking = (bookingData: Omit<BookingRecord, "id" | "createdAt">) => {
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      localStorage.setItem("abc_bookings", JSON.stringify(updated));
      return updated;
    });
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRecord["status"]) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status } : b));
      localStorage.setItem("abc_bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = { ...itemData, id: `gal-${Date.now()}` };
    setGallery((prev) => {
      const updated = [newItem, ...prev];
      localStorage.setItem("abc_gallery", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("abc_gallery", JSON.stringify(updated));
      return updated;
    });
  };

  const addCoupon = (coupon: CouponItem) => {
    setCoupons((prev) => [...prev, coupon]);
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
