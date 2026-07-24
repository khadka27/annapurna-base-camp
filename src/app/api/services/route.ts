import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getServiceDelegate() {
  const delegate = (prisma as any).service || (prisma as any).serviceItem;
  if (!delegate) {
    throw new Error("Service model delegate not initialized on Prisma client instance");
  }
  return delegate;
}

export async function GET() {
  try {
    const delegate = getServiceDelegate();
    const services = await delegate.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json({ success: false, services: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    const delegate = getServiceDelegate();
    const service = await delegate.create({
      data: {
        title: body.title,
        category: body.category || "Wellness & Safety",
        price: Number(body.price || 0),
        icon: body.icon || "🏔️",
        description: body.description || "Guesthouse service",
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

    const delegate = getServiceDelegate();
    await delegate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
