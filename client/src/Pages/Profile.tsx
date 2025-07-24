import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosinstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUser from "../store/userStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface UserDetails {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

interface PasswordDetails {
  currentPassword: string;
  newPassword: string;
}

function Profile() {
  const { user, setUser, logoutUser } = useUser();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatarUrl || null
  );

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUserName(user.userName || "");
      setEmailAddress(user.emailAddress || "");
      setAvatarPreview(user.avatarUrl || null);
    }
  }, [user]);

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (details: UserDetails) => {
      await axiosInstance.patch("/api/user/", details);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully", {
        position: "top-center",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
      });
    },
    onError: () => {
      toast.error("Error updating profile", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (details: PasswordDetails) => {
      const res = await axiosInstance.patch("/api/auth/password", details);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Password updated", {
          position: "top-center",
          style: {
            backgroundColor: "#4caf50",
            color: "#fff",
          },
        });
        setCurrentPassword("");
        setNewPassword("");
        setPasswordError("");
      } else {
        setPasswordError("Current password is incorrect");
      }
    },
    onError: () => {
      setPasswordError("Something went wrong updating the password");
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationKey: ["upload-avatar"],
    mutationFn: async () => {
      if (!avatarFile) return;

      const { data: signatureData } = await axiosInstance.post(
        "/api/user/avatar"
      );
      const { signature, timestamp, cloudName, apiKey } = signatureData;

      const formData = new FormData();
      formData.append("file", avatarFile);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "avatars");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json();
      const secureUrl = cloudinaryData.secure_url;

      await axiosInstance.patch("/api/user", { avatarUrl: secureUrl });

      return secureUrl;
    },
    onSuccess: (secureUrl) => {
      toast.success("Avatar updated successfully", {
        position: "top-center",
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      setAvatarFile(null);
      if (secureUrl) {
        setAvatarPreview(secureUrl);
        setUser((prev) => ({ ...prev!, avatarUrl: secureUrl }));
      }
    },
    onError: () => {
      toast.error("Error uploading avatar", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  function handleUpdateProfile() {
    const details = { firstName, lastName, userName, emailAddress };
    updateUserMutation.mutate(details);
  }

  function handleUpdatePassword() {
    if (currentPassword.trim() === "" || newPassword.trim() === "") {
      setPasswordError("Please fill in both password fields");
      return;
    }
    updatePasswordMutation.mutate({ currentPassword, newPassword });
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleUploadAvatar() {
    if (!avatarFile) {
      toast.error("Please select an image first");
      return;
    }
    uploadAvatarMutation.mutate();
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Box
      component="section"
      px={3}
      py={6}
      mt={3}
      mb={4}
      maxWidth="lg"
      mx="auto"
      sx={{
        backgroundColor: "#121212",
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        sx={{
          color: "#2196f3",
          mb: 4,
        }}
      >
        My Profile
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "#1e1e2f",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              color="#fff"
            >
              Update Avatar
            </Typography>

            {avatarPreview && (
              <Box
                component="img"
                src={avatarPreview}
                alt="Avatar Preview"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  mb: 2,
                  border: "3px solid #2196f3",
                }}
              />
            )}

            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: "#2196f3",
                ":hover": { bgcolor: "#1976d2" },
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                mb: 2,
                width: "100%",
              }}
            >
              Choose File
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
              />
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleUploadAvatar}
              disabled={!avatarFile}
              sx={{
                bgcolor: "#43a047",
                ":hover": { bgcolor: "#357a38" },
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Upload Avatar
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "#1e1e2f",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="#fff"
                textAlign="center"
              >
                Update Profile Info
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                />
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleUpdateProfile}
                  sx={{
                    bgcolor: "#2196f3",
                    ":hover": { bgcolor: "#1976d2" },
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "#1e1e2f",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="#fff"
                textAlign="center"
              >
                Change Password
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Current Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                  InputProps={{
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
                <TextField
                  label="New Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { color: "#f0f0f0" },
                    "& .MuiInputLabel-root": { color: "#ccc" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#888" },
                      "&.Mui-focused fieldset": { borderColor: "#2196f3" },
                    },
                  }}
                  InputProps={{
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
                {passwordError && (
                  <Typography color="error">{passwordError}</Typography>
                )}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleUpdatePassword}
                  sx={{
                    bgcolor: "#43a047",
                    ":hover": { bgcolor: "#357a38" },
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </Paper>

            <Stack alignItems="center" mt={2}>
              <Button
                onClick={logoutUser}
                variant="outlined"
                color="error"
                size="large"
                sx={{
                  borderRadius: "30px",
                  fontWeight: "bold",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                }}
              >
                Log Out
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
