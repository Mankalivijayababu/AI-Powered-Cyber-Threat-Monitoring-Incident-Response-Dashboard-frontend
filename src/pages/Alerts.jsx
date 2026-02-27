import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";
import { fetchAlerts, fetchAlertStats } from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAlerts().then(res => setAlerts(res.data));
    fetchAlertStats().then(res => setStats(res.data));
  }, []);

  return (
    <>
      <TopNavbar />

      <main style={styles.page}>
        <h2 style={styles.title}>🚨 Threat Alerts</h2>

        {/* SUMMARY */}
        {stats && (
          <section style={styles.kpis}>
            <Kpi title="Total Alerts" value={stats.totalAlerts} />
            <Kpi title="High Risk" value={stats.high} />
            <Kpi title="Medium Risk" value={stats.medium} />
            <Kpi title="Low Risk" value={stats.low} />
          </section>
        )}

        {/* ALERT TABLE */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>IP</th>
                <th>Severity</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a._id}>
                  <td>{a.type}</td>
                  <td>{a.ip}</td>
                  <td style={{ color: getColor(a.severity) }}>
                    {a.severity}
                  </td>
                  <td>{a.message}</td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

function Kpi({ title, value }) {
  return (
    <div style={styles.kpiCard}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

function getColor(sev) {
  if (sev === "high") return "#ef4444";
  if (sev === "medium") return "#facc15";
  return "#22c55e";
}

const styles = {
  page: {
    padding: 24,
    paddingTop: 90,
    background: "#020617",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    marginBottom: 20,
    borderLeft: "4px solid #ef4444",
    paddingLeft: 12,
  },
  kpis: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 20,
    marginBottom: 30
  },
  kpiCard: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: 20,
    borderRadius: 10
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  }
};
