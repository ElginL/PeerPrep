import { Link } from "react-router-dom";
import styles from "../styles/components/Authentication.module.css";

const LogIn = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles["header"]}>Log In</h1>
        <div className={styles["form"]}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            className={styles["input"]}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles["input"]}
          />
          <button className={styles["submit-button"]} type="submit">
            Log In
          </button>
          <button className={styles["submit-button"]} type="submit">
            <Link to="/signup" className={styles["question-link"]}>
              Dont' have an account?{" "}
              <text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}
              >
                Sign Up!
              </text>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
