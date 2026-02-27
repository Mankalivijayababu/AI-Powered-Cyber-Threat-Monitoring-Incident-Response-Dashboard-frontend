import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SeverityBarChart({ data }) {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>🚨 Alerts by Severity</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

          <XAxis
            dataKey="severity"
            stroke="#e5e7eb"
          />

          <YAxis
            stroke="#e5e7eb"
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #334155",
              color: "white",
            }}
            cursor={{ fill: "rgba(124,58,237,0.1)" }}
          />

          <Legend wrapperStyle={{ color: "#e5e7eb" }} />

          <Bar
            dataKey="count"
            fill="#7c3aed"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 14,
    padding: 20,
    marginTop: 30,
  },
  title: {
    color: "white",
    marginBottom: 12,
  },
};
