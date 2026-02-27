import { useEffect, useState } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import { useAuth } from "../context/AuthContext";

export default function IncidentManager() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alerts");
      setIncidents(res.data);
    } catch (err) {
      console.error("Failed to load incidents:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      if (!currentUser) {
        alert("Login required");
        return;
      }

      const token = await currentUser.getIdToken();

      await axios.put(
        `http://localhost:5000/api/incidents/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadIncidents();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (loading) {
    return (
      <>
        <TopNavbar />
        <div style={{ padding: 40, color: "white" }}>
          Loading incidents...
        </div>
      </>
    );
  }

  return (
    <>
      <TopNavbar />

      <div style={{ padding: 40, color: "white" }}>
        <h2>🧠 Incident Response Center</h2>

        {incidents.length === 0 ? (
          <p>No incidents detected.</p>
        ) : (
          incidents.map((inc) => (
            <div
              key={inc._id}
              style={{
                background: "#020617",
                padding: 20,
                marginBottom: 20,
                borderRadius: 12,
                border: "1px solid #1e293b"
              }}
            >
              <h3>{inc.type}</h3>
              <p>{inc.message}</p>

              <p><strong>Severity:</strong> {inc.severity}</p>
              <p><strong>Status:</strong> {inc.status}</p>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => updateStatus(inc._id, "investigating")}
                  style={btn}
                >
                  Investigate
                </button>

                <button
                  onClick={() => updateStatus(inc._id, "contained")}
                  style={btn}
                >
                  Contain
                </button>

                <button
                  onClick={() => updateStatus(inc._id, "resolved")}
                  style={btnResolve}
                >
                  Resolve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const btn = {
  padding: "8px 14px",
  background: "#334155",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const btnResolve = {
  ...btn,
  background: "#22c55e"
};