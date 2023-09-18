import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.module.css";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
const token = JSON.parse(localStorage.getItem('credentials'));

root.render(
  <React.StrictMode>
    <RecoilRoot>
      {
        token
          ? <AuthenticatedRoutes />
          : <UnauthenticatedRoutes />
      }
    </RecoilRoot>
  </React.StrictMode>
);
