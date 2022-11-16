import React, { useState, useEffect } from "react";

import useStyles from "./styles";
import BusScheduleService from "../../services/busSchedule";
import {
  Container,
  Grid,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const classes = useStyles();

  const [busSchedules, setBusSchedules] = useState([]);

  const getBusSchedules = async () => {
    try {
      const res = await BusScheduleService.getAllBusSchedules();
      console.log(res.data);
      setBusSchedules(() => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBusSchedules();
  }, []);

  return (
    <>
      <Grid>
        <Button
          component={Link}
          to={`/bus`}
          style={{ marginBottom: "15px", marginTop: "12px" }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Add Bus
        </Button>
        <Button
          component={Link}
          to={`/busSchedule`}
          className={classes.submit}
          style={{ marginBottom: "15px", marginTop: "12px" }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Add Schedule
        </Button>
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {busSchedules.map((busSchedule) => (
            <Grid item xs={8} sm={4} md={3} key={busSchedule.id}>
              <Item>
                <Typography component="h2" variant="h6">
                  From: {busSchedule.startLocation}
                </Typography>
                <Typography component="h2" variant="h6">
                  To: {busSchedule.destination}
                </Typography>
                <Typography component="h2" variant="h6">
                  Departure Time: {busSchedule.departureTime}
                </Typography>
                <Typography component="h2" variant="h6">
                  Arrival Time: {busSchedule.arrivalTime}
                </Typography>
                <Typography component="h2" variant="h6">
                  Ticket Pice: {busSchedule.ticketPrice}
                </Typography>

                <Button
                  component={Link}
                  to={`/admin/bookings`}
                  state={{ scheduleId: busSchedule.id }}
                  color="primary"
                  backgroundColor="primary"
                  // onClick={() => seatForOneBus(busSchedule.id)}
                >
                  View Bookings
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
