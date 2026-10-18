import { Metadata } from "next";
import RoomSlugClient from "./RoomSlugClient";
import { prisma } from "@/lib/prisma";
import {
  SITE_URL,
  SITE_NAME,
  getBreadcrumbSchema,
  getRoomSchema,
} from "@/lib/seo-schemas";

export { getRoomSlug } from "@/lib/room-utils";

function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let roomName = formatSlugToTitle(slug);
  let roomDesc = `Book ${roomName} at 4,130m altitude in Annapurna Base Camp, Nepal. Heated blankets, panoramic Himalayan peak views, hot shower, and Sherpa dining.`;
  let roomImage = `${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`;

  try {
    const dbRoom = await prisma.room.findFirst({
      where: {
        OR: [
          { id: slug },
          { name: { mode: "insensitive", equals: roomName } },
        ],
      },
    });

    if (dbRoom) {
      roomName = dbRoom.name;
      roomDesc = dbRoom.description || roomDesc;
      if (dbRoom.images && dbRoom.images.length > 0) {
        roomImage = dbRoom.images[0];
      }
    }
  } catch {
    // Fall back to slug title if DB is unavailable
  }

  const pageUrl = `${SITE_URL}/rooms/${slug}`;

  return {
    title: `${roomName} • 4,130m Glacier Suite`,
    description: roomDesc,
    keywords: [
      roomName,
      `${roomName} Annapurna Base Camp`,
      "Annapurna Base Camp room reservation",
      "Heated lodge suite ABC",
      "Annapurna Guesthouse booking",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${roomName} • Annapurna Guesthouse (4,130m)`,
      description: roomDesc,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: roomImage,
          width: 1200,
          height: 800,
          alt: `${roomName} at Annapurna Base Camp Guesthouse (4,130m)`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${roomName} • Annapurna Guesthouse (4,130m)`,
      description: roomDesc,
      images: [roomImage],
    },
  };
}

export default async function DynamicRoomBookingPage({ params }: PageProps) {
  const { slug } = await params;
  const roomName = formatSlugToTitle(slug);

  let price = 45;
  let capacity = 2;
  let desc = `Experience premier high-altitude comfort in the ${roomName} at 4,130m in Annapurna Base Camp, Nepal.`;
  let images: string[] = [`${SITE_URL}/images/Lodge-in-Annapurna-base-camp.jpg`];
  let amenities: string[] = [
    "Panoramic Mountain View",
    "Heated Bedding & Warm Blankets",
    "Solar / Gas Hot Shower",
    "Satellite Wi-Fi",
    "24/7 Medical Oxygen Backup",
  ];

  try {
    const dbRoom = await prisma.room.findFirst({
      where: {
        OR: [
          { id: slug },
          { name: { mode: "insensitive", equals: roomName } },
        ],
      },
    });

    if (dbRoom) {
      price = dbRoom.pricePerNight;
      capacity = dbRoom.capacity;
      desc = dbRoom.description;
      if (dbRoom.images && dbRoom.images.length > 0) images = dbRoom.images;
      if (dbRoom.amenities && dbRoom.amenities.length > 0) amenities = dbRoom.amenities;
    }
  } catch {
    // default room details fallback
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Glacier Suites & Accommodations", url: "/rooms" },
    { name: roomName, url: `/rooms/${slug}` },
  ]);

  const roomSchema = getRoomSchema({
    name: roomName,
    slug,
    description: desc,
    pricePerNight: price,
    capacity,
    images,
    amenities,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }}
      />
      <RoomSlugClient slug={slug} />
    </>
  );
}
