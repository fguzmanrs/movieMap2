import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Our Story</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Emily Yu: 
            <div>image
            role
            bio
            link
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Fabiola Guzman: 
            <div>image
            role
            bio
            link
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Francisco Ortiz: 
            <div>image
            role
            bio
            link
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Hayden Cross: 
            <div>image
            role
            bio
            link
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}