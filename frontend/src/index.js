import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.module.css";
import App from "./app";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
