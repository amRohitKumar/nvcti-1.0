import {default as MuiCarousel}  from "react-material-ui-carousel";
import Event from "../event/event.component";
import Wrapper from "./carousel.style";

/**
 *  @param  DisplayComponent Component to display in carousel
 *  @param  data carousel data
**/
const Carousell = ({data}) => {
  // Carousel settings
  const settings = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: false,
  };
  return (
    <Wrapper>
      <MuiCarousel {...settings} className="carousel-div">
        {data.map((item, idx) => (
          <Event
            key={idx}
            {...item}
          />
        ))}
      </MuiCarousel>
    </Wrapper>
  );
};

export default Carousell;
