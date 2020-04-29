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
import "./about.css";

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
    img: "images/emilyProfile.jpg",
    member: "Emily Yu",
    role: "Full-Stack Developer",
    bio: "After 5 years of working in E-commerce and Online Marketing, Emily has brought her experience into a new career as a Full-Stack Developer. A recent graduate of UC, Riverside Extension: Coding, she is already applying her new skills to front-end and back-end development projects. Her dedication to exploring new ideas and skills is visible in her love of international cuisine, travel, and the various languages she knows (linguistic and coding). Her diligent and passionate approach makes her a valuable team member that brings together the team's vision, designs, and technology together.",
    github: "https://github.com/bluerainmango",
    linkedin: "https://www.linkedin.com/in/bluerainmango/",
    portfolio: "https://emily-yu-portfolio.herokuapp.com/"
  },
  {
    img: "TBD",
    member: "Fabiola Guzman",
    role: "Front-End Developer",
    // Version.2 re-adjust : include hard skills/experiences at intro
    bio: "With experience in teaching, social work, advocacy, and linguistics, Fabiola strives to fuse her work with a sociocultural consciousness in our increasingly interconnected world. She deeply believes in initiatives that allow for an expansion of accessibility and inclusivity. In order to best foster her creativity, feed her curiosity, and continuously challenge herself she travels, cooks, reads, and spends time learning languages.",
    github: "https://github.com/fguzmanrs",
    linkedin: "linkedin.com/in/fabiola-guzman-reyes-88a119133",
    portfolio: "https://github.com/fguzmanrs/personalPortfolio"
  },
  {
    img: "https://images.unsplash.com/photo-1564135624576-c5c88640f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80",
    member: "Francisco Ortiz",
    role: "Full-Stack Developer",
    bio: "Francisco brings the wealth of 20 years’ experience in information technologies, systems development, and implementation administration & improvement. He holds a degree in Computer Engineering and spends time expanding his educational portfolio with specialty certification in Amazon Web Services, Cisco Systems, and now full-stack coding.  It is not all work; his experiences include cycling from Mexicali to Los Cabos Baja and he aims to cycle across Europe.  One needs only to see his varied interests in aquaponics, astronomy, horticulture, and vermiculture to understand that he approaches his work with a unique viewpoint critical to our team’s success. No bug is safe from this man.  ",
    github: "https://github.com/ffortizn",
    linkedin: "https://www.linkedin.com/in/ffortizn/",
    portfolio: "https://ffortizn.github.io/portfolio.html"
  },
  {
    img: "./haydenProfile.jpg",
    member: "Hayden Cross",
    role: "Front-End Developer",
    bio: "What do years as a paramedic teach you? Critical-thinking, flexibility, focus, teamwork, and above all the use of effective communication. His hard-earned skills and his passion for new challenges have .... After a decade gathering the best ‘wait-until-you-hear-what-got-stuck-in-their-ear’ stories he has found a new purpose, saving the general population from the dangers of bad code.",
    github: "https://github.com/HCross28",
    linkedin: "https://www.linkedin.com/in/hayden-cross-86803a19a/",
    portfolio: "https://hcross28.github.io/2nd-Profile-Update/index.html"
  }
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} style={{ backgroundColor: "#BCE0EF", borderBottom: "5px solid #8BAEBD" }}>
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
              <Grid item key={card} xs={12} sm={6} md={6} lg={3} xl={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2"align="center">
                      {card.member}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                      {card.role}
                    </Typography>
                    <Typography>
                      {card.bio}
                    </Typography>
                  </CardContent>
                  <CardActions align="center">
                    <Button size="small" color="primary">
                      < Link href={`${card.github}`} target="_blank">Github</Link>
                    </Button>
                    <Button size="small" color="primary">
                      < Link href={`${card.linkedin}`} target="_blank">LinkedIn</Link>
                    </Button>
                    <Button size="small" color="primary">
                      < Link href={`${card.portfolio}`} target="_blank">Portfolio</Link>
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