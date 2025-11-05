import React from 'react';

const ApprovedRequests: React.FC = () => {
  // Mock data for approved requests
  const approvedData = [
    { id: 1, bloodType: 'A+', amount: 10, date: '2023-10-01' },
    { id: 2, bloodType: 'O-', amount: 5, date: '2023-10-02' },
  ];

  return (
    <table className="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Blood Type</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {approvedData.map((req) => (
          <tr key={req.id}>
            <td>{req.id}</td>
            <td>{req.bloodType}</td>
            <td>{req.amount}</td>
            <td>{req.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApprovedRequests;