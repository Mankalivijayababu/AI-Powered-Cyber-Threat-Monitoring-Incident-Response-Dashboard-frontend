import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  <button
  onClick={async () => {
    await logout();
    navigate("/login");
  }}
>
  Logout
</button>

  
  

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 12,
          background: "#020617",
          color: "white"
        }}
      >
        <nav>
          <Link to="/dashboard">Dashboard</Link>{" | "}
          <Link to="/alerts">Alerts</Link>{" | "}
          <Link to="/logs">Logs</Link>
        </nav>

        <div>
          {user?.username}{" "}
         <button
  onClick={() => {
    logout();
    navigate("/login");
  }}
>
  🚪 Logout
</button>

        </div>
      </header>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
