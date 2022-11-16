import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import useStyles from "./styles";
import BusService from "../../services/bus";
import Input from "../../components/formComponents/Input";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { experimentalStyled as styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BusSchedule from "../busSchedule/BusSchedule";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Bus = () => {
  const [bus, setBus] = useState([]);
  const [busData, setBusData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBusData((values) => ({ ...values, [name]: value }));
    console.log(busData);
  };

  const getBus = async () => {
    try {
      const res = await BusService.getAllBuses();
      console.log(res.data);
      setBus(() => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBus();
  }, []);

  const addNewBus = async (e) => {
    e.preventDefault();
    console.log(busData);
    try {
      if(!isEdit){
        const res = await BusService.addBus({busNumber:busData.busNumber,seatCapacity:busData.seatCapacity});
        console.log(res.data);
        // window.location.reload(false);
        getBus();
        setBusData(() => []);
      }else{
        const res = await BusService.editBus(busData.busId,{busNumber:busData.busNumber,seatCapacity:busData.seatCapacity});
        console.log("edit"+res.data)
        getBus();
        setBusData(() => []);
        setIsEdit(false);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOneBus = async (e) => {
    window.alert("Are you sure you want to delete this bus?");
    await BusService.deleteBus(e);
    getBus();
  };

  const editOneBus = async (data) => {
    setIsEdit(true);
    setBusData(data);
    window.alert("Please edit in that fields");
    // getBus();
  };
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h6">
            Adding New Bus
          </Typography>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Input
                name="busNumber"
                value={busData.busNumber || ""}
                label="Bus Number"
                handleChange={handleChange}
              />
              <Input
                name="seatCapacity"
                value={busData.seatCapacity || ""}
                label="Seat Capacity"
                handleChange={handleChange}
              />
            </Grid>

            <Button
              // type="submit"
              onClick={addNewBus}
              className={classes.submit}
              style={{ marginBottom: "6px", marginTop: "12px" }}
              fullWidth
              variant="contained"
              color="primary"
              //   disabled={!form.email || !form.password}
            >
             {!isEdit? "ADD":"UPDATE"}
            </Button>
          </form>
        </Paper>
      </Container>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {bus.map((bus) => (
            <Grid item xs={8} sm={4} md={3} key={bus.id}>
              <Item>
                <Typography component="h2" variant="h6">
                  Bus Number: {bus.busNumber}
                </Typography>
                <Typography component="h2" variant="h6">
                  Bus Type: {bus.busType}
                </Typography>
                <Typography component="h2" variant="h6">
                  Bus Name: {bus.busName}
                </Typography>
                <Typography component="h2" variant="h6">
                  Bus Operator: {bus.busOperator}
                </Typography>
                <Typography component="h2" variant="h6">
                Seat Capacity: {bus.seatCapacity}
                </Typography>
                <Button color="error" onClick={() => deleteOneBus(bus.id)}>
                  <DeleteIcon fontSize="small" />
                </Button>
                <Button color="error" onClick={() => editOneBus({busId:bus.id,busNumber:bus.busNumber,seatCapacity:bus.seatCapacity})}>
                  <EditIcon fontSize="small" />
                </Button>
              </Item>
              {/* <Item>Seat Capacity: {bus.seatCapacity}</Item> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Bus;
