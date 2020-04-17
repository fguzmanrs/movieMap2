/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

export default function SearchBar(props) {
  const handleChange = (e, value) => {
    if (value) {
      console.log("🍫Searchbar's value: ", value); // format: {genre: "Advanture"}

      // const keywordId = value.id;

      // Set search keyword in App.js
      props.onChange(value);
    }
  };

  return (
    <Autocomplete
      onChange={handleChange}
      // multiple
      id="fixed-tags"
      options={topGenres}
      getOptionLabel={(option) => option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.name}
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
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

// const topGenres = [
//   { genre: "Action"},
//   { genre: "Adventure" },
//   { genre: "Animation"},
//   { genre: "Biography" },
//   { genre: "Comedy" },
//   { genre: "Crime" },
//   { genre: "Documentary" },
//   { genre: "Drama" },
//   { genre: "Family" },
//   { genre: "Fantasy" },
//   { genre: "Film Noir" },
//   { genre: "History" },
//   { genre: "Horror" },
//   { genre: "Music" },
//   { genre: "Musical" },
//   { genre: "Mystery" },
//   { genre: "Romance" },
//   { genre: "Sci-Fi" },
//   { genre: "Short" },
//   { genre: "Sport" },
//   { genre: "Superhero" },
//   { genre: "Thriller" },
//   { genre: "War" },
//   { genre: "Western" },
// ];
