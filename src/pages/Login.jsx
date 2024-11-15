import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Alert,
  Snackbar,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginRequest from "../models/request/LoginRequest";
import { login } from "../services/AuthService";
import AppTheme from "../shared-theme/AppTheme";
import { LoginIcon as SitemarkIcon } from "../components/CustomIcons";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Login";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Login(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [failMessage, setFailMessage] = React.useState("Login failed");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const navigate = useNavigate();

  const handleSuccessClick = () => {
    setOpenSuccess(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleFailureClick = (message) => {
    setFailMessage(message ? message : failMessage);
    setOpenFailure(true);
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFailure(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const email = formData.email;
    const password = formData.password;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    if (!validateInputs()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    const request = new LoginRequest(formData);
    const response = await login(request);
    if (response.success) {
      handleSuccessClick();
      await new Promise((r) => setTimeout(r, 2500));
      navigate("/");
    } else {
      handleFailureClick(response.message);
    }
    setLoading(false);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                onChange={handleChange}
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                onChange={handleChange}
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="center"
              startIcon={<SendIcon />}
            >
              Login
            </LoadingButton>
            <Typography component={"span"} sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openSuccess}
              autoHideDuration={2500}
              onClose={handleSuccessClose}
            >
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Login Successful
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openFailure}
              autoHideDuration={2500}
              onClose={handleFailureClose}
            >
              <Alert
                onClose={handleFailureClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {failMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Card>
      </LoginContainer>
    </AppTheme>
  );
}
