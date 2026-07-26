import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json({ success: false, services: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Service title is required." },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        title: body.title,
        category: body.category || "Wellness & Safety",
        price: Number(body.price || 0),
        icon: body.icon || "mountain",
        description: body.description || `${body.title} service at Annapurna Base Camp Sanctuary.`,
        included: Boolean(body.included ?? true),
      },
    });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { success: false, message: "Could not create service in database", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/services error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
