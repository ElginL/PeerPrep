import React, { useState } from "react";
import styles from "../styles/components/ChangePassword.module.css";
import { changePassword } from "../api/users";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);

    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);
        setPasswordsMatch(newPasswordValue === confirmPassword);

        setErrorMessage("");
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setPasswordsMatch(newPassword === confirmPasswordValue);

        setErrorMessage("");
    };

    const handleChange = async () => {
        if (!passwordsMatch) {
            return;
        }

        const response = await changePassword(currentPassword, newPassword);
        if (response.status !== 200) {
            setIsSuccessful(false);
            setErrorMessage(response.message);
        } else {
            setIsSuccessful(true);
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
                <p className={styles["error-text"]}>Passwords do not match</p>
            )}

            {!isSuccessful && errorMessage && (
                <p className={styles["error-text"]}>{errorMessage}</p>
            )}

            {isSuccessful && (
                <p className={styles["success-text"]}>
                    Password updated successfully!
                </p>
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
