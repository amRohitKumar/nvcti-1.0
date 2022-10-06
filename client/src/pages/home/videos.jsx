import React from "react";
import { Box, Typography } from "@mui/material";
import { default as MuiCarousel } from "react-material-ui-carousel";
import { styled } from "@mui/system";
import ReactPlayer from "react-player";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  ".carousel-div": {
    width: "60%",
    padding: "1em 1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
});

const videos = [
  "https://www.youtube.com/watch?v=D-O7KKy8yJA",
  "https://www.youtube.com/watch?v=J-8FkadmA-E&t=10s",
];

const Videos = () => {
  const settings = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: false,
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }} id="about">
        VIDEOS
      </Typography>
      <Wrapper>
        <MuiCarousel {...settings} className="carousel-div">
          {videos.map((item, idx) => (
            <ReactPlayer
              key={idx}
              url={item}
              width="100%"
              controls={true}
              playing={false}
              pip={true}
            />
          ))}
        </MuiCarousel>
      </Wrapper>
    </Box>
  );
};

export default Videos;
