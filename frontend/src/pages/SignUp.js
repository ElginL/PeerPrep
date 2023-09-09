import styles from "../styles/components/Authentication.module.css";

const SignUp = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles["header"]}>Sign Up</h1>
        <div className={styles["form"]}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={styles["input"]}
          />
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
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
