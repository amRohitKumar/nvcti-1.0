import Wrapper from "../../pages/client/form/form.style";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const MemberDetail = ({member}) => {
  return (
    <Wrapper>
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography>
              <span className="boldTypo">Name of the Applicant </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              name="name"
              value={member.name}
              disabled
              type="text"
              required
              fullWidth
              color="primary"
              />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="leader-gender-select">Gender</InputLabel>
              <Select
                labelId="leader-gender-select"
                id="demo-simple-select"
                name="gender"
                value={member.gender}
                label="Gender"
                disabled
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <span className="boldTypo">Admission No.</span> (For
              Students)/Emp. No. (for faculty and staff) / Aadhar No (for
              externals)
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="uniqueId"
              type="text"
              value={member.uniqueId}
              disabled
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
              value={member.institute}
              disabled
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
              value={member.address}
              disabled
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
              value={member.email}
              disabled
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
              value={member.mobile}
              disabled
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
      </Paper>
    </Wrapper>
  );
};

export default MemberDetail;
