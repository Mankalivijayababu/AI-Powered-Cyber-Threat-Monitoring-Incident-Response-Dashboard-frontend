import { useState } from "react";
import axios from "axios";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
const upload = async () => {
  if (!file) {
    setMsg("❌ Please select a CSV file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

 try {
  await axios.post(
    "http://localhost:5000/api/upload/csv",
    formData,
    { timeout: 60000 }
  );

  setMsg("✅ File uploaded. Processing logs in background…");

} catch (err) {
  setMsg("⚠️ Upload request sent. Processing may still be running.");
}

};
  return (
    <div style={{ background: "#0f172a", padding: 16 }}>
      <h3>📁 Upload CSV Logs</h3>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          console.log("Selected file:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <br /><br />

      <button type="button" onClick={upload}>
        Upload CSV
      </button>

      <p>{msg}</p>
    </div>
  );
}
