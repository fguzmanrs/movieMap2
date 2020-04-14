/* eslint-disable no-use-before-define */
import React from 'react';
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

  //   state = {
  //     users: []
  //   }
  //   searchReturn() {
  //     const url = `${API_URL}/users/`;
  //     axios.get(url).then(response => response.movies)
  //     .then((movie) => {
  //       this.setState({ users: movie })
  //       console.log(this.state.users)
  //      })
  //   }
  //   // [...]
  // }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={topGenres}
        getOptionLabel={(option) => option.genre}
        // defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label=""
            placeholder="Select a genre"
          />
        )}
      />
    </div>
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
