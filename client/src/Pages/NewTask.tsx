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
      // console.log(response.data)
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
        style: {
          backgroundColor: "greenyellow",
          color: "black",
        },
      });
     
    },
  });

  function handleCreateTask() {
    setFormError("");
    const newTask = { title, description};
    mutate(newTask);
  }
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 6.2 , bgcolor:"white-smoke", borderRadius:"10px", mb:10}}>
        <Typography variant="h4" gutterBottom>
          Create a New Task
        </Typography>

        {formError && (
          <Alert severity="error" sx={{ mb: "1rem",bgcolor:"#578FCA", color:"white" }}>
            {formError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

         

          

          <Button
            type="submit"
            variant="contained"
            onClick={handleCreateTask}
            loading={isPending}
          >
            Create Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewTask;