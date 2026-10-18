import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CmsProvider } from "@/context/CmsContext";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { SnowEffect } from "@/components/SnowEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import {
  SITE_URL,
  SITE_NAME,
  getLodgingBusinessSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/seo-schemas";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Annapurna Guesthouse • Luxury Sanctuary Lodging at Annapurna Base Camp (4,130m)",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official website of Annapurna Guesthouse located at 4,130m elevation in Annapurna Base Camp, Nepal. Heated glacier suites, floor-to-ceiling peak views, live weather telemetry, Sherpa dining, 24/7 medical oxygen, and instant room reservation.",
  applicationName: "Annapurna Guesthouse",
  authors: [{ name: "Annapurna Guesthouse Sanctuary Concierge", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Annapurna Guesthouse",
    "Annapurna Base Camp Guesthouse",
    "ABC Annapurna Guesthouse",
    "Annapurna Base Camp hotel",
    "Annapurna Base Camp accommodation",
    "Lodge at Annapurna Base Camp",
    "Annapurna Base Camp room booking",
    "ABC trek lodging Nepal",
    "Annapurna Sanctuary luxury guesthouse",
    "4130m Annapurna Base Camp tea house",
    "Nepal mountain lodge booking",
    "Annapurna Base Camp heated rooms",
    "Pokhara to Annapurna Base Camp lodge",
    "High altitude medical oxygen ABC",
    "Annapurna Base Camp helicopter charter",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Annapurna Guesthouse",
  publisher: "Annapurna Guesthouse",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },
  openGraph: {
    title: "Annapurna Guesthouse • Luxury Sanctuary Lodging at Annapurna Base Camp (4,130m)",
    description:
      "Stay at 4,130m in the heart of the Himalayas. Heated glacier suites, authentic Sherpa dining, satellite WiFi, and instant suite reservation in Annapurna Base Camp, Nepal.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Guesthouse surrounded by snow peaks at Annapurna Base Camp (4,130m)",
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
      "High-altitude luxury at 4,130m in the Annapurna Sanctuary. Heated suites, hot showers, Sherpa hospitality, and instant online booking.",
    images: [`${SITE_URL}/images/Annapurna-Base-Camp.jpg`],
    creator: "@AnnapurnaGuest",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/Annapurna-Base-Camp.jpg",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lodgingSchema = getLodgingBusinessSchema();
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <NextAuthProvider>
          <CmsProvider>
            <SnowEffect />
            {children}
          </CmsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
