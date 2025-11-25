import React from 'react';

const RequestHistory: React.FC = () => {
  // Mock data for request history
  const historyData = [
    { id: 1, bloodType: 'B+', amount: 15, status: 'Approved', date: '2023-09-15' },
    { id: 2, bloodType: 'AB-', amount: 8, status: 'Pending', date: '2023-09-20' },
    { id: 3, bloodType: 'O+', amount: 20, status: 'Denied', date: '2023-09-25' },
    { id: 4, bloodType: 'A-', amount: 10, status: 'Approved', date: '2023-09-28' },
    { id: 5, bloodType: 'AB+', amount: 5, status: 'Pending', date: '2023-10-01' },
    { id: 6, bloodType: 'O-', amount: 12, status: 'Approved', date: '2023-10-05' },
    { id: 7, bloodType: 'B-', amount: 7, status: 'Denied', date: '2023-10-10' },
    { id: 8, bloodType: 'A+', amount: 18, status: 'Approved', date: '2023-10-12' },
    { id: 9, bloodType: 'AB-', amount: 9, status: 'Pending', date: '2023-10-15' },
    { id: 10, bloodType: 'O+', amount: 14, status: 'Approved', date: '2023-10-18' },
    { id: 11, bloodType: 'B+', amount: 11, status: 'Denied', date: '2023-10-20' },
    { id: 12, bloodType: 'A-', amount: 6, status: 'Approved', date: '2023-10-22' },
  ];

  return (
    <table className="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Blood Type</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((req) => (
          <tr key={req.id}>
            <td>{req.id}</td>
            <td>{req.bloodType}</td>
            <td>{req.amount}</td>
            <td>{req.status}</td>
            <td>{req.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestHistory;