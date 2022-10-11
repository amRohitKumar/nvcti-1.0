import * as React from "react";
import { Box, Typography, Container, Link, Grid } from "@mui/material";
import nvctii from "../../assets/nvcti_logo.svg";
import iitism2 from "../../assets/ism_transparent_logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const socialNetworks = [
  {
    socialHandle: "facebook",
    link: "https://www.facebook.com/nvcti/",
    icon: <FacebookIcon />,
    iconColor: "#3b5998",
  },
  {
    socialHandle: "linkeldn",
    link: "https://www.linkedin.com/company/nvcti-iitism/",
    icon: <LinkedInIcon />,
    iconColor: "#0e76a8",
  },
  {
    socialHandle: "instagram",
    link: "https://www.instagram.com/nvcti.iitism/",
    icon: <InstagramIcon />,
    iconColor: "#cc2467",
  },
  {
    socialHandle: "twitter",
    link: "https://twitter.com/nvcti1",
    icon: <TwitterIcon />,
    iconColor: "#1da1f2",
  },
  {
    socialHandle: "youtube",
    link: "https://www.youtube.com/channel/UC4Uw9mJgYrssRq6vC7fO3fA",
    icon: <YouTubeIcon />,
    iconColor: "#ff0000",
  },
];

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
    <Grid
      container
      component="footer"
      sx={{
        backgroundColor: "#edeaeab7",
        width: "100%",
        marginTop: "auto",
        padding: "0.8em",
      }}
    >
      <Grid item xs={3}></Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <img
          src={nvctii}
          alt="nvcti"
          style={{ width: "45px", height: "45px" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Container>
            <Copyright />
          </Container>
          <Typography variant="body2" sx={{ borderBottom: "1px solid #000" }}>
            FOLLOW US AT
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {socialNetworks.map(({ link, icon, iconColor }) => (
              <Link
                href={link}
                target="_blank"
                sx={{ color: "#000", "&:hover": { color: iconColor } }}
              >
                {icon}
              </Link>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <img
          src={iitism2}
          alt="iitism"
          style={{ width: "45px", height: "45px" }}
        />
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}
