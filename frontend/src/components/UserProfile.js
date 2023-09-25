import { useState, useEffect } from "react";
import styles from "../styles/components/UserProfile.module.css";
import { Link } from "react-router-dom";
import { getUsername } from "../api/users";

// DEFUNCT
const UserProfile = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUsername().then((res) => setUsername(res));
    }, []);

    return (
        <div className={styles["container"]}>
            <h2 className={styles["username"]}>{username}</h2>
            <Link to="/profile" className={styles["edit-profile-btn"]}>
                Edit Profile
            </Link>
        </div>
    );
};

export default UserProfile;
