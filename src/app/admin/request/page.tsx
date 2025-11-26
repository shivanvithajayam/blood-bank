'use client';

import React, { useState } from 'react';
import './request.css';

type RequestType = {
  id: number;
  Date: string;
  bloodType: string;
  quantity: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
};

const initialRequests: RequestType[] = [
  { id: 1, Date: '31-01-2025', bloodType: 'B-', quantity: 5, status: 'Pending' },
  { id: 2, Date: '24 -05-2025', bloodType: 'AB+', quantity: 2, status: 'Pending' },
  { id: 3, Date: '12-03-2025', bloodType: 'O+', quantity: 3, status: 'Accepted' },
  { id: 4, Date: '15-04-2025', bloodType: 'A-', quantity: 4, status: 'Rejected' },
  { id: 5, Date: '20-06-2025', bloodType: 'B+', quantity: 1, status: 'Pending' },
  { id: 6, Date: '05-07-2025', bloodType: 'O-', quantity: 6, status: 'Accepted' },
  { id: 7, Date: '18-08-2025', bloodType: 'AB-', quantity: 2, status: 'Rejected' },
  { id: 8, Date: '22-09-2025', bloodType: 'A+', quantity: 3, status: 'Pending' },
  { id: 9, Date: '30-10-2025', bloodType: 'B-', quantity: 4, status: 'Accepted' },
  { id: 10, Date: '11-11-2025', bloodType: 'O+', quantity: 5, status: 'Rejected' },
  { id: 11, Date: '25-12-2025', bloodType: 'A-', quantity: 1, status: 'Pending' },
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
              <td>{req.Date}</td>
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