import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import nvcti2 from "../../assets/nvcti_logo.svg";

const About = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }} id="about">
        ABOUT US
      </Typography>
      <Grid container spacing={2} sx={{ padding: "4em 3em 2em" }}>
        <Grid item xs={12} md={4} sx={{ alignContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: { xs: "column" },
              overflow: "hidden",
            }}
          >
            <Box>
              <Typography variant="h4">NVCTI ,</Typography>
              <Typography variant="h5">Innovation Cell of IIT ISM</Typography>
            </Box>
            <img src={nvcti2} alt="NVCTI" width="150" height="150" />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography sx={{ mb: "1em" }}>
            With the mission to provide students with a platform for promoting
            experimentation, innovation and creative output skills, we, at NVCTI
            are putting endeavours to inculcate convoluted thinking in an
            aesthetic approach in the minds of students and faculty members by
            polarizing thoughts into the process and thereby into a product. We
            also promote an innovation ecosystem to subsidize our students in
            their quest to explore and contribute to the world of cutting-edge
            technologies and entrepreneurship.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography sx={{ mb: { xs: "1em", md: "0em" } }}>
            We also promote an innovation ecosystem to subsidize our students in
            their quest to explore and contribute to the world of cutting-edge
            technologies and entrepreneurship.
          </Typography>
          <Typography>
            Our vision is to cultivate young fertile brains as the innovators
            and entrepreneurs of the future by promoting informal learning with
            a focus on indigenuos technology and advancements aimed at
            contributing positively to the economy, the environment and the
            society.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
