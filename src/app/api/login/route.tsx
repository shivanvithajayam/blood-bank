import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 1. Find user by username
    const { data: user, error } = await supabase
      .from("bloodbank_users")
      .select("id, username, password_hash, role")
      .eq("username", username)
      .single();

    if (error || !user) {
      console.error("Login error: Supabase query failed", error);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Compare password with stored hash
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.warn("Login warning: Password mismatch for user", username);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // 4. Set HttpOnly cookie
    const response = NextResponse.json({
      role: user.role,
      message: "Login successful",
    });
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    console.error("Unexpected server error in /api/login:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}