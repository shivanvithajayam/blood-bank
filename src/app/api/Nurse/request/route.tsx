import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { compatibilityMap } from "../../lib/compatibility";  // ✅ import map

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const payload = jwt.verify(session, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

      if (payload.role !== "nurse") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const { requestType, bloodType, amount } = await req.json();
      const units = parseInt(amount, 10);

      const status = requestType === "emergency" ? "APPROVED" : "PENDING";

      const { error: reqError } = await supabase.from("blood_requests").insert([
        {
          request_id: uuidv4(),
          nurse_id: payload.id,
          blood_type: bloodType,
          units_requested: units,
          status,
          request_date: new Date().toISOString(),
        },
      ]);

      if (reqError) {
        return NextResponse.json({ error: reqError.message }, { status: 500 });
      }

      // ✅ Emergency flow: notifications + cross‑matching deduction
      if (requestType === "emergency") {
        const now = new Date();

        await supabase.from("notifications").insert([
          {
            date: now.toISOString().split("T")[0],
            time: now.toTimeString().split(" ")[0],
            heading: "Emergency Request",
            body: `Nurse ${payload.id} requested ${amount} units of ${bloodType}`,
          },
        ]);

        // 🔑 Use compatibility map
        const compatibleTypes = compatibilityMap[bloodType];
        if (!compatibleTypes) {
          return NextResponse.json({ error: "Invalid blood type" }, { status: 400 });
        }

        let remaining = units;
        const { data: inventories, error: invError } = await supabase
          .from("blood_inventories")
          .select("*")
          .in("blood_type", compatibleTypes)   // ✅ cross‑match
          .order("expiry_date", { ascending: true });

        if (invError) {
          return NextResponse.json({ error: invError.message }, { status: 500 });
        }

        for (const inv of inventories ?? []) {
          if (remaining <= 0) break;

          if (inv.numofpints > remaining) {
            const { error: updError } = await supabase
              .from("blood_inventories")
              .update({ numofpints: inv.numofpints - remaining })
              .eq("blood_id", inv.blood_id);
            if (updError) {
              return NextResponse.json({ error: updError.message }, { status: 500 });
            }
            remaining = 0;
          } else {
            const { error: delError } = await supabase
              .from("blood_inventories")
              .delete()
              .eq("blood_id", inv.blood_id);
            if (delError) {
              return NextResponse.json({ error: delError.message }, { status: 500 });
            }
            remaining -= inv.numofpints;
          }
        }

        if (remaining > 0) {
          await supabase.from("notifications").insert([
            {
              date: now.toISOString().split("T")[0],
              time: now.toTimeString().split(" ")[0],
              heading: "Cross-match Error",
              body: `Insufficient units across compatible types for ${bloodType}`,
            },
          ]);
          return NextResponse.json(
            { error: "Insufficient units across compatible types" },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        { message: "Request submitted successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("POST /request error:", err);
      return NextResponse.json(
        { error: "Invalid token or server error" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}