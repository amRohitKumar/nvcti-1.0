import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import nvctii from "../../assets/nvcti_logo.svg";
import iitism2 from "../../assets/ism_transparent_logo.png";



export default function Footer() {
  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        sx={{ color: "black" }}
        align="center"
        {...props}
      >
        {"Copyright © "}- IIT (ISM) Dhanbad {new Date().getFullYear()} -
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "auto",
        paddingInline: "10px",
        backgroundColor: "#edeaeab7",
      }}
    >
      <Box>
        <img src={nvctii} alt="" style={{ width: "40px", height: "40px" }} />
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
      <Box>
        <img src={iitism2} alt="" style={{ width: "40px", height: "40px" }} />
      </Box>
    </Box>
  );
}
