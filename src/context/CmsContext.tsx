"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface HeroConfig {
  title: string;
  subtitle: string;
  badge: string;
  seasonalBanner: string;
  autoSlideSpeed: number;
  showOverlay: boolean;
  whatsappNumber?: string;
  slides: { id: string; image: string; tag: string }[];
}

export interface RoomItem {
  id: string;
  name: string;
  category?: string;
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
  category: string;
  imageUrl: string;
}

export interface CouponItem {
  id?: string;
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

export interface BookingDraft {
  checkIn: string;
  checkOut: string;
  guestsCount: number;
}

interface CmsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;

  heroConfig: HeroConfig;
  updateHeroConfig: (newConfig: Partial<HeroConfig>) => Promise<void>;

  rooms: RoomItem[];
  addRoom: (room: Omit<RoomItem, "id">) => Promise<void>;
  updateRoom: (id: string, room: Partial<RoomItem>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;

  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, "id" | "createdAt">) => Promise<BookingRecord>;
  updateBookingStatus: (id: string, status: BookingRecord["status"]) => Promise<void>;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  coupons: CouponItem[];
  addCoupon: (coupon: CouponItem) => Promise<void>;
  toggleCouponActive: (code: string, active: boolean) => Promise<void>;
  updateCoupon: (code: string, updated: Partial<CouponItem>) => Promise<void>;
  deleteCoupon: (code: string) => Promise<void>;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, "id">) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  selectedRoomForBooking: RoomItem | null;
  setSelectedRoomForBooking: (room: RoomItem | null) => void;

  bookingDraft: BookingDraft | null;
  setBookingDraft: (draft: BookingDraft | null) => void;

  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
}

