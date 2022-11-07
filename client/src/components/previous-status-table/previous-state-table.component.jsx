
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

const PreviousStatusTable = ({ enrolledevents, ...otherProps }) => {
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
                  <TableCell>Category</TableCell>
                  <TableCell>Applied On</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrolledevents.map((event, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.appliedOn}</TableCell>
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
