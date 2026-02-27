import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * Temporary realtime-style chart
 * (static demo data – we'll make it truly realtime next)
 */
export default function RealtimeLogChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Demo data (simulates incoming logs)
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          value: Math.floor(Math.random() * 10) + 1,
        },
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: 16 }}>📈 Realtime Logs</h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #334155",
              color: "#e5e7eb",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const cardStyle = {
  background: "rgba(2,6,23,0.85)",
  backdropFilter: "blur(14px)",
  borderRadius: 14,
  padding: 24,
  border: "1px solid #1e293b",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  color: "#e5e7eb",
};
