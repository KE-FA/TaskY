import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Person } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";



interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userName: string;
  password: string;
}

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        newUser
      );
      console.log(response);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
      //  console.log(err)
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleRegister() {
    setFormError("");
    if (password !== confpassword) {
      setFormError("Password and Confirm password must match");
      return;
    }
    const newUser = { firstName, lastName, userName, emailAddress, password };
    // console.log(newUser);
    mutate(newUser);
  }

  const animate = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  `;

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      
      {/* Form */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#393E46",
          color: "#fff",
          p: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            TASKY
          </Typography>
          <Link href="/" underline="hover" sx={{ color: "white" }}>
            Home
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 6 },
              width: "100%",
              maxWidth: 480,
              borderRadius: 3,
              bgcolor: "#2A3542",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 0.6 }}>
              START FOR FREE
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.6 }}>
              Create new account
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              Already a member?{" "}
              <Link href="/login" sx={{ color: "#2196f3" }}>
                Log In
              </Link>
            </Typography>

              {formError && (
                <Alert severity="error" sx={{ mb: "0.6rem" }}>
                  {formError}
                </Alert>
              )}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 1.5 }}
            >
            
              <TextField
                variant="filled"
                label="First name"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#bbb" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="filled"
                label="Last name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#bbb" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <TextField
              variant="filled"
              label="username"
              fullWidth
              sx={{ mb: 1.5 }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#bbb" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="filled"
              label="Email"
              fullWidth
              sx={{ mb: 1.5}}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#bbb" }} />
                  </InputAdornment>
                ),
              }}
            />

            

            <TextField
              variant="filled"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              sx={{ mb: 1.6}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#bbb" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="filled"
              label="Confirm Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              sx={{ mb: 2.2}}
              value={confpassword}
              onChange={(e) => setConfPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#bbb" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              loading={isPending}
              sx={{
                bgcolor: "#2196f3",
                "&:hover": { bgcolor: "#1976d2" },
                color: "#fff",
                borderRadius: "50px",
              }}
              fullWidth
              onClick={handleRegister}
            >
              Create account
            </Button>
          </Paper>
        </Box>
      </Grid>

      <Grid
        size={{ xs: false, md: 6 }}
        sx={{
          position: "relative",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/signup.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        
        <Box
          component="img"
          src="/checklist.png"
          alt="Tasky logo"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "60%",
            height: "auto",
            zIndex: 2,
            animation: `${animate} 2.5s ease-in-out infinite`,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Register;
