export default function LogsTable({ logs }) {
  return (
    <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ color: "#9ca3af", borderBottom: "1px solid #1f2937" }}>
          <th align="left">Time</th>
          <th align="left">IP</th>
          <th align="left">Event</th>
          <th align="left">User</th>
          <th align="left">Severity</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log._id} style={{ borderBottom: "1px solid #1f2937" }}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.ip}</td>
            <td>{log.event}</td>
            <td>{log.user || "-"}</td>
            <td>{log.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
