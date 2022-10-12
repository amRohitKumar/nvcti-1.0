import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
  Box,
  InputAdornment,
  Avatar,
} from "@mui/material";
import {
  EmailIcon,
  LockOutlinedIcon,
  NoEncryptionIcon,
} from "../../../icons";
import useTitle from "../../../hooks/useTitle";

const SuperAdminLogIn = () => {
  useTitle("SuperAdmin Login")

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const res = true;
    if (res) {
      toast.success("You are successfully logged in!!");
      toast.clearWaitingQueue();
    } else {
      toast.error("Invalid credentials!!");
      toast.clearWaitingQueue();
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textTransform: "uppercase" }}
          >
            Sign in to NVCTI PORTAL
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              color="secondary"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              color="secondary"
              id="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NoEncryptionIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Register now"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SuperAdminLogIn;
