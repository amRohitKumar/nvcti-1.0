import { useNavigate } from "react-router-dom";
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

// const orders = [
//   {
//     name: "Ekaterina Tankova",
//     deadline: 1555016400000,
//   },
//   {
//     name: "Cao Yu",
//     deadline: 1555016400000,
//   },
//   {
//     name: "Alexa Richardson",
//     deadline: 1554930000000,
//   },
//   {
//     name: "Anje Keizer",
//     deadline: 1554757200000,
//   },
//   {
//     name: "Clarke Gillebert",
//     deadline: 1554670800000,
//   },
//   {
//     name: "Adam Denisov",
//     deadline: 1554670800000,
//   },
// ];

const OngoingEventsTable = ({ events, ...otherProps }) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Card
        {...otherProps}
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
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, idx) => (
                  <TableRow hover key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.endDate}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`event/${event._id}`, {
                            state: {
                              banner: event.banner,
                              description: event.description,
                              endDate: event.endDate,
                              startDate: event.startDate,
                            },
                          })
                        }
                      >
                        Know more
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

export default OngoingEventsTable;
