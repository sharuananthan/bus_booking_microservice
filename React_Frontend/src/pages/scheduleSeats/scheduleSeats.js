import { Grid, Typography, Container, Paper, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import seatService from "../../services/seatService";
import bookingService from "../../services/bookingService";
import useStyles from "./styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const ScheduleSeats = () => {
  const [seats, setSeats] = useState([]);
const location=useLocation();
  const getSeats = async () => {
    try {
      const res = await seatService.getSeatsForBusSchedule(location.state.scheduleId);
      console.log(res.data);
      setSeats(() => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useState(() => {
    getSeats();
  });
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {seats.map((seat) => (
              <Grid item xs={1} sm={2} md={3} key={seat.id}>
                <Item>
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label={seat.seatNumber}
                      value={seat.id}
                      checked = {!seat.isAvailable}
                    />
                  </FormGroup>
                </Item>
                {/* <Item>Seat Capacity: {bus.seatCapacity}</Item> */}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
                 component={Link}
                 to={`/dashboard`}
               
                style={{ marginBottom: "15px", marginTop: "12px" }}
                
                variant="contained"
                color="primary"
              >
                Go To Dashboard
              </Button>
      </Container>
    </>
  );
};
export default ScheduleSeats;
