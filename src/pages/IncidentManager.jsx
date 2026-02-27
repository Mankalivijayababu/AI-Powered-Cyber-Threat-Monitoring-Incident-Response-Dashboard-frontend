import { useEffect, useState } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import { useAuth } from "../context/AuthContext";

const API = "https://ai-powered-cyber-threat-monitoring.onrender.com";

export default function IncidentManager() {

  const { currentUser } = useAuth();

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {

      const res = await axios.get(`${API}/api/alerts`);

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
        `${API}/api/incidents/status/${id}`,
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
        <div style={styles.loading}>
          Loading incidents...
        </div>
      </>
    );

  }


  return (
    <>
      <TopNavbar />

      <div style={styles.page}>

        <h2 style={styles.title}>
          🧠 Incident Response Center
        </h2>

        <p style={styles.subtitle}>
          Manage detected security incidents and response actions
        </p>

        {incidents.length === 0 ? (
          <p style={styles.noData}>No incidents detected.</p>
        ) : (
          incidents.map((inc) => (

            <div key={inc._id} style={styles.card}>

              <div style={styles.cardHeader}>
                <h3 style={styles.incidentType}>{inc.type}</h3>
                <span style={severityBadge(inc.severity)}>
                  {inc.severity}
                </span>
              </div>

              <p style={styles.message}>{inc.message}</p>

              <div style={styles.meta}>
                <span>Status: <b>{inc.status}</b></span>
              </div>

              <div style={styles.buttons}>

                <button
                  onClick={() => updateStatus(inc._id, "investigating")}
                  style={styles.btn}
                >
                  Investigate
                </button>

                <button
                  onClick={() => updateStatus(inc._id, "contained")}
                  style={styles.btn}
                >
                  Contain
                </button>

                <button
                  onClick={() => updateStatus(inc._id, "resolved")}
                  style={styles.resolveBtn}
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



const styles = {

  page: {
    padding: 40,
    background: "#020617",
    minHeight: "100vh",
    color: "#e2e8f0"
  },

  loading: {
    padding: 40,
    color: "#cbd5f5"
  },

  title: {
    fontSize: 26,
    marginBottom: 6
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: 30
  },

  noData: {
    color: "#94a3b8"
  },

  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  incidentType: {
    margin: 0
  },

  message: {
    marginTop: 10,
    color: "#cbd5f5"
  },

  meta: {
    marginTop: 10,
    color: "#94a3b8"
  },

  buttons: {
    marginTop: 15,
    display: "flex",
    gap: 10
  },

  btn: {
    padding: "8px 14px",
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },

  resolveBtn: {
    padding: "8px 14px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }

};


const severityBadge = (severity) => {

  const colors = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444"
  };

  return {
    background: colors[severity?.toLowerCase()] || "#334155",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    color: "white"
  };

};