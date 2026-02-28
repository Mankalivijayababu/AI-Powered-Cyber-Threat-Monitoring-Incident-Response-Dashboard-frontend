import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function TopNavbar() {
  return (
    <header style={styles.navbar}>
      
      {/* LEFT SIDE */}
      <div style={styles.left}>

        <span style={styles.logo}>
          🛡 Cyber Threat Dashboard
        </span>

        <nav style={styles.navLinks}>

          <NavLink to="/dashboard" style={navStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/logs" style={navStyle}>
            Logs
          </NavLink>

          <NavLink to="/alerts" style={navStyle}>
            Alerts
          </NavLink>

          <NavLink to="/live-map" style={navStyle}>
            Live Map
          </NavLink>

          <NavLink to="/incidents" style={navStyle}>
            Incidents
          </NavLink>

          <NavLink to="/admin/users" style={navStyle}>
            Users
          </NavLink>

        </nav>

      </div>

      {/* RIGHT SIDE PROFILE */}
      <ProfileMenu />

    </header>
  );
}


const navStyle = ({ isActive }) => ({
  color: isActive ? "#7c3aed" : "#cbd5f5",
  textDecoration: "none",
  marginRight: 20,
  fontWeight: 500,
  fontSize: 14
});


const styles = {

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: "rgba(2,6,23,0.9)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #1e293b",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    fontWeight: 600,
    marginRight: 32,
    color: "white",
    fontSize: 16
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
  }

};