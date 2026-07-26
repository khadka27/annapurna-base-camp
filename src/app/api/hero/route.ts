import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.heroConfig.findUnique({
      where: { id: "default-hero" },
    });
    return NextResponse.json({ success: true, hero });
  } catch (error) {
    return NextResponse.json({ success: false, hero: null }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const hero = await prisma.heroConfig.upsert({
      where: { id: "default-hero" },
      update: {
        title: body.title,
        subtitle: body.subtitle,
        badge: body.badge,
        seasonalBanner: body.seasonalBanner || "Spring 2026 Himalayan Expedition Season Open",
        autoSlideSpeed: Number(body.autoSlideSpeed || 5000),
        whatsappNumber: body.whatsappNumber || "9779851055520",
      },
      create: {
        id: "default-hero",
        title: body.title,
        subtitle: body.subtitle,
        badge: body.badge,
        seasonalBanner: body.seasonalBanner || "Spring 2026 Himalayan Expedition Season Open",
        autoSlideSpeed: Number(body.autoSlideSpeed || 5000),
        whatsappNumber: body.whatsappNumber || "9779851055520",
      },
    });
    return NextResponse.json({ success: true, hero });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
