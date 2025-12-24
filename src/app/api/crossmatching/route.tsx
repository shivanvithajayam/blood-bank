import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const compatibilityMap: Record<string, string[]> = {
  "O-": ["O-"],
  "O+": ["O-", "O+"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
};

export async function POST(req: Request) {
  const { recipientType, units } = await req.json();

  const compatibleTypes = compatibilityMap[recipientType];
  if (!compatibleTypes) {
    return NextResponse.json({ error: "Invalid blood type" }, { status: 400 });
  }

  // 🔍 Fetch compatible inventory
  const { data: inventory, error } = await supabase
    .from("blood_inventories")
    .select("id, blood_type, units")
    .in("blood_type", compatibleTypes)
    .order("units", { ascending: false });

  if (error || !inventory || inventory.length === 0) {
    return NextResponse.json({ error: "No compatible blood available" }, { status: 404 });
  }

  let remaining = units;
  const deductions: { blood_type: string; deducted: number }[] = [];

  for (const row of inventory) {
    if (remaining <= 0) break;

    const deduct = Math.min(row.units, remaining);
    remaining -= deduct;

    // Update DB
    await supabase
      .from("blood_inventories")
      .update({ units: row.units - deduct })
      .eq("id", row.id);

    deductions.push({ blood_type: row.blood_type, deducted: deduct });
  }

  if (remaining > 0) {
    return NextResponse.json({ error: "Insufficient units across all compatible types" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Cross-match successful",
    fulfilledWith: deductions,
  });
}