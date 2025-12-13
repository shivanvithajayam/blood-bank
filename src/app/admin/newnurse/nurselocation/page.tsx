"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import "../newnurseadmin.css";

// Dynamically import map component with ssr disabled to prevent server-side evaluation of Leaflet
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

// Blood bank entry
interface BloodBank {
  id: number;
  name: string;
  area: string;
  city: string;
  state: string;
  fullAddress: string;
  lat: number;
  lng: number;
}

// Bengaluru-only blood banks
const BLOOD_BANKS: BloodBank[] = [
  {
    id: 1,
    name: "Fortis Hospital Blood Bank",
    area: "Bannerghatta Road",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "Fortis Hospital, Bannerghatta Road, Bengaluru",
    lat: 12.9091,
    lng: 77.5950
  },
  {
    id: 2,
    name: "Manipal Hospital Blood Bank",
    area: "Old Airport Road",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "Manipal Hospital, Old Airport Road, Bengaluru",
    lat: 12.9550,
    lng: 77.6487
  },
  {
    id: 3,
    name: "NIMHANS Blood Bank",
    area: "Wilson Garden",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "NIMHANS Campus, Wilson Garden, Bengaluru",
    lat: 12.9431,
    lng: 77.5963
  },
  {
    id: 4,
    name: "Bowring & Lady Curzon Hospital Blood Bank",
    area: "Shivaji Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "Bowring Hospital, Shivaji Nagar, Bengaluru",
    lat: 12.9835,
    lng: 77.6050
  },
  {
    id: 5,
    name: "Ramaiah Hospital Blood Bank",
    area: "MSR Nagar / New BEL Road",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "MS Ramaiah Hospital, MSR Nagar, Bengaluru",
    lat: 13.0307,
    lng: 77.5667
  }
];

const AdminBloodBankLocationsPage: React.FC = () => {
  const [selected, setSelected] = useState<BloodBank | null>(null);

  return (
    <div className="admin-page">
      <h2>Hospital Blood Banks – Bengaluru Map Locations</h2>

      <p className="admin-msg admin-info">
        Click any blood bank to highlight its exact location on the map.
      </p>

      {/* TABLE */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Blood Bank Name</th>
              <th>Area</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {BLOOD_BANKS.map((bank) => (
              <tr
                key={bank.id}
                className="admin-row"
                onClick={() => setSelected(bank)}
              >
                <td>{bank.name}</td>
                <td>{bank.area}</td>
                <td>{bank.city}</td>
                <td>{bank.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LEAFLET MAP */}
      <div className="admin-map-container">
        <MapComponent selected={selected} />
      </div>
    </div>
  );
};

export default AdminBloodBankLocationsPage;