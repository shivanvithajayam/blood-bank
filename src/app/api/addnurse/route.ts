export const runtime = "nodejs"; // ⭐ must be first (before imports)

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Pool } from "pg";

// ✅ Use Supabase Postgres URL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

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

    const client = await pool.connect();

    try {
      const password_hash = await bcrypt.hash(password, 10);

      await client.query("BEGIN");

      await client.query(
        `INSERT INTO nurse (nurse_id, nurse_name, dept)
         VALUES ($1, $2, $3)`,
        [nurse_id, nurse_name, dept]
      );

      await client.query(
        `INSERT INTO bloodbank_users (username, password_hash, role)
         VALUES ($1, $2, 'nurse')`,
        [nurse_id, password_hash]
      );

      await client.query("COMMIT");

      return NextResponse.json(
        { message: "Nurse added successfully" },
        { status: 201 }
      );
    } catch (dbErr) {
      await client.query("ROLLBACK");
      console.error("Database error:", dbErr);
      return NextResponse.json(
        { error: dbErr instanceof Error ? dbErr.message : "DB error" },
        { status: 500 }
      );
      return NextResponse.json(
        { error: "Failed to add nurse" },
        { status: 500 }
      );
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Request error:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
