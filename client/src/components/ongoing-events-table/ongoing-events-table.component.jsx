import { format } from "date-fns";
import { v4 as uuid } from "uuid";
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

import Wrapper from "./ongoing-events-table.style";

const orders = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 30.5,
    customer: {
      name: "Ekaterina Tankova",
    },
    createdAt: 1555016400000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Cao Yu",
    },
    createdAt: 1555016400000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "Alexa Richardson",
    },
    createdAt: 1554930000000,
    status: "refunded",
  },
  {
    id: uuid(),
    ref: "CDD1046",
    amount: 96.43,
    customer: {
      name: "Anje Keizer",
    },
    createdAt: 1554757200000,
    status: "pending",
  },
  {
    id: uuid(),
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Clarke Gillebert",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam Denisov",
    },
    createdAt: 1554670800000,
    status: "delivered",
  },
];

const OngoingEventsTable = (props) => {
  return (
    <Wrapper>
      <Card
        {...props}
        sx={{
          my: 2,
          mx: 2,
        }}
      >
        <CardHeader
          title="Ongoing Events"
          titleTypographyProps={{ fontSize: "2em" }}
          sx={{ ml: 5 }}
        />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 250, maxWidth: 1200, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial Number</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, idx) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {format(order.createdAt, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button variant="contained" size="small">
                        Know more
                      </Button>{" "}
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

export default OngoingEventsTable;
