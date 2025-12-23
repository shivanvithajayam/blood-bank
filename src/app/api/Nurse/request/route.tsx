import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // ✅ Extract session cookie
    const session = req.headers.get("cookie")?.split("=")[1];
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify JWT
    const payload = jwt.verify(session, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (payload.role !== "nurse") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Parse request body
    const { requestType, bloodType, amount } = await req.json();

    // 👇 Decide status based on requestType
    const status = requestType === "emergency" ? "APPROVED" : "PENDING";

    // ✅ Insert into Supabase
    const { error } = await supabase.from("blood_requests").insert([
      {
        request_id: uuidv4(),
        nurse_id: payload.id,
        blood_type: bloodType,
        units_requested: parseInt(amount, 10),
        status, // 👈 dynamic status
        request_date: new Date().toISOString(),
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Request submitted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 500 });
  }
}