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
  Checkbox,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import { StatusPill } from "../status-pill/status-pill.component";

import Wrapper from "./event-participant.style";
import { modalStyle } from "./event-participant.style";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const [selected, setSelected] = useState(
    new Array(orders.length).fill(false)
  );
  const [emailId, setEmailId] = useState(["this@gmail.com", "this2@gmail.com"]);
  const [text, setText] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { eventId } = useParams();

  const handleCheckbox = (id) => {
    const newState = selected.map((item, idx) => (idx === id ? !item : item));
    setSelected(newState);
  };
  const handleAdd = () => {
    if(emailId.length < 3){
      const newEmail = [...emailId, text];
      setEmailId(newEmail);
    }
    setText("");
  }
  const handleDelete = (id) => {
    const newEmail = emailId.filter((_, idx) => idx !== id);
    setEmailId(newEmail);
  };

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
          <Typography variant="h6">
            Forward {eventId} event to mentor
          </Typography>
          <Box sx={{my: 2, p: 1}}>
            {emailId.map((email, idx) => (
              <Chip sx={{m: 0.5}} label={email} onDelete={() => handleDelete(idx)} />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              label="Outlined"
              variant="standard"
              value={text}
              onChange={(e) => setText(e.target.value)}
              helperText="Maximum 3 emailIds"
            />
            <IconButton aria-label="add" size="large" onClick={handleAdd}>
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
          </Box>
          <Button sx={{mt: 2}} variant="contained">Forward</Button>
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
                  <TableCell align="center">Applications</TableCell>
                  {/* FOR APPLICATION BUTTON */}
                  <TableCell></TableCell> {/* FOR CHECKBOX */}
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
                    <TableCell align="center">
                      <Checkbox
                        checked={selected[idx]}
                        onChange={() => handleCheckbox(idx)}
                      />
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
