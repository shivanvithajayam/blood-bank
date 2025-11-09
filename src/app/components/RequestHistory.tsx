import React from 'react';

const RequestHistory: React.FC = () => {
  // Mock data for request history
  const historyData = [
    { id: 1, bloodType: 'B+', amount: 15, status: 'Approved', date: '2023-09-15' },
    { id: 2, bloodType: 'AB-', amount: 8, status: 'Pending', date: '2023-09-20' },
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