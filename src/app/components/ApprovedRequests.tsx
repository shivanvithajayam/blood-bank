"use client";
import React, { useEffect, useState } from "react";

interface Request {
  request_id: string;
  blood_type: string;
  units_requested: number;
  request_date: string;
}

const ApprovedRequests: React.FC = () => {
  const [approvedData, setApprovedData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApproved() {
      try {
        const res = await fetch("/api/Nurse/approved", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("Error response:", text);
          return;
        }
        const data = await res.json();
        setApprovedData(data);
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApproved();
  }, []);

  if (loading) return <p>Loading approved requests...</p>;

  return (
    <table className="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Blood Type</th>
          <th>Units</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {approvedData.map((req) => (
          <tr key={req.request_id}>
            <td>{req.request_id}</td>
            <td>{req.blood_type}</td>
            <td>{req.units_requested}</td>
            <td>{new Date(req.request_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApprovedRequests;