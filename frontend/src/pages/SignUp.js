import { useState } from "react";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import styles from "../styles/components/Authentication.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UsernameTextField from "../components/UsernameTextField";
import PasswordTextField from "../components/PasswordTextField";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const onClickShowPassword = () => setShowPassword(show => !show);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const onClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username) {
            setUsernameError("Enter a username");
            return false;
        } else {
            setUsernameError("");
        }

        if (!password) {
            setPasswordError("Enter a password");
            return false;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Enter the same password");
            return false;
        } else {
            setPasswordError("");
        }

        return true;
    }

    const registerBtnHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!");
            setConfirmPasswordError("Passwords do not match!");
            return;
        }

        const res = await registerUser(username, password);
        if (res.status !== 201) {
            setErrorMessage(res.message);
            return;
        }

        navigate("/");
    };

    return (
        <Grid
            container
            component="main"
            sx={{ height: "100vh", bgcolor: "#F9F1E3" }}
        >
            <CssBaseline />
            <Container component="main">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <UsernameTextField 
                                    error={usernameError} 
                                    setUsername={setUsername} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordTextField
                                    label="Password"
                                    name="password"
                                    error={passwordError}
                                    setPassword={setPassword}
                                    showPassword={showPassword}
                                    onClick={onClickShowPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordTextField
                                    label="Confirm Password"
                                    name="confirm-password"
                                    error={confirmPasswordError}
                                    setPassword={setConfirmPassword}
                                    showPassword={showConfirmPassword}
                                    onClick={onClickShowConfirmPassword}
                                />
                            </Grid>
                        </Grid>
                        {errorMessage && (
                            <p className={styles["error-msg"]}>
                                {errorMessage}
                            </p>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={registerBtnHandler}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href="/"
                                    underline="hover"
                                    color="inherit"
                                >
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Grid>
    );
};

export default SignUp;
