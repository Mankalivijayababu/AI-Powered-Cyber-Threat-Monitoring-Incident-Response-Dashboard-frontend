export default function AlertRow({ a }) {
  const color =
    a.severity === "high" ? "var(--danger)" :
    a.severity === "medium" ? "var(--warning)" : "var(--primary)";

  return (
    <div style={{
      background: "var(--panel)",
      borderLeft: `4px solid ${color}`,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8
    }}>
      <strong>{a.type}</strong>
      <div style={{ color: "var(--muted)", fontSize: 12 }}>
        IP: {a.ip} • Count: {a.count} • {new Date(a.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
