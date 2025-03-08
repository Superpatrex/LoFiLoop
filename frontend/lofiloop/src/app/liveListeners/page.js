'use client'

import { useEffect, useState } from "react";

const WEBSOCKET_URL = "ws://localhost:3001";

export default function Home() {
  const [listenerCount, setListenerCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
  
    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join" })); // Notify backend when user joins
    };
  
    ws.onmessage = (event) => {
      console.log("📩 WebSocket Message Received:", event.data); // Debugging
      try {
        const data = JSON.parse(event.data);
        setListenerCount((prevCount) => data.listenerCount); // Ensures React updates state properly
      } catch (error) {
        console.error("⚠️ Error parsing WebSocket message:", error);
      }
    };
  
    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
      ws.send(JSON.stringify({ type: "leave" })); // Notify backend when user leaves
    };
  
    return () => {
      ws.send(JSON.stringify({ type: "leave" })); // Also decrement on component unmount
      ws.close();
    };
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
        <h2>Live Listeners</h2>
        <p>{isConnected ? listenerCount : "Loading..."}</p>
      </div>
    </>
  );
}