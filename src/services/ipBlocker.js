const BlockedIP = require("../models/BlockedIP");

async function blockIP(ip, reason) {
  const exists = await BlockedIP.findOne({ ip });
  if (exists) return;

  await BlockedIP.create({
    ip,
    reason
  });

  console.log(`🚫 IP Blocked: ${ip}`);
}

module.exports = { blockIP };