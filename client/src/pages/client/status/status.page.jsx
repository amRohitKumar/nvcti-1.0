import { useDispatch, useSelector } from "react-redux";
import { PreviousStatusTable } from "../../../components";
import Wrapper from "./status.style";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

const StatusPage = () => {
  const dispatch = useDispatch();
  const { enrolledEvents } = useSelector((store) => store.user?.user);
  useEffect(() => {
    
  });
  if (enrolledEvents.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{ width: { xs: "90%", md: "60%" }, mx: "auto" }}
      >
        You are not currently enrolled in any programs.
      </Alert>
    );
  }
  return (
    <Wrapper>
      <PreviousStatusTable enrolledevents={enrolledEvents} />
    </Wrapper>
  );
};

export default StatusPage;
