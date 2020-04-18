import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
/*import ShareIcon from '@material-ui/icons/Share';*/
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "20%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function FilmReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentMovie = props.movies[props.cardIndex];
  // const [currentMovie, setCurrentMovie] = useState(null);
  const [streamingList, setStreamingList] = useState(null);

  // Rerender a movie when index is changed
  useEffect(() => {
    if (props.movies[props.cardIndex]) {
      // setCurrentMovie(props.movies[props.cardIndex]);

      const getProviders = async () => {
        const res = await axios.get(`/api/movies/providers/${currentMovie.id}`);
        const providers = res.data.data;
        console.log("🎞 providers:", providers);

        setStreamingList(providers);
      };
      getProviders();
    }
  }, [props.cardIndex]);

  // useEffect(() => {
  //   if (currentMovie) {
  //     const getProviders = async () => {
  //       const res = await axios.get(`/api/movies/providers/${currentMovie.id}`);
  //       const providers = res.data.data;
  //       console.log("🎞 providers:", providers);

  //       setStreamingList(providers);
  //     };
  //     getProviders();
  //   }
  // }, [currentMovie]);

  //rgba(210, 204, 243, 0.816)
  return (
    <Card
      className={classes.root}
      style={{
        
        border: "none",
        boxShadow: "0px -5px 20px 20px #305360",
        borderRadius: "none",
        marginBottom: "50px"
      }}
    >
      <CardHeader
        style={{ backgroundColor: "#BCE0EF", color: "white", backgroundImage: "linear-gradient(-90deg, #305360, #8BAEBD)", }}
        // avatar={
        //   <Avatar aria-label="film" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={
          <div
            className="headerTitle"
            style={{ fontSize: "34px", fontWeight: "bold" }}
          >
            {currentMovie ? currentMovie.title : ""}
          </div>
        }
      />

      <CardContent
        style={{
          padding: "0px",
          
        }}
      >
        <div
          className="right-block"
          style={{
            float: "right",
            width: "70%",
            height: "500px",
            backgroundColor: "#305360"
          }}
        >
          <img
            src={
              currentMovie
                ? `https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`
                : ""
            }
            alt="Movie Poster"
            style={{
              height: "500px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>

        <div
          className="left-block"
          style={{
            color: "#fff",
            
            //backgroundColor: "rgba(210, 204, 243, 0.816)",
            backgroundColor: "#8BAEBD",
            float: "right",
            width: "30%",
            height: "500px",
            boxShadow: "200px 0px 150px 250px #8BAEBD",
          }}
        >
          <Typography style = {{color: "black", paddingLeft: "20px", fontWeight: "bold", fontSize: "20px"}}>

            {currentMovie ? currentMovie.overview : ""}

          </Typography>
          <Typography style = {{color: "black", fontWeight: "bold", fontSize: "25px", marginTop: "20px", marginBottom: "10px",}}>
            
            Rating:  {currentMovie ? `${currentMovie.vote_average}/10` : ""}
          
          </Typography>
          <Typography style = {{color: "black", fontWeight: "bold", fontSize: "25px", marginTop: "10px", marginBottom: "20px",}}>
            
            Release Date:  {currentMovie ? currentMovie.release_date : ""}

          </Typography>
          <Typography>{currentMovie ? currentMovie.genre_ides : ""}</Typography>
          <div>
            {streamingList &&
              streamingList.map((streaming) => {
                //! Skip some broken logo links
                if (
                  streaming.name !== "AtomTicketsIVAUS" &&
                  streaming.name !== "DisneyPlusIVAUS"
                ) {
                  return (
                    <a style = {{marginLeft: "20px"}}
                      key={`${streaming.icon}`}
                      href={`${streaming.url}`}
                      target="_blank"
                    >
                      <img style = {{height: "50px"}} src={`${streaming.icon}`}></img>
                    </a>
                  );
                } else {
                  return;
                }
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

//https://www.moviepostersusa.com/media/easyslide/rise-of-skywalker.jpg
//https://cdn.cinematerial.com/p/297x/haeorwgk/1917-british-movie-poster-md.jpg?v=1579166770
