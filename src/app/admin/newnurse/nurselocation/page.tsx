"use client";

import React, { useState } from "react";
import "../../admin-nurse.css";

// LEAFLET
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons in Next.js
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-shadow.png"
});

// Blood bank entry
interface BloodBank {
  id: number;
  name: string;
  city: string;
  state: string;
  fullAddress: string;
  lat: number;
  lng: number;
}

const BLOOD_BANKS: BloodBank[] = [
  {
    id: 1,
    name: "AIIMS Blood Bank",
    city: "New Delhi",
    state: "Delhi",
    fullAddress: "AIIMS Blood Bank, New Delhi",
    lat: 28.5672,
    lng: 77.2100
  },
  {
    id: 2,
    name: "Apollo Hospital Blood Bank",
    city: "Chennai",
    state: "Tamil Nadu",
    fullAddress: "Apollo Hospitals Blood Bank, Chennai",
    lat: 13.0644,
    lng: 80.2435
  },
  {
    id: 3,
    name: "Fortis Hospital Blood Bank",
    city: "Bengaluru",
    state: "Karnataka",
    fullAddress: "Fortis Hospital Blood Bank, Bengaluru",
    lat: 12.9091,
    lng: 77.5950
  },
  {
    id: 4,
    name: "Tata Memorial Hospital Blood Bank",
    city: "Mumbai",
    state: "Maharashtra",
    fullAddress: "Tata Memorial Hospital Blood Bank, Mumbai",
    lat: 18.9986,
    lng: 72.8432
  },
  {
    id: 5,
    name: "NIMS Hospital Blood Bank",
    city: "Hyderabad",
    state: "Telangana",
    fullAddress: "NIMS Blood Bank, Hyderabad",
    lat: 17.4220,
    lng: 78.4480
  }
];

// Component to move map to selected location
const MoveMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  map.setView([lat, lng], 13);
  return null;
};

const AdminBloodBankLocationsPage: React.FC = () => {
  const [selected, setSelected] = useState<BloodBank | null>(null);

  return (
    <div className="admin-page">
      <h2>Hospital Blood Banks – Map Locations</h2>

      <p className="admin-msg admin-info">
        Click any blood bank to highlight its exact location on the map.
      </p>

      {/* TABLE */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Blood Bank Name</th>
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
                <td>{bank.city}</td>
                <td>{bank.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LEAFLET MAP */}
      <div className="admin-map-container">
        <MapContainer
          center={[20.5937, 78.9629]} // India center
          zoom={5}
          style={{ height: "500px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Markers for all blood banks */}
          {BLOOD_BANKS.map((bank) => (
            <Marker
              key={bank.id}
              position={[bank.lat, bank.lng]}
              icon={markerIcon}
            >
              <Popup>
                <strong>{bank.name}</strong>
                <br />
                {bank.fullAddress}
              </Popup>
            </Marker>
          ))}

          {/* Move map to selected blood bank */}
          {selected && (
            <MoveMap lat={selected.lat} lng={selected.lng} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdminBloodBankLocationsPage;
