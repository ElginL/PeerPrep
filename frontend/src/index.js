import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.module.css";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";
import { isLoggedIn } from "./api/users";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    isLoggedIn().then(res => setAuthenticated(res))
  }, []);

  return (
    <React.StrictMode>
    {
      authenticated
        ? <AuthenticatedRoutes />
        : <UnauthenticatedRoutes />
    }
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
