import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

const socket = io("https://ai-powered-cyber-threat-monitoring.onrender.com");

export default function AttackMap() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    loadInitialData();

    socket.on("new-alert", (alert) => {
      if (alert.location) {
        setAttacks(prev => [
          {
            ip: alert.ip,
            severity: alert.severity,
            lat: alert.location.lat,
            lon: alert.location.lon,
            country: alert.location.country
          },
          ...prev
        ]);
      }
    });

    return () => socket.off("new-alert");
  }, []);

  const loadInitialData = async () => {
    const res = await axios.get("http://localhost:5000/api/analytics/attack-locations");
    setAttacks(res.data);
  };

  const getColor = (severity) => {
    if (severity === "high") return "red";
    if (severity === "medium") return "orange";
    return "yellow";
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[20, 78]} zoom={3} style={{ height: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {attacks.map((a, idx) => (
          <CircleMarker
            key={idx}
            center={[a.lat, a.lon]}
            radius={8}
            pathOptions={{ color: getColor(a.severity) }}
          >
            <Popup>
              <b>IP:</b> {a.ip} <br />
              <b>Country:</b> {a.country} <br />
              <b>Severity:</b> {a.severity}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
