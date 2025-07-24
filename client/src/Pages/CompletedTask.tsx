import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosinstance";
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Divider,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Task {
  taskid: string;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function CompletedTasksDetails() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/tasks");
      return res.data as Task[];
    },
  });

  const markIncomplete = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/api/tasks/incomplete/${id}`);
    },
    onSuccess: () => {
      toast("Task marked as incomplete!", {
        position: "top-center",
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
    },
    onError: () => {
      toast("Failed to mark incomplete.", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/api/tasks/${id}`);
    },
    onSuccess: () => {
      toast("Task Deleted", {
        position: "top-center",
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
    },
    onError: () => {
      toast("Something went wrong", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  function handleUpdate(taskid: string) {
    navigate(`/tasks/update/${taskid}`);
  }

  if (isLoading)
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (isError)
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error loading completed tasks
        </Typography>
      </Container>
    );

  const completedTasks = data?.filter(
    (task) => task.users.id === user?.id && !task.isDeleted && task.isCompleted
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
      >
        Completed Tasks Details
      </Typography>

      <Grid container spacing={3}>
        {completedTasks && completedTasks.length > 0 ? (
          completedTasks.map((task) => {
            const formattedDate = new Date(task.createdAt).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );

            return (
              <Grid key={task.taskid} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    bgcolor: "#F4E7E1",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "#333" }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#555" }}
                      gutterBottom
                    >
                      {task.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          mr: 2,
                          bgcolor: "#673ab7",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {task.users.firstName[0]}
                        {task.users.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: "#222" }}>
                          {task.users.firstName} {task.users.lastName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#888", fontWeight: 800 }}
                        >
                          {formattedDate}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  {user?.id === task.users.id && (
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2 }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleUpdate(task.taskid)}
                        sx={{
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                          textTransform: "none",
                        }}
                      >
                        Update
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => markIncomplete.mutate(task.taskid)}
                        sx={{ textTransform: "none" }}
                      >
                        Mark Incomplete
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => deleteTask.mutate(task.taskid)}
                        sx={{ textTransform: "none" }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" textAlign="center">
            No completed tasks found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
