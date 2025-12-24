import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { compatibilityMap } from "../../lib/compatibility";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies(); // ✅ no await
    const session = cookieStore.get("session")?.value;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = jwt.verify(session, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { requestId, action } = await req.json(); 
    // action = "APPROVE" | "REJECT"

    // Fetch the request first
    const { data: request, error: reqFetchError } = await supabase
      .from("blood_requests")
      .select("*")
      .eq("request_id", requestId)
      .single();

    if (reqFetchError || !request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (action === "REJECT") {
      // ✅ Just update status
      const { error } = await supabase
        .from("blood_requests")
        .update({ status: "REJECTED" })
        .eq("request_id", requestId);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ message: "Request rejected" }, { status: 200 });
    }

    if (action === "APPROVE") {
      // ✅ Update status
      const { error: updError } = await supabase
        .from("blood_requests")
        .update({ status: "APPROVED" })
        .eq("request_id", requestId);

      if (updError) return NextResponse.json({ error: updError.message }, { status: 500 });

      // ✅ Same inventory deduction + notifications as nurse emergency
      const now = new Date();
      await supabase.from("notifications").insert([
        {
          date: now.toISOString().split("T")[0],
          time: now.toTimeString().split(" ")[0],
          heading: "Admin Approval",
          body: `Admin ${payload.id} approved ${request.units_requested} units of ${request.blood_type}`,
        },
      ]);

      const compatibleTypes = compatibilityMap[request.blood_type];
      if (!compatibleTypes) {
        return NextResponse.json({ error: "Invalid blood type" }, { status: 400 });
      }

      let remaining = request.units_requested;
      const { data: inventories, error: invError } = await supabase
        .from("blood_inventories")
        .select("*")
        .in("blood_type", compatibleTypes)
        .order("expiry_date", { ascending: true });

      if (invError) return NextResponse.json({ error: invError.message }, { status: 500 });

      for (const inv of inventories ?? []) {
        if (remaining <= 0) break;

        if (inv.numofpints > remaining) {
          const { error } = await supabase
            .from("blood_inventories")
            .update({ numofpints: inv.numofpints - remaining })
            .eq("blood_id", inv.blood_id);
          if (error) return NextResponse.json({ error: error.message }, { status: 500 });
          remaining = 0;
        } else {
          const { error } = await supabase
            .from("blood_inventories")
            .delete()
            .eq("blood_id", inv.blood_id);
          if (error) return NextResponse.json({ error: error.message }, { status: 500 });
          remaining -= inv.numofpints;
        }
      }

      if (remaining > 0) {
        await supabase.from("notifications").insert([
          {
            date: now.toISOString().split("T")[0],
            time: now.toTimeString().split(" ")[0],
            heading: "Cross-match Error",
            body: `Insufficient units across compatible types for ${request.blood_type}`,
          },
        ]);
        return NextResponse.json(
          { error: "Insufficient units across compatible types" },
          { status: 400 }
        );
      }

      return NextResponse.json({ message: "Request approved and inventory updated" }, { status: 200 });
    }
  } catch (err: any) {
    console.error("Admin emergency error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}