import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// ======================================
// AXIOS INSTANCE
// ======================================
const api = axios.create({
  baseURL: "https://ai-powered-cyber-threat-monitoring.onrender.com/api",
  withCredentials: true,
});

// ======================================
// REQUEST INTERCEPTOR (Attach Firebase Token)
// ======================================
api.interceptors.request.use(async (config) => {
  let user = auth.currentUser;

  // Wait for Firebase auth initialization
  if (!user) {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        user = u;
        unsubscribe();
        resolve();
      });
    });
  }

  // Attach token
  if (user) {
    const token = await user.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================================
// RESPONSE INTERCEPTOR
// ======================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 – request blocked (token race or expired)");
    }
    return Promise.reject(error);
  }
);

// ======================================
// DASHBOARD
// ======================================
export const fetchDashboardStats = () =>
  api.get("/dashboard/stats");

export const fetchDashboardCharts = () =>
  api.get("/dashboard/charts");

export const fetchSeveritySummary = () =>
  api.get("/dashboard/severity-summary");

// ======================================
// LOGS
// ======================================
export const fetchLogs = (params) =>
  api.get("/logs", { params });

// ======================================
// ALERTS
// ======================================
export const fetchAlerts = () =>
  api.get("/alerts");

export const resolveAlert = (id) =>
  api.put(`/alerts/${id}/resolve`);

export const fetchAlertStats = () =>
  api.get("/alerts/stats");

// ======================================
// ANALYTICS
// ======================================
export const fetchAttackTimeline = () =>
  api.get("/analytics/timeline");

export const fetchAttackIPs = () =>
  api.get("/analytics/ips");

// ======================================
// UPLOAD LOGS
// ======================================
export const uploadLogs = (formData) =>
  api.post("/upload/csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default api;