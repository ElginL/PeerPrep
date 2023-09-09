import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import QuestionPage from "../pages/QuestionPage";
import LogInPage from "../pages/LogIn";
import SignUpPage from "../pages/SignUp";

const UnauthenticatedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default UnauthenticatedRoutes;
