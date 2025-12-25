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
      console.error("❌ Unauthorized: no session cookie");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const payload = jwt.verify(session, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

      if (payload.role !== "nurse") {
        console.error("❌ Forbidden: role is not nurse");
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const { requestType, bloodType, amount } = await req.json();
      const units = parseInt(amount, 10);

      console.log(`📩 Nurse ${payload.id} submitted request: ${units} units of ${bloodType}, type=${requestType}`);

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
        console.error("❌ Error inserting blood_request:", reqError.message);
        return NextResponse.json({ error: reqError.message }, { status: 500 });
      }

      // ✅ Emergency flow: notifications + deduction
      if (requestType === "emergency") {
        const now = new Date();

        await supabase.from("notifications").insert([
          {
            date: now.toISOString().split("T")[0],
            time: now.toTimeString().split(" ")[0],
            heading: "Emergency Request",
            body: `Nurse ${payload.id} requested ${units} units of ${bloodType}`,
          },
        ]);

        let remaining = units;

        // 🔍 Phase 1: Deduct from requested blood type first
        console.log(`🔎 Phase 1: Trying to deduct from ${bloodType} only`);
        const { data: directInventories, error: directError } = await supabase
          .from("blood_inventories")
          .select("*")
          .eq("blood_type", bloodType)
          .order("expiry_date", { ascending: true });

        if (directError) {
          console.error("❌ Error fetching direct inventories:", directError.message);
          return NextResponse.json({ error: directError.message }, { status: 500 });
        }

        for (const inv of directInventories ?? []) {
          if (remaining <= 0) break;

          if (inv.numofpints > remaining) {
            const { error } = await supabase
              .from("blood_inventories")
              .update({ numofpints: inv.numofpints - remaining })
              .eq("blood_id", inv.blood_id);
            if (error) {
              console.error("❌ Update error:", error.message);
              return NextResponse.json({ error: error.message }, { status: 500 });
            }
            console.log(`✅ Deducted ${remaining} units from ${bloodType}, remaining stock: ${inv.numofpints - remaining}`);
            remaining = 0;
          } else {
            const { error } = await supabase
              .from("blood_inventories")
              .delete()
              .eq("blood_id", inv.blood_id);
            if (error) {
              console.error("❌ Delete error:", error.message);
              return NextResponse.json({ error: error.message }, { status: 500 });
            }
            console.log(`🗑️ Removed ${inv.numofpints} units of ${bloodType}`);
            remaining -= inv.numofpints;
          }
        }

        // 🔁 Phase 2: Cross-match if still needed
        if (remaining > 0) {
          console.log(`⚠️ Not enough ${bloodType}. ${remaining} units still needed. Trying cross-match.`);

          const compatibleTypes = compatibilityMap[bloodType];
          if (!compatibleTypes) {
            console.error("❌ Invalid blood type for cross-match");
            return NextResponse.json({ error: "Invalid blood type" }, { status: 400 });
          }

          const { data: crossInventories, error: crossError } = await supabase
            .from("blood_inventories")
            .select("*")
            .in("blood_type", compatibleTypes)
            .order("expiry_date", { ascending: true });

          if (crossError) {
            console.error("❌ Cross-match fetch error:", crossError.message);
            return NextResponse.json({ error: crossError.message }, { status: 500 });
          }

          for (const inv of crossInventories ?? []) {
            if (remaining <= 0) break;

            if (inv.numofpints > remaining) {
              const { error } = await supabase
                .from("blood_inventories")
                .update({ numofpints: inv.numofpints - remaining })
                .eq("blood_id", inv.blood_id);
              if (error) {
                console.error("❌ Cross-match update error:", error.message);
                return NextResponse.json({ error: error.message }, { status: 500 });
              }
              console.log(`✅ Deducted ${remaining} units from compatible type ${inv.blood_type}, remaining stock: ${inv.numofpints - remaining}`);
              remaining = 0;
            } else {
              const { error } = await supabase
                .from("blood_inventories")
                .delete()
                .eq("blood_id", inv.blood_id);
              if (error) {
                console.error("❌ Cross-match delete error:", error.message);
                return NextResponse.json({ error: error.message }, { status: 500 });
              }
              console.log(`🗑️ Removed ${inv.numofpints} units from compatible type ${inv.blood_type}`);
              remaining -= inv.numofpints;
            }
          }

          if (remaining > 0) {
            console.log(`❌ Still short of ${remaining} units after cross-match`);
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
      }

      console.log("✅ Request submitted successfully");
      return NextResponse.json(
        { message: "Request submitted successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("❌ POST /request error:", err);
      return NextResponse.json(
        { error: "Invalid token or server error" },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("❌ JWT verification failed:", err.message);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}