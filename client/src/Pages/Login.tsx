import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axiosinstance";
import useUser from "../store/userStore";


interface LoginDetails {
  identifier: string;
  password: string;
}

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post(
        "/api/auth/login",
        loginDetails
      );
      // console.log(response.data);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/tasks");
    },
  });

  function handleLogin() {
    setFormError("");
    mutate({ identifier, password });
  }


  return (
    <Box
      sx={{
        
        backgroundImage:'url("/signup.jpg")',
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        p: 3.6,
      }}
    >
      
      <Paper
        elevation={8}
        sx={{
          p: 6,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={1}
          fontWeight="bold"
          textAlign="center"
          color="primary"
        >
          TASKY
        </Typography>
        <Typography variant="subtitle1" mb={3} textAlign="center">
          Sign in to your account
        </Typography>

        <Stack spacing={3}>
        {formError && <Alert severity="error">{formError}</Alert>}

          <TextField
            label="Username or Email"
            variant="outlined"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            size="large"
            loading={isPending}
            sx={{
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>

          <Typography variant="body2" textAlign="center">
            Don't have an account?{" "}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login