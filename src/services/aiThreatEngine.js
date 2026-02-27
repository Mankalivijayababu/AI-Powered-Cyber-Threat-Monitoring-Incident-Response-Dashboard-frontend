// 🔥 SIMPLE ML-LIKE RULE ENGINE (Phase 1 AI)

function classifyThreat(log) {
  const { event, ip, user, metadata } = log;

  let type = "Suspicious Activity";
  let severity = "low";
  let recommendation = "Monitor activity";

  // 🚨 Brute force detection
  if (event?.includes("login_failed")) {
    type = "Brute Force Attack";
    severity = "high";
    recommendation = "Block IP + enforce MFA";
  }

  // 🚨 DDoS pattern
  if (metadata?.requestsPerMinute > 5000) {
    type = "DDoS Attack";
    severity = "critical";
    recommendation = "Rate limit + activate WAF";
  }

  // 🚨 Malware pattern
  if (event?.includes("malware_detected")) {
    type = "Malware Infection";
    severity = "high";
    recommendation = "Isolate system + run antivirus scan";
  }

  // 🚨 Data exfiltration
  if (metadata?.dataTransferMB > 1000) {
    type = "Data Exfiltration";
    severity = "critical";
    recommendation = "Block network + audit logs";
  }

  return {
    type,
    severity,
    recommendation
  };
}

module.exports = { classifyThreat };