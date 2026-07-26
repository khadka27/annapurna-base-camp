import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json({ success: false, bookings: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await prisma.booking.create({
      data: {
        guestName: body.guestName,
        guestEmail: body.guestEmail,
        guestPhone: body.guestPhone,
        roomId: body.roomId,
        roomName: body.roomName,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        guestsCount: Number(body.guestsCount || 2),
        couponCode: body.couponCode || null,
        discountAmount: Number(body.discountAmount || 0),
        totalAmount: Number(body.totalAmount),
        status: body.status || "Pending",
      },
    });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Booking database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
