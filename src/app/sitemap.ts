import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-schemas";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Core static marketing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/rooms`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/trek`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/experiences`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/cancellation-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Default rooms in case database is unreachable during build
  const defaultSlugs = [
    "glacier-sanctuary-suite",
    "fishtail-panorama-suite",
    "alpine-deluxe-triple-room",
    "sanctuary-quad-lodge-room",
  ];

  let roomSlugs = [...defaultSlugs];

  try {
    const dbRooms = await prisma.room.findMany({
      select: { name: true, id: true },
    });

    if (dbRooms && dbRooms.length > 0) {
      const generatedSlugs = dbRooms.map((r) =>
        r.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
      roomSlugs = Array.from(new Set([...roomSlugs, ...generatedSlugs]));
    }
  } catch {
    // Fall back to defaultSlugs if DB is offline during build
  }

  const roomRoutes: MetadataRoute.Sitemap = roomSlugs.map((slug) => ({
    url: `${SITE_URL}/rooms/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...roomRoutes];
}
