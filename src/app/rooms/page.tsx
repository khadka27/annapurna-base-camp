import { Metadata } from "next";
import RoomsClient from "./RoomsClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Glacier Suites & Accommodations (4,130m)",
  description:
    "Book luxury heated suites at 4,130m elevation in Annapurna Base Camp, Nepal. Features double-pane panoramic windows, radiant floor warming, private en-suite thermal baths, and uninterrupted sunrise views of Annapurna I.",
  keywords: [
    "Annapurna Base Camp rooms",
    "Annapurna Base Camp luxury suite",
    "Heated rooms Annapurna Base Camp",
    "Book ABC guesthouse suite",
    "Fishtail panorama suite",
    "Glacier sanctuary suite ABC",
    "Lodge rooms Annapurna Base Camp",
    "Nepal high altitude room reservation",
  ],
  alternates: {
    canonical: `${SITE_URL}/rooms`,
  },
  openGraph: {
    title: "Glacier Suites & Accommodations | Annapurna Guesthouse (4,130m)",
    description:
      "Perched at 4,130m inside the Annapurna Sanctuary. Explore heated suites with panoramic mountain views and instant online reservations.",
    url: `${SITE_URL}/rooms`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`,
        width: 1200,
        height: 800,
        alt: "Glacier Suites at Annapurna Base Camp Guesthouse",
      },
    ],
  },
};

export default function RoomsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Glacier Suites & Accommodations", url: "/rooms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RoomsClient />
    </>
  );
}
