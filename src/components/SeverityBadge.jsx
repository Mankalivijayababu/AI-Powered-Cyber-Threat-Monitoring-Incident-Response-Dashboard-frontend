export default function SeverityBadge({ level }) {
  const colors = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#22c55e"
  };

  return (
    <span
      style={{
        background: colors[level] || "#64748b",
        color: "white",
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600
      }}
    >
      {level?.toUpperCase()}
    </span>
  );
}
