import { useEffect } from "react";
import {toast} from "react-toastify";
import { CircularLoader, ApplicationsList, OngoingEventsTable } from "../../../components";
import {Alert } from "@mui/material";
import Wrapper from "./admin-dashboard.style";
import { useState } from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  // fetch applications for lab
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try{
        setIsLoading(true);
        const resp = await customFetch.get(`/event/allevents`);
        setResponses(resp.data.allevents);
        setIsLoading(false);
      } catch(err){
        console.log(err);
        setIsLoading(false);
        toast.error("Somehint went wrong while fetching applicatins");
      }
    }
    fetchApplications();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <CircularLoader/>
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
      <OngoingEventsTable events={responses} role="ADMIN" />
    </Wrapper>
  );
};

export default AdminDashboard;
