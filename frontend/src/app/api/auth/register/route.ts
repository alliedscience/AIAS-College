import { NextResponse } from "next/server";
import { registerPortalUser } from "@/lib/auth/portalAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = await request.json();
    const { fullName, email, phone, password } = input;

    if (![fullName, email, phone, password].every((value) => typeof value === "string" && value.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide full name, email address, 10-digit mobile, and password." },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const result = await registerPortalUser(input);
    const response = NextResponse.json(
      {
        success: true,
        message: "Account registered successfully! Welcome to the AIAS Education Portal.",
        user: result.user,
        token: result.token,
        role: result.user.role,
      },
      { status: 201 }
    );
    response.cookies.set("aias_user_session", result.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to register the account.",
      },
      { status: 400 }
    );
  }
}
