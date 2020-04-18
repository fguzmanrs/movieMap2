import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [
{
    img:
      "https://images.unsplash.com/photo-1564135624576-c5c88640f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80",
    member: "Emily",
    role: "Back-End",
    bio: "Emily is Extraordinary", 
    github: "GITHUB", 
    linkedin: "LINKEDIN",
    portfolio: "PORTFOLIO"
  },
  {
    img:
      "https://images.unsplash.com/photo-1564198879220-63f2734f7cec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2072&q=80",
    member: "Fabiola",
    role: "Front-End",
    bio: "Fabiola is Fabulous", 
    github: "GITHUB", 
    linkedin: "LINKEDIN",
    portfolio: "PORTFOLIO"
  },
  {
    img:
      "https://images.unsplash.com/photo-1559534747-b6ea1cae1c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80",
    member: "Francisco",
    role: "Back-End",
    bio: "Francisco is Fantastic", 
    github: "GITHUB", 
    linkedin: "LINKEDIN",
    portfolio: "PORTFOLIO"
  },
  {
    img:
      "https://images.unsplash.com/photo-1562772186-ad68d3906ca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    member: "Hayden",
    role: "Front-End",
    bio: "Hayden is Hilarious", 
    github: "GITHUB", 
    linkedin: "LINKEDIN",
    portfolio: "PORTFOLIO"
  }
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} style = {{backgroundColor: "#BCE0EF", borderBottom: "5px solid #8BAEBD"}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Founded in 2019, we are a full-stack development team of students working on this project like it's our full time job. We strive to be the best at what we do, made possible only by our amazing team.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={4} md={4} lg={2} xl={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.member}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.role}
                    </Typography>
                    <Typography>
                      {card.bio}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      < Link>{card.github}</Link>
                    </Button>
                    <Button size="small" color="primary">
                      < Link>{card.linkedin}</Link>
                    </Button>
                    <Button size="small" color="primary">
                      < Link>{card.portfolio}</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}