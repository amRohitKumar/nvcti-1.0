import { format } from "date-fns";
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

import Wrapper from "./ongoing-evetns.style";

const orders = [
  {
    name: "Ekaterina Tankova",
    deadline: 1555016400000,
    count: 54
  },
  {
    name: "Cao Yu",
    deadline: 1555016400000,
    count: 44
  },
  {
    name: "Alexa Richardson",
    deadline: 1554930000000,
    count: 58
  },
  {
    name: "Anje Keizer",
    deadline: 1554757200000,
    count: 27
  },
  {
    name: "Clarke Gillebert",
    deadline: 1554670800000,
    count: 8
  },
  {
    name: "Adam Denisov",
    deadline: 1554670800000,
    count: 96
  },
];

const OngoingEventsAdmin = (props) => {
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
          <Box sx={{ minWidth: 250, maxWidth: 1000, mx: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  {Object.keys(orders[0]).map((item,idx) => {
                    return (<TableCell key={idx} className="tableHeading">{item}</TableCell>)
                  })}
                  <TableCell></TableCell>
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
                        {order.count}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" size="small">
                        View applications
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

export default OngoingEventsAdmin;
