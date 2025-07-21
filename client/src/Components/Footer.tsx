
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2A3542",
        color: "#fff",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          <Grid size={{xs:12, md:4}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              TASKY
            </Typography>
            <Typography variant="body2">
              Tasky helps you stay organized, productive, and ahead of your
              goals. Plan smarter, work better.
            </Typography>
          </Grid>

          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Useful Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
           
            </Stack>
          </Grid>

          {/* Socials */}
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "#aaa" }}
        >
          &copy; {new Date().getFullYear()} Tasky. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
