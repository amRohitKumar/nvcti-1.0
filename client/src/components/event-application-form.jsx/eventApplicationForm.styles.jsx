import { Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Box)({
  // border: '1px solid red',
  // width: '60%',
  height: "max-content",
  margin: "0 auto",

  // '@media (max-width: 900px)': {
  //     width: '95%',
  // },
});

export const EventInput = styled(Box)(({ size }) => ({
  border: "none",
  outline: "none",
  fontSize: size === "large" ? "2em" : "1.25em",
  padding: "0.15em 0.25em",
  margin: "0.25em 0.25em",
  letterSpacing: "1px",

  "&:focus": {
    borderBottom: "2px solid #828DF8",
  },
}));

export const EventInputMultiline = styled(Box)({
  border: "none",
  outline: "none",
  fontSize: "1em",
  padding: "0.25em 0.5em",
  margin: "0.25em 0.25em",
  letterSpacing: "1px",

  "&:focus": {
    borderBottom: "2px solid #828DF8",
    backgroundColor: "rgba(68, 73, 81, 0.057)",
  },
});

export const ElemWrapper = styled(Paper)({
  marginBlock: "2em",
  padding: "1em",

  ".title-div": {
    marginBottom: "1em",
  },
});

export default Wrapper;
