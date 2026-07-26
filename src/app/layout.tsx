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

export const metadata: Metadata = {
  title: "Annapurna Guesthouse • Luxury Sanctuary Lodging & Base Camp Suite Booking",
  description: "Experience 5-star mountain luxury at 4,130m altitude in Annapurna Base Camp, Nepal. Heated glacier suites, floor-to-ceiling peak views, live weather telemetry, and instant suite reservation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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
