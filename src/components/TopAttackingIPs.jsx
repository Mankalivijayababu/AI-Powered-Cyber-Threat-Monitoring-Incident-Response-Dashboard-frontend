import { useEffect, useState } from "react";
import { fetchAttackIPs } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TopAttackingIPs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAttackIPs().then(res => {
      const formatted = res.data.map(d => ({
        ip: d._id,
        attacks: d.attacks
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🌐 Top Attacking IPs</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="ip" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="attacks" fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: 20,
    borderRadius: 12
  },
  title: {
    marginBottom: 10,
    color: "#e2e8f0"
  }
};
