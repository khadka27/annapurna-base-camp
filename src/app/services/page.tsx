import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
  getServicesSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Guest House & Restaurant Facilities • Hot Gas Showers, Guides & Porters (4,130m)",
  description:
    "Explore hospitality and trekking facilities at Annapurna Guest House and Restaurant (4,130m). Steaming hot gas & bucket showers, guide & porter assistance, warm dining hall, emergency oxygen, and Starlink Wi-Fi.",
  keywords: [
    "Annapurna Base Camp hot shower",
    "Gas shower Annapurna Base Camp",
    "Bucket shower ABC lodge",
    "Annapurna Base Camp guides and porters",
    "Annapurna Base Camp medical oxygen",
    "Helicopter rescue Annapurna Base Camp",
    "Annapurna Guest House and Restaurant services",
    "High altitude lodge amenities Nepal",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Guest House & Restaurant Facilities | Annapurna Guest House and Restaurant (4,130m)",
    description:
      "Explore hot gas & bucket showers, guide & porter arrangements, emergency oxygen, satellite broadband, and authentic mountain dining at 4,130m.",
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "High-Altitude Services at Annapurna Guesthouse",
      },
    ],
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services & Alpine Amenities", url: "/services" },
  ]);

  const servicesSchema = getServicesSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesClient />
    </>
  );
}
