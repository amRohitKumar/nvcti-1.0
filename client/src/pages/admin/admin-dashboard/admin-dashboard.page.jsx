import { useEffect } from "react";
import { OngoingEventsAdmin } from "../../../components";
import { CircularProgress, Alert, Box } from "@mui/material";
import Wrapper from "./admin-dashboard.style";
import { useState } from "react";

const AdminDashboard = () => {
  // fetch applications for lab
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <Box sx={{display: 'flex'}}>
        <CircularProgress sx={{ mx: "auto", mt: 3 }} />;
      </Box>
    );
  }
  if (responses && responses.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{ width: { xs: "90%", md: "60%" }, mx: "auto" }}
      >
        There are no responses.
      </Alert>
    );
  }
  return (
    <Wrapper>
      <OngoingEventsAdmin events={responses} />
    </Wrapper>
  );
};

export default AdminDashboard;
