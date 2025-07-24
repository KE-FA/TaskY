import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";

import useUser from "../store/userStore";

const Header = () => {
  const { user } = useUser();

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#2A3542",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 1,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: 1.5,
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          TASKY
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            href="/tasks"
            startIcon={<AssignmentIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Tasks
          </Button>
          <Button
            href="/task/new"
            startIcon={<AddTaskIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            New Task
          </Button>
          <Button
            href="/completed"
            startIcon={<DoneAllIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Completed
          </Button>
          <Button
            href="/trash"
            startIcon={<DeleteIcon />}
            sx={{ color: "#fff", textTransform: "none" }}
          >
            Trash
          </Button>

          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", fontWeight: 500 }}
          >
            Welcome, {user?.firstName}
          </Typography>

          <IconButton href="/profile" sx={{ ml: 1 }}>
            <Avatar
              src={user?.avatarUrl || undefined}
              sx={{
                width: 36,
                height: 36,
                fontSize: 20,
              }}
            >
              {!user?.avatarUrl &&
                `${user?.firstName[0]?.toUpperCase() || ""}${user?.lastName[0]?.toUpperCase() || ""
                }`}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
