import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Avatar,
  Card,
  Rating,
} from "@mui/material";
import { useState } from "react";

const reviews = [
  {
    name: "Jane Doe",
    comment: "This app has changed how I manage my tasks every day!",
    avatar: "/avatar1.jpg",
    rating: 5,
  },
  {
    name: "Pauline Sukzwa",
    comment: "Simple, beautiful and productive. Highly recommended!",
    avatar: "/avatar2.jpg",
    rating: 4.5,
  },
  {
    name: "Emily White",
    comment: "I love Tasky! It keeps my projects organized and stress-free.",
    avatar: "/avatar3.jpg",
    rating: 5,
  },
];

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <Box sx={{ bgcolor: "#FCF8FF", minHeight: "100vh" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "transparent", boxShadow: "none", py: 2 }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              TASKY
            </Typography>
            <Box>
              <Button
                href="/register"
                variant="contained"
                sx={{ borderRadius: "50px", mr: 2 }}
              >
                Get Started
              </Button>
              <Button
                href="/login"
                variant="outlined"
                sx={{ borderRadius: "50px" }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h2" fontWeight="bold" mb={2}>
              Organize your work with{" "}
              <span style={{ color: "#1976d2" }}>TASKY</span>
            </Typography>
            <Typography variant="h6" color="black" mb={3}>
              The Task that allows you to manage your tasks effectively and
              efficiently
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              maxWidth="sm"
            >
              <TextField
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: "#6FE6FC",
                  borderRadius: "50px",
                  input: {
                    color: "black",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                  borderRadius: "50px",
                  px: 5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="/home.png"
              alt="Tasky hero"
              sx={{
                width: "100%",
                borderRadius: 5,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ py: 3, bgcolor: "#FCF8FF" }}>
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={700}
              fontStyle="italic"
            >
              What Our Customers Say
            </Typography>
            <Grid container spacing={4}>
              {reviews.map((review, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 3,
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      “{review.comment}”
                    </Typography>

                    <Stack alignItems="center" mt={2}>
                      <Avatar
                        src={review.avatar}
                        alt={review.name}
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 1,
                        }}
                      />
                      <Typography variant="h6" fontWeight={600}>
                        {review.name}
                      </Typography>
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        sx={{ mt: 1 }}
                      />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
