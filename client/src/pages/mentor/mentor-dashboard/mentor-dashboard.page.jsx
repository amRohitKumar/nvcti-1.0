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
} from "@mui/material";
import { StatusPill } from "../../../components/status-pill/status-pill.component";

import Wrapper from "./mentor-dashboard.style";

const orders = [
  {
    name: "Ekaterina Tankova",
    division: "cyber",
    status: "pending",
  },
  {
    name: "Cao Yu",
    division: "cyber",
    status: "accepted",
  },
  {
    name: "Alexa Richardson",
    division: "cyber",
    status: "pending",
  },
  {
    name: "Anje Keizer",
    division: "cyber",
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

const MentorDashboard = (props) => {
  return (
    <Wrapper>
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
            title="Cyber division participants"
            titleTypographyProps={{ fontSize: "2em" }}
            sx={{ ml: 5 }}
          />
          <Button variant="contained" sx={{ mr: "2em" }}>
            Forward to Super Admin
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

export default MentorDashboard;
