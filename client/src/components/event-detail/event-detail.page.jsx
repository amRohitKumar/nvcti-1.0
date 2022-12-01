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

const EventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const eventObj = {
    banner:
      "https://images.unsplash.com/photo-1664575196412-ed801e8333a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
    startDate: "22/10/2022",
    endDate: "23/10/2022",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium neque eligendi beatae, consequuntur reiciendis possimus ab ipsum nostrum quia fugit! Magni, ab a! Commodi nulla dolorem explicabo repellat minus veritatis ullam pariatur dolor voluptate qui voluptatem doloribus error officiis neque, placeat porro at ipsum natus architecto, voluptatibus voluptatum fugit exercitationem? Delectus voluptatum aut beatae mollitia."
  };
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
                src={eventObj.banner}
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
              <TimeLine
                startDate={eventObj.startDate}
                endDate={eventObj.endDate}
              />
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
              onClick={() => navigate(`/client/apply/${eventId}`)}
            >
              Apply now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container component="section">
        <Grid item component="article" id="details">
          {eventObj.description}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventPage;
