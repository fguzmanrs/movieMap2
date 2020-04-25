import React, { useRef, useState, useContext } from "react";
//import { Link } from "./node_modules/react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import Autocomplete from "./node_modules/@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import updateSettings from "../util/updateSettings";
import Button from "@material-ui/core/Button";
//import IconButton from "./node_modules/@material-ui/core/IconButton";
//import PhotoCamera from "./node_modules/@material-ui/icons/PhotoCamera";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
//import Icon from "./node_modules/@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import CurrentUserContext from "../context/current-user.context";

//import "./profile.style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "50px auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1.5),
  },
}));

export default function Profile(props) {
  const classes = useStyles();

  console.log("🌽profile's user: ", props.user);
  const currentUserContext = useContext(CurrentUserContext);

  // const [userFirtName, setUserFirstName] = useState(
  //   currentUserContext.currentUser.firstName
  // );
  // const [userLastName, setUserLastName] = useState(
  //   currentUserContext.currentUser.lastName
  // );

  //! Update user's data in App.js
  // to instantly update navbar's user image when a user update a photo here
  //* Solution 1: use seperate photo context
  // currentUserContext.setCurrentPhoto = (newPhoto) => {
  //   props.setCurrentPhoto(newPhoto);
  // };
  //* Solution 2: partially update user's context
  // currentUserContext.setCurrentUser = (firstName, lastName, photo) => {
  //   props.setCurrentUser({ ...props.currentUser, firstName, lastName, photo });
  // };
  //* Solution 3: update with the whole new user obj using setCurrentUser

  //! Handle submit user's basic info
  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    const { firstName, lastName, photo } = e.currentTarget.elements;

    // console.log(
    //   "🍖form data(firstname.value, lastname.value, photo, photo.files): ",
    //   firstName.value,
    //   lastName.value,
    //   photo,
    //   photo.files
    // );

    const form = new FormData();
    form.append("firstName", firstName.value);
    form.append("lastName", lastName.value);
    form.append("photo", photo.files[0]);
    // console.log("🌭 form", form.get("firstName"));

    //! Send updated data to server
    const updatedUser = await updateSettings(form, "accountInfo");
    console.log("🍣", updatedUser.photo);

    //* Update user's photo in App.js
    // currentUserContext.setCurrentPhoto(updatedUser.photo);
    // currentUserContext.setCurrentUser(
    //   updatedUser.firstName,
    //   updatedUser.lastName,
    //   updatedUser.photo
    // );
    currentUserContext.setCurrentUser(updatedUser.user);

    // setUserFirstName(updatedUser.firstName);
    // setUserLastName(updatedUser.LastName);

    //* Reload page
    // props.history.push("/profile");
    // window.location.replace("/profile");
    // reload();
  };

  //! Handle submit user's password
  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const { currentPassword, newPassword } = e.currentTarget.elements;

    console.log(
      "🥓form data(currentPassword.value, newPassword.value): ",
      currentPassword.value,
      newPassword.value
    );

    const data = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };

    //! Send updated data to server
    updateSettings(data, "password");
    console.log("🍢", props);
    // props.push("/profile");
  };

  return (
    <div className={classes.root}>
      {console.log(
        "🍤 current user contextAPI: ",
        currentUserContext.currentUser
      )}
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Change User Account Info
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          <form onSubmit={handleSubmitAccount}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="flex-start">
              <Grid item xs={12} sm={4}>
                <TextField
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  defaultValue={currentUserContext.currentUser.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  defaultValue={currentUserContext.currentUser.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid item xs={12}>
                  <Button raised="raised" component="label" color="primary">
                    <CloudUploadIcon />
                      &nbsp;&nbsp;Profile Image<input style={{ display: "none" }} type="file" name="photo" />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}>Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Change Password</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form onSubmit={handleSubmitPassword}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="flex-start">
              <Grid item xs={12} sm={4}>
                <TextField
                  id="currentPassword"
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type="password"
                // defaultValue=""
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid item xs={12}>
                
                </Grid>
                <Grid item xs={12}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}>Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div >
  );
}

// function reload() {
//   const current = props.location.pathname;
//   props.history.replace(`/reload`);
//   // Not updating data part in the page, just reloading and return the same previous page even if data is updated. Not suitable for injecting updated data to page.
//   setTimeout(() => {
//     props.history.replace(current);
//   });
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "50%",
//     margin: "0 auto",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: "33.33%",
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));
// export default function ControlledExpansionPanels() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div className={classes.root}>
//       <ExpansionPanel
//         expanded={expanded === "panel1"}
//         onChange={handleChange("panel1")}
//       >
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography className={classes.heading}>First Name</Typography>
//           <Typography className={classes.secondaryHeading}>
//             Change your email
//           </Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
//             Aliquam eget maximus est, id dignissim quam.
//           </Typography>
//           {/* <input type="text" placeholder="First Name"></input>
//           <input type="text" placeholder="Last Name"></input> */}
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel
//         expanded={expanded === "panel2"}
//         onChange={handleChange("panel2")}
//       >
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Typography className={classes.heading}>Username</Typography>
//           <Typography className={classes.secondaryHeading}>
//             Change your username
//           </Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Donec placerat, lectus sed mattis semper, neque lectus feugiat
//             lectus, varius pulvinar diam eros in elit.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel
//         expanded={expanded === "panel3"}
//         onChange={handleChange("panel3")}
//       >
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3bh-content"
//           id="panel3bh-header"
//         >
//           <Typography className={classes.heading}>Password</Typography>
//           <Typography className={classes.secondaryHeading}>
//             Change your password
//           </Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel
//         expanded={expanded === "panel4"}
//         onChange={handleChange("panel4")}
//       >
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header"
//         >
//           <Typography className={classes.heading}>User Image</Typography>
//           <Typography className={classes.secondaryHeading}>
//             Change your user image
//           </Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
//             sit amet egestas eros, vitae egestas augue.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//     </div>
//   );
// }
