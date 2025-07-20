import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Pages/Theme";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Protected from "./Components/Protected";
import { Toaster } from "react-hot-toast";
import "./index.css";


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

  
  const hideHeaderFooter = ["/","/login", "/register","/about"].includes(location.pathname);

  
  const isAuthenticated = true; 

  return (
    <>
      {!hideHeaderFooter && isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <h1>Dashboard page here</h1>
            </Protected>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
