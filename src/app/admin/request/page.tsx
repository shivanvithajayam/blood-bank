'use client';

import React, { useEffect, useState } from 'react';
import './request.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type RequestType = {
  request_id: string;
  request_date: string;
  blood_type: string;
  units_requested: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-IN');
};

const Request = () => {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .order('request_date', { ascending: false });

      if (error) console.error(error);
      else setRequests(data || []);

      setLoading(false);
    };

    fetchRequests();
  }, []);

  // Update status
  const handleStatusChange = async (requestId: string, newStatus: RequestType['status']) => {
  if (newStatus === "APPROVED") {
    // Call backend API instead of direct supabase update
    const res = await fetch("/api/admin/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId }),
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Failed to approve request");
      return;
    }

    console.log("✅ Admin approval triggered:", result.message);
  } else {
    // For REJECTED, you can still update directly
    const { error } = await supabase
      .from("blood_requests")
      .update({ status: newStatus })
      .eq("request_id", requestId);

    if (error) {
      console.error("Update failed:", error);
      alert(error.message || "Failed to update status");
      return;
    }
  }

  setRequests((prev) =>
    prev.map((req) =>
      req.request_id === requestId ? { ...req, status: newStatus } : req
    )
  );
};

  if (loading) {
    return <p style={{ color: 'white' }}>Loading requests...</p>;
  }

  return (
    <div className="request-page">
      <h1>Blood Requests</h1>

      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req, index) => (
            <tr key={req.request_id}>
              <td>{index + 1}</td>
              <td>{formatDate(req.request_date)}</td>
              <td>{req.blood_type}</td>
              <td>{req.units_requested}</td>
              <td>
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleStatusChange(
                      req.request_id,
                      e.target.value as RequestType['status']
                    )
                  }
                  className={`status-select ${req.status.toLowerCase()}`}
                  disabled={req.status !== 'PENDING'} // 🔒 lock once approved/rejected
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Request;