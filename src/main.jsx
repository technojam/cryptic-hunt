import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import { Auth0Provider } from '@auth0/auth0-react';
import Dashboard from "./Dashboard.jsx";
import "./index.css";
import Admin from "./Admin.jsx";
console.log(window.location.origin);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="technojam.us.auth0.com"
  clientId="olcF4UXs7M7LY1G1LzcaShTGIbX83lF2"
  authorizationParams={{
    redirect_uri: window.location.origin+"/dashboard",
  }}
  >
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>\
  </Auth0Provider>
);
