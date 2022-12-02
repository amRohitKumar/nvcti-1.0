import {
  Button,
  Container,
  Grid,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
// import { event } from "../../../data/index";
import TimeLine from "../timeline/timeline.component";
import { InfoIcon, HowToRegIcon } from "../../icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import customFetch from "../../utils/axios";
import { CircularLoader } from "../../components";

const EventPage = ({ role }) => {
  const [event, setEvent] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { eventId } = useParams();
  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const resp = await customFetch.get(`/event/${eventId}`);
      console.log(resp);
      setEvent(resp.data.event);
      setLoading(false);
    };
    fetchEvent();
  }, []);

  if (isLoading) {
    return <CircularLoader />;
  }

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
              <img
                src={event.imageUrl}
                alt="Event banner"
                loading="lazy"
                style={{ maxHeight: "500px", aspectRatio: "1/1" }}
              />
              <a id="link" href="#details" style={{ color: "black" }}>
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
              <TimeLine startDate={event.startTime} endDate={event.endTime} />
              {/******************************************************************************************/}
            </Box>

            {role !== "ADMIN" && (
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
                onClick={() => navigate(`/client/apply/${eventId}`)}
              >
                Apply now
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container component="section">
        <Grid item component="article" id="details">
          {event.description}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventPage;
