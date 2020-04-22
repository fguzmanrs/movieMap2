/* eslint-disable no-use-before-define */
import React from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";

import "./navbar.css";

export default function SearchBarKeyword(props) {
  const handleChange = (e, value) => {
    if (value) {
      console.log("🍫Searchbar's value: ", value); // format: {genre: "Advanture"}

      // const keywordId = value.id;
      // Set search keyword in App.js
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "🧆 search btn's submit value: ",
      e.target,
      e.currentTarget.elements,
      e.target.value
    );

    const { searchKeyword } = e.currentTarget.elements;
    console.log("🥫searchKeyword: ", searchKeyword.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          id="searchKeyword"
          name="searchKeyword"
          aria-describedby="search-by-keyword"
          style={{
            marginTop: "5px",
            paddingLeft: "10px",
            paddingRight: "5px",
            borderRadius: "20px",
            borderBottom: "none",
            width: "500px",
          }}
          variant="standard"
          placeholder="Type a keyword"
        />
        <IconButton type="submit" className="searchIcon" aria-label="search">
          <SearchIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}
