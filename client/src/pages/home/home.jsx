import { Box, Typography } from "@mui/material";
import React from "react";
import ismSky from "../../assets/ismSky.jpeg";
import { Typewriter } from "./typewriter";

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(0deg,rgba(11,11,13,0.6),rgba(11,11,13,.5)),url(${ismSky})`,
          width: "100%",
          height: "101vh",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Typewriter />
      </Box>
      <Box
        sx={{
          padding: "4em 3em 2em",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        id="home"
      >
        <Box>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              letterSpacing: "5px",
              mb: "20px",
            }}
          >
            OUR BENEFACTOR: SHRI NARESH VASHISHT JI
          </Typography>
          <Typography>
            Shri Naresh Vashisht, ISM alumni class of Petroleum Engineering
            1967, is the founder and currently the President of Omimex Resources
            Inc. Texas, USA. Despite facing a lot of hardships right from his
            childhood, it was his will to learn and a sharp mind that landed him
            at our prestigious institution and helped him in his lifetime of
            astounding success. Mr Vashisht made a generous and selfless
            donation to our college as he helped in the establishment of our
            first tinkering and innovation lab, NVCTI, which is named after him.
            He believes it is his payback and contribution to the institute that
            laid the groundwork for shaping him into who he was today. His
            valuable message for the students: “All you have to do is give your
            best and do not worry about the results. The result is anyway beyond
            your control, so there is no point worrying about that. Just put in
            your sincere effort and give your best.”
          </Typography>
        </Box>
        <Box>
          <img
            src="https://nvcti-iitism.herokuapp.com/static/media/Naresh_Vashisht_Ji-without-bg.69c65103.png"
            style={{ width: "15em", height: "15em" }}
            alt="Naresh_Vashisht_Ji"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
