import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 12px",
  borderRadius: 6,
  marginBottom: 6,
  background: isActive ? "#1f2937" : "transparent",
  color: isActive ? "#ffffff" : "#9ca3af"
});

export default function Sidebar() {
  return (
    <aside style={{
      width: 220,
      background: "#0f172a",
      padding: 16
    }}>
      <h3 style={{ marginBottom: 20 }}>🛡 SOC</h3>

      <NavLink to="/dashboard" style={linkStyle}>
        Dashboard
      </NavLink>

      <NavLink to="/alerts" style={linkStyle}>
        Alerts
      </NavLink>

      <NavLink to="/logs" style={linkStyle}>
        Logs
      </NavLink>
    </aside>
  );
}
