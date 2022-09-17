import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      dob: data.get("dob"),
      gender: data.get("gender"),
    });
  };

  const [Gender, setGender] = React.useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="fullName"
                  type="text"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  color="secondary"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NoEncryptionIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="phone"
                  type="tel"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  color="secondary"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="dob"
                  type="date"
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl fullWidth size="small" color="secondary">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    name="gender"
                    labelId="gender"
                    id="gender"
                    value={Gender}
                    label="Gender"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>{" "}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 1, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
