import Navbar from "../components/Navbar";
import DeregisterAccount from "../components/DeregisterAccount";
import ChangePassword from "../components/ChangePassword";
import styles from "../styles/pages/EditProfile.module.css";

const EditProfile = () => {
  return (
    <div>
      <Navbar />
      <div className={styles["container"]}>
        <ChangePassword />
        <DeregisterAccount />
      </div>
    </div>
  );
};

export default EditProfile;