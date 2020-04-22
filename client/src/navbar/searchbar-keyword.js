/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

export default function SearchBarKeyword(props) {
  const handleChange = (e, value) => {
    if (value) {
      console.log("🍫Searchbar's value: ", value); // format: {genre: "Advanture"}

      // const keywordId = value.id;

      // Set search keyword in App.js
      props.onChange(value);
    }
  };

  return (
    // <Autocomplete
    //   style={{ borderBottom: "none" }}
    //   onChange={handleChange}
    //   // multiple
    //   id="fixed-tags"
    //   style={{ width: 500 }}
    //   renderInput={(params) => (
    <TextField
      style={{
        marginTop: "5px",
        paddingLeft: "10px",
        paddingRight: "5px",
        borderRadius: "20px",
        borderBottom: "none",
        width: "500px",
      }}
      variant="standard"
      //   label="search by keyword"
      placeholder="Type a keyword"
    />
    //   )}
    // />
  );
}
