import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={styles.avatar}
        title={user?.email}
      >
        {user?.email?.charAt(0).toUpperCase()}
      </div>

      {open && (
        <div style={styles.dropdown}>
          <p style={styles.email}>{user?.email}</p>
          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#7c3aed",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: 600,
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: 48,
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: 12,
    width: 220,
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },
  email: {
    fontSize: 13,
    color: "#cbd5f5",
    marginBottom: 10,
    wordBreak: "break-all",
  },
  logout: {
    width: "100%",
    padding: 8,
    background: "#ef4444",
    border: "none",
    borderRadius: 6,
    color: "white",
    cursor: "pointer",
  },
};
