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
import { useLocation ,useNavigate} from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Booking = ({user}) => {
  // const customerId = 1;
  const classes = useStyles();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location= useLocation();
  const navigate=useNavigate();
  const handleSeatSelection = (event) => {
    if (event.target.checked) {
      setSelectedSeats([...selectedSeats, event.target.value]);
    } else {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== event.target.value)
      );
    }
    console.log(selectedSeats);
  };
  const createBooking = async () => {
    try {
      const response = await bookingService.createBooking({
        customerId: user.customerId,
        seats: selectedSeats,
      });
      window.alert(response.data.customerName+", Booking created successfully"+"\n"+"Booking Time:"+response.data.bookingTime+"\n"+"Booking ID:"+response.data.id+"\n"+"Bus Number:"+response.data.busNumber+"\n"+"Seats:"+response.data.seats);
      navigate("/search");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

  };

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
                      disabled={!seat.isAvailable}
                      control={<Checkbox />}
                      label={seat.seatNumber}
                      value={seat.id}
                      onChange={handleSeatSelection}
                    />
                  </FormGroup>
                </Item>
                {/* <Item>Seat Capacity: {bus.seatCapacity}</Item> */}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
          onClick={createBooking}
          className={classes.submit}
          style={{ marginBottom: "15px", marginTop: "12px" }}
          fullWidth
          variant="contained"
          color="primary"
          //   disabled={!form.email || !form.password}
        >
          Book
        </Button>
      </Container>
    </>
  );
};
export default Booking;
