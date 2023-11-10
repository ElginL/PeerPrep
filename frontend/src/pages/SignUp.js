import { useState } from "react";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import styles from "../styles/components/Authentication.module.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const registerBtnHandler = async (e) => {
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
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    sx={{
                                        bgcolor: "#FFFFFF",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    sx={{
                                        bgcolor: "#FFFFFF",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="confirm-password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    sx={{
                                        bgcolor: "#FFFFFF",
                                    }}
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
