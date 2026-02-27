import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function LiveAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new-alert", (alert) => {
      setAlerts((prev) => [alert, ...prev.slice(0, 4)]);
    });

    return () => socket.off("new-alert");
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🚨 Live Alerts</h3>

      {alerts.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No live alerts yet</p>
      ) : (
        alerts.map((a, i) => (
          <div key={i} style={styles.alert}>
            <div>
              <b>{a.type}</b>
              <p style={{ fontSize: 12 }}>{a.message}</p>
            </div>
            <span style={styles.severity(a.severity)}>
              {a.severity}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 20,
    marginTop: 40,
  },
  title: {
    marginBottom: 12,
    color: "#e5e7eb",
  },
  alert: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #1e293b",
  },
  severity: (level) => ({
    color:
      level === "high"
        ? "#ef4444"
        : level === "medium"
        ? "#f59e0b"
        : "#22c55e",
    fontWeight: "bold",
  }),
};
