import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyAnBItQM1iKwWzYcyOom02Wa8tlu4qQz5g",
  authDomain: "cyber-threat-dashboard.firebaseapp.com",
  projectId: "cyber-threat-dashboard",
  storageBucket: "cyber-threat-dashboard.firebasestorage.app",
  messagingSenderId: "338670655127",
  appId: "1:338670655127:web:ad61eaa99550fc60ee3bd2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
