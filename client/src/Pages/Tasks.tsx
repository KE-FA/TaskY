import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import axiosInstance from "../api/axiosinstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useUser from "../store/userStore";
import { useNavigate } from "react-router-dom";

type CardProps = {
  taskid: string;
  title: string;
  description: string;
  isDeleted: boolean;
  authorName: string;
  authorId: string;
  createdAt: string;
};

function Task({
  taskid,
  title,
  description,
  isDeleted,
  authorName,
  authorId,
  createdAt,
}: CardProps) {
  const { user } = useUser();
  const isOwner = user?.id === authorId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/tasks/${taskid}`);
      return response.data;
    },
    onSuccess: () => {
      toast("Task Deleted", {
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

 const { isPending: isCompleting, mutate: markComplete } = useMutation({
  mutationKey: ["mark-complete-task"],
  mutationFn: async () => {
    const response = await axiosInstance.patch(`/api/tasks/complete/${taskid}`);
    return response.data; 
  },
  onSuccess: () => {
    toast("Task marked as complete!", {
      position: "top-center",
      style: { backgroundColor: "greenyellow", color: "black" },
    });
    queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    queryClient.invalidateQueries({ queryKey: ["completed-tasks"] }); 
    // navigate("/completed"); 
  },
  onError: () => {
    toast("Failed to mark complete.", {
      position: "top-center",
      style: { backgroundColor: "red", color: "white" },
    });
  },
});

  function handleDelete() {
    mutate();
  }

  function handleUpdate() {
    navigate(`/tasks/update/${taskid}`);
  }

  function handleMarkComplete() {
    markComplete();
  }

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (isDeleted) {
    return (
    <Grid size={{xs:12, sm:6, md:4}} >
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 4,
            height: "100%",
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
            bgcolor: "#f9f9f9",
          }}
        >
          <Typography variant="h6" color="black" fontWeight="bold">
            This task was deleted.
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid size={{xs:12, sm:6, md:4}} >
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor:"#F4E7E1",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }} gutterBottom>
            {description}
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
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ color: "#222" }}>
                {authorName}
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

        {isOwner && (
          <CardActions
            sx={{
              justifyContent: "space-between",
              px: 2,
              pb: 2,
              gap: 1,
            }}
          >
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                bgcolor: "#3f51b5",
                "&:hover": { bgcolor: "#303f9f" },
              }}
            >
              Update
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={isPending}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                bgcolor: "#f44336",
                "&:hover": { bgcolor: "#d32f2f" },
              }}
            >
              Delete
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={handleMarkComplete}
              disabled={isCompleting}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#388e3c" },
              }}
            >
              Mark Complete
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default Task;
