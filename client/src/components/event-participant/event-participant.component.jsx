import { useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";

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
import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeaders";

const ApplicationsList = ({ events, role, ...props }) => {
  const selectInitialState = new Array(events.length).fill(false);
  const { token } = useSelector((store) => store?.user?.user);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selectInitialState);
  const [emailId, setEmailId] = useState([]);
  const [text, setText] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCheckbox = (id) => {
    const newState = selected.map((item, idx) => (idx === id ? !item : item));
    setSelected(newState);
  };
  const handleAdd = () => {
    if (emailId.length < 3) {
      const newEmail = [...emailId, text];
      setEmailId(newEmail);
    }
    setText("");
  };
  const handleDelete = (id) => {
    const newEmail = emailId.filter((_, idx) => idx !== id);
    setEmailId(newEmail);
  };
  const handleMentorMail = async () => {
    try {
      handleClose();
      const applicants = [];
      for (let idx = 0; idx < events.length; idx++) {
        if (selected[idx]) {
          applicants.push(events[idx]._id);
        }
      }
      // console.log(emailId, applicants);
      await customFetch.post(
        "/evaluator/forward",
        { mails: emailId, applicants },
        authHeader(token)
      );
      setSelected(selectInitialState);
      setEmailId([]);
      toast.success("Forwarded to evaluator successfully !");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const handleSuperAdminMail = async () => {
    try {
      handleClose();
      const applicants = [];
      for (let idx = 0; idx < events.length; idx++) {
        if (selected[idx]) {
          applicants.push(events[idx]._id);
        }
      }
      // console.log(emailId, applicants);
      await customFetch.post(
        "/evaluator/forwardsuperadmin",
        { applicants },
        authHeader(token)
      );
      setSelected(selectInitialState);
      toast.success("Forwarded to super Admin successfully !");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="mentor-forward-modal"
        aria-describedby="Modal to forward students to mentor"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6">Forward to evaluator</Typography>
          <Box sx={{ my: 2, p: 1 }}>
            {emailId.map((email, idx) => (
              <Chip
                key={idx}
                sx={{ m: 0.5 }}
                label={email}
                onDelete={() => handleDelete(idx)}
              />
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
          <Button sx={{ mt: 2 }} variant="contained" onClick={handleMentorMail}>
            Forward
          </Button>
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
            title="Applications"
            titleTypographyProps={{ fontSize: "2em" }}
            sx={{ ml: 5 }}
          />
          {role === "ADMIN" ? (
            <Button variant="contained" sx={{ mr: "2em" }} onClick={handleOpen}>
              Forward to Mentor
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ mr: "2em" }}
              onClick={handleSuperAdminMail}
            >
              Forward to Super Admin
            </Button>
          )}
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Applied on</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Application</TableCell>
                  <TableCell align="center">Select</TableCell>{" "}
                  {/* FOR CHECKBOX */}
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((res, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{res.projectTitle}</TableCell>
                    <TableCell>
                      {format(new Date(res.updated_at), "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell>
                      <StatusPill
                        color={
                          (res.status === "accepted" && "success") ||
                          (res.status === "rejected" && "error") ||
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
                        onClick={() => openInNewTab(`/view/${res._id}`)}
                      >
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

export default ApplicationsList;
