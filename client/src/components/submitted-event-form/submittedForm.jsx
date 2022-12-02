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

const EventFormSubmitted = ({ response, handleStatus }) => {
  return (
    <Wrapper sx={{ width: "80%" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "1em",
          mt: 4,
          borderTop: "10px solid #828DF8",
        }}
      >
        <EventInput size="large">Response </EventInput>
      </Paper>

      {response.map(({ response, question }, idx) => (
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
          justifyContent: "center",
          gap: "20px",
          marginTop: "2em",
        }}
      >
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => handleStatus("accepted")}
        >
          ACCEPT
        </Button>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{ ml: 1 }}
          onClick={() => handleStatus("rejected")}
        >
          REJECT
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventFormSubmitted;
