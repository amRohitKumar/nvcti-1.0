import React from "react";
import { styled } from "@mui/system";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Box } from "@mui/material";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",

  ".child-div": {
    width: "300px",
    height: "300px",
    position: "absolute",
    border: "1px solid #fff",
    borderRadius: "50%",
    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  },
  ".child-div2": {
    width: "280px",
    height: "280px",
    position: "absolute",
    border: "1px solid #fff",
    borderRadius: "50%",
    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  },
  "@keyframes ping": {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: "0",
    },
  },
  ".span": {
    color: "#fff",
  },
});

const Typewriter = () => {
  const [text] = useTypewriter({
    words: ["NVCTI", "IIT(ISM) DHANBAD"],
    loop: true,
    delaySpeed: "9250",
  });

  return (
    <Box
      sx={{
        fontSize: { xs: "40px", sm: "50px", md: "60px", lg: "80px" },
        fontWeight: "500",
        textAlign: "center",
      }}
    >
      <div className="span">WELCOME TO</div>
      <span className="span">{text}</span>
      <Cursor cursorColor="#fff" />
    </Box>
  );
};

const Typewriter2 = () => {
  const [text2] = useTypewriter({
    words: ["THINK", "DESIGN", "DEVELOP", "INSPIRE"],
    loop: true,
    delaySpeed: "2000",
  });

  return (
    <Box
      sx={{
        fontSize: { xs: "30px", sm: "40px", md: "40px", lg: "50px" },
        fontWeight: "400",
      }}
    >
      <Cursor cursorColor="#fff" cursorStyle="« " />
      <span className="span">{text2}</span>
      <Cursor cursorColor="#fff" cursorStyle=" »" />
    </Box>
  );
};

export const BgCircles = () => {
  return (
    <Wrapper>
      <Typewriter />
      <div className="child-div" />
      <div className="child-div2" />
      <Typewriter2 />
    </Wrapper>
  );
};
