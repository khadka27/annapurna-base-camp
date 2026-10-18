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
        category: body.category || "Standard",
        pricePerNight: Number(body.pricePerNight),
        capacity: Number(body.capacity || 2),
        size: body.size || "40 m²",
        view: body.view || "Mountain View",
        rating: Number(body.rating || 4.9),
        description: body.description || "Expedition mountain room",
        images: body.images || [],
        amenities: body.amenities || [],
        featured: Boolean(body.featured ?? true),
        available: Boolean(body.available ?? true),
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ success: false, message: "Missing room id" }, { status: 400 });

    const updateData: Record<string, any> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.pricePerNight !== undefined) updateData.pricePerNight = Number(data.pricePerNight);
    if (data.available !== undefined) updateData.available = Boolean(data.available);
    if (data.capacity !== undefined) updateData.capacity = Number(data.capacity);
    if (data.size !== undefined) updateData.size = data.size;
    if (data.view !== undefined) updateData.view = data.view;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.amenities !== undefined) updateData.amenities = data.amenities;
    if (data.discountBadge !== undefined) updateData.discountBadge = data.discountBadge;

    const room = await prisma.room.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Could not update room in database" }, { status: 500 });
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

