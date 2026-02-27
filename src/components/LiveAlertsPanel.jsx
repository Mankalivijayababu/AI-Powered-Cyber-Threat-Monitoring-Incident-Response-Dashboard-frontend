import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://ai-powered-cyber-threat-monitoring.onrender.com");

export default function LiveAlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new-alert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.off("new-alert");
  }, []);

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🚨 Live Alerts</h3>

      {alerts.length === 0 && (
        <p style={{ color: "#64748b" }}>No live alerts yet</p>
      )}

      {alerts.map((a, i) => (
        <div key={i} style={styles.alertCard}>
          <div style={styles.severity(a.severity)}>
            {a.severity?.toUpperCase()}
          </div>
          <p style={styles.message}>{a.message}</p>
          <span style={styles.ip}>{a.ip}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  panel: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 16,
    height: "100%",
  },

  title: {
    marginBottom: 16,
    color: "#e5e7eb",
  },

  alertCard: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  message: {
    color: "#cbd5f5",
    fontSize: 14,
    marginBottom: 4,
  },

  ip: {
    fontSize: 12,
    color: "#64748b",
  },

  severity: (level) => ({
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    color:
      level === "high"
        ? "#ef4444"
        : level === "medium"
        ? "#facc15"
        : "#22c55e",
  }),
};
