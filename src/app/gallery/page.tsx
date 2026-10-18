import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Guesthouse Media Gallery • High-Altitude Photography (4,130m)",
  description:
    "Browse high-resolution photographs and drone imagery of Annapurna Base Camp (4,130m), luxury glacier suites, dining room dishes, snowy mountain lodges, and 8,000m Himalayan peaks.",
  keywords: [
    "Annapurna Base Camp photos",
    "Annapurna Guesthouse gallery",
    "ABC lodge photos Nepal",
    "Annapurna Base Camp snowfall pictures",
    "Annapurna I sunrise photos",
    "Annapurna sanctuary pictures",
  ],
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    title: "Guesthouse Media Gallery | Annapurna Guesthouse (4,130m)",
    description:
      "Explore high-resolution photography of our mountain lodge at 4,130m, luxury suites, and breathtaking Annapurna Sanctuary scenery.",
    url: `${SITE_URL}/gallery`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Base Camp Sanctuary Gallery",
      },
    ],
  },
};

export default function GalleryPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Media Gallery", url: "/gallery" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GalleryClient />
    </>
  );
}
