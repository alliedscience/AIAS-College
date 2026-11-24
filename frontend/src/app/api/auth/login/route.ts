import { NextResponse } from "next/server";
import { authenticatePortalUser } from "@/lib/auth/portalAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please enter your email or phone number and password." },
        { status: 400 }
      );
    }

    const result = await authenticatePortalUser(email, password);
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Please verify your email/phone and password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${result.user.fullName}!`,
      user: result.user,
      token: result.token,
      role: result.user.role,
    });
    response.cookies.set(
      result.user.role === "ADMIN" ? "aias_admin_session" : "aias_user_session",
      result.token,
      { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 }
    );
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to process sign-in. Please try again." },
      { status: 400 }
    );
  }
}
