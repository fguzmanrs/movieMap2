import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(5),
    },
  },
}));

export default function Message({ isOpen, setMsgOpen }) {
  console.log("🥪 message alert inside, isOpen", isOpen);
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = (event, reason) => {
    console.log("🥙 handle close inside");
    setOpen(false);
    setMsgOpen(false);

    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
