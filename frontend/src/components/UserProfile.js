import styles from '../styles/components/UserProfile.module.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    return (
        <div className={styles["container"]}>
            <h2 className={styles["username"]}>
                {JSON.parse(localStorage.getItem('credentials')).username}
            </h2>
            <Link to="/profile" className={styles["edit-profile-btn"]}>
                Edit Profile
            </Link>
        </div>
    );
};

export default UserProfile;