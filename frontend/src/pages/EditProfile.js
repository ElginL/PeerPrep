import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DeregisterAccount from "../components/DeregisterAccount";
import ChangePassword from "../components/ChangePassword";
import styles from "../styles/pages/EditProfile.module.css";
import { getUsername } from "../api/users";

const EditProfile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const res = await getUsername();
      setUsername(res);
    }
  
    fetchUsername();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles["container"]}>
        <h2>{username}'s Profile</h2>
        <ChangePassword />
        <DeregisterAccount />
      </div>
    </div>
  );
};

export default EditProfile;