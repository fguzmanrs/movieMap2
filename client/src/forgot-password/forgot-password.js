import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
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
// import { Link } from 'react-router-dom';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();

  const [forgotPwdEmail, setforgotPwdEmail] = useState("");
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const email = e.target.value;

    console.log("🥞 email:", email);

    setforgotPwdEmail(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🧄submit form with email:", forgotPwdEmail);

    try {
      const res = await axios.post(
        "/api/users/forgotPassword",
        {
          email: forgotPwdEmail,
        },
        { withCredentials: true }
      );

      console.log("🍕 result of forgotpwd api call: ", res);

      if (res && res.data && res.data.status === "success") {
        console.log("🍇 res.data: ", res.data);

        //* User feedback message : success msg from back-end
        setMsg({
          isOpen: true,
          message: res.data.message,
          type: "success",
        });
      }

      //* Redirect to homepage
      setTimeout(() => {
        props.history.push("/");
      }, 3000);
    } catch (err) {
      console.log("🚨", err.response.data.message);

      //* User feedback message : error msg from back-end
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
      {/* {console.log("🥬", user)}
      {console.log("🐻", props, setCurrentUser)} */}
      {msg.isOpen && <Message isOpen={true} msg={msg} setMsg={setMsg} />}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <Button
            type="submit"
            // onClick={() => {props.history.push("/") }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Forgot Password
          </Button>
        </form>
      </div>
    </Container>
  );
}
