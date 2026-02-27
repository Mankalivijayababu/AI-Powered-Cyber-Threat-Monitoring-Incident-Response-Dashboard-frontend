import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function AlertPieChart({ data }) {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>📊 Alert Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="severity"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={4}
            label={({ severity, percent }) =>
              `${severity} ${(percent * 100).toFixed(0)}%`
            }
            labelStyle={{ fill: "white" }}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #334155",
              color: "white",
            }}
          />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ color: "#e5e7eb" }}
          />
        </PieChart>
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
