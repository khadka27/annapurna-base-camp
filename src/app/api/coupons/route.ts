import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    return NextResponse.json({ success: false, coupons: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.toUpperCase(),
        discountPercent: Number(body.discountPercent),
        active: Boolean(body.active ?? true),
      },
    });
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
