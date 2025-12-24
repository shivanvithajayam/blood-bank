import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { compatibilityMap } from "../../lib/compatibility";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { requestId } = await req.json();

    // Fetch the request
    const { data: requests, error: fetchError } = await supabase
      .from("blood_requests")
      .select("*")
      .eq("request_id", requestId)
      .limit(1);

    if (fetchError || !requests?.length) {
      console.error("❌ Request not found:", fetchError?.message);
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const request = requests[0];
    console.log(
      `📩 Admin approving request ${request.request_id}: ${request.units_requested} units of ${request.blood_type}`
    );

    // Update status to APPROVED
    const { error: updateError } = await supabase
      .from("blood_requests")
      .update({ status: "APPROVED" })
      .eq("request_id", requestId);

    if (updateError) {
      console.error("❌ Status update failed:", updateError.message);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 🚨 Deduction + notification logic always runs on approval
    const now = new Date();
    const bloodType = request.blood_type;
    let remaining = request.units_requested;
    const nurseId = request.nurse_id;

    await supabase.from("notifications").insert([
      {
        date: now.toISOString().split("T")[0],
        time: now.toTimeString().split(" ")[0],
        heading: "Admin Approval",
        body: `Admin approved ${remaining} units of ${bloodType} for Nurse ${nurseId}`,
      },
    ]);

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
        console.log(`✅ Deducted ${remaining} units from ${bloodType}`);
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
      console.log(
        `⚠️ Not enough ${bloodType}. ${remaining} units still needed. Trying cross-match.`
      );

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
          console.log(
            `✅ Deducted ${remaining} units from compatible type ${inv.blood_type}`
          );
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
          console.log(
            `🗑️ Removed ${inv.numofpints} units from compatible type ${inv.blood_type}`
          );
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

    console.log("✅ Admin approval completed successfully");
    return NextResponse.json(
      { message: "Request approved and processed" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("❌ Admin approval error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}