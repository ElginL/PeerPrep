import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.module.css";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
const token = localStorage.getItem('sessionToken');

root.render(
  <React.StrictMode>
    {
      token
        ? <AuthenticatedRoutes />
        : <UnauthenticatedRoutes />
    }
  </React.StrictMode>
);
