import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import QuestionPage from '../pages/QuestionPage';
import EditProfile from '../pages/EditProfile';

const AuthenticatedRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/questions/:id"
                    element={<QuestionPage />}
                />
                <Route
                    path="/profile"
                    element ={<EditProfile />}
                />
            </Routes>

        </Router>
    );
};

export default AuthenticatedRoutes;