import React, { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus("Backend not reachable"));
  }, []);

  return <div>Backend status: {status}</div>;
} 