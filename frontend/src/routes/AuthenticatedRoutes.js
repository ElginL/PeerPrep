import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import QuestionPage from "../pages/QuestionPage";
import EditProfile from "../pages/EditProfile";
import RoomCreator from "../pages/RoomCreator";
import TimeManager from "../components/TimeManager";
import Room from "../pages/Room";
import RoomJoiner from "../pages/RoomJoiner";

const AuthenticatedRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questions/:id" element={<QuestionPage />} />
                <Route path="/profile" element={<EditProfile />} />
                <Route path="/createRoom" element={<RoomCreator />} />
                <Route path="/joinRoom" element={<RoomJoiner /> } />
                <Route path="/editor/:roomId" element={<Room />} />
            </Routes>
            <TimeManager />
        </Router>
    );
};

export default AuthenticatedRoutes;
