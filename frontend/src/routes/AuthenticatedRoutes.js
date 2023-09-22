import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import QuestionPage from "../pages/QuestionPage";
import EditProfile from "../pages/EditProfile";
import TempRoomJoiner from "../pages/TempRoomJoiner";
import TimeManager from "../components/TimeManager";
import Room from "../pages/Room";

const AuthenticatedRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions/:id" element={<QuestionPage />} />
                <Route path="/profile" element={<EditProfile />} />
                <Route path="/testroom" element={<TempRoomJoiner />} />
                <Route path="/editor/:roomId" element={<Room />} />
            </Routes>
            <TimeManager />
        </Router>
    );
};

export default AuthenticatedRoutes;
