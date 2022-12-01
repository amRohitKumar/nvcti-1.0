import Wrapper from "./event.style";
import { Button } from "@mui/material";

const Event = ({ title, imageUrl }) => {
  return <Wrapper imageUrl={imageUrl}>
    <div className="content">
      {title}
      <br />
      <Button variant="contained" size="small" sx={{mt: 5}}>APPLY NOW</Button>
    </div>
  </Wrapper>;
};

export default Event;
