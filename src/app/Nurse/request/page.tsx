'use client';
import React, { useState, useCallback } from 'react';
import './request.css';

const RequestPage: React.FC = () => {
  const [requestType, setRequestType] = useState<'emergency' | 'surgery'>('emergency');
  const [bloodType, setBloodType] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const bloodData = [
    { type: 'A+', available: 45 },
    { type: 'A-', available: 30 },
    { type: 'B+', available: 50 },
    { type: 'B-', available: 25 },
    { type: 'AB+', available: 20 },
    { type: 'AB-', available: 15 },
    { type: 'O+', available: 60 },
    { type: 'O-', available: 35 },
  ];

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", { requestType, bloodType, amount });
    try {
      const res = await fetch("/api/Nurse/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 ensures cookie with JWT is sent
        body: JSON.stringify({ requestType, bloodType, amount }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Blood request submitted!");
        setBloodType("");
        setAmount("");
      } else {
        alert(data.error || "Failed to submit request");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }
  };

/*  const debouncedSubmit = useCallback(
    debounce((event: React.FormEvent<HTMLFormElement>) => {
      event.persist();
      handleSubmit(event);
    }, 500),
    []
  );*/

  if (loading) return <p>Loading blood data...</p>;

  return (
    <div className="request-page">
      <h1>Request Blood</h1>
      {/*<form onSubmit={debouncedSubmit}>*/}
        <form onSubmit={handleSubmit}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="emergency"
              checked={requestType === 'emergency'}
              onChange={(e) => setRequestType(e.target.value as 'emergency')}
            />
            Emergency
          </label>
          <label>
            <input
              type="radio"
              value="surgery"
              checked={requestType === 'surgery'}
              onChange={(e) => setRequestType(e.target.value as 'surgery')}
            />
            Surgery
          </label>
        </div>
        <div className="admin-form-group">
          <label>
            Blood Type:
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
              <option value="">Select</option>
              {bloodData.map((data) => (
                <option key={data.type} value={data.type}>{data.type}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="admin-form-group">
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestPage;