import React, { useState } from "react";
import styles from "../styles/components/ChangePassword.module.css";
import { changePassword } from "../api/users";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setPasswordsMatch(newPasswordValue === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordsMatch(newPassword === confirmPasswordValue);
  };

  const handleChange = async () => {
    if (passwordsMatch) {
      changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className={styles["change-password-main"]}>
      <h2>Change Password</h2>
      <hr />
      <div className={styles["password-fields"]}>
        <label htmlFor="current-password">Current Password</label>
        <input
          type="password"
          id="current-password"
          name="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          name="new-password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>

      {!passwordsMatch && (
        <p style={{ color: "red" }}>Passwords do not match.</p>
      )}

      <button
        onClick={handleChange}
        className={styles["change-password-button"]}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