const DEFAULT_HERO: HeroConfig = {
  title: "Annapurna Guest House and Restaurant",
  subtitle:
    "Experience high-altitude hospitality at 4,130m elevation in the heart of the Himalayas with warm rooms, panoramic glacier views, delicious restaurant dining & authentic Gurung hospitality.",
  badge: "4,130M HIGHEST LODGE IN NEPAL",
  seasonalBanner: "2026 TREK SEASON OPEN — RESERVE YOUR ROOM ONLINE",
  autoSlideSpeed: 5000,
  showOverlay: true,
  whatsappNumber: "9779846063557",
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
    pricePerNight: 380,
    capacity: 2,
    size: "52 m²",
    view: "360° Annapurna I & South Face View",
    rating: 5.0,
    description:
      "Our flagship sanctuary penthouse suite perched at 4,130m elevation. Features floor-to-ceiling triple-glazed panoramic bay windows with direct view of Annapurna I, heated radiant floorboards, king luxury wool mattress, private en-suite hot shower, oxygen-rich ambient air circulation, and espresso mountain bar.",
    images: [
      "/images/Lodge-in-Annapurna-base-camp.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Floor-to-Ceiling Glacier View Windows",
      "Radiant Hydronic Floor Heating",
      "Private En-Suite Solar Hot Shower",
      "Supplemental Oxygen Supply System",
      "Goose-Down Duvet & Wool Blankets",
      "Private Telescope & Star Deck",
      "Espresso & Himalayan Herbal Tea Bar",
      "Satellite Starlink High-Speed Wi-Fi",
    ],
    featured: true,
    available: true,
    discountBadge: "FLAGSHIP SUITE",
  },
  {
    id: "room-2",
    name: "Fishtail Horizon Panorama Room",
    pricePerNight: 280,
    capacity: 2,
    size: "40 m²",
    view: "Machhapuchhre (Fishtail Peak) Sunrise View",
    rating: 4.9,
    description:
      "Breathtaking sanctuary room aligned directly towards the sacred Machhapuchhre (Fishtail Peak) spire. Awaken to golden alpenglow illuminating the peak from your plush king bed. Equipped with thermal solar heating, private bathroom, high-altitude insulating curtains, and organic fleece bathrobes.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Machhapuchhre Sunrise Panorama",
      "Solar-Powered Room Heating",
      "Private Bathroom with Hot Water",
      "Thermal Fleece Bedding",
      "Organic Bath Amenities & Fleece Robes",
      "Starlink Satellite Wi-Fi",
      "USB Charging Stations",
    ],
    featured: true,
    available: false,
    discountBadge: "BEST SUNRISE VIEW",
  },
  {
    id: "room-3",
    name: "Highland Sanctuary Twin Deluxe",
    pricePerNight: 195,
    capacity: 2,
    size: "34 m²",
    view: "Modi Khola Glacier Valley View",
    rating: 4.8,
    description:
      "Designed for trekking pairs, expedition partners, or companions seeking maximum warmth and comfort. Features two single orthopaedic beds with electric thermal blankets, insulated cedarwood paneling, writing desk, and mountain valley views.",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Two Orthopaedic Twin Beds",
      "Dual-Control Electric Blanket",
      "Insulated Himalayan Cedar Paneling",
      "High-Altitude Solar Hot Water Access",
      "Personal Gear Storage Lockers",
      "Starlink Wi-Fi",
    ],
    featured: false,
    available: true,
    discountBadge: "TREKKERS CHOICE",
  },
  {
    id: "room-4",
    name: "Base Camp Alpine Lodge Room",
    pricePerNight: 120,
    capacity: 2,
    size: "26 m²",
    view: "Annapurna South Ridge View",
    rating: 4.7,
    description:
      "Cozy traditional Sherpa timber lodge room offering authentic mountain warmth and communal lodge camaraderie. Includes heavy thermal down duvets, shared heated bath facilities, and hot tea service delivered to your room.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Traditional Sherpa Timber Decor",
      "Heavy-Duty Expedition Down Duvets",
      "Communal Heated Bathrooms",
      "Hot Morning Tea Service",
      "Starlink High-Speed Wi-Fi",
    ],
    featured: false,
    available: true,
    discountBadge: "COZY VALUE",
  },
];

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-8842",
    guestName: "Alexander Wright",
    guestEmail: "alexander.wright@alpinist.co.uk",
    guestPhone: "+44 7911 123456",
    roomId: "room-2",
    roomName: "Fishtail Horizon Panorama Room",
    checkIn: "2026-10-22",
    checkOut: "2026-10-25",
    guestsCount: 2,
    discountAmount: 0,
    totalAmount: 840,
    status: "Confirmed",
    createdAt: "2026-10-15",
  },
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Official Carved Signboard at 4,130m",
    category: "Guest House",
    imageUrl: "/images/gallery/annapurna-guest-house-wooden-signboard.jpg",
  },
  {
    id: "gal-2",
    title: "Guest House Courtyard Patio & Gazebo",
    category: "Guest House",
    imageUrl: "/images/gallery/guest-house-lodge-patio.jpg",
  },
  {
    id: "gal-3",
    title: "Indoor Restaurant Dining Hall with Mountain Views",
    category: "Restaurant & Dining",
    imageUrl: "/images/gallery/restaurant-dining-hall-interior.jpg",
  },
  {
    id: "gal-4",
    title: "Trekkers Enjoying Hot Steaming Dal Bhat Dinner",
    category: "Restaurant & Dining",
    imageUrl: "/images/gallery/trekkers-warm-dalbhat-dinner.jpg",
  },
  {
    id: "gal-5",
    title: "Lodge Exterior & Red Roofs in the Himalayan Mist",
    category: "Guest House",
    imageUrl: "/images/gallery/lodge-exterior-misty-peaks.jpg",
  },
  {
    id: "gal-6",
    title: "Machhapuchhre (Fishtail Peak) Golden Alpenglow",
    category: "Mountains & Peaks",
    imageUrl: "/images/gallery/fishtail-machhapuchhre-golden-sunset.jpg",
  },
  {
    id: "gal-7",
    title: "Aerial View of Annapurna Base Camp Lodge Cluster",
    category: "Mountains & Peaks",
    imageUrl: "/images/gallery/annapurna-base-camp-aerial-view.jpg",
  },
  {
    id: "gal-8",
    title: "Himalayan Emergency Helicopter Standby Pad",
    category: "Lodge Life",
    imageUrl: "/images/gallery/abc-helicopter-sanctuary.jpg",
  },
  {
    id: "gal-9",
    title: "Tibetan Buddhist Prayer Flags at 4,130m",
    category: "Lodge Life",
    imageUrl: "/images/gallery/himalayan-prayer-flags-abc.jpg",
  },
  {
    id: "gal-10",
    title: "Annapurna I South Face & Glacier Ridge",
    category: "Mountains & Peaks",
    imageUrl: "/images/gallery/annapurna-peak-view.jpg",
  },
  {
    id: "gal-11",
    title: "Sunrise Golden Light on High Altitude Snow Wall",
    category: "Mountains & Peaks",
    imageUrl: "/images/gallery/annapurna-alpenglow-sunrise.jpg",
  },
  {
    id: "gal-12",
    title: "Evening Mountain Warmth & Trekker Fellowship",
    category: "Lodge Life",
    imageUrl: "/images/gallery/annapurna-evening-ambience.jpg",
  },
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Hot Gas Shower & Bucket Shower",
    category: "Wellness & Safety",
    price: 4,
    icon: "flame",
    description: "Steaming hot gas-geyser shower and traditional hot bucket shower with warm water to refresh after trekking to Annapurna Base Camp (4,130m).",
    included: false,
  },
  {
    id: "srv-2",
    title: "Licensed Trekking Guides & Experienced Porters",
    category: "Logistics & Transport",
    price: 0,
    icon: "activity",
    description: "Certified mountain guides and strong, trustworthy porters available for your ABC trek, baggage assistance, and route navigation.",
    included: false,
  },
  {
    id: "srv-3",
    title: "Warm Restaurant Dining & Traditional Dal Bhat",
    category: "Dining & Comfort",
    price: 0,
    icon: "utensils",
    description: "Freshly prepared mountain meals, unlimited refill Dal Bhat power, hot noodle soups, ginger lemon honey tea, and bakery treats.",
    included: false,
  },
  {
    id: "srv-4",
    title: "High-Altitude Medical Oxygen Support",
    category: "Wellness & Safety",
    price: 0,
    icon: "activity",
    description: "Supplemental emergency oxygen bottles and pulse oximeter saturation checks available 24/7 for altitude acclimatization safety.",
    included: true,
  },
  {
    id: "srv-5",
    title: "High-Speed Starlink Satellite Wi-Fi",
    category: "Connectivity",
    price: 0,
    icon: "wifi",
    description: "Fast satellite broadband connectivity in dining lounge and guest rooms to keep in touch with family and share photos.",
    included: true,
  },
  {
    id: "srv-6",
    title: "Emergency Helicopter Evacuation Standby",
    category: "Logistics & Transport",
    price: 0,
    icon: "helicopter",
    description: "Direct helipad on-site with rapid standby emergency medical evacuation dispatch coordination to Pokhara hospitals.",
    included: false,
  },
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO);
  const [rooms, setRooms] = useState<RoomItem[]>(DEFAULT_ROOMS);
  const [bookings, setBookings] = useState<BookingRecord[]>(DEFAULT_BOOKINGS);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);
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

        if (roomsRes.success && Array.isArray(roomsRes.rooms) && roomsRes.rooms.length > 0) {
          setRooms(roomsRes.rooms);
        }
        if (bookingsRes.success && Array.isArray(bookingsRes.bookings) && bookingsRes.bookings.length > 0) {
          setBookings(bookingsRes.bookings);
        }
        if (galleryRes.success && Array.isArray(galleryRes.gallery) && galleryRes.gallery.length > 0) {
          setGallery(galleryRes.gallery);
        }
        if (couponsRes.success && Array.isArray(couponsRes.coupons)) {
          setCoupons(couponsRes.coupons);
        }
        if (servicesRes.success && Array.isArray(servicesRes.services) && servicesRes.services.length > 0) {
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

  const updateRoom = async (id: string, roomData: Partial<RoomItem>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...roomData } : r)));
    try {
      await fetch("/api/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...roomData }),
      });
    } catch (err) {
      console.error("Failed to update room in database:", err);
    }
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

  const toggleCouponActive = async (code: string, active: boolean) => {
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, active } : c)));
    try {
      const match = coupons.find((c) => c.code === code);
      if (match?.id) {
        await fetch("/api/coupons", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: match.id, active }),
        });
      }
    } catch (err) {
      console.error("Failed to toggle coupon active status:", err);
    }
  };

  const updateCoupon = async (code: string, updated: Partial<CouponItem>) => {
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, ...updated } : c)));
    try {
      const match = coupons.find((c) => c.code === code);
      if (match?.id) {
        await fetch("/api/coupons", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: match.id, ...updated }),
        });
      }
    } catch (err) {
      console.error("Failed to update coupon:", err);
    }
  };

  const deleteCoupon = async (code: string) => {
    const match = coupons.find((c) => c.code === code);
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    if (match?.id) {
      try {
        await fetch(`/api/coupons?id=${match.id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Failed to delete coupon from database:", err);
      }
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
        toggleCouponActive,
        updateCoupon,
        deleteCoupon,
        services,
        addService,
        deleteService,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        bookingDraft,
        setBookingDraft,
        adminOpen,
        setAdminOpen,
      }}
    >
      <div className={darkMode ? "dark bg-[#395371] text-white" : "bg-[#395371] text-white"}>
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
