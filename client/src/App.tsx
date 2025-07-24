import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Pages/Theme";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Protected from "./Components/Protected";
import UpdateTask from "./Pages/UpdateTask";
import CompletedTask from "./Pages/CompletedTask";
import About from "./Pages/About";
import Trash from "./Pages/Trash";
import Profile from "./Pages/Profile";
import { Toaster } from "react-hot-toast";
import "./index.css";

import NewTask from "./Pages/NewTask";
import Tasks from "./Components/TaskDetails";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout />
          <Toaster position="top-right" />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

function Layout() {
  const location = useLocation();

  const hideHeader = ["/", "/login", "/register", "/about"].includes(
    location.pathname
  );

  const isAuthenticated = true;

  return (
    <>
      {!hideHeader && isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/trash"
          element={
            <Protected>
              <Trash />
            </Protected>
          }
        />

        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />

        <Route
          path="/tasks"
          element={
            <Protected>
              <Tasks />
            </Protected>
          }
        />

        <Route
          path="/tasks/update/:taskid"
          element={
            <Protected>
              <UpdateTask />
            </Protected>
          }
        />

        <Route
          path="/task/new"
          element={
            <Protected>
              <NewTask />
            </Protected>
          }
        />

        <Route
          path="/completed"
          element={
            <Protected>
              <CompletedTask />
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
