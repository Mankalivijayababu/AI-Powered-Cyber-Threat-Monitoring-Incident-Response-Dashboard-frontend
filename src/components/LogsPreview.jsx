export default function LogsPreview({ logs }) {
  return (
    <table width="100%" cellPadding="8">
      <thead>
        <tr style={{ color: "var(--muted)" }}>
          <th align="left">Time</th>
          <th align="left">IP</th>
          <th align="left">Event</th>
          <th align="left">Severity</th>
        </tr>
      </thead>
      <tbody>
        {logs.slice(0, 10).map(l => (
          <tr key={l._id}>
            <td>{new Date(l.timestamp).toLocaleTimeString()}</td>
            <td>{l.ip}</td>
            <td>{l.event}</td>
            <td>{l.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
