import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CmsProvider } from "@/context/CmsContext";
import { ToastProvider } from "@/context/ToastContext";
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
    default: "Annapurna Guest House and Restaurant • Lodge at Annapurna Base Camp (4,130m)",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official website of Annapurna Guest House and Restaurant at 4,130m elevation in Annapurna Base Camp, Nepal. Comfortable mountain rooms, hot gas & bucket showers, authentic dining, 24/7 medical oxygen, and instant room reservations.",
  applicationName: "Annapurna Guest House and Restaurant",
  authors: [{ name: "Annapurna Guest House and Restaurant", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Annapurna Guest House and Restaurant",
    "Annapurna Base Camp Guest House",
    "ABC Annapurna Guest House and Restaurant",
    "Annapurna Base Camp lodge",
    "Annapurna Base Camp accommodation",
    "Lodge at Annapurna Base Camp",
    "Annapurna Base Camp room booking",
    "ABC trek lodging Nepal",
    "4130m Annapurna Base Camp tea house",
    "Nepal mountain lodge booking",
    "Annapurna Base Camp hot shower",
    "Pokhara to Annapurna Base Camp lodge",
    "High altitude medical oxygen ABC",
    "Annapurna Base Camp helicopter charter",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Annapurna Guest House and Restaurant",
  publisher: "Annapurna Guest House and Restaurant",
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
    title: "Annapurna Guest House and Restaurant • Annapurna Base Camp (4,130m)",
    description:
      "Stay at 4,130m in the heart of the Himalayas. Comfortable rooms, authentic restaurant dining, hot gas showers, satellite WiFi, and instant room reservations in Annapurna Base Camp, Nepal.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Annapurna-Base-Camp.jpg`,
        width: 1200,
        height: 630,
        alt: "Annapurna Guest House and Restaurant surrounded by snow peaks at Annapurna Base Camp (4,130m)",
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
    title: "Annapurna Guest House and Restaurant • Annapurna Base Camp (4,130m)",
    description:
      "High-altitude hospitality at 4,130m in Annapurna Base Camp. Cozy rooms, hot showers, Gurung dining, and instant online booking.",
    images: [`${SITE_URL}/images/Annapurna-Base-Camp.jpg`],
    creator: "@annapurna_guest_house",
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
            <ToastProvider>
              <SnowEffect />
              {children}
            </ToastProvider>
          </CmsProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
