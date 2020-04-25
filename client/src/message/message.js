import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {
    bottom: "auto",
    top: "8vh",
  },
}));

export default function Message({ isOpen, msg, setMsg }) {
  console.log("🥪 message alert inside, isOpen", isOpen);

  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = (event, reason) => {
    console.log("🥙 handle close inside");

    setOpen(false);
    setMsg({ ...msg, isOpen: false });

    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Snackbar
      className={classes.root}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={msg.type}>
        {msg.message}
      </Alert>
    </Snackbar>
  );
}
