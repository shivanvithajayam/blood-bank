'use client';

import React, { useState } from 'react';
import './request.css';

type RequestType = {
  id: number;
  date: string; // stored as YYYY-MM-DD
  bloodType: string;
  quantity: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
};

// Initial data (stored in standard format)
const initialRequests: RequestType[] = [
  { id: 1, date: '2025-01-31', bloodType: 'B-', quantity: 5, status: 'Pending' },
  { id: 2, date: '2025-05-24', bloodType: 'AB+', quantity: 2, status: 'Pending' },
  { id: 3, date: '2025-03-12', bloodType: 'O+', quantity: 3, status: 'Accepted' },
  { id: 4, date: '2025-04-15', bloodType: 'A-', quantity: 4, status: 'Rejected' },
  { id: 5, date: '2025-06-20', bloodType: 'B+', quantity: 1, status: 'Pending' },
  { id: 6, date: '2025-07-05', bloodType: 'O-', quantity: 6, status: 'Accepted' },
  { id: 7, date: '2025-08-18', bloodType: 'AB-', quantity: 2, status: 'Rejected' },
  { id: 8, date: '2025-09-22', bloodType: 'A+', quantity: 3, status: 'Pending' },
  { id: 9, date: '2025-10-30', bloodType: 'B-', quantity: 4, status: 'Accepted' },
  { id: 10, date: '2025-11-11', bloodType: 'O+', quantity: 5, status: 'Rejected' },
  { id: 11, date: '2025-12-25', bloodType: 'A-', quantity: 1, status: 'Pending' },
];

// Formatter → DD-MM-YYYY
const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};

const Request = () => {
  const [requests, setRequests] = useState<RequestType[]>(initialRequests);

  const handleStatusChange = (
    id: number,
    newStatus: RequestType['status']
  ) => {
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
            <th>Date</th>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{formatDate(req.date)}</td>
              <td>{req.bloodType}</td>
              <td>{req.quantity}</td>
              <td>
                <select
                  value={req.status}
                  onChange={(e) =>
                    handleStatusChange(
                      req.id,
                      e.target.value as RequestType['status']
                    )
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
