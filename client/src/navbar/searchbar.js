/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

export default function SearchBar(props) {
  const handleChange = (e, value) => {
    if (value) {
      console.log("🍫Searchbar's value: ", value); // format: {genre: "Advanture"}

      const keyword = value.genre;

      // Set search keyword in App.js
      props.onChange(keyword.toLowerCase());
    }
  };

  return (
    <Autocomplete
      onChange={handleChange}
      // multiple
      id="fixed-tags"
      options={topGenres}
      getOptionLabel={(option) => option.genre}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.genre}
            {...getTagProps({ index })}
            disabled={index === 0}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label=""
          placeholder="Select a genre"
        />
      )}
    />
  );
}

// Top genres ref: imbd check with API
const topGenres = [
  { genre: "Action" },
  { genre: "Adventure" },
  { genre: "Animation" },
  { genre: "Biography" },
  { genre: "Comedy" },
  { genre: "Crime" },
  { genre: "Documentary" },
  { genre: "Drama" },
  { genre: "Family" },
  { genre: "Fantasy" },
  { genre: "Film Noir" },
  { genre: "History" },
  { genre: "Horror" },
  { genre: "Music" },
  { genre: "Musical" },
  { genre: "Mystery" },
  { genre: "Romance" },
  { genre: "Sci-Fi" },
  { genre: "Short" },
  { genre: "Sport" },
  { genre: "Superhero" },
  { genre: "Thriller" },
  { genre: "War" },
  { genre: "Western" },
];
