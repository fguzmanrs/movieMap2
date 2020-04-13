/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={topGenres}
        getOptionLabel={(option) => option.title}
        defaultValue={[topGenres[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
}

// Top genres ref: imbd check with API
const topGenres = [
  { title: 'Action' },
  { title: 'Adventure' },
  { title: 'Animation' },
  { title: 'Biography' },
  { title: 'Comedy' },
  { title: 'Crime' },
  { title: 'Documentary' },
  { title: 'Drama' },
  { title: 'Family' },
  { title: 'Fantasy' },
  { title: 'Film Noir' },
  { title: 'History' },
  { title: 'Horror' },
  { title: 'Music' },
  { title: 'Musical' },
  { title: 'Mystery' },
  { title: 'Romance' },
  { title: 'Sci-Fi' },
  { title: 'Short' },
  { title: 'Sport' },
  { title: 'Superhero' },
  { title: 'Thriller' },
  { title: 'War' },
  { title: 'Western' },
];
