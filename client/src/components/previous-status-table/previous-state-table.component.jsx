import { format } from "date-fns";
import { useSelector } from "react-redux";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { StatusPill } from "../status-pill/status-pill.component";
import Wrapper from "./previous-state-table.style";

const orders = [
  {
    name: "Ekaterina Tankova",
    deadline: 1555016400000,
    filledOn: 1585016400050,
    status: "rejected",
  },
  {
    name: "Cao Yu",
    deadline: 1555016400000,
    filledOn: 1585016400050,
    status: "rejected",
  },
  {
    name: "Alexa Richardson",
    deadline: 1554930000000,
    filledOn: 1584930000050,
    status: "accepted",
  },
  {
    name: "Anje Keizer",
    deadline: 1554757200000,
    filledOn: 1584757200050,
    status: "rejected",
  },
  {
    name: "Clarke Gillebert",
    deadline: 1554670800000,
    filledOn: 1584670800050,
    status: "accepted",
  },
  {
    name: "Adam Denisov",
    deadline: 1554670800000,
    filledOn: 1584670800050,
    status: "pending",
  },
];

const PreviousStatusTable = ({ enrolledevents, ...otherProps }) => {
  const events = useSelector((store) => store.events?.events);
  console.log("events = ", events);
  const userEvents = [];
  enrolledevents.forEach((event) => {
    const [eventId, idx] = event.split(" ");
    events.forEach((event) => {
      if (event._id === eventId) {
        userEvents.push({
          title: event.title,
          endDate: event.endDate,
          startDate: event.startDate,
          status: event.responses[idx].at(-1).status,
        });
      }
    });
  });
  // console.log(userEvents);
  return (
    <Wrapper>
      <Card
        {...otherProps}
        sx={{
          my: 2,
          mx: 2,
          pb: 5,
        }}
      >
        <CardHeader
          title="Status"
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
                  <TableCell>Started On</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userEvents.map((event, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.startDate}</TableCell>
                    <TableCell>{event.endDate}</TableCell>
                    <TableCell>
                      <StatusPill
                        color={
                          (event.status === "accepted" && "success") ||
                          (event.status === "rejected" && "error") ||
                          "warning"
                        }
                      >
                        {(event.status).toUpperCase()}
                      </StatusPill>
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

export default PreviousStatusTable;
