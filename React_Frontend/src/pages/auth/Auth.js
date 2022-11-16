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
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/formComponents/Input";
import AuthService from "../../services/auth";

const Auth = ({ setUser, user }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMobileNumberErrorMsg("");
    setPasswordErrorMsg("");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [mobileNumberErrorMsg, setMobileNumberErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMobileNumberErrorMsg("");
    setPasswordErrorMsg("");
    try {
      if (isLogin) {
        const res = await AuthService.loginCustomer({mobileNumber:form.mobileNumber, password: form.password});

        localStorage.setItem("profile", JSON.stringify(res.data));
        setUser(() => {
          return JSON.parse(localStorage.getItem("profile"));
        });
        navigate("/search");
      }else {
        const res = await AuthService.createCustomer(form);
        window.alert("Successfully account created");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert("There was a problem with the server, Colud not sign in");
      } else {
        if (err.response.status === 401) {
          setMobileNumberErrorMsg("Invalid credential");
          setPasswordErrorMsg("Invalid credential");
        } else {
          if (isLogin) {
            window.alert("Something went wrong, Colud not sign in");
          }else {
            window.alert("Something went wrong, Colud not sign up");
          }
          
        }
      }
    }
  };

  useEffect(() => {
    setUser(() => {
      return JSON.parse(localStorage.getItem("profile"));
    });
    if (user?.isAuthenticated) {
      navigate("/search");
    }
  }, [location]);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <>
          <Typography component="h1" variant="h5">
            {isLogin ? "Login" : "SignUp"}
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {!isLogin&&(<Input
                name="name"
                label="Full Name"
                value={form.name}
                handleChange={handleChange}
              />)}

              <Input
                name="mobileNumber"
                label="Mobile Number"
                value={form.mobileNumber}
                handleChange={handleChange}
                error={mobileNumberErrorMsg}
                errorText={mobileNumberErrorMsg}
              />
              <Input
                name="password"
                label="Password"
                value={form.password}
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                error={passwordErrorMsg}
                errorText={passwordErrorMsg}
              />
            </Grid>

            <Button
              type="submit"
              className={classes.submit}
              style={{ marginBottom: "15px", marginTop: "12px" }}
              fullWidth
              variant="contained"
              color="primary"
              disabled={(!form.mobileNumber || !form.password)|| (!isLogin&& !form.name)}
            >
              {isLogin ? "Login" : "SignUp"}
            </Button>
            <Typography component="h6" variant="h7">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>
            <Button
              // className={classes.submit}
              style={{ marginBottom: "15px", marginTop: "12px" }}
              fullWidth
              // variant="contained"
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({
                  name: "",
                  mobileNumber: "",
                  password: "",
                });
              }}
              color="primary"
            >
              {isLogin ? "SignUp" : "Login"}
            </Button>
          </form>
        </>
      </Paper>
    </Container>
  );
};

export default Auth;
