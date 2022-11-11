import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/userAuthHeaders";
import {toast} from 'react-toastify';
import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert
} from "@mui/material";
import { CircularLoader } from "../../../components";
import { StatusPill } from "../../../components/status-pill/status-pill.component";

import Wrapper from "./superAdmin-dashboard.style";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const SuperAdminDashboard = (props) => {
  const navigate = useNavigate();
  const {token} = useSelector(store => store.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try{
        setIsLoading(true);
        const resp = await customFetch.get(`/evaluator/applicants`, authHeader(token));
        // console.log(resp.data);
        setResponses(resp.data.applications);
        setIsLoading(false);
      } catch(err){
        console.log(err);
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
        There are no applications.
      </Alert>
    );
  }
  return (
    <Wrapper>
      <Card
        {...props}
        sx={{
          my: 2,
          mx: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardHeader
            title="Applications - "
            titleTypographyProps={{ fontSize: "2em" }}
            sx={{ ml: 5 }}
          />
          {/* <Button variant="contained" sx={{ mr: "2em" }}>
            Post result
          </Button> */}
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Applied on</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responses.map((form, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{form.name}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {form.category}
                    </TableCell>
                    <TableCell>
                      {format(new Date(form.updated_at), "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell>
                      <StatusPill
                        color={
                          (form.status === "accepted" && "success") ||
                          (form.status === "rejected" && "error") ||
                          "warning"
                        }
                      >
                        {form.status}
                      </StatusPill>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" size="small" onClick={() => navigate(`/view/${form._id}`)}>
                        View application
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Wrapper>
  );
};

export default SuperAdminDashboard;
