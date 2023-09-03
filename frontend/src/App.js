import Home from "./pages/Home";
import './styles/global.module.css';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';

function App() {
  return (
    <AuthenticatedRoutes />
  );
}

export default App;
