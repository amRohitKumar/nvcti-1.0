import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
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
} from "@mui/material";

import StatusPill from "../status-pill/status-pill.component";
import Wrapper from "./ongoing-evetns.style";
import { changedateformat } from "../../utils/dateformat";
import { useNavigate } from "react-router-dom";

// const orders = [
//   {
//     name: "Ekaterina Tankova",
//     deadline: 1555016400000,
//     count: 54,
//   },
//   {
//     name: "Cao Yu",
//     deadline: 1555016400000,
//     count: 44,
//   },
//   {
//     name: "Alexa Richardson",
//     deadline: 1554930000000,
//     count: 58,
//   },
//   {
//     name: "Anje Keizer",
//     deadline: 1554757200000,
//     count: 27,
//   },
//   {
//     name: "Clarke Gillebert",
//     deadline: 1554670800000,
//     count: 8,
//   },
//   {
//     name: "Adam Denisov",
//     deadline: 1554670800000,
//     count: 96,
//   },
// ];

const OngoingEventsAdmin = ({ events, ...otherProps }) => {
  const navigate = useNavigate();
  console.log(events);
  return (
    <Wrapper>
      <Card
        {...otherProps}
        sx={{
          my: 2,
          mx: 2,
        }}
      >
        <CardHeader
          title="Events"
          titleTypographyProps={{ fontSize: "2em" }}
          sx={{ ml: 5 }}
        />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Applied on</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Responses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{event.projectTitle}</TableCell>
                    <TableCell>{format(new Date(event.updated_at), "dd-MM-yyyy")}</TableCell>
                    <TableCell>
                      {<StatusPill
                        color={
                          (event.status === "accepted" && "success") ||
                          (event.status === "rejected" && "error") ||
                          "warning"
                        }
                      >
                        {(event.status).toUpperCase()}
                      </StatusPill>}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`event/${event._id}`, {
                            state: {eventName: event.title, responses: event.responses},
                          })
                        }
                      >
                        View responses
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

export default OngoingEventsAdmin;
