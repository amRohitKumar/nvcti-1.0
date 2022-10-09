import React from "react";
// import { styled } from "@mui/system";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Box, Typography } from "@mui/material";

// const Wrapper = styled("div")({
//   display: "flex",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   flexDirection: "column",
//   padding: "2em",

//   ".span": {
//     color: "#fff",
//   },
// });

export const Typewriter = () => {
  const [text] = useTypewriter({
    words: ["Creativity.", "Innovations.", "Ideas."],
    loop: true,
    typeSpeed: "50",
  });

  return (
    <Box
      sx={{
        padding: {xs:"10px", sm:"1em", md:"4em", lg:"10em"},
        color: "#fff",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "30px", sm: "50px", md: "60px", lg: "70px" },
          fontWeight: "500",
        }}
      >
        WELCOME TO NVCTI
      </Typography>
      <Box
        sx={{
          fontSize: { xs: "20px", sm: "30px", md: "40px", lg: "50px" },
          fontWeight: "400",
        }}
      >
        Fostering {text}
        <Cursor cursorColor="#fff" />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "8px", sm: "10px", md: "15px", lg: "20px" },
          fontWeight: "500",
          letterSpacing: "8px",
        }}
      >
        IIT(ISM) DHANBAD
      </Typography>
    </Box>
  );
};
