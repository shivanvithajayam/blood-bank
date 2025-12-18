import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// Use your Supabase project URL and SERVICE ROLE KEY (not anon key)
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
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Compare password with stored hash
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Return role + id (you can set a cookie/JWT here for sessions)
    return NextResponse.json({
      id: user.id,
      role: user.role,
      message: "Login successful",
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}