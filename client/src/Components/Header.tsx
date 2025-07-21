import React from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#2A3542" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Brand */}
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          TASKY
        </Typography>

        {/* Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
         
          <Button
            href="/tasks"
            startIcon={<AssignmentIcon />}
            sx={{ color: "#fff" }}
          >
            Tasks
          </Button>
           <Button
            href="/task/new"
            startIcon={<AddTaskIcon />}
            sx={{ color: "#fff" }}
          >
            New Task
          </Button>
          
          <Button
            href="/completed"
            startIcon={<DoneAllIcon />}
            sx={{ color: "#fff" }}
          >
            Completed
          </Button>
          <Button
            href="/trash"
            startIcon={<DeleteIcon />}
            sx={{ color: "#fff" }}
          >
            Trash
          </Button>
          <IconButton href="/profile" sx={{ ml: 1 }}>
            <Avatar sx={{ bgcolor: "#2196f3" }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
