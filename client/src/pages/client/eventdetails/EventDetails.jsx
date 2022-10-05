import * as React from "react";
import {
  Button,
  Container,
  Grid,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { event } from "../../../data/index";
import { TimeLine } from "../../../components";
import { InfoIcon, HowToRegIcon } from "../../../icons/icons";

const EventDetails = () => {
  return (
    <Container
      component="main"
      sx={{ paddingTop: "20px", backgroundColor: "#f2f2f2", marginTop: "10px" }}
    >
      <Grid
        container
        component="section"
        sx={{ justifyContent: "space-between", mb: "2em", gap: "1em" }}
      >
        <Grid item md={8.5} sm={12} component="section">
          <ImageList sx={{ borderRadius: "12px" }}>
            <ImageListItem cols={2} sx={{ position: "relative" }}>
              <img src={event.imgUrl} alt="" loading="lazy" />
              <a id="link" href="#details" style={{color:"black"}}>
                <InfoIcon
                  sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    document.getElementById("link").click();
                  }}
                  fontSize="large"
                />
              </a>
            </ImageListItem>
          </ImageList>
        </Grid>
        <Grid
          item
          component="aside"
          md={3.3}
          sm={12}
          sx={{
            boxShadow: "0 3px 16px 0 rgba(0,0,0,0.08)",
            borderRadius: "8px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              {/******************************************************************************************/}
              <TimeLine />
              {/******************************************************************************************/}
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderTopRightRadius: "0",
                borderTopLeftRadius: "0",
                backgroundColor: "rgb(241, 138, 29)",
              }}
              color="secondary"
              startIcon={<HowToRegIcon />}
            >
              Apply now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container component="section">
        <Grid item component="article" id="details">
          Entrepreneurs, Students of IIHTs and other educational
          Institutions/Universities, Innovators, researchers across India.
          Companies incorporated under the Companies Act 1956/2013, primarily a
          Micro, Small and Medium Enterprises (MSME) as defined in the MSMED
          Act, 2006. Any company registered as a Start-up, as defined, and
          recognized by the Department for Promotion of Industry and Internal
          Tra
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails;
