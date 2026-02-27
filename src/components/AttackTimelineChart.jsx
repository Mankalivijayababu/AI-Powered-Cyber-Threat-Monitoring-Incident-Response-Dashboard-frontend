import { useEffect, useState } from "react";
import { fetchAttackTimeline } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AttackTimelineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAttackTimeline().then(res => {
      const formatted = res.data.map(d => ({
        time: d._id,
        attacks: d.count
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>⚡ Attack Timeline</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="attacks"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
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
