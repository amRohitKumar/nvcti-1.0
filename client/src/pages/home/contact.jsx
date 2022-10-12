import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Linkify from "react-linkify";
import {
  EmailIcon,
  PersonIcon,
  MessageIcon,
  SendIcon,
} from "../../icons/icons";
import useTitle from "../../hooks/useTitle";

const Div = styled("div")({
  fontSize: "18px",
  fontWeight: "normal",
  a: {
    textDecoration: "none",
    color: "#007bff",
  },
});

const Textfield = styled(TextField)({
  color: "#000",
  "..css-1t76ttu-MuiInputBase-root-MuiOutlinedInput-root": {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  fieldset: {
    border: "2px solid rgba(0,0,0)",
  },
  input: {
    color: "#000",
  },
  textarea: { color: "#000" },
});

const Contact = () => {
  useTitle("Contact Us");

  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  return (
    <Grid container>
      <Box
        sx={{
          backgroundImage: `url("https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdCUyMHVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80")`,
          width: "100%",
          height: { xs: "20vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          // marginBottom: "1em",
        }}
      />
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3em",
            gap: "2em",
            backgroundColor: "#edeaeab7",
            color: "#000",
          }}
        >
          <Typography variant="h4">CONTACT INFORMATION</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: "20px",
            }}
          >
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              Visit us at:
              <Div>
                Naresh Vashisht Centre for Tinkering and Innovation IIT (ISM)
                Dhanbad, Dhanbad, Jharkhand - 826004
              </Div>
            </Typography>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              Call us at:
              <Div>
                Office:<a href="tel:+919470194401">+91 94701 94401</a>
              </Div>
            </Typography>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              Write to us
              <Div>
                <Linkify>
                  nvcti@iitism.ac.in, <br />
                  sic_nvcti@iitism.ac.in
                </Linkify>
              </Div>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* form */}

      <Grid item xs={12} sm={6}>
        <Box
          component="form"
          sx={{
            backgroundColor: "#ccc",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2em",
            gap: "2em",
          }}
        >
          <Typography variant="h4">SAY SOMETHING!</Typography>
          <Textfield
            autoFocus
            variant="standard"
            size="small"
            label="NAME"
            color="secondary"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Textfield
            variant="standard"
            size="small"
            label="EMAIL"
            color="secondary"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Textfield
            label="YOUR MESSAGE"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            size="small"
            color="error"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            variant="contained"
            color="secondary"
            size="small"
            loadingPosition="end"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              "&:disabled": {
                backgroundColor: "#fff",
              },
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            SEND
          </LoadingButton>
        </Box>
      </Grid>
      <Grid item xs={12} padding="2em">
        <iframe
          title="NVCTI google map"
          width="100%"
          height="410"
          src="https://www.google.com/maps/embed/v1/place?q=NVCTI, IIT ISM DHANBAD,Dhanbad,Jharkhand,India&amp;key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
      </Grid>

      {/* follow us */}

      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Contact;
