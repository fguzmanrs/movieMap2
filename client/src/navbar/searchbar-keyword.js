/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import "./navbar.css";

export default function SearchBarWord(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "🧆 search btn's submit value: ",
      e.target,
      e.currentTarget.elements,
      e.target.value
    );

    const { searchWord } = e.currentTarget.elements;
    console.log("🥫searchWord: ", searchWord.value);

    const searchObj = {
      word: searchWord.value.toLowerCase(),
      type: props.type,
    };

    props.onSubmit(searchObj);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "40%" }}>
      <FormControl style={{ width: "100%" }}>
        <TextField
          id="searchWord"
          name="searchWord"
          aria-describedby="search-by-word"
          style={{
            marginTop: "5px",
            paddingLeft: "10px",
            paddingRight: "5px",
            borderRadius: "20px",
            borderBottom: "none",
          }}
          variant="standard"
          placeholder={!props.hidePlaceHolder && `Type a ${props.type}`}
        />
        <IconButton type="submit" className="searchIcon" aria-label="search">
          <SearchIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}
