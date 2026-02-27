import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TopNavbar from "../components/TopNavbar";
import KpiCard from "../components/KpiCard";
import SeverityBarChart from "../components/SeverityBarChart";
import AlertPieChart from "../components/AlertPieChart";
import AttackTimelineChart from "../components/AttackTimelineChart";
import LiveAlertsPanel from "../components/LiveAlertsPanel";
import TopAttackingIPs from "../components/TopAttackingIPs";

import { fetchDashboardStats } from "../services/api";

export default function Dashboard() {

const [stats, setStats] = useState(null);

useEffect(() => {
fetchDashboardStats()
.then((res) => setStats(res.data))
.catch((err) => console.error("Dashboard load error", err));
}, []);

if (!stats) {
return (
<> <TopNavbar /> <div style={styles.loading}>
Loading Threat Intelligence Dashboard... </div>
</>
);
}

const severityData = [
{ severity: "Low", count: stats.lowAlerts },
{ severity: "Medium", count: stats.mediumAlerts },
{ severity: "High", count: stats.highSeverityAlerts }
];

return (
<> <TopNavbar />

```
  <main style={styles.page}>

    {/* HEADER */}
    <section style={styles.headerSection}>
      <h1 style={styles.title}>
        Cyber Threat Intelligence Dashboard
      </h1>

      <p style={styles.subtitle}>
        Real-time monitoring & analysis of detected cyber threats
      </p>

      {/* NAVIGATION BUTTONS */}
      <div style={styles.navButtons}>
        <Link to="/logs" style={styles.navBtn}>Logs</Link>
        <Link to="/alerts" style={styles.navBtn}>Alerts</Link>
        <Link to="/live-map" style={styles.navBtn}>Live Attack Map</Link>
        <Link to="/incidents" style={styles.navBtn}>Incidents</Link>
        <Link to="/admin/users" style={styles.navBtn}>Users</Link>
      </div>
    </section>


    {/* KPI SECTION */}
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>
        System Overview
      </h3>

      <div style={styles.kpis}>
        <KpiCard title="Total Logs" value={stats.totalLogs} />
        <KpiCard title="Logs (24h)" value={stats.logs24h} />
        <KpiCard title="Active Alerts" value={stats.activeAlerts} />
        <KpiCard title="High Severity Alerts" value={stats.highSeverityAlerts} />
      </div>
    </section>


    {/* ATTACK TIMELINE */}
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>
        Attack Activity Timeline
      </h3>

      <AttackTimelineChart />
    </section>


    {/* TOP ATTACKERS */}
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>
        Top Attacking IPs
      </h3>

      <TopAttackingIPs />
    </section>


    {/* SEVERITY ANALYTICS */}
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>
        Threat Severity Analytics
      </h3>

      <div style={styles.charts}>
        <SeverityBarChart data={severityData} />
        <AlertPieChart data={severityData} />
      </div>
    </section>


    {/* LIVE ALERTS */}
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>
        Live Alerts Feed
      </h3>

      <LiveAlertsPanel />
    </section>

  </main>
</>

);
}

const NAVBAR_HEIGHT = 64;

const styles = {

page: {
padding: 32,
paddingTop: NAVBAR_HEIGHT + 32,
background: "#020617",
minHeight: "100vh",
},

loading: {
paddingTop: NAVBAR_HEIGHT + 80,
textAlign: "center",
color: "#94a3b8",
fontSize: 18,
},

headerSection: {
marginBottom: 50,
},

title: {
color: "#f8fafc",
fontSize: 28,
fontWeight: 600,
marginBottom: 8,
},

subtitle: {
color: "#94a3b8",
fontSize: 14,
},

navButtons: {
marginTop: 20,
display: "flex",
gap: 12,
flexWrap: "wrap",
},

navBtn: {
background: "#7c3aed",
color: "#fff",
padding: "10px 16px",
borderRadius: 6,
textDecoration: "none",
fontSize: 14,
fontWeight: 500,
},

section: {
marginBottom: 70,
},

sectionTitle: {
color: "#e5e7eb",
fontSize: 18,
marginBottom: 20,
borderLeft: "4px solid #7c3aed",
paddingLeft: 12,
},

kpis: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
gap: 20,
},

charts: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
gap: 40,
},
};
