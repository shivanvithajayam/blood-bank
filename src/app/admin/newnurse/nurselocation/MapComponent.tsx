"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Initialize leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default
});

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

(L as any).Marker.prototype.options.icon = markerIcon;

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

const MoveMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
};

const MapInitializer: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [map, lat, lng, zoom]);
  return null;
};

interface MapComponentProps {
  selected: BloodBank | null;
}

export default function MapComponent({ selected }: MapComponentProps) {
  return (
    <MapContainer style={{ height: "500px", width: "100%", borderRadius: "8px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapInitializer lat={12.9716} lng={77.5946} zoom={11} />

      {/* Markers for all blood banks */}
      {BLOOD_BANKS.map((bank) => (
        <Marker key={bank.id} position={[bank.lat, bank.lng] as [number, number]}>
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
  );
}
