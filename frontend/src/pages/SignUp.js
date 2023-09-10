import { useState } from 'react';
import styles from "../styles/components/Authentication.module.css";
import { registerUser } from '../api/users';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();

  const registerBtnHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password does not match with confirm password");
      return;
    }

    const res = await registerUser(username, password);
    if (res.status !== 201) {
      setErrorMessage(res.message);
      return;
    }
  
    navigate("/");
  }  

  return (
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <h1 className={styles["header"]}>Sign Up</h1>
        <form className={styles["form"]}>
          <input
            type="username"
            name="username"
            placeholder="Username"
            className={styles["input"]}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles["input"]}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            className={styles["input"]}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {
            errorMessage &&
              <p className={styles["error-msg"]}>{errorMessage}</p>
          }
          <button className={styles["submit-button"]} onClick={registerBtnHandler}>
            Sign Up
          </button>
          <Link to="/" className={styles["back-btn"]}>
            Back to Log In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
