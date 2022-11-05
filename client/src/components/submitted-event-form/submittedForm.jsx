import Wrapper, { ElemWrapper } from "./submittedForm.style";
import { EventInput } from "./submittedForm.style";
import { Paper, Divider, Typography, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EventFormSubmitted = ({ response, onAccept, onReject }) => {
  const { title, responses } = response;

  return (
    <Wrapper sx={{ width: { lg: "65%", md: "75%", xs: "90%" } }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "1em",
          borderTop: "10px solid #828DF8",
        }}
      >
        
      </Paper>

    </Wrapper>
  );
};

export default EventFormSubmitted;
