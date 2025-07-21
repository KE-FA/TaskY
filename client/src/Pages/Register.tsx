import { useState } from "react";
import {
  Box,

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
import toast from "react-hot-toast";

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
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Account Created successfully", {
        position: "top-center",
      });
      navigate("/tasks");
    },
  });

  function handleRegister() {
    setFormError("");
    if (password !== confpassword) {
      setFormError("Password and Confirm password must match");
      return;
    }
    const newUser = { firstName, lastName, userName, emailAddress, password };
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
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: 'url("/signup.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 0,
        }}
      />

      
      <Box
        component="img"
        src="/logo2.png"
        alt="Animated Logo"
        sx={{
          position: "absolute",
          top: "45px",
          left: "50px",
          width: "80px",
          height: "auto",
          transform: "translate(-50%, -50%)", 

          zIndex: 1,
          animation: `${animate} 3s ease-in-out infinite`,
        }}
      />


      <Paper
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 4, md: 6 },
          maxWidth: 500,
          width: "90%",
          mt:5,
          mb:5,
          borderRadius: 4,
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            TASKY
          </Typography>
          <Link href="/" underline="hover" sx={{ color: "white" }}>
            Home
          </Link>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          START FOR FREE
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          Create new account
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Already a member?{" "}
          <Link href="/login" sx={{ color: "#4fc3f7" }}>
            Log In
          </Link>
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
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
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
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
          sx={{ mb: 3 }}
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
          sx={{
            bgcolor: "#2196f3",
            "&:hover": { bgcolor: "#1976d2" },
            color: "#fff",
            borderRadius: "30px",
            fontWeight: "bold",
            py: 1.2,
          }}
          fullWidth
          onClick={handleRegister}
          disabled={isPending}
        >
          Create Account
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;
