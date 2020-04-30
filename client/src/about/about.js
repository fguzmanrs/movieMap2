import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import "./about.css";
import Emily from "./emilyProfile.jpg";
import Hayden from "./haydenProfile.jpg";
import Faby from "./fabyProfile.jpg";
// import Francisco from "./frannyProfile.jpg";

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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [
  {
    img: Emily,
    member: "Emily Yu",
    role: "Full-Stack Developer",
    bio: `After 5 years of working in E-commerce and Online Marketing, Emily has brought her experience into a new career as a Full-Stack Developer. A talented problem solver, detail oriented with a passion for quality, she truly loves coding. Her dedication to exploring new ideas and skills is visible in her love of international cuisine and the various languages she knows (linguistic and coding). Her diligent and passionate approach makes her a valuable team member that brings together the team's vision, designs, and technology together.`,
    github: "https://github.com/bluerainmango",
    linkedin: "https://www.linkedin.com/in/bluerainmango/",
    portfolio: "https://emily-yu-portfolio.herokuapp.com/",
  },
  {
    img: Faby,
    member: "Fabiola Guzman",
    role: "Front-End Developer",
    bio:
      "With a career as a language teacher and then a crisis counselor, Fabiola aims to have a career in coding that is infused with a sociocultural consciousness. After a lifetime of volunteering for different social causes in education and public safety, she found that coding can be a powerful tool of positive change in our increasingly interconnected world. An alumni of UCR, she later returned to their extension coding program. Ready with her new skills she now seeks out projects and companies that work to expand their accessibility and inclusivity. In order to best foster her creativity, feed her curiosity, and continuously challenge herself she cooks, reads, travels, and spends time learning languages. ",
    github: "https://github.com/fguzmanrs",
    linkedin: "linkedin.com/in/fabiola-guzman-reyes-88a119133",
    portfolio: "https://github.com/fguzmanrs/personalPortfolio",
  },
  {
    img:
      "https://images.unsplash.com/photo-1564135624576-c5c88640f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80",
    member: "Francisco Ortiz",
    role: "Full-Stack Developer",
    bio:
      "Francisco brings the wealth of 20 years’ experience in information technologies, systems development, and implementation administration & improvement. He holds a degree in Computer Engineering and spends time expanding his educational portfolio with specialty certification in Amazon Web Services, Cisco Systems, and now full-stack coding.  It is not all work; his experiences include cycling from Mexicali to Los Cabos Baja and he aims to cycle across Europe.  One needs only to see his varied interests in aquaponics, astronomy, horticulture, and vermiculture to understand that he approaches his work with a unique viewpoint critical to our team’s success. No bug is safe from this man.  ",
    github: "https://github.com/ffortizn",
    linkedin: "https://www.linkedin.com/in/ffortizn/",
    portfolio: "https://ffortizn.github.io/portfolio.html",
  },
  {
    img: Hayden,
    member: "Hayden Cross",
    role: "Front-End Developer",
    bio:
      "As a long time EMT/Paramedic turned coder, Hayden is a motivated young man always looking to add to his skill set and explore new career opportunities. After over a decade of treating the wounded and suffering, a more stable work environment that caters to the imagination and gives space to create, learn, and explore has become the end goal. He has always known he wanted to serve the public; a job in web development is a great way to reach the largest number of people in this lifetime. Born and bred in Southern California, Hayden enjoys hiking and backpacking through the wilderness, playing his guitars or video games, and watching his favorite sports teams with family and friends.",
    github: "https://github.com/HCross28",
    linkedin: "https://www.linkedin.com/in/hayden-cross-86803a19a/",
    portfolio: "https://hcross28.github.io/2nd-Profile-Update/index.html",
  },
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div
          className={classes.heroContent}
          style={{
            backgroundColor: "#BCE0EF",
            borderBottom: "5px solid #8BAEBD",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Our Story
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Founded in 2019, we are a full-stack development team of students
              working on this project like it's our full time job. We strive to
              be the best at what we do, made possible only by our amazing team.
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {card.member}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                    >
                      {card.role}
                    </Typography>
                    <Typography>{card.bio}</Typography>
                  </CardContent>
                  <CardActions align="center">
                    <Button size="small" color="primary">
                      <Link href={`${card.github}`} target="_blank">
                        Github
                      </Link>
                    </Button>
                    <Button size="small" color="primary">
                      <Link href={`${card.linkedin}`} target="_blank">
                        LinkedIn
                      </Link>
                    </Button>
                    <Button size="small" color="primary">
                      <Link href={`${card.portfolio}`} target="_blank">
                        Portfolio
                      </Link>
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
