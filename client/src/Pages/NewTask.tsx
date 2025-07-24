import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosinstance";
import axios from "axios";
import toast from "react-hot-toast";

interface NewTask {
  title: string;
  description: string;
}

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (newTask: NewTask) => {
      const response = await axiosInstance.post("/api/tasks", newTask);
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
      toast("Task Created successfully", {
        position: "top-center",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
        },
      });
      setTitle("");
      setDescription("");
    },
  });

  function handleCreateTask() {
    setFormError("");
    const newTask = { title, description };
    mutate(newTask);
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          mt: 3,
          mb: 6,
          borderRadius: 3,
          bgcolor: "#1e1e2f",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{
            fontWeight: "bold",
            color: "#2196f3",
            mb: 3,
            fontStyle: "italic",
          }}
        >
          Create a New Task
        </Typography>

        {formError && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: "#AF1740",
              color: "#fff",
              fontWeight: 550,
              fontSize: "14px",
            }}
          >
            {formError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                color: "#f0f0f0",
              },
              "& .MuiInputLabel-root": {
                color: "#ccc",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" },
              },
            }}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                color: "#f0f0f0",
              },
              "& .MuiInputLabel-root": {
                color: "#ccc",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            onClick={handleCreateTask}
            sx={{
              bgcolor: "#2196f3",
              ":hover": { bgcolor: "#1976d2" },
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "30px",
              py: 1.2,
              color: "#fff",
            }}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewTask;
