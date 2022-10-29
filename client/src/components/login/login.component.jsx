import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { useUserState } from "../../hooks";
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
import { EmailIcon, LockOutlinedIcon, NoEncryptionIcon } from "../../icons";

const LogIn = ({ role }) => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(loginUser(obj));
  };
  useUserState("LOGIN", "/client"); // to redirect user if user state changes

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
              {role === "user" && (
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Register now"}
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LogIn;
