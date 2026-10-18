import { Metadata } from "next";
import HomeClient from "./HomeClient";
import {
  SITE_URL,
  SITE_NAME,
  getFaqSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Annapurna Guesthouse • Luxury Sanctuary Lodging at Annapurna Base Camp (4,130m)",
  description:
    "Official website of Annapurna Guesthouse at 4,130m elevation in Annapurna Base Camp, Nepal. Book heated glacier suites, enjoy authentic Sherpa cuisine, hot showers, and 360° views of Annapurna I and Machapuchare.",
  keywords: [
    "Annapurna Guesthouse",
    "Annapurna Base Camp Guesthouse",
    "ABC Annapurna Guesthouse",
    "Annapurna Base Camp hotel booking",
    "Lodge in Annapurna Base Camp 4130m",
    "Annapurna Base Camp tea house rooms",
    "Annapurna sanctuary accommodation",
    "Nepal high altitude lodge",
    "Annapurna Base Camp heated suites",
    "Annapurna trek night stay",
    "Hot shower Annapurna Base Camp",
    "Book ABC guesthouse online",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Annapurna Guesthouse • Luxury Sanctuary Lodging at Annapurna Base Camp (4,130m)",
    description:
      "Stay at 4,130m in the heart of the Annapurna Sanctuary, Nepal. Heated glacier suites, floor-to-ceiling peak views, Sherpa cuisine, and instant online suite reservation.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Guesthouse at 4,130m Annapurna Base Camp Nepal",
      },
      {
        url: `${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`,
        width: 1200,
        height: 800,
        alt: "Glacier Lodges at Annapurna Base Camp sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Annapurna Guesthouse • Luxury Sanctuary Lodging at Annapurna Base Camp (4,130m)",
    description:
      "Experience high-altitude luxury at 4,130m inside the Annapurna Sanctuary. Book heated suites and experience authentic Sherpa hospitality.",
    images: [`${SITE_URL}/images/Annapurna-Base-Camp.jpg`],
  },
};

export default function Page() {
  const faqSchema = getFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
