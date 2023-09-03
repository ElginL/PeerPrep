import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import QuestionPage from '../pages/QuestionPage';

const UnauthenticatedRoutes = () => {
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
            </Routes>

        </Router>
    );
};

export default UnauthenticatedRoutes;