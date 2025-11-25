import React from 'react';

const ApprovedRequests: React.FC = () => {
  // Mock data for approved requests
  const approvedData = [
    { id: 1, bloodType: 'A+', amount: 10, date: '2023-10-01' },
    { id: 2, bloodType: 'O-', amount: 5, date: '2023-10-02' },
    { id: 3, bloodType: 'B+', amount: 8, date: '2023-10-03'},
    { id: 4, bloodType: 'AB-', amount: 12, date: '2023-10-04' },
    { id: 5, bloodType: 'A-', amount: 7, date: '2023-10-05' },
    { id: 6, bloodType: 'O+', amount: 15, date: '2023-10-06' },
    { id: 7, bloodType: 'B-', amount: 9, date: '2023-10-07' },
    { id: 8, bloodType: 'AB+', amount: 11, date: '2023-10-08' },
    { id: 9, bloodType: 'A+', amount: 6, date: '2023-10-09' },
    { id: 10, bloodType: 'O-', amount: 4, date: '2023-10-10' },
    { id: 11, bloodType: 'B+', amount: 13, date: '2023-10-11' },
    { id: 12, bloodType: 'AB-', amount: 14, date: '2023-10-12' },
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