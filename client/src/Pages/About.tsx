import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Avatar,
  Paper,
} from "@mui/material";

const teamMembers = [
  {
    name: "Robert Devs",
    role: "Founder & Lead Developer",
    bio: "Robert is passionate about building tools that help people stay productive and organized effortlessly.",
  },
  {
    name: "Jane Doe",
    role: "Product Designer",
    bio: "Jane designs delightful, user-friendly interfaces that make Tasky easy and enjoyable to use every day.",
  },
  {
    name: "Ricky Smith",
    role: "Backend Engineer",
    bio: "John makes sure Tasky is fast, secure, and handles millions of tasks with zero downtime.",
  },
];

export default function AboutUs() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, md: 450 },
          backgroundImage:
            "url(/about.png)",
          backgroundSize: "normal",
          backgroundPosition: "center",
          backgroundRepeat:"no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            About Tasky
          </Typography>
          <Typography variant="h6" maxWidth="sm" mx="auto">
            Your trusted productivity partner to help you plan smarter, work
            better, and achieve more.
          </Typography>
        </Container>
      </Box>

     
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          mb={6}
          maxWidth="sm"
          mx="auto"
        >
          At Tasky, we believe that staying organized shouldn’t feel like a
          chore. Our mission is to make it easy for anyone — students,
          freelancers, or busy professionals — to plan, prioritize, and
          accomplish their goals without stress.
        </Typography>

       
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Meet the Team
        </Typography>

        <Grid container spacing={4} mt={2}>
          {teamMembers.map((member) => (
            <Grid key={member.name} size={{xs:12, sm:6, md:4}} >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Stack alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#673ab7",
                      color: "#fff",
                      width: 80,
                      height: 80,
                      fontSize: 28,
                      fontWeight: "bold",
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {member.bio}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
