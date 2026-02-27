import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";
import { fetchLogs } from "../services/api";
import api from "../services/api";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    ip: "",
    event: "",
    user: "",
    severity: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // 📥 LOAD LOGS
  const loadLogs = async () => {
    try {
      const res = await fetchLogs({
        ...filters,
        page,
        limit,
      });

      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page, limit, filters]);

  // 📤 CSV UPLOAD
  const handleUpload = async () => {
    if (!file) return setMessage("Select a CSV first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/upload/csv", formData);
      setMessage("Logs uploaded successfully");
      loadLogs();
    } catch {
      setMessage("Upload failed");
    }
  };

  return (
    <>
      <TopNavbar />

      <main style={styles.page}>
        <h2 style={styles.title}>📜 Logs Management</h2>

        {/* UPLOAD */}
        <div style={styles.card}>
          <h3>Upload CSV</h3>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
          <button style={styles.button} onClick={handleUpload}>Upload</button>
          <p>{message}</p>
        </div>

        {/* FILTERS */}
        <div style={styles.card}>
          <h3>Filters</h3>
          <div style={styles.filters}>
            <input placeholder="IP" onChange={(e) => setFilters({ ...filters, ip: e.target.value })} />
            <input placeholder="Event" onChange={(e) => setFilters({ ...filters, event: e.target.value })} />
            <input placeholder="User" onChange={(e) => setFilters({ ...filters, user: e.target.value })} />

            <select onChange={(e) => setFilters({ ...filters, severity: e.target.value })}>
              <option value="">Severity</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>

            <input type="date" onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
            <input type="date" onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>IP</th>
                <th>Event</th>
                <th>User</th>
                <th>Severity</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.ip}</td>
                  <td>{log.event}</td>
                  <td>{log.user}</td>
                  <td style={{ color: getSeverityColor(log.severity) }}>
                    {log.severity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div style={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span>Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>

            <select onChange={(e) => setLimit(e.target.value)}>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </main>
    </>
  );
}

const getSeverityColor = (sev) => {
  if (sev === "high") return "#ef4444";
  if (sev === "medium") return "#facc15";
  return "#22c55e";
};

const styles = {
  page: { padding: 24, background: "#020617", minHeight: "100vh", color: "white" },
  title: { marginBottom: 20 },
  card: { background: "#020617", border: "1px solid #1e293b", padding: 20, marginBottom: 20, borderRadius: 12 },
  table: { width: "100%", borderCollapse: "collapse" },
  filters: { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 },
  pagination: { marginTop: 20, display: "flex", gap: 10, alignItems: "center" },
  button: { background: "#7c3aed", color: "white", border: "none", padding: "6px 12px", borderRadius: 6 }
};
