import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "./LiveAttackMap.css";
import "leaflet/dist/leaflet.css";

export default function LiveAttackMap() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");

      // ✅ Only alerts that already have geo stored in DB
      const valid = res.data.filter(
        (a) =>
          a.latitude !== undefined &&
          a.longitude !== undefined &&
          a.latitude !== null &&
          a.longitude !== null
      );

      setAttacks(valid);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const createPulseIcon = (severity) =>
    L.divIcon({
      className: "",
      html: `<div class="pulse-marker ${severity}"></div>`,
      iconSize: [20, 20],
    });

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {attacks.map((attack, index) => (
        <Marker
          key={index}
          position={[Number(attack.latitude), Number(attack.longitude)]}
          icon={createPulseIcon(attack.severity)}
        >
          <Popup>
            🚨 <strong>{attack.type}</strong>
            <br />
            IP: {attack.ip}
            <br />
            Country: {attack.country}
            <br />
            Severity: {attack.severity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}