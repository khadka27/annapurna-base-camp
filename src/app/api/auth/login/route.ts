import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.adminUser.findFirst({
      where: {
        email: { equals: email.toLowerCase().trim(), mode: "insensitive" },
      },
    });

    if (user && user.password === password) {
      const response = NextResponse.json({
        success: true,
        user: { email: user.email, name: user.name },
        token: "admin-session-token-4130m",
      });

      // Set auth cookie
      response.cookies.set("admin_token", "admin-session-token-4130m", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid email or password credentials." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication server error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("admin_token");
  return response;
}
