import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosinstance";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Task from "../Components/Tasks";
import useUser from "../store/userStore";
import Loader from "../Components/Loader";

interface Task {
  taskId: string;
  title: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

function AllTasks() {
  const { user } = useUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/tasks");
      return response.data;
    },
  });

  if (isError) {
    return (
      <Stack component="section" p={4}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Something Went Wrong
        </Typography>
      </Stack>
    );
  }

  if (isLoading) {
    return <Loader message="Loading Please wait ..." />;
  }

  const filteredTasks = data?.filter(
    (task: Task) => task.users.id === user?.id && !task.isDeleted
  );

  return (
    <Box component="section" mt={2} mb={25}>
      <Grid container justifyContent="center" spacing={3} mt={2.5} px={4}>
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <Task
              key={task.taskId}
              taskId={task.taskId}
              title={task.title}
              description={task.description}
           
            
              isDeleted={task.isDeleted}
              authorName={`${task.users.firstName} ${task.users.lastName}`}
              authorId={task.users.id}
              createdAt={task.createdAt}
            />
          ))
        ) : (
          <Typography variant="body1">You don’t have any tasks yet.</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default AllTasks;