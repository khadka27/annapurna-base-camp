/**
 * SEO & Schema.org Structured Data Generator
 * Domain: https://abc-annapurnaguesthouse.com
 * Optimized for Google Rich Results, Local Business, LodgingBusiness, FAQPage,
 * BreadcrumbList, TouristTrip, and HotelRoom schemas.
 */

export const SITE_DOMAIN = "abc-annapurnaguesthouse.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_NAME = "Annapurna Guest House and Restaurant";
export const SITE_LEGAL_NAME = "Annapurna Guest House and Restaurant";
export const SITE_PHONE = "+977-9866060057"; // Main Contact Number
export const SITE_PHONE_SECONDARY = "+977-9844920552"; // Hotel Reception Number
export const SITE_PHONE_WHATSAPP = "+977-9846063557"; // WhatsApp Number
export const SITE_EMAIL = "info@abc-annapurnaguesthouse.com";
export const SITE_BOOKING_EMAIL = "bookings@abc-annapurnaguesthouse.com";
export const SITE_ALTITUDE = "4,130 meters (13,550 feet)";
export const SITE_GEO = {
  latitude: 28.5306,
  longitude: 83.878,
  elevation: "4130",
};

/**
 * 1. Primary LodgingBusiness & Hotel Schema (JSON-LD)
 */
export function getLodgingBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "Hotel", "Restaurant", "BedAndBreakfast"],
    "@id": `${SITE_URL}/#lodging`,
    name: SITE_NAME,
    alternateName: [
      "Annapurna Guest House and Restaurant",
      "Annapurna Guest House & Restaurant",
      "ABC Annapurna Guest House and Restaurant",
      "Annapurna Base Camp Guest House and Restaurant",
      "ABC Lodge & Restaurant Nepal",
    ],
    legalName: SITE_LEGAL_NAME,
    description:
      "Premier high-altitude mountain sanctuary lodge at 4,130m elevation in Annapurna Base Camp, Nepal. Heated glacier suites, authentic Sherpa dining, hot showers, satellite WiFi, 24/7 mountain oxygen backup, and instant suite reservations.",
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: "$$ - $$$",
    currenciesAccepted: "USD, NPR, EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer, eSewa",
    checkinTime: "12:00",
    checkoutTime: "10:00",
    image: [
      `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
      `${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`,
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80",
    ],
    logo: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
    hasMap: "https://maps.google.com/?q=28.5306,83.8780",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Annapurna Base Camp (ABC), Annapurna Sanctuary Trail",
      addressLocality: "Annapurna Conservation Area, Ghandruk",
      addressRegion: "Gandaki Province",
      postalCode: "33700",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
      elevation: SITE_GEO.elevation,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "4.9",
      bestRating: "5",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Panoramic Himalayan Peak Views (Annapurna I, Machapuchare, Hiunchuli)",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Radiant Floor Heated Glacier Suites",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Solar & Gas Powered Hot Showers",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Authentic Sherpa Dining Room & Fresh Hot Meals",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Satellite Broadband Wi-Fi (Starlink)",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "24/7 Medical Oxygen Concentrators & AMS Safety Protocols",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Solar & Generator Electronic Device Charging Station",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Emergency Helicopter Evacuation & Helipad Access",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Licensed Himalayan Guides & High-Altitude Concierge",
        value: true,
      },
    ],
    containsPlace: [
      {
        "@type": "HotelRoom",
        name: "Glacier Sanctuary Suite",
        description:
          "Ultra-insulated premium suite with direct front-row panoramic views of Annapurna I face (8,091m), heated mattress, and private ensuite.",
        occupancy: { "@type": "QuantitativeValue", value: 2 },
        bed: { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "King Bed" },
      },
      {
        "@type": "HotelRoom",
        name: "Fishtail Panorama Suite",
        description:
          "East-facing morning sun suite with unobstructed sunrise vistas over sacred Mt. Machapuchare (6,993m) and heated blankets.",
        occupancy: { "@type": "QuantitativeValue", value: 2 },
        bed: { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "Twin Beds" },
      },
      {
        "@type": "HotelRoom",
        name: "Alpine Deluxe Triple Room",
        description:
          "Comfortable alpine sanctuary room for 3 trekkers with double-glazed windows, personal thermal blankets, and valley vista.",
        occupancy: { "@type": "QuantitativeValue", value: 3 },
        bed: { "@type": "BedDetails", numberOfBeds: 3, typeOfBed: "Single Beds" },
      },
      {
        "@type": "HotelRoom",
        name: "Sanctuary Quad Lodge Room",
        description:
          "Spacious 4-person expedition suite insulated for cold high-altitude nights with warm duvets and panoramic deck access.",
        occupancy: { "@type": "QuantitativeValue", value: 4 },
        bed: { "@type": "BedDetails", numberOfBeds: 4, typeOfBed: "Bunk Beds / Single Beds" },
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Annapurna Base Camp Night Stay & Sherpa Dining",
        priceCurrency: "USD",
        price: "45.00",
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
        url: `${SITE_URL}/rooms`,
      },
    ],
  };
}

/**
 * 2. Organization Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
      "https://x.com",
      "https://youtube.com",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_PHONE,
        contactType: "Reservations and Customer Support",
        areaServed: "NP",
        availableLanguage: ["English", "Nepali", "Hindi"],
        email: SITE_BOOKING_EMAIL,
      },
      {
        "@type": "ContactPoint",
        telephone: SITE_PHONE_SECONDARY,
        contactType: "Emergency High-Altitude Rescue Desk",
        areaServed: "NP",
        availableLanguage: ["English", "Nepali"],
      },
    ],
  };
}

/**
 * 3. WebSite Schema with Sitelinks Searchbox
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: "ABC Annapurna Guesthouse Website",
    description:
      "Official website of Annapurna Guesthouse at 4,130m elevation in Annapurna Base Camp, Nepal. Book rooms, explore 10-day trek itinerary, review weather telemetry, and reserve dining.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/rooms?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 4. FAQPage Schema for FAQs
 */
export function getFaqSchema(customFaqs?: { q: string; a: string }[]) {
  const defaultFaqs = [
    {
      q: "Is advance booking required for Annapurna Base Camp Guesthouse?",
      a: "Yes, advance booking is strongly recommended during the peak spring (March to May) and autumn (September to November) trekking seasons because room capacity at 4,130m is limited and demand is high.",
    },
    {
      q: "Do you provide hot meals, breakfast, and dinner at ABC?",
      a: "Yes! Our guesthouse features an authentic Sherpa dining room serving nourishing hot breakfast, lunch, dinner, high-altitude garlic soup, traditional Dal Bhat power meals, pizzas, apple pies, and hot drinks all day.",
    },
    {
      q: "Is Wi-Fi internet available at Annapurna Base Camp Guesthouse?",
      a: "Yes, high-altitude satellite Wi-Fi is available across our guest rooms and dining hall so you can stay in touch with family, upload expedition photos, and check weather telemetry.",
    },
    {
      q: "Can I charge phones, cameras, and power banks?",
      a: "Yes, our central charging stations powered by solar arrays and backup generators allow you to recharge phones, camera batteries, GPS units, and power banks safely.",
    },
    {
      q: "What elevation is Annapurna Base Camp Guesthouse?",
      a: "Annapurna Guesthouse is situated at exactly 4,130 meters (13,550 feet) above sea level in the center of the Annapurna Sanctuary amphitheater in Nepal.",
    },
    {
      q: "What safety equipment is on-site for altitude sickness (AMS)?",
      a: "We maintain 24/7 medical oxygen concentrators, pulse oximeters, emergency hyperbaric altitude protocols, and direct coordination with Kathmandu and Pokhara helicopter search-and-rescue operators.",
    },
    {
      q: "Are hot showers available at 4,130 meters?",
      a: "Yes, we provide hot gas and solar-warmed showers for trekkers arriving from long days on the trail.",
    },
  ];

  const items = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * 5. BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * 6. TouristTrip / TouristAttraction Schema for the Trek Route Page
 */
export function getTrekTripSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "TouristAttraction"],
    "@id": `${SITE_URL}/trek/#touristtrip`,
    name: "Annapurna Base Camp Trek (ABC Sanctuary Expedition 4,130m)",
    description:
      "A classic 10-day high-altitude trekking route through rhododendron forests, Gurung stone villages, and the deep Modi Khola gorge, finishing in the 360-degree glaciated amphitheater of Annapurna Base Camp (4,130m).",
    touristType: ["Trekker", "Hiker", "Backpacker", "Mountaineer", "Adventure Seeker"],
    subTrip: [
      {
        "@type": "TouristTrip",
        name: "Day 1: Pokhara to Tikhedhunga / Ulleri",
        description: "Scenic drive from Pokhara (820m) to Nayapul and trek through lush subtropical valley up to Tikhedhunga / Ulleri stone steps (1,960m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 2: Tikhedhunga to Ghorepani",
        description: "Ascent through rhododendron forests with cascading waterfalls to the ridge town of Ghorepani (2,860m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 3: Poon Hill Sunrise & Trek to Tadapani",
        description: "Pre-dawn climb to Poon Hill (3,210m) for panoramic sunrise over Dhaulagiri and Annapurna ranges, continuing onwards to Tadapani (2,630m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 4: Tadapani to Chhomrong",
        description: "Trek down to Kimrong Khola and ascend to the grand terraced village of Chhomrong (2,170m) overlooking Machapuchare.",
      },
      {
        "@type": "TouristTrip",
        name: "Day 5: Chhomrong to Dovan",
        description: "Descend into the Modi Khola canyon through bamboo thickets to Dovan (2,600m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 6: Dovan to Deurali",
        description: "Gradual altitude gain past Hinku Cave entering the alpine gateway at Deurali (3,200m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 7: Deurali via MBC to Annapurna Base Camp (ABC)",
        description: "Hike through the Machapuchare Base Camp (3,700m) corridor directly into the glaciated 4,130m Annapurna Sanctuary to Annapurna Guesthouse.",
      },
      {
        "@type": "TouristTrip",
        name: "Day 8: Sunrise at ABC & Trek down to Bamboo",
        description: "Watch sunrise light up the 8,091m south face of Annapurna I, then descend safely to Bamboo (2,310m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 9: Bamboo to Jhinu Danda Hot Springs",
        description: "Climb through Chhomrong and relax in the soothing natural riverside thermal pools at Jhinu Danda (1,780m).",
      },
      {
        "@type": "TouristTrip",
        name: "Day 10: Jhinu Danda to Siwai & Drive to Pokhara",
        description: "Short final morning trek over suspension bridges to roadhead, followed by vehicle transfer back to Pokhara.",
      },
    ],
    offers: {
      "@type": "Offer",
      name: "Annapurna Sanctuary Lodging & Trek Package Support",
      priceCurrency: "USD",
      price: "150.00",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/trek`,
    },
  };
}

/**
 * 7. Services Schema (Medical, Rescue, Food, Wifi)
 */
export function getServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "High-Altitude Medical Oxygen & AMS Therapy",
        description: "24/7 hyperbaric oxygen concentrators and certified altitude illness first-aid protocols at 4,130m.",
        provider: { "@id": `${SITE_URL}/#lodging` },
      },
      {
        "@type": "Service",
        name: "Emergency Helicopter Evacuation Desk",
        description: "Direct heli-pad dispatch and coordination with Pokhara/Kathmandu medevac operators.",
        provider: { "@id": `${SITE_URL}/#lodging` },
      },
      {
        "@type": "Service",
        name: "Glacier Suite Radiant Warming & Hot Showers",
        description: "Double-pane insulated rooms with heated mattress pads and thermal solar/gas showers.",
        provider: { "@id": `${SITE_URL}/#lodging` },
      },
      {
        "@type": "Service",
        name: "High-Speed Satellite Starlink Internet",
        description: "Stable mountain broadband for telemetry, safety updates, and personal communications.",
        provider: { "@id": `${SITE_URL}/#lodging` },
      },
      {
        "@type": "Service",
        name: "Sherpa Alpine Kitchen & High-Altitude Dining",
        description: "Freshly prepared wholesome meals, traditional Nepali Dal Bhat, organic herbal teas, and hot soups.",
        provider: { "@id": `${SITE_URL}/#lodging` },
      },
    ],
  };
}

/**
 * 8. HotelRoom Schema Generator for individual rooms
 */
export function getRoomSchema(room: {
  name: string;
  slug: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  images: string[];
  amenities: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["HotelRoom", "Product"],
    name: `${room.name} • Annapurna Guesthouse (4,130m)`,
    description: room.description,
    image: room.images && room.images.length > 0 ? room.images : [`${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`],
    url: `${SITE_URL}/rooms/${room.slug}`,
    occupancy: {
      "@type": "QuantitativeValue",
      value: room.capacity,
    },
    amenityFeature: room.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: room.pricePerNight.toFixed(2),
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: `${SITE_URL}/rooms/${room.slug}`,
    },
    containedInPlace: {
      "@id": `${SITE_URL}/#lodging`,
    },
  };
}
