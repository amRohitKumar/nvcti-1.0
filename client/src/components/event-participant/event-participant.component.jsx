import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// import { format } from "date-fns";

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
  Alert,
} from "@mui/material";
import { StatusPill } from "../status-pill/status-pill.component";

import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeaders";
import Wrapper from "./event-participant.style";
import CircularLoader from "../loader/circular-loader.component";

const ApplicationsList = ({ events, role, ...props }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((store) => store?.user?.user);
  useEffect(() => {
    const fetchEventApplications = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/event/${eventId}/applications`,
          authHeader(token)
        );
        console.log(resp);
        setApplications(resp.data.applications);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong while fetching applicants list !");
      }
    };
    fetchEventApplications();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  if (applications && applications.length === 0) {
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
            title="Applications"
            titleTypographyProps={{ fontSize: "2em" }}
            sx={{ ml: 5 }}
          />
          blah
        </Box>
        <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Serial No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Applied on</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Application</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((res, idx) => (
                <TableRow hover key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{res.projectTitle}</TableCell>
                  <TableCell>
                    {res.time}
                    {/* {format(new Date(res.updated_at), "dd-MM-yyyy")} */}
                  </TableCell>
                  <TableCell>
                    <StatusPill
                      color={
                        (res.status.toLowerCase() === "accepted" &&
                          "success") ||
                        (res.status.toLowerCase() === "rejected" && "error") ||
                        "warning"
                      }
                    >
                      {res.status}
                    </StatusPill>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/${res._id}/view`)}
                    >
                      View application
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Wrapper>
  );
};

export default ApplicationsList;
