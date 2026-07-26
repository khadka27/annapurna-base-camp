import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://khadka27:khadka27@localhost:5432/annapurna_db?schema=public";

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("[SEED] Starting Annapurna Base Camp Database Seed...");

  // 1. Seed Admin User
  await prisma.adminUser.upsert({
    where: { email: "admin@annapurna.com" },
    update: {},
    create: {
      email: "admin@annapurna.com",
      password: "admin123",
      name: "Himalayan Chief Admin",
    },
  });
  console.log("[OK] Admin User seeded (admin@annapurna.com / admin123)");

  // 2. Seed Hero Config
  await prisma.heroConfig.upsert({
    where: { id: "default-hero" },
    update: {
      title: "Annapurna Base Camp Sanctuary Guesthouse",
      subtitle:
        "Experience high-altitude luxury at 4,130m elevation in the heart of the Himalayas with heated suites, panoramic glacier views & authentic Sherpa hospitality.",
      badge: "4,130M HIGHEST LUXURY LODGE IN NEPAL",
      seasonalBanner: "2026 TREK SEASON OPEN — RESERVE GLACIER SUITES ONLINE",
      autoSlideSpeed: 5000,
    },
    create: {
      id: "default-hero",
      title: "Annapurna Base Camp Sanctuary Guesthouse",
      subtitle:
        "Experience high-altitude luxury at 4,130m elevation in the heart of the Himalayas with heated suites, panoramic glacier views & authentic Sherpa hospitality.",
      badge: "4,130M HIGHEST LUXURY LODGE IN NEPAL",
      seasonalBanner: "2026 TREK SEASON OPEN — RESERVE GLACIER SUITES ONLINE",
      autoSlideSpeed: 5000,
    },
  });
  console.log("[OK] Hero Config seeded");

  // 3. Seed Luxury Rooms
  const roomsData = [
    {
      id: "room-1",
      name: "Royal Annapurna Glacier Suite",
      category: "suite",
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
      category: "panorama",
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
      available: true,
      discountBadge: "BEST SUNRISE VIEW",
    },
    {
      id: "room-3",
      name: "Highland Sanctuary Twin Deluxe",
      category: "deluxe",
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
      category: "lodge",
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

  for (const rm of roomsData) {
    await prisma.room.upsert({
      where: { id: rm.id },
      update: rm,
      create: rm,
    });
  }
  console.log(`✅ ${roomsData.length} Room Suites seeded`);

  // 4. Seed Sample Bookings
  const bookingsData = [
    {
      id: "ABC-8842",
      guestName: "Sir Edmund Hillary Jr.",
      guestEmail: "edmund.hillary@expedition.org",
      guestPhone: "+44 20 7946 0912",
      roomId: "room-1",
      roomName: "Royal Annapurna Glacier Suite",
      checkIn: "2026-10-10",
      checkOut: "2026-10-15",
      guestsCount: 2,
      couponCode: "ANNAPURNA10",
      discountAmount: 190,
      totalAmount: 1710,
      status: "Confirmed",
    },
    {
      id: "ABC-7421",
      guestName: "Dr. Maya Lin",
      guestEmail: "maya.lin@alpinehealth.com",
      guestPhone: "+1 (555) 382-9910",
      roomId: "room-2",
      roomName: "Fishtail Horizon Panorama Room",
      checkIn: "2026-10-12",
      checkOut: "2026-10-14",
      guestsCount: 2,
      couponCode: null,
      discountAmount: 0,
      totalAmount: 560,
      status: "Confirmed",
    },
    {
      id: "ABC-5093",
      guestName: "Tenzing Norgay Guide Group",
      guestEmail: "guide@himalayansherpa.np",
      guestPhone: "+977 9841 234567",
      roomId: "room-3",
      roomName: "Highland Sanctuary Twin Deluxe",
      checkIn: "2026-10-18",
      checkOut: "2026-10-21",
      guestsCount: 2,
      couponCode: "WELCOME5",
      discountAmount: 29.25,
      totalAmount: 555.75,
      status: "Pending",
    },
  ];

  for (const bk of bookingsData) {
    await prisma.booking.upsert({
      where: { id: bk.id },
      update: bk,
      create: bk,
    });
  }
  console.log(`✅ ${bookingsData.length} Sample Bookings seeded`);

  // 5. Seed Gallery Items
  const galleryData = [
    {
      id: "gal-1",
      title: "Annapurna Base Camp Sanctuary 4,130m",
      category: "Sanctuary",
      imageUrl: "/images/Annapurna-Base-Camp.jpg",
    },
    {
      id: "gal-2",
      title: "Highland Guesthouse Lodge & Peaks",
      category: "Sanctuary",
      imageUrl: "/images/Lodge-in-Annapurna-base-camp.jpg",
    },
    {
      id: "gal-3",
      title: "Royal Annapurna Glacier Suite Interior",
      category: "Suites",
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-4",
      title: "Machhapuchhre Fishtail Alpenglow",
      category: "Peaks",
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-5",
      title: "High-Altitude Sherpa Dining Hall",
      category: "Dining",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-6",
      title: "Glacier Ridge Evening Starlight",
      category: "Peaks",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  for (const item of galleryData) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`✅ ${galleryData.length} Gallery items seeded`);

  // 6. Seed Coupons
  const couponsData = [
    { id: "cp-1", code: "ANNAPURNA10", discountPercent: 10, active: true },
    { id: "cp-2", code: "HIMALAYA20", discountPercent: 20, active: true },
    { id: "cp-3", code: "WELCOME5", discountPercent: 5, active: true },
  ];

  for (const cp of couponsData) {
    await prisma.coupon.upsert({
      where: { code: cp.code },
      update: cp,
      create: cp,
    });
  }
  console.log(`[OK] ${couponsData.length} Promo Coupons seeded`);

  // 7. Seed Services
  const servicesData = [
    {
      id: "srv-1",
      title: "High-Altitude Supplemental Oxygen",
      category: "Wellness & Safety",
      price: 0,
      icon: "activity",
      description: "Continuous medical-grade oxygen enrichment chambers and pulse oximeter telemetry monitoring at 4,130m elevation.",
      included: true,
    },
    {
      id: "srv-2",
      title: "Emergency Helicopter Evacuation Charter",
      category: "Logistics & Transport",
      price: 1200,
      icon: "helicopter",
      description: "Direct helipad access at base camp with rapid standby transport to Pokhara & Kathmandu alpine hospitals.",
      included: false,
    },
    {
      id: "srv-3",
      title: "Radiant Thermal Bathhouse & Hot Spa",
      category: "Wellness & Safety",
      price: 0,
      icon: "flame",
      description: "Solar-heated thermal soaking tubs with organic Himalayan herbal salts to soothe tired muscles after long trek days.",
      included: true,
    },
    {
      id: "srv-4",
      title: "Gourmet Sherpa Dining & Bakery",
      category: "Dining & Comfort",
      price: 0,
      icon: "utensils",
      description: "Freshly prepared artisan Dal Bhat, yak cheese fondue, warm apple pies, and organic mountain herbal brews.",
      included: true,
    },
    {
      id: "srv-5",
      title: "Starlink High-Speed Satellite Wi-Fi",
      category: "Connectivity",
      price: 0,
      icon: "wifi",
      description: "Low-latency satellite broadband internet throughout all rooms and lounge areas for seamless global connectivity.",
      included: true,
    },
    {
      id: "srv-6",
      title: "Sherpa Summit Guides & Gear Rental",
      category: "Logistics & Transport",
      price: 85,
      icon: "activity",
      description: "Certified IFMGA mountain guides, crampons, thermal down parkas, and trekking pole rentals.",
      included: false,
    },
  ];

  for (const srv of servicesData) {
    await prisma.service.upsert({
      where: { id: srv.id },
      update: srv,
      create: srv,
    });
  }
  console.log(`[OK] ${servicesData.length} Guesthouse Services seeded`);

  console.log("[OK] Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("[ERROR] Seeding failed:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
