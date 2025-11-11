'use client';

import React, { useState } from 'react';
import './request.css';

type RequestType = {
  id: number;
  hospital: string;
  bloodType: string;
  quantity: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
};

const initialRequests: RequestType[] = [
  { id: 1, hospital: 'City Hospital', bloodType: 'B-', quantity: 5, status: 'Pending' },
  { id: 2, hospital: 'General Clinic', bloodType: 'AB+', quantity: 2, status: 'Pending' },
];

const Request = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleStatusChange = (id: number, newStatus: RequestType['status']) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div className="request-page">
      <h1>Blood Requests</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hospital</th>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.hospital}</td>
              <td>{req.bloodType}</td>
              <td>{req.quantity}</td>
              <td>
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleStatusChange(req.id, e.target.value as RequestType['status'])
                  }
                  className={`status-select ${req.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
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