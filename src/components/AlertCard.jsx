export default function AlertCard({ alert }) {
  const color =
    alert.severity === "high" ? "#ef4444" :
    alert.severity === "medium" ? "#f59e0b" :
    "#22c55e";

  return (
    <div style={{
      background: "#0f172a",
      borderLeft: `4px solid ${color}`,
      padding: 14,
      borderRadius: 8,
      marginBottom: 10
    }}>
      <strong>{alert.type}</strong>
      <div style={{ color: "#9ca3af", fontSize: 13 }}>
        IP: {alert.ip} <br />
        Attempts: {alert.count} <br />
        Time: {new Date(alert.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
