// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatWidget />
  </React.StrictMode>
);
