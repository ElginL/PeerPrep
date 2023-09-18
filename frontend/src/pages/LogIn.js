import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/Authentication.module.css";
import { loginUser } from "../api/users";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const logInButtonHandler = async e => {
    e.preventDefault();

    const res = await loginUser(username, password);
    if (res.status !== 200) {
      setErrorMessage(res.message);
      return;
    }

    localStorage.setItem('credentials', JSON.stringify({'sessionToken': res.token, 'username': res.username, 'isManager': res.isManager}))
    window.location.reload();
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles["header"]}>Log In</h1>
        <form className={styles["form"]}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            className={styles["input"]}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className={styles["input"]}
          />
          {
            errorMessage && (
              <p className={styles["error-msg"]}>{errorMessage}</p>
            )
          }
          <button className={styles["submit-button"]} onClick={logInButtonHandler}>
            Log In
          </button>
          <Link to="/signup" className={`${styles["submit-button"]} ${styles["question-link"]}`}>
            Dont' have an account?{" "}
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              Sign Up!
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
