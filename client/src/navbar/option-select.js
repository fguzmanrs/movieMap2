import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 90,
    minHeight: "1px !important",
    transform: "translateY(3px)",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  optionSelect: {
    color: "#fff",
    backgroundColor: "#305360",
  },
}));

export default function OptionSelect(props) {
  const classes = useStyles();
  const [option, setOption] = React.useState("genre");

  const handleChange = (e) => {
    setOption(e.target.value);
    props.onChange(e);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-label">Option</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          className={`${classes.optionSelect} OptionSelect`}
          classes={{ icon: classes.optionSelect }}
        >
          <MenuItem value={"genre"}>Genre</MenuItem>
          <MenuItem value={"keyword"}>Keyword</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
