export default function KpiCard({ title, value }) {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{title}</p>
      <h2 style={styles.value}>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(2,6,23,0.9)",
    border: "1px solid #1e293b",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
  },
  title: {
    fontSize: 13,
    color: "#94a3b8",
    marginBottom: 6,
  },
  value: {
    fontSize: 28,
    fontWeight: 600,
    color: "white",
  },
};
