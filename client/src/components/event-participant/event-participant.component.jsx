import { useState } from "react";
import { useParams } from "react-router-dom";
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
  Modal,
  Typography,
} from "@mui/material";
import { StatusPill } from "../status-pill/status-pill.component";

import Wrapper from "./event-participant.style";
import { modalStyle } from "./event-participant.style";

const orders = [
  {
    name: "Ekaterina Tankova",
    division: "cyber",
    status: "pending",
  },
  {
    name: "Cao Yu",
    division: "electrical",
    status: "accepted",
  },
  {
    name: "Alexa Richardson",
    division: "electrical",
    status: "pending",
  },
  {
    name: "Anje Keizer",
    division: "mechanical",
    status: "rejected",
  },
  {
    name: "Clarke Gillebert",
    division: "cyber",
    status: "accepted",
  },
  {
    name: "Adam Denisov",
    division: "cyber",
    status: "rejected",
  },
];

const EventParticipants = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { eventId } = useParams();
  console.log(eventId);
  return (
    <Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="mentor-forward-modal"
        aria-describedby="Modal to forward students to mentor"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Forward {eventId} event to mentor
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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
            title={`Event ${eventId}`}
            titleTypographyProps={{ fontSize: "2em" }}
            sx={{ ml: 5 }}
          />
          <Button variant="contained" sx={{ mr: "2em" }} onClick={handleOpen}>
            Forward to Mentor
          </Button>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  {Object.keys(orders[0]).map((item, idx) => {
                    return (
                      <TableCell key={idx} className="tableHeading">
                        {item}
                      </TableCell>
                    );
                  })}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {order.division}
                    </TableCell>
                    <TableCell>
                      <StatusPill
                        color={
                          (order.status === "accepted" && "success") ||
                          (order.status === "rejected" && "error") ||
                          "warning"
                        }
                      >
                        {order.status}
                      </StatusPill>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" size="small">
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

export default EventParticipants;
