import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 30 sample entries for blood_inventory
const inventoryData = [
  // A+ entries
  { blood_id: uuidv4(), blood_type: "A+", numofpints: 45, expiry_date: "2026-01-10" },
  { blood_id: uuidv4(), blood_type: "A+", numofpints: 30, expiry_date: "2026-01-15" },
  { blood_id: uuidv4(), blood_type: "A+", numofpints: 25, expiry_date: "2026-01-20" },
  { blood_id: uuidv4(), blood_type: "A+", numofpints: 50, expiry_date: "2026-01-25" },

  // A- entries
  { blood_id: uuidv4(), blood_type: "A-", numofpints: 20, expiry_date: "2026-01-08" },
  { blood_id: uuidv4(), blood_type: "A-", numofpints: 35, expiry_date: "2026-01-12" },
  { blood_id: uuidv4(), blood_type: "A-", numofpints: 40, expiry_date: "2026-01-18" },

  // B+ entries
  { blood_id: uuidv4(), blood_type: "B+", numofpints: 60, expiry_date: "2026-01-09" },
  { blood_id: uuidv4(), blood_type: "B+", numofpints: 25, expiry_date: "2026-01-14" },
  { blood_id: uuidv4(), blood_type: "B+", numofpints: 15, expiry_date: "2026-01-19" },
  { blood_id: uuidv4(), blood_type: "B+", numofpints: 30, expiry_date: "2026-01-24" },

  // B- entries
  { blood_id: uuidv4(), blood_type: "B-", numofpints: 10, expiry_date: "2026-01-07" },
  { blood_id: uuidv4(), blood_type: "B-", numofpints: 20, expiry_date: "2026-01-13" },
  { blood_id: uuidv4(), blood_type: "B-", numofpints: 15, expiry_date: "2026-01-21" },

  // AB+ entries
  { blood_id: uuidv4(), blood_type: "AB+", numofpints: 25, expiry_date: "2026-01-11" },
  { blood_id: uuidv4(), blood_type: "AB+", numofpints: 30, expiry_date: "2026-01-16" },
  { blood_id: uuidv4(), blood_type: "AB+", numofpints: 40, expiry_date: "2026-01-22" },

  // AB- entries
  { blood_id: uuidv4(), blood_type: "AB-", numofpints: 10, expiry_date: "2026-01-06" },
  { blood_id: uuidv4(), blood_type: "AB-", numofpints: 15, expiry_date: "2026-01-12" },
  { blood_id: uuidv4(), blood_type: "AB-", numofpints: 20, expiry_date: "2026-01-17" },

  // O+ entries
  { blood_id: uuidv4(), blood_type: "O+", numofpints: 70, expiry_date: "2026-01-09" },
  { blood_id: uuidv4(), blood_type: "O+", numofpints: 20, expiry_date: "2026-01-14" },
  { blood_id: uuidv4(), blood_type: "O+", numofpints: 10, expiry_date: "2026-01-19" },
  { blood_id: uuidv4(), blood_type: "O+", numofpints: 30, expiry_date: "2026-01-23" },

  // O- entries
  { blood_id: uuidv4(), blood_type: "O-", numofpints: 15, expiry_date: "2026-01-05" },
  { blood_id: uuidv4(), blood_type: "O-", numofpints: 25, expiry_date: "2026-01-10" },
  { blood_id: uuidv4(), blood_type: "O-", numofpints: 20, expiry_date: "2026-01-15" },
  { blood_id: uuidv4(), blood_type: "O-", numofpints: 30, expiry_date: "2026-01-20" },
];

// Seeder function
async function seedInventory() {
  const { error } = await supabase.from("blood_inventory").insert(inventoryData);

  if (error) {
    console.error("Error inserting inventory:", error);
  } else {
    console.log("Inserted 30 inventory entries successfully!");
  }
}

seedInventory();