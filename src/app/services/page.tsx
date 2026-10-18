import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
  getServicesSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "High-Altitude Luxury & Safety Services • Medical Oxygen & Helicopter Charter",
  description:
    "Comprehensive high-altitude hospitality and safety services at 4,130m in Annapurna Base Camp, Nepal. Features medical oxygen chambers, thermal heated suites, direct helicopter charter access, satellite WiFi, and authentic Sherpa dining.",
  keywords: [
    "Annapurna Base Camp medical oxygen",
    "Helicopter rescue Annapurna Base Camp",
    "Hot shower Annapurna Base Camp",
    "Sherpa restaurant Annapurna Base Camp",
    "Starlink internet Annapurna Base Camp",
    "Annapurna Guesthouse services",
    "High altitude lodge amenities Nepal",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "High-Altitude Luxury & Safety Services | Annapurna Guesthouse (4,130m)",
    description:
      "Explore alpine medical oxygen, heated suites, emergency helicopter access, satellite broadband, and Sherpa dining at 4,130m inside the Annapurna Sanctuary.",
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
