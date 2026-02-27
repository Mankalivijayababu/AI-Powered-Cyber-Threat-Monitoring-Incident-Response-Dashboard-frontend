export default function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#020617",
        padding: 16,
        borderRadius: 10,
        borderLeft: `4px solid ${color}`,
        minWidth: 200
      }}
    >
      <p style={{ color: "#94a3b8", fontSize: 14 }}>{title}</p>
      <h2 style={{ color: "white", fontSize: 28 }}>{value}</h2>
    </div>
  );
}
