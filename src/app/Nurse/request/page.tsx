'use client';
import React, { useState } from 'react';
import './request.css';
import Orb from './Orb';
import Beams from '../../beams'; 

const RequestPage: React.FC = () => {
  const [requestType, setRequestType] = useState<'emergency' | 'surgery'>('emergency');
  const [bloodType, setBloodType] = useState('');
  const [amount, setAmount] = useState('');
  const [nurseId, setNurseId] = useState('');
  const [loading, setLoading] = useState(false); // No loading needed now

  // Constant data for blood types (commented out API fetch for now)
  // const fetchBloodData = async () => {
  //   try {
  //     const response = await fetch('/api/blood-data'); // Replace with your API endpoint
  //     if (!response.ok) throw new Error('Failed to fetch');
  //     const data = await response.json();
  //     setBloodData(data);
  //   } catch (error) {
  //     console.error('Error fetching blood data:', error);
  //     // Fallback to mock data if API fails
  //     setBloodData([
  //       { type: 'A+', available: 45 },
  //       { type: 'A-', available: 30 },
  //       { type: 'B+', available: 50 },
  //       { type: 'B-', available: 25 },
  //       { type: 'AB+', available: 20 },
  //       { type: 'AB-', available: 15 },
  //       { type: 'O+', available: 60 },
  //       { type: 'O-', available: 35 },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchBloodData();
  // }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ requestType, bloodType, amount, nurseId });
    alert('Blood request submitted!');
  };

  if (loading) return <p>Loading blood data...</p>;

  return (
    <div className="request-page">
    <h1>Request Blood</h1>
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
        <label>
          Blood Type:
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
            <option value="">Select</option>
            {bloodData.map((data) => (
              <option key={data.type} value={data.type}>{data.type}</option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Nurse ID:
          <input
            type="text"
            value={nurseId}
            onChange={(e) => setNurseId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestPage;