export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase server client (no SSL issues)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log("🔥 addnurse API hit");

  try {
    const { nurse_name, nurse_id, dept, password } = await req.json();

    if (!nurse_name || !nurse_id || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔐 Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // 1️⃣ Insert into nurse table
    const { error: nurseError } = await supabase
      .from("nurse")
      .insert({
        nurse_id,
        nurse_name,
        dept,
      });

    if (nurseError) {
      console.error("❌ Nurse insert error:", nurseError);
      return NextResponse.json(
        { error: nurseError.message },
        { status: 500 }
      );
    }

    // 2️⃣ Insert into users table
    const { error: userError } = await supabase
      .from("bloodbank_users")
      .insert({
        username: nurse_id,
        password_hash,
        role: "nurse",
      });

    if (userError) {
      console.error("❌ User insert error:", userError);
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Nurse added successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("❌ REQUEST ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
