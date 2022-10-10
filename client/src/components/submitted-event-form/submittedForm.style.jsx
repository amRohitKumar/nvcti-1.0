import { Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Box)({
  height: "max-content",
  margin: "0 auto",
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


export const ElemWrapper = styled(Paper)({
  marginBlock: "2em",
  padding: "1em",

  ".title-div": {
    marginBottom: "1em",
  },
});

export default Wrapper;
