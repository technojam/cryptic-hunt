import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import "./index.css";
import Admin from "./Admin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
