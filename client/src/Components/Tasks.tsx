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
  taskId: string;
  title: string;
  description: string;
  
  isDeleted: boolean;
  authorName: string;
  authorId: string;
  createdAt: string; 
};

function Task({
  taskId,
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
      const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      toast("Task Deleted", {
        style: { backgroundColor: "greenyellow", color: "black" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
    },
    onError: () => {
      toast("Something went wrong", {
        style: { backgroundColor: "red", color: "black" },
      });
    },
  });

  function handleDelete() {
    mutate();
  }

  function handleUpdate() {
    navigate(`/tasks/update/${taskId}`);
  }

 

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (isDeleted) {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Box
          sx={{
            border: "1px dashed grey",
            borderRadius: 3,
            height: "100%",
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            This task was deleted.
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
       

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
        

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 1 }}>
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">{authorName}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="900"
              >
                {formattedDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
          {isOwner && (
            <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleUpdate}
                sx={{ flexGrow: 1 }}
              >
                Update
              </Button>
              <Button
                color="error"
                size="small"
                variant="outlined"
                onClick={handleDelete}
                disabled={isPending}
                sx={{ flexGrow: 1 }}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Task;