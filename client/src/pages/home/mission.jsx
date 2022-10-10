import { Avatar, Card, Typography, Grid, Box } from "@mui/material";
import React from "react";
import { SchoolIcon } from "../../icons";

const QuotesArr = [
  "To build a vibrant innovation ecosystem by establishing a network between innovators, academia and incubators",
  " To attract a large number of youth who demonstrate problem solving zeal and abilities to work on new technology/innovation based start-ups.",
  " To generate innovative solutions relevant to the local and global problems through experimentation, innovation and creativity.",
  "To encourage, inspire and nurture young brains by supporting them to work with new ideas and converting them into concept and prototype.",
];

const Missions = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }} id="about">
        OUR MISSIONS
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexWrap: "wrap", padding: "4em 3em 2em" }}
        id="mission"
      >
        {QuotesArr.map((quote, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                padding: "10px",
                backgroundColor: "#ccc",
                minHeight: "12em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { sm: "row", md: "column" },
                position: "relative",
                overflow: "initial",
              }}
              raised
            >
              <Avatar
                sx={{
                  bgcolor: "black",
                  position: "absolute",
                  top: "-35px",
                  width: "70px",
                  height: "70px",
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SchoolIcon fontSize="large" />
              </Avatar>
              {quote}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Missions;
