"use client";

import React, { useState, FormEvent } from "react";
import "../../admin-nurse.css";

// Change this if your backend URL is different
const API_URL = "http://localhost:4000/api/nurses";

interface Nurse {
  id: number;
  name: string;
  department: string;
  location: string;
  contact: string;
}

const AdminAddNursePage: React.FC = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState(""); // now nurse ID field
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!name.trim() || !location.trim() || !contact.trim()) {
      setError("Please fill all required fields (*)");
      return;
    }

    const body = {
      name: name.trim(),
      department: department.trim(),
      location: location.trim(), // nurse ID is still sent as 'location'
      contact: contact.trim(),
    };

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Failed to save nurse");
        return;
      }

      const created: Nurse = await res.json();
      console.log("Created nurse:", created);

      setMessage("Nurse saved successfully!");
      setName("");
      setDepartment("");
      setLocation("");
      setContact("");
    } catch (err) {
      console.error(err);
      setError("Network error while saving nurse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h2>Add New Nurse</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="name">Nurse Name *</label>
          <input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="department">Department / Ward</label>
          <input
            id="department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            type="text"
            placeholder="ICU, General, etc."
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="location">Nurse ID *</label>
          <input
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            type="text"
            placeholder="e.g. N1234"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="contact">Contact Number *</label>
          <input
            id="contact"
            value={contact}
            onChange={e => setContact(e.target.value)}
            type="tel"
          />
        </div>

        <button
          className="admin-btn-primary"
          type="submit"
          disabled={loading}
          style={{ background: "#1a7f37" }} // GREEN BUTTON
        >
          {loading ? "Saving..." : "Save Nurse"}
        </button>

        {error && <p className="admin-msg admin-error">{error}</p>}
        {message && <p className="admin-msg admin-success">{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddNursePage;
