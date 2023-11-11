import { useState } from "react";
import Link from "@mui/material/Link";
import styles from "../styles/components/Authentication.module.css";
import { loginUser } from "../api/users";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../recoil/UserAtom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Wallpaper from "../assets/wallpaper.png";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LogIn = () => {
    const setIsLoggedIn = useRecoilState(isLoggedInState)[1];

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(show => !show);

    const validateForm = () => {
        if (!username) {
            setUsernameError("Enter a username")
            return false
        } else {
            setUsernameError("")
        }

        if (!password) {
            setPasswordError("Enter a password")
            return false
        } else {
            setPasswordError("")
        }

        return true
    }

    const logInButtonHandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const res = await loginUser(username, password);
            if (res.status !== 200) {
                if (res.errorType === "invalid-username") {
                    setUsernameError(res.message)
                } else if (res.errorType === "invalid-password") {
                    setPasswordError(res.message)
                }
                return;
            }

            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    sessionToken: res.token,
                    username: res.username,
                    isManager: res.isManager,
                })
            );

            setIsLoggedIn(true);
        }
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${Wallpaper})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "dark"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                sx={{
                    bgcolor: "#F9F1E3",
                }}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            id="username"
                            error={usernameError && usernameError.length ? true : false}
                            helperText={usernameError}
                            label="Username"
                            name="username"
                            margin="normal"
                            fullWidth
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    bgcolor: "#FFFFFF"
                                },
                                '& .MuiFormHelperText-contained': {
                                    bgcolor: "transparent",
                                }
                            }}
                        />
                        <TextField 
                            id="password"
                            error={!usernameError && passwordError && passwordError ? true : false}
                            helperText={!usernameError && passwordError}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    bgcolor: "#FFFFFF"
                                },
                                '& .MuiFormHelperText-contained': {
                                    bgcolor: "transparent",
                                }
                            }}
                            InputProps={{
                                endAdornment: 
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={e => e.preventDefault()}
                                            onMouseUp={e => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        {errorMessage && (
                            <p className={styles["error-msg"]}>
                                {errorMessage}
                            </p>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            onClick={logInButtonHandler}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                Don't have an account? &nbsp;
                                <Link
                                    href="/signup"
                                    underline="hover"
                                    color="#0000EE"
                                >
                                    {"Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LogIn;
