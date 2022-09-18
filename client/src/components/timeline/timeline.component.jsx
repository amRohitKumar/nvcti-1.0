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
import { QueryBuilderRoundedIcon } from "../../icons/icons";
import { event } from "../../data/index";

const TimeLine = () => {
  return (
    <Timeline position="right">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", color: "#2e7d32" }}
          align="right"
          variant="body2"
        >
          {event.startDate}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{ backgroundColor: "#2e7d32" }}>
            <QueryBuilderRoundedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
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
          {event.endDate}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{ backgroundColor: "#d81b60" }}>
            <QueryBuilderRoundedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography sx={{ color: "#d81b60" }}>
            Application Ends Date
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0", color: "#1976d2" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {event.resultDate}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot sx={{ backgroundColor: "#1976d2" }}>
            <QueryBuilderRoundedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography sx={{ color: "#1976d2" }}>
            Application Results Date
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimeLine;
