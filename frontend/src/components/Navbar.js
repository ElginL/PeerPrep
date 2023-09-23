import styles from '../styles/components/Navbar.module.css';
import Logo from '../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../recoil/UserAtom';

const Navbar = () => {
    const navigate = useNavigate();
    const setIsLoggedIn = useRecoilState(isLoggedInState)[1];

    const signOutHandler = () => {
        setIsLoggedIn(false);
        navigate("/")
        localStorage.removeItem('credentials');
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