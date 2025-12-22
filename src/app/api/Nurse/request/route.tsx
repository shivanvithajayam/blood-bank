import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const session = cookie
      .split(";")
      .find((c) => c.trim().startsWith("session="))
      ?.split("=")[1];

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(session, process.env.JWT_SECRET!) as { id: string; role: string };
    if (payload.role !== "nurse") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { bloodType, amount, requestType } = body;
     console.log("Insert result:", {
      bloodType,
      amount,
      nurseId: payload.id,
    });


    const { error } = await supabase.from("blood_requests").insert([
      {
        request_id: uuidv4(),
        nurse_id: payload.id, // 👈 auto-attached from JWT
        blood_type: bloodType,
        units_requested: parseInt(amount, 10),
        status: "PENDING",
        request_date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Request route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}