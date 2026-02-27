import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Alerts from "./pages/Alerts";
import ProtectedRoute from "./routes/ProtectedRoute";
import LiveAttackMap from "./pages/LiveAttackMap";
import AdminUsers from "./pages/AdminUsers";
import IncidentManager from "./pages/IncidentManager";   
import ProtectedRoute from "./components/ProtectedRoute";





export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/live-map" element={<LiveAttackMap />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/incidents" element={<IncidentManager />} />
   
      

      <Route
        path="/logs"
        element={
          <ProtectedRoute>
            <Logs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />

      {/* Default / fallback */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}
