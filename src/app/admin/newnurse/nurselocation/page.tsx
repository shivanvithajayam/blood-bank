"use client";

import React, { useState } from "react";
import "../newnurseadmin.css";

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
        <MapContainer
          center={[12.9716, 77.5946]} // Center on Bengaluru
          zoom={11}
          style={{ height: "500px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
                <br />
                Area: {bank.area}
              </Popup>
            </Marker>
          ))}

          {/* Move map to selected blood bank */}
          {selected && <MoveMap lat={selected.lat} lng={selected.lng} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdminBloodBankLocationsPage;