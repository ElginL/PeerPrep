import styles from '../styles/components/Navbar.module.css';
import Logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles["logo-container"]}>
                <img className={styles["logo"]} src={Logo} alt="Logo" />
                <h1 className={styles["header"]}>PeerPrep</h1>
            </div>
            <nav>
                <ul className={styles["nav-links"]}>
                    <li>Find Match</li>
                    <li>Profile</li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;