import { Metadata } from "next";
import ExperiencesClient from "./ExperiencesClient";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Curated Sanctuary Experiences • Sunrise, Stargazing & Alpine Hospitality",
  description:
    "Immerse yourself in authentic Himalayan experiences at 4,130m in Annapurna Base Camp, Nepal. Morning golden sunrises on Annapurna I, zero-light pollution stargazing, warm Sherpa kitchen storytelling, and alpine wellness.",
  keywords: [
    "Annapurna Base Camp experiences",
    "Annapurna sunrise photography",
    "Stargazing Annapurna Base Camp",
    "Sherpa hospitality Annapurna",
    "Annapurna sanctuary trek memories",
    "Annapurna Guesthouse activities",
  ],
  alternates: {
    canonical: `${SITE_URL}/experiences`,
  },
  openGraph: {
    title: "Curated Sanctuary Experiences | Annapurna Guesthouse (4,130m)",
    description:
      "Golden hour sunrises over 8,000m summits, high-altitude night sky stargazing, and authentic Sherpa tea hospitality.",
    url: `${SITE_URL}/experiences`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Sunrise over Annapurna Sanctuary peaks",
      },
    ],
  },
};

export default function ExperiencesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Curated Experiences", url: "/experiences" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExperiencesClient />
    </>
  );
}
