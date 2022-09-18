import { format } from "date-fns";
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

const orders = [
  {
    name: "Ekaterina Tankova",
    deadline: 1555016400000,
    filledOn: 1585016400050,
    status: "rejected",
  },
  {
    name: "Cao Yu",
    deadline: 1555016400000,
    filledOn: 1585016400050,
    status: "rejected",
  },
  {
    name: "Alexa Richardson",
    deadline: 1554930000000,
    filledOn: 1584930000050,
    status: "accepted",
  },
  {
    name: "Anje Keizer",
    deadline: 1554757200000,
    filledOn: 1584757200050,
    status: "rejected",
  },
  {
    name: "Clarke Gillebert",
    deadline: 1554670800000,
    filledOn: 1584670800050,
    status: "accepted",
  },
  {
    name: "Adam Denisov",
    deadline: 1554670800000,
    filledOn: 1584670800050,
    status: "pending",
  },
];

const PreviousStatusTable = (props) => {
  return (
    <Wrapper>
      <Card
        {...props}
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
                  {Object.keys(orders[0]).map((item, idx) => {
                    return (
                      <TableCell key={idx} className="tableHeading">
                        {item}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>
                      {format(order.deadline, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(order.filledOn, "dd/MM/yyyy")}
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
