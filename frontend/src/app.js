import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes";
import { useRecoilValue } from "recoil";
import { isLoggedInSelector } from './recoil/UserSelector'

const App = () => {
    const isLoggedIn = useRecoilValue(isLoggedInSelector);

    return (
        <div>
            {
                isLoggedIn
                    ? <AuthenticatedRoutes />
                    : <UnauthenticatedRoutes />
            }
        </div>
    );
};

export default App;