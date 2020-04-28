import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";
import Message from "../message/message";

import "./signIn.css";

// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const { setCurrentUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  // const handleForgotPassword = async (e) => {
  //   try {
  //     await axios.get("");
  //   } catch (err) {}
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧄submit form");

    try {
      const res = await axios.post(
        // "http://localhost:3000/api/users/login",
        "/api/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      console.log("🥒 logged in: ", res);
      const userData = res.data.data;

      // Save user's data to local state
      // setUser(userData);
      // Save user's data to context state so parent comp can use it
      setCurrentUser(userData);

      // Default input fields
      setUsername("");
      setPassword("");

      // Redirect to homepage
      props.history.push("/");
    } catch (err) {
      console.log("🚨", err.response.data.message);

      //* If err occurred, popup feedback message alert
      if (err.response && err.response.data) {
        setMsg({
          isOpen: true,
          message: err.response.data.message,
          type: "error",
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {msg.isOpen && <Message isOpen={true} msg={msg} setMsg={setMsg} />}
      {/* {console.log("🥬", user)}
      {console.log("🐻", props, setCurrentUser)} */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <Link href="/home"> */}
          <Button
            type="submit"
            // onClick={() => {props.history.push("/") }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {/* </Link> */}

          <Grid container className="signinLink">
            <Grid item xs>
              <RouterLink to="/forgotpassword" variant="body2">
                Forgot password?
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/signUp" variant="body2">
                {"Don't have an account? SignUp"}
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
