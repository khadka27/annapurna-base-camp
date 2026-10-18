import { Metadata } from "next";
import TrekClient from "./TrekClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
  getTrekTripSchema,
  getFaqSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Annapurna Base Camp Trek (4,130m) • Route Map, Elevation & Safety Guide",
  description:
    "Official expedition guide for the 10-day Annapurna Base Camp Trek (4,130m). Detailed day-by-day itinerary, elevation gain charts, gear packing list, and acute mountain sickness (AMS) safety protocols.",
  keywords: [
    "Annapurna Base Camp Trek",
    "ABC Trek itinerary 10 days",
    "Annapurna Base Camp elevation map",
    "Annapurna Sanctuary route guide",
    "Poon Hill to Annapurna Base Camp",
    "Annapurna Base Camp packing list",
    "AMS safety Annapurna Base Camp",
    "Annapurna Guesthouse trek guide",
    "Pokhara to Annapurna Base Camp trek",
  ],
  alternates: {
    canonical: `${SITE_URL}/trek`,
  },
  openGraph: {
    title: "Annapurna Base Camp Trek (4,130m) • Route Map & Guide | Annapurna Guesthouse",
    description:
      "Explore the 10-day journey to Annapurna Base Camp at 4,130m elevation. Includes route map, elevation scaling charts, packing checklists, and sanctuary hospitality.",
    url: `${SITE_URL}/trek`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Base Camp Trek route beneath 8,000m summits",
      },
    ],
  },
};

export default function TrekPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Annapurna Base Camp Trek Guide (4,130m)", url: "/trek" },
  ]);

  const tripSchema = getTrekTripSchema();
  const trekFaqSchema = getFaqSchema([
    {
      q: "How difficult is the Annapurna Base Camp (ABC) trek?",
      a: "The ABC trek is considered moderately challenging. It involves 5–7 hours of walking per day on stone staircases and mountain trails, reaching a maximum altitude of 4,130 meters at Annapurna Base Camp.",
    },
    {
      q: "What is the best season to trek to Annapurna Base Camp?",
      a: "The best trekking seasons are Autumn (October to November) for crystal-clear mountain skies and Spring (March to May) for blooming rhododendron forests and mild temperatures.",
    },
    {
      q: "How can I prevent Acute Mountain Sickness (AMS)?",
      a: "Ascend gradually, stay well-hydrated (3–4 liters of fluids per day), avoid alcohol, eat warm carbohydrate-rich meals, and rest at our guesthouse if mild symptoms occur. We have 24/7 medical oxygen on-site.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trekFaqSchema) }}
      />
      <TrekClient />
    </>
  );
}
