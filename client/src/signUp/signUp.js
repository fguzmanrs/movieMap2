import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Message from "../message/message";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  // Context API's global state data : setting user func
  const { setCurrentUser } = props;

  // Local state data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [user, setUser] = useState(null);
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set current typing input to local state
    name === "username"
      ? setUsername(value)
      : name === "firstName"
      ? setFirstName(value)
      : name === "lastName"
      ? setLastName(value)
      : name === "email"
      ? setEmail(value)
      : setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧄signup submit form");

    try {
      const res = await axios.post(
        // "http://localhost:3000/api/users/signup",
        "/api/users/signup",
        {
          username,
          password,
          firstName,
          lastName,
          email,
        },
        { withCredentials: true }
      );

      console.log("🥒", res);
      const userData = res.data.data;
      console.log("🍇 new userData: ", userData);

      if (res.data.status === "success") {
        //* User feedback message : success msg from back-end
        setMsg({
          isOpen: true,
          message: res.data.message,
          type: "success",
        });

        //* Save user's data to local state
        // setUser(userData);

        //* Save user's data to context state so parent comp can use it
        setCurrentUser(userData);
      }

      // Default input fields
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");

      // Redirect to homepage
      setTimeout(() => {
        props.history.push("/");
      }, 3000);
    } catch (err) {
      console.log("🚨", err.response.data.message);

      if (err.response && err.response.data) {
        //* User feedback message : error msg from back-end
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
      {/* {console.log("🐣 props:", props)}
      {console.log("🐣 state:", firstName, lastName, username, email, password)} */}
      {msg.isOpen && <Message isOpen={true} msg={msg} setMsg={setMsg} />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
