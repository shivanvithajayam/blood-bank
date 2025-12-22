"use client";
import React, { useEffect, useState } from "react";

interface Request {
  request_id: string;
  blood_type: string;
  units_requested: number;
  status: string;
  request_date: string;
}

const RequestHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/Nurse/history", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("Error response:", text);
          return;
        }
        const data = await res.json();
        setHistoryData(data);
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading request history...</p>;

  return (
    <table className="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Blood Type</th>
          <th>Units</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((req) => (
          <tr key={req.request_id}>
            <td>{req.request_id}</td>
            <td>{req.blood_type}</td>
            <td>{req.units_requested}</td>
            <td>{req.status}</td>
            <td>{new Date(req.request_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestHistory;