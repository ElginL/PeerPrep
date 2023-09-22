import styles from '../styles/components/Navbar.module.css';
import Logo from '../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const signOutHandler = () => {
        localStorage.removeItem('credentials');
        navigate("/")
        window.location.reload();
    }

    return (
        <div className={styles["container"]}>
            <Link to="/" className={styles["logo-container"]}>
                <img className={styles["logo"]} src={Logo} alt="Logo" />
                <h1 className={styles["header"]}>PeerPrep</h1>
            </Link>
            <nav>
                <ul className={styles["nav-links"]}>
                    <li>
                        <button>
                            Find Match
                        </button>
                    </li>
                    <li>
                        <button onClick={signOutHandler}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;