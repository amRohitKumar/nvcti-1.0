import React from "react";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import error from "../../assets/error.png";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2em",
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={4}
          sx={{
            display: "grid",
            justifyItems: { xs: "center", sm: "start" },
            alignContent: "center",
          }}
        >
          <Grid item xs={6} sm={12}>
            <img src={error} alt="Error" />
            <Typography
              sx={{
                fontSize: { xs: "1em", sm: "2.5em" },
                wordWrap: "no-wrap",
              }}
            >
              The page you're looking for doesn't exist.
            </Typography>
            <Button
              sx={{ marginTop: "2em" }}
              variant="contained"
              color="secondary"
              href="/"
            >
              Back To Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
