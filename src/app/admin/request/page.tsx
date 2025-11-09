import { lazy, Suspense } from 'react';
const Request = () => {
// Sample data for pending requests
const pendingRequests = [
  { id: 1, hospital: 'City Hospital', bloodType: 'B-', quantity: 5, status: 'Pending' },
  { id: 2, hospital: 'General Clinic', bloodType: 'AB+', quantity: 2, status: 'Pending' },
];

  return (
    <Suspense fallback={<div>Loading Requests...</div>}>
      <div>
        <h1>Pending Requests</h1>
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
            {pendingRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.hospital}</td>
                <td>{req.bloodType}</td>
                <td>{req.quantity}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};
export default Request;