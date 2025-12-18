import { v4 as uuidv4 } from "uuid";
const requests = [
  // BMSORT111 nurse requests
  {
    request_id: uuidv4(),
    status: "pending",
    request_date: "2025-12-18",
    units_requested: 2,
    blood_type: "O+",
    nurse_id: "BMSORT111",
  },
  {
    request_id: uuidv4(),
    status: "accept",
    request_date: "2025-12-17",
    units_requested: 1,
    blood_type: "A-",
    nurse_id: "BMSORT111",
  },
  {
    request_id: uuidv4(),
    status: "reject",
    request_date: "2025-12-16",
    units_requested: 3,
    blood_type: "B+",
    nurse_id: "BMSORT111",
  },
  {
    request_id: uuidv4(),
    status: "pending",
    request_date: "2025-12-15",
    units_requested: 4,
    blood_type: "AB+",
    nurse_id: "BMSORT111",
  },
  {
    request_id: uuidv4(),
    status: "accept",
    request_date: "2025-12-14",
    units_requested: 2,
    blood_type: "O-",
    nurse_id: "BMSORT111",
  },
  {
    request_id: uuidv4(),
    status: "reject",
    request_date: "2025-12-13",
    units_requested: 1,
    blood_type: "A+",
    nurse_id: "BMSORT111",
  },

  // BMSGYN111 nurse requests
  {
    request_id: uuidv4(),
    status: "pending",
    request_date: "2025-12-12",
    units_requested: 2,
    blood_type: "B-",
    nurse_id: "BMSGYN111",
  },
  {
    request_id: uuidv4(),
    status: "accept",
    request_date: "2025-12-11",
    units_requested: 5,
    blood_type: "O+",
    nurse_id: "BMSGYN111",
  },
  {
    request_id: uuidv4(),
    status: "reject",
    request_date: "2025-12-10",
    units_requested: 3,
    blood_type: "AB-",
    nurse_id: "BMSGYN111",
  },
  {
    request_id: uuidv4(),
    status: "pending",
    request_date: "2025-12-09",
    units_requested: 2,
    blood_type: "A+",
    nurse_id: "BMSGYN111",
  },
  {
    request_id: uuidv4(),
    status: "accept",
    request_date: "2025-12-08",
    units_requested: 1,
    blood_type: "O-",
    nurse_id: "BMSGYN111",
  },
  {
    request_id: uuidv4(),
    status: "reject",
    request_date: "2025-12-07",
    units_requested: 4,
    blood_type: "B+",
    nurse_id: "BMSGYN111",
  },
];
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedRequests() {
  for (const req of requests) {
    // Look up nurse_id by username
    const { data, error } = await supabase
      .from("bloodbank_users")
      .select("id")
      .eq("username", req.nurse_id)
      .single();

    if (error) {
      console.error("Error fetching nurse:", req.nurse_id, error);
      continue;
    }

    const nurseId = data.id;

    const { error: insertError } = await supabase.from("blood_requests").insert({
      nurse_id: nurseId,
      status: req.status,
      request_date: req.request_date,
      units_requested: req.units_requested,
      blood_type: req.blood_type,
    });

    if (insertError) {
      console.error("Error inserting request:", insertError);
    } else {
      console.log(`Inserted request for ${req.nurse_id}`);
    }
  }
}

seedRequests();
//npx ts-node scripts/seedRequests.ts <- run this command to seed the requests