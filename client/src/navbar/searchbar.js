/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

// option for future use of multiple tags
export default function FixedTags(props) {
  return (
    <Autocomplete onChange={(value) => { props.onChange(value) }}
      multiple
      id="fixed-tags"
      options={topGenres}
      getOptionLabel={(option) => option.genre}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.genre} {...getTagProps({ index })} disabled={index === 0} />
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
  { genre: 'Action' },
  { genre: 'Adventure' },
  { genre: 'Animation' },
  { genre: 'Biography' },
  { genre: 'Comedy' },
  { genre: 'Crime' },
  { genre: 'Documentary' },
  { genre: 'Drama' },
  { genre: 'Family' },
  { genre: 'Fantasy' },
  { genre: 'Film Noir' },
  { genre: 'History' },
  { genre: 'Horror' },
  { genre: 'Music' },
  { genre: 'Musical' },
  { genre: 'Mystery' },
  { genre: 'Romance' },
  { genre: 'Sci-Fi' },
  { genre: 'Short' },
  { genre: 'Sport' },
  { genre: 'Superhero' },
  { genre: 'Thriller' },
  { genre: 'War' },
  { genre: 'Western' },
];
