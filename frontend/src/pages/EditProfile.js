import Navbar from "../components/Navbar";
import DeregisterAccount from "../components/DeregisterAccount";
import styles from '../styles/pages/EditProfile.module.css';

const EditProfile = () => {
    return (
        <div>
            <Navbar />
            <div className={styles["container"]}>
                <DeregisterAccount />
            </div>
        </div>
    );
};

export default EditProfile;