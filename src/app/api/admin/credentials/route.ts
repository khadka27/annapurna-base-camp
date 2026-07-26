import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const admin = await prisma.adminUser.findFirst();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin user not found" }, { status: 440 });
    }
    return NextResponse.json({
      success: true,
      email: admin.email,
      name: admin.name,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch admin settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newEmail, newPassword } = body;

    if (!currentPassword || !newEmail || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Current password, new email, and new password are required." },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findFirst();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin user record not found." }, { status: 404 });
    }

    // Verify current password
    if (admin.password !== currentPassword) {
      return NextResponse.json(
        { success: false, message: "Incorrect current password. Verification failed." },
        { status: 400 }
      );
    }

    // Update admin email and password in PostgreSQL
    const updated = await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        email: newEmail.toLowerCase().trim(),
        password: newPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin credentials updated successfully in PostgreSQL database!",
      email: updated.email,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update admin credentials." },
      { status: 500 }
    );
  }
}
