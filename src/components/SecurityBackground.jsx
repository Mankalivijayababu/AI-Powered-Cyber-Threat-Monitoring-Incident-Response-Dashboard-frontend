import { useEffect, useState } from "react";
import "./securityBackground.css";

export default function SecurityBackground() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 300); // slight delay → smoother load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="security-bg">
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="security-video"
        >
          <source src="/videos/security.mp4" type="video/mp4" />
        </video>
      )}

      <div className="security-overlay" />
      <div className="security-grid" />
    </div>
  );
}
