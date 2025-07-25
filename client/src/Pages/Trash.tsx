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
  Alert,
} from "@mui/material";
import useUser from "../store/userStore";
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

export default function restoreTask() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/tasks");
      return res.data as Task[];
    },
  });

  const restoreTask = useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.patch(`/api/tasks/restore/${id}`);
    },
    onSuccess: () => {
      toast("Task Restored", {
        position: "top-center",
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      toast("Something went wrong", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

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
          Error loading deleted tasks
        </Typography>
      </Container>
    );

  const deletedTasks = data?.filter(
    (task) => task.users.id === user?.id && task.isDeleted
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Alert
        severity="error"
        sx={{
          mb: 2,
          bgcolor: "#AF1740",
          color: "#fff",
          fontWeight: 550,
          fontSize: "14px",
          justifyContent:"center",
          maxWidth:"400px",
          ml:"32%"
        }}
      >
        Items in trash will be deleted after 30 days
      </Alert>
      <Grid container spacing={3}>
        {deletedTasks && deletedTasks.length > 0 ? (
          deletedTasks.map((task) => {
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
                    //   sx={{ justifyContent: "space-between", px: 2 }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        onClick={() => restoreTask.mutate(task.taskid)}
                        sx={{
                          bgcolor: "#1976d2",
                          "&:hover": { bgcolor: "#1565c0" },
                          textTransform: "none",
                        }}
                      >
                        Restore
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography
            variant="body1"
            justifyContent="center"
            p="2rem 1rem"
            fontWeight="600"
          >
            No deleted tasks found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
