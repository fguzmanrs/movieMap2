import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import updateSettings from "../util/updateSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Profile({ user }) {
  const classes = useStyles();

  console.log("🌽profile's user: ", user);

  //   const firstNameRef = useRef();
  //   const lastNameRef = useRef();
  //   const photoRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = e.currentTarget.elements;
    const { firstName, lastName, photo } = e.currentTarget.elements;

    console.log(
      "🍖 form data(firstname.value,lastname.value,photo,photo.files): ",
      firstName.value,
      lastName.value,
      photo,
      photo.files
    );

    const form = new FormData();
    form.append("firstName", firstName.value);
    form.append("lastName", lastName.value);
    form.append("photo", photo.files[0]);

    const updatedRes = updateSettings(form, "accountInfo");
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
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
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="standard-helperText"
                label="First Name"
                name="firstName"
                defaultValue={user.firstName}
                // inputProps={{ref: input => this.titleInput = input}}
              />
              <TextField
                id="standard-helperText"
                label="Last Name"
                name="lastName"
                defaultValue={user.lastName}
              />
              <input type="file" id="myFile" name="photo" />
              <button>Update</button>
            </div>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Change Password</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Disabled Expansion Panel
          </Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
}

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
