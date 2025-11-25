"use client";

import Link from "next/link";
import "../admin-nurse.css";

export default function AdminHomePage() {
  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>
      <p className="admin-info">Choose an action:</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Link href="/admin/newnurse">
          <button className="admin-btn-primary">Add New Nurse</button>
        </Link>

        <Link href="/admin/nurselocation">
          <button className="admin-btn-primary">View Nurse Locations</button>
        </Link>
      </div>
    </div>
  );
}
