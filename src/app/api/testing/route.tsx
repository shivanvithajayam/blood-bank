import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function GET(req: Request) {
  const session = req.headers.get("cookie")?.split("=")[1];

  if (!session) {
    return NextResponse.json({ error: "No session cookie found" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(session, process.env.JWT_SECRET!);
    return NextResponse.json({ decoded });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}