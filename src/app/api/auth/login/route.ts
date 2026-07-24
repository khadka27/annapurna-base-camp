import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check credentials (Admin default: admin@annapurna.com / admin123 or configurable)
    const validEmail = process.env.ADMIN_EMAIL || "admin@annapurna.com";
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === validEmail && password === validPassword) {
      const response = NextResponse.json({
        success: true,
        user: { email, name: "Annapurna Admin" },
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
