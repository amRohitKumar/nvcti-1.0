import React from "react";
import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import Box from "@mui/material/Box";
import { QueryBuilderRoundedIcon } from "../../icons";
import { changedateformat } from "../../utils/dateformat";
const TimeLine = ({ startDate, endDate }) => {
  return (
    <Box>
      <Timeline position="right">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", color: "#2e7d32" }}
            align="right"
            variant="body2"
          >
            {/* {changedateformat(startDate)} */}
            {startDate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#2e7d32" }}>
              <QueryBuilderRoundedIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{mb: 5}}>
            <Typography sx={{ color: "#2e7d32" }}>
              Application Starts Date
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", color: "#d81b60" }}
            align="right"
            variant="body2"
          >
            {/* {changedateformat(endDate)} */}
            {endDate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#d81b60" }}>
              <QueryBuilderRoundedIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{mt: 5}}>
            <Typography sx={{ color: "#d81b60" }}>
              Application Ends Date
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};

export default TimeLine;
