import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const session = cookie
      .split(";")
      .find((c) => c.trim().startsWith("session="))
      ?.split("=")[1];

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(session, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (payload.role !== "nurse") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("blood_requests")
      .select("request_id, blood_type, units_requested, status, request_date")
      .eq("nurse_id", payload.id)
      .order("request_date", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("History route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}