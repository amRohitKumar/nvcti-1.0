import Wrapper, { ElemWrapper } from "./submittedForm.style";
import { EventInput } from "./submittedForm.style";
import {
  Paper,
  Divider,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EventFormSubmitted = ({
  response,
  review,
  setReview,
  onAccept,
  onReject,
}) => {
  const { title, responses } = response;

  return (
    <Wrapper sx={{ width: "80%" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "1em",
          borderTop: "10px solid #828DF8",
        }}
      >
        <EventInput size="large">{title} </EventInput>
      </Paper>

      {responses.map(({ response, question }, idx) => (
        <ElemWrapper key={idx}>
          <Box sx={{ fontWeight: "500", width: "40%" }}>
            {question || "Question left blank"}
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ margin: "0 10px 0 10px" }}
          />
          {response && typeof response === "string" && (
            <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 0" }}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: "green" }} />
                {response}
              </Typography>
            </Box>
          )}
          {response && typeof response === "object" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "10px",
                flex: "1 1 0",
              }}
            >
              {response.options.length !== 0 &&
                response.options.map((option, idx) => (
                  <Typography
                    key={idx + option}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: "green" }} />
                    {option}
                  </Typography>
                ))}
              {response.other !== "" && (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ color: "green" }} />
                  {response.other}
                </Typography>
              )}
            </Box>
          )}
        </ElemWrapper>
      ))}
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          gap: "20px",
          marginTop: "2em",
        }}
      >
        <TextField
          value={review}
          onChange={(e) => setReview(e.target.value)}
          label="Review"
          multiline
          rows={4}
          sx={{ width: "60%", "@media (max-width: 900px)": { width: "90%" } }}
        />
        <div>
          <Button variant="contained" color="secondary" onClick={onAccept}>
            ACCEPT
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 1 }}
            onClick={onReject}
          >
            REJECT
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventFormSubmitted;
