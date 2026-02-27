import { useEffect, useState } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminUsers() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const token = await currentUser.getIdToken();

      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data);
      setIsAdmin(true);
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (uid, role) => {
    const token = await currentUser.getIdToken();

    await axios.put(
      `http://localhost:5000/api/admin/role/${uid}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    checkAdmin();
  };

  const deleteUser = async (uid) => {
    const token = await currentUser.getIdToken();

    await axios.delete(
      `http://localhost:5000/api/admin/${uid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    checkAdmin();
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  if (!isAdmin) return <Navigate to="/dashboard" />;

  return (
    <>
      <TopNavbar />
      <div style={{ padding: 40, color: "white" }}>
        <h2>👨‍💻 User Role Management</h2>

        <table style={{ width: "100%", marginTop: 20 }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => updateRole(user.uid, "admin")}>
                    Make Admin
                  </button>

                  <button onClick={() => updateRole(user.uid, "analyst")}>
                    Make Analyst
                  </button>

                  <button onClick={() => deleteUser(user.uid)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}