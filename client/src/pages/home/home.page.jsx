import Navbar from "./navbar";
import About from "./about";
import Missions from "./mission";
import Home from "./home";
import Videos from "./videos";
import globe from '../../assets/globe-bgg.png';


import Box from '@mui/material/Box';
import styled from "@emotion/styled";

const DesignedBox = styled(Box)({
    
});

const HomePage = () => {
  return (
    <DesignedBox>
      <Navbar />
      <Home />
      <About />
      <Missions />
      <Videos />
    </DesignedBox>
  );
};

export default HomePage;
