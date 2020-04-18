import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/home">
                Movie Map
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer} style={{ 
                    position: "fixed", 
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#8baebd", 
                    color: "white" 
                    }}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Fantastic 404
            </Typography>
            <Copyright />
        </footer>
    );
}