import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    // If DB is not connected yet, return null indicator so context uses initial state gracefully
    return NextResponse.json({ success: false, rooms: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const room = await prisma.room.create({
      data: {
        name: body.name,
        category: body.category,
        pricePerNight: Number(body.pricePerNight),
        capacity: Number(body.capacity || 2),
        size: body.size || "40 m²",
        view: body.view || "Mountain View",
        rating: Number(body.rating || 4.9),
        description: body.description || "Expedition suite",
        images: body.images || [],
        amenities: body.amenities || [],
        featured: Boolean(body.featured),
        available: Boolean(body.available),
        discountBadge: body.discountBadge || null,
      },
    });
    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Could not create room in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false }, { status: 400 });

    await prisma.room.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
