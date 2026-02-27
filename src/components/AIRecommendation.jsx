export default function AIRecommendation({ alert }) {
  if (!alert) return null;

  return (
    <div style={{
      background: "#0f172a",
      padding: 16,
      borderRadius: 12,
      marginTop: 10
    }}>
      <h4>🤖 AI Recommendation</h4>

      <p><strong>Attack:</strong> {alert.type}</p>
      <p><strong>Severity:</strong> {alert.severity}</p>
      <p><strong>Suggested Action:</strong> {alert.message}</p>
    </div>
  );
}