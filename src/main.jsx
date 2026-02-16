import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.interceptors.request.use((config) => {
  let token = null;

  try {
    token = localStorage.getItem("pteahbay_token");
  } catch {
    token = window.__PTEAHBAY_TOKEN__ || null;
  }

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
