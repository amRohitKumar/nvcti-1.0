import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../../features/events/eventsSlice";
import Wrapper from "./event.style";
import {
  EventInput,
  EventInputMultiline,
  CreateDivWrapper,
} from "./event.style";
import {
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Tooltip,
  IconButton,
  Box,
  Radio,
  RadioGroup,
  Typography,
  Checkbox,
  FormGroup,
  Grid,
  InputLabel,
} from "@mui/material";

import MemberDetail from "./member-detail";

const CreateEvent = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [fields, setFields] = useState(0);
  console.log(memberCount);
  return (
    <Wrapper sx={{ width: { lg: "75%", md: "80%", sm: "85%", xs: "95%" } }}>
      <Box>
        <Typography variant="h2" gutterBottom align="center">
          APPLICATION FORM TO ACCESS THE NVCTI LAB
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          (Please fill and submit your application to NVCTI office)
        </Typography>
      </Box>
      <Paper className="column-center" sx={{ my: 2, p: 2 }}>
        <Typography>
          <span className="boldTypo">Application Category*</span> (✓ tick the
          appropriate)
        </Typography>
        <Typography>
          <RadioGroup
            row
            aria-labelledby="application-category-radio"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="commercial"
              control={<Radio />}
              label="Commercial"
            />
            <FormControlLabel
              value="r&d"
              control={<Radio />}
              label="R&D Institute"
            />
            <FormControlLabel
              value="research"
              control={<Radio />}
              label="Research Student (Internal/External)"
            />
            <FormControlLabel
              value="ug/pg"
              control={<Radio />}
              label="Internal UG/PG Students"
            />
          </RadioGroup>
        </Typography>
        <Typography sx={{ mt: 3 }}>
          <span className="boldTypo">NVTIL UNIT whose access is requested</span>{" "}
          (✓ tick the appropriate)
        </Typography>
        <FormGroup row sx={{ gap: 1 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Mechanical and Rapid Prototyping Unit"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Electronics Circuits and IoT Unit"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Gaming and Animation Design Unit"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Pouch Battery Cell Assembly Unit"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Robotics and Automation Unit"
          />
        </FormGroup>
      </Paper>
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span className="boldTypo">Name of the Applicant </span>
              (Name of Team Leader in case of Team)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="leader-name"
              type="text"
              required
              fullWidth
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="leader-gender-select">Gender</InputLabel>
              <Select
                labelId="leader-gender-select"
                id="demo-simple-select"
                // value={age}
                label="Gender"
                fullWidth
                // onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>
              <span className="boldTypo">Admission No.</span> (For
              Students)/Emp. No. (for faculty and staff) / Aadhar No (for
              externals)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Admission No."
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Department/Institute/Organization"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Address (IIT-ISM students should write the Hostel address )"
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Email Id"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Mobile Number"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <input type="file" name="leader-img" id="" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              id=""
              label="Source of Funding (For category I to III):"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id=""
              label="Title of the Project"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id=""
              label="Objective of the Project (Max. two sentences)"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, letterSpacing: "1.1px" }}>
          <Typography>
            <span className="boldTypo">Pitch/Idea of the Project</span>{" "}
            (Describe in brief the concept and expected outcome of the project
            (Attach extra sheet if needed) A PDF file describing the background
            (origin of idea), Concepts involved, Method and Expected outcome,
            needs to attached by category I, II and III applicants.
          </Typography>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                id=""
                label="Origin of the Idea (Max. five sentences)"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id=""
                label="Methodology (Max. five sentences)"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id=""
                label="Expected Outcome (Max. five sentences)"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Expected time to complete the Project (in months)"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="leader-uid"
              type="text"
              required
              fullWidth
              label="Name of the Mentor (if any)"
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 4, p: 3 }}>
        <TextField
          label="Number of team members"
          variant="outlined"
          type="number"
          value={memberCount}
          onChange={(e) => setMemberCount(e.target.value)}
        />
        <MemberDetail />
      </Paper>
      <Paper sx={{ mt: 4, p: 3, fontSize: "1.2em" }}>
        <Typography variant="h3" align="center">
          DECLARATION
        </Typography>
        <Box>
          <Box sx={{ letterSpacing: "1.2px", mb: 2 }}>
            I,……………………..(name of team leader) on my personal and on behalf of
            all my members, do hereby state that
          </Box>
          <ul>
            <li>
              I/we shall access the facilities of NVCTI with due diligence and
              care, abiding by all the guidelines/instructions laid down by the
              center.
            </li>
            <li>
              I/we shall be responsible for any damage caused by me to the
              laboratory/infrastructural facility provided during the project.
            </li>
            <li>
              I/we hereby grant an exclusive right over the intellectual
              property generated under the research project done by me to IIT
              (ISM) Dhanbad.
            </li>
            <li>
              I/we hereby agree to follow all the rules and regulations of IIT
              (ISM) Dhanbad, including the IP Policy. 5.I/we hereby agree to
              inform IIT (ISM) Dhanbad about any commercialization of IP
              generated under the project, including commercialization through a
              start-up promoted by me. All the information provided here are
              correct
            </li>
          </ul>
        </Box>
        <Box
          sx={{
            dispay: "flex",
            m: 2,
            p: 2,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div>
            <span className="boldTypo">Date : </span>{" "}
            <span className="date-span">{Date()}</span>
          </div>
          <div>
            <input type="file" name="leader-sign" id="" />
          </div>
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default CreateEvent;
