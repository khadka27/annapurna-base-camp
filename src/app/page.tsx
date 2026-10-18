import { Metadata } from "next";
import HomeClient from "./HomeClient";
import {
  SITE_URL,
  SITE_NAME,
  getFaqSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Annapurna Guest House and Restaurant • Lodge at Annapurna Base Camp (4,130m)",
  description:
    "Official website of Annapurna Guest House and Restaurant at 4,130m elevation in Annapurna Base Camp, Nepal. Book mountain rooms, enjoy authentic dining, hot gas & bucket showers, and 360° views of Annapurna I.",
  keywords: [
    "Annapurna Guest House and Restaurant",
    "Annapurna Base Camp Guest House",
    "ABC Annapurna Guest House",
    "Annapurna Base Camp hotel booking",
    "Lodge in Annapurna Base Camp 4130m",
    "Annapurna Base Camp tea house rooms",
    "Nepal high altitude lodge",
    "Annapurna trek night stay",
    "Hot shower Annapurna Base Camp",
    "Gas shower Annapurna Base Camp",
    "Book ABC guesthouse online",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Annapurna Guest House and Restaurant • Lodge at Annapurna Base Camp (4,130m)",
    description:
      "Stay at 4,130m in the heart of the Himalayas, Nepal. Comfortable mountain rooms, warm dining, hot gas showers, and instant online room reservation.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Guest House and Restaurant at 4,130m Annapurna Base Camp Nepal",
      },
      {
        url: `${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`,
        width: 1200,
        height: 800,
        alt: "Lodges at Annapurna Base Camp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Annapurna Guest House and Restaurant • Lodge at Annapurna Base Camp (4,130m)",
    description:
      "Authentic Himalayan hospitality at 4,130m. Book cozy rooms, hot gas showers, and enjoy hearty restaurant dining.",
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
