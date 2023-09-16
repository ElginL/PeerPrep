import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import QuestionPage from "../pages/QuestionPage";
import EditProfile from "../pages/EditProfile";
import Room from "../pages/Room";

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/testroom" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default AuthenticatedRoutes;
