import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

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
          <Grid xs={6} sm={12}>
            <img src="" alt="Error" />
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
              href="/login"
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
