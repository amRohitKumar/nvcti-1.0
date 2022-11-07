import { useEffect, useState } from "react";
import Wrapper from "./event.style";

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
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const NVCTIunit = ["Mechanical and Rapid Prototyping Unit", "Electronics Circuits and IoT Unit", "Gaming and Animation Design Unit", "Pouch Battery Cell Assembly Unit", "Robotics and Automation Unit"];

const CreateEvent = () => {
  const oo = useLocation();
  console.log(oo);
  // getting leader name (current user)
  const leaderName = useSelector(store => store.user.user.name);
  // form inputs
  const [category, setCategory] = useState("R&D Institute");
  const [unit, setUnit] = useState([false, false, false, false]);
  const [leader, setLeader] = useState({
    name: leaderName.toUpperCase(),
    uniqueId: "",
    imgUrl: "",
    institute: "",
    gender: "",
    address: "",
    email: "",
    mobile: "",
  });
  const [projectDetail, setProjectDetail] = useState({
    sourceOfFunding: "",
    projectTitle: "",
    projectObjective: "",
  });
  const [projectIdea, setProjectIdea] = useState({
    origin: "",
    methodology: "",
    outcome: "",
    timeOfCompletion: "",
    mentor: "",
  });
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState([]);
  const handleUnit = (idx) => {
    const data = unit.map((el, i) => (i === idx ? !el : el));
    setUnit(data);
  };
  const handleLeader = (e) => {
    setLeader({ ...leader, [e.target.name]: e.target.value });
  };
  const handleProjectDetail = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };
  const handleProjectIdea = (e) => {
    setProjectIdea({ ...projectIdea, [e.target.name]: e.target.value });
  };
  const handleMemberCount = (e) => {
    let members;
    if (!e.target.value || e.target.value <= 0) {
      members = 0;
    } else members = parseInt(e.target.value, 10);
    setMembers(
      Array(members).fill({
        name: "",
        imgUrl: "",
        uniqueId: "",
        institute: "",
        address: "",
        email: "",
        mobile: "",
        gender: "",
      })
    );
    setMemberCount(members);
  };
  const handleMembers = (e,idx) => {
    const data = members.map((el, i) => {
      if(i===idx){
        return {...el, [e.target.name]: e.target.value};
      }
      return el;
    });
    setMembers(data);
  }

  const handleSubmit = () => {
    let unitObj = unit.map((e,i) => e&&NVCTIunit[i]);
    unitObj = unitObj.filter(e => {
      if(e) return e;
    });
    const obj = {category, unit: unitObj, ...leader, ...projectDetail, ...projectIdea, members};
    console.table(obj);
  }

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
        <RadioGroup
          row
          aria-labelledby="application-category-radio"
          name="row-radio-buttons-group"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel
            value="Commercial"
            control={<Radio />}
            label="Commercial"
          />
          <FormControlLabel
            value="R&D Institute"
            control={<Radio />}
            label="R&D Institute"
          />
          <FormControlLabel
            value="Research Student (Internal/External)"
            control={<Radio />}
            label="Research Student (Internal/External)"
          />
          <FormControlLabel
            value="Internal UG/PG students"
            control={<Radio />}
            label="Internal UG/PG Students"
          />
        </RadioGroup>
        <Typography sx={{ mt: 3 }}>
          <span className="boldTypo">NVTIL UNIT whose access is requested</span>{" "}
          (✓ tick the appropriate)
        </Typography>
        <FormGroup row sx={{ gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox checked={unit[0]} onChange={() => handleUnit(0)} />
            }
            label="Mechanical and Rapid Prototyping Unit"
          />
          <FormControlLabel
            control={
              <Checkbox checked={unit[1]} onChange={() => handleUnit(1)} />
            }
            label="Electronics Circuits and IoT Unit"
          />
          <FormControlLabel
            control={
              <Checkbox checked={unit[2]} onChange={() => handleUnit(2)} />
            }
            label="Gaming and Animation Design Unit"
          />
          <FormControlLabel
            control={
              <Checkbox checked={unit[3]} onChange={() => handleUnit(3)} />
            }
            label="Pouch Battery Cell Assembly Unit"
          />
          <FormControlLabel
            control={
              <Checkbox checked={unit[4]} onChange={() => handleUnit(4)} />
            }
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
              name="name"
              type="text"
              required
              fullWidth
              color="primary"
              value={leader.name}
              onChange={(e) => setLeader({ ...leader, name: e.target.value })}
              disabled
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
                name="gender"
                value={leader.gender}
                label="Gender"
                fullWidth
                onChange={handleLeader}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
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
              name="uniqueId"
              type="text"
              value={leader.uniqueId}
              onChange={handleLeader}
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
              name="institute"
              type="text"
              value={leader.institute}
              onChange={handleLeader}
              required
              fullWidth
              label="Department/Institute/Organization"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="address"
              type="text"
              value={leader.address}
              onChange={handleLeader}
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
              name="email"
              type="email"
              value={leader.email}
              onChange={handleLeader}
              required
              fullWidth
              label="Email Id"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              name="mobile"
              type="number"
              value={leader.mobile}
              onChange={handleLeader}
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
              name="sourceOfFunding"
              value={projectDetail.sourceOfFunding}
              onChange={handleProjectDetail}
              label="Source of Funding (For category I to III):"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="projectTitle"
              value={projectDetail.projectTitle}
              onChange={handleProjectDetail}
              label="Title of the Project"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="projectObjective"
              value={projectDetail.projectObjective}
              onChange={handleProjectDetail}
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
                name="origin"
                value={projectIdea.origin}
                onChange={handleProjectIdea}
                label="Origin of the Idea (Max. five sentences)"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="methodology"
                value={projectIdea.methodology}
                onChange={handleProjectIdea}
                label="Methodology (Max. five sentences)"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="outcome"
                value={projectIdea.outcome}
                onChange={handleProjectIdea}
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
              type="text"
              name="timeOfCompletion"
              value={projectIdea.timeOfCompletion}
              onChange={handleProjectIdea}
              required
              fullWidth
              label="Expected time to complete the Project (in months)"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              type="text"
              name="mentor"
              value={projectIdea.mentor}
              onChange={handleProjectIdea}
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
          onChange={handleMemberCount}
        />
        {!!memberCount&&[...Array(memberCount)].map((_, idx) => (
          <MemberDetail key={idx} index={idx} member={members[idx]} handleMembers={handleMembers} />
        ))}
      </Paper>
      <Paper sx={{ mt: 4, p: 5, fontSize: "1.2em" }}>
        <Typography variant="h3" align="center">
          DECLARATION
        </Typography>
        <Box>
          <Box sx={{ letterSpacing: "1.2px", mb: 2 }}>
            I,&nbsp;{leaderName.toUpperCase()}&nbsp;(name of team leader) on my personal and on behalf of
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
        <Box sx={{ my: 2, py: 2, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontWeight: "bold" }}>Team Leader signature:</span>{" "}
            &nbsp;
            <input type="file" name="leader-sign" />
          </div>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default CreateEvent;
