import {
  Box,
  Typography,
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosinstance";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

interface UpdateDetails {
  title: string;
  description: string;
}

function UpdateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const { taskid } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: task,
  } = useQuery({
    queryKey: ["get-task-for-update", taskid],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/tasks/${taskid}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.isCompleted); 
    }
  }, [task]);

  const updateTaskMutation = useMutation({
    mutationKey: ["update-task"],
    mutationFn: async (details: UpdateDetails) => {
      await axiosInstance.patch(`/api/tasks/${taskid}`, details);
    },
    onSuccess: () => {
      toast.success("Task updated successfully", {
      position: "top-center",
      style: { backgroundColor: "greenyellow", color: "black" },
    });
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Error updating task");
    },
  });

  const toggleCompleteMutation = useMutation({
    mutationKey: ["toggle-complete", taskid],
    mutationFn: async (newCompleted: boolean) => {
      await axiosInstance.patch(`/api/tasks/${taskid}`, {
        isCompleted: newCompleted,
      });
      return newCompleted;
    },
    onSuccess: (newCompleted) => {
      toast.success("Task status updated",  {
      position: "top-center",
      style: { backgroundColor: "greenyellow", color: "black" },
    });

      setCompleted(newCompleted)
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Error updating task status");
    },
  });

  function handleUpdateTask() {
    updateTaskMutation.mutate({ title, description });
  }

  function handleToggleComplete() {
    toggleCompleteMutation.mutate(!completed);
  }

  if (isLoading) return <Loader message="Loading task, please wait..." />;
  if (isError)
    return (
      <Stack p={4}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Something Went Wrong
        </Typography>
      </Stack>
    );

  return (
    <Box px={3} py={6}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2196f3",
          mb: 3,
          fontStyle: "italic",
        }}
      >
        Update Task
      </Typography>

      <Grid container justifyContent="center">
        <Grid size={{xs:12, md:8 , lg:6}}>
          <Stack
            spacing={3}
            sx={{
              bgcolor: "#1e1e2f",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              p: 4,
              borderRadius: 2,
            }}
          >
            <TextField
              variant="filled"
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                "& .MuiInputBase-input": { color: "#f0f0f0" },
                "& .MuiInputLabel-root": { color: "#ccc" },
              }}
            />

            <TextField
              variant="filled"
              fullWidth
              label="Description"
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiInputBase-input": { color: "#f0f0f0" },
                "& .MuiInputLabel-root": { color: "#ccc" },
              }}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpdateTask}
                sx={{
                  bgcolor: "#2196f3",
                  ":hover": { bgcolor: "#1976d2" },
                  fontWeight: "bold",
                  borderRadius: "30px",
                }}
              >
                Update Task
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={handleToggleComplete}
                sx={{
                  bgcolor: completed ? "#f44336" : "#43a047",
                  ":hover": {
                    bgcolor: completed ? "#d32f2f" : "#357a38",
                  },
                  fontWeight: "bold",
                  borderRadius: "30px",
                }}
              >
                {completed ? "Mark as Incomplete" : "Mark as Complete"}
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UpdateTask;
