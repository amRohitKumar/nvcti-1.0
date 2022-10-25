import styled from "@emotion/styled";

const Wrapper = styled("div")({});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  minWidth: "450px",
  bgcolor: "background.paper",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: 4,
};

export default Wrapper;
