import React from "react";
import Wrapper, { ElemWrapper } from "./submittedForm.style";
import { EventInput } from "./submittedForm.style";
import { response } from "../../data";
import { Paper, Divider, Typography, Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EventFormSubmitted = () => {
  const { title, responses } = response;

  return (
    <Wrapper sx={{ width: { lg: "55%", md: "70%", sm: "80%", xs: "95%" } }}>
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
          <Typography sx={{ fontWeight: "500" }}>
            {question || "Question left blank"}
          </Typography>
          <Divider sx={{ marginBottom: "1em", marginTop: "1em" }} />
          {response && typeof response === "string" && (
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
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
                gap: "20px",
                flexDirection: "column",
              }}
            >
              {response.options.length !== 0 &&
                response.options.map((option, idx) => (
                  <Typography
                    key={idx + option}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "20px",
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
                    gap: "20px",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "20px",
        }}
      >
        <Button variant="contained" color="secondary">
          ACCEPT
        </Button>
        <Button variant="contained" color="error">
          REJECT
        </Button>
      </div>
    </Wrapper>
  );
};

export default EventFormSubmitted;
