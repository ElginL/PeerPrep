import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.module.css";
import App from "./app";
import * as process from "process";
import { RecoilRoot } from "recoil";
window.global = window;
window.process = process;
window.Buffer = window.Buffer || [];
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
