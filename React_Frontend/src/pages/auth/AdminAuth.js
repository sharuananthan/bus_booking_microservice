import React, { useState, useEffect } from "react";
import { Avatar, Button,Paper,Grid,Typography, Container,TextField,} from "@mui/material";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/formComponents/Input";
import LoginService from "../../services/auth";

const AdminAuth = ({ setAdminUser, adminUser }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ userName: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setUserNameErrorMsg("");
    setPasswordErrorMsg("");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setUserNameErrorMsg("");
    setPasswordErrorMsg("");
    try {
      const res = await LoginService.loginAdmin(form);

      localStorage.setItem("adminProfile", JSON.stringify(res.data));
      setAdminUser(() => {
        return JSON.parse(localStorage.getItem("adminProfile"));
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        window.alert("There was a problem with the server, Colud not sign in");
      } else {
        if (err.response.status === 401) {
            setUserNameErrorMsg("Invalid credential");
          setPasswordErrorMsg("Invalid credential");
        } else {
          window.alert("Something went wrong, Colud not sign in");
        }
      }
    }
  };

  useEffect(() => {
    setAdminUser(() => {
      return JSON.parse(localStorage.getItem("adminProfile"));
    });
    if (adminUser) {
      navigate("/dashboard");
    }
  }, [location]);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={onLogin}>
            <Grid container spacing={2}>
              <Input
                name="userName"
                label="User Name"
                value={form.userName}
                handleChange={handleChange}
                error={userNameErrorMsg}
                errorText={userNameErrorMsg}
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
              disabled={!form.userName || !form.password}
            >
              Sign in
            </Button>
          </form>
        </>
      </Paper>
    </Container>
  );
};

export default AdminAuth;
