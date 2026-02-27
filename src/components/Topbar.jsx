export default function Topbar() {
  return (
    <header style={{
      height: 56, display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      borderBottom: "1px solid var(--border)",
      background: "var(--panel)"
    }}>
      <strong>Cyber Threat Monitoring</strong>
      <span style={{ color: "var(--muted)" }}>Analyst</span>
    </header>
  );
}
