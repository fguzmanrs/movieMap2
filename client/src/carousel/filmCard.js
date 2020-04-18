import React, { useState, useEffect, useContext } from "react";
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
import CurrentUserContext from "../context/current-user.context";

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
  const currentUserContext = useContext(CurrentUserContext);

  const currentMovie = props.movies[props.cardIndex];
  // const [currentMovie, setCurrentMovie] = useState(null);
  const [streamingList, setStreamingList] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [myFavList, setMyFavList] = useState([]);

  // Favorite Heart Icon click event handler
  const handleClick = (e) => {
    console.log("🍒 heart clicked", e);

    //  const heartIconHTML = e.target.closest('.MuiSvgIcon-root');
    //  const movieId = heartIconHTML.id.split('-')[2];

    setIsFavorite(!isFavorite);
  };

  //* Set initial favlist when user login
  useEffect(() => {
    if (
      currentUserContext.userSummary &&
      currentUserContext.userSummary.myFavoriteMovies.length > 0
    ) {
      // [12,324]
      const myFavListArr = currentUserContext.userSummary.myFavoriteMovies;
      // set myFavList array
      setMyFavList(myFavListArr);
    }
  }, [currentUserContext.userSummary]);

  //* Rerender fav heart icon when myFavlist is changed
  useEffect(() => {
    //Check this movie is included in user's favorite movie list
    if (myFavList.includes(currentMovie.id)) {
      setIsFavorite(true);
    }
  }, [myFavList]);

  //* Rerender a card when index is changed
  useEffect(() => {
    if (currentMovie) {
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
        backgroundColor: "#99a0f9",
        border: "none",
        boxShadow: "0px -5px 20px 20px #99a0f9",
        borderRadius: "none",
      }}
    >
      {console.log("🍓 currentUserContext in filmCard: ", currentUserContext)}
      {console.log("🍋🍋 myFavList: ", myFavList)}
      <CardHeader
        style={{ backgroundColor: "#99a0f9", color: "white" }}
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
          <IconButton aria-label="add to favorites" onClick={handleClick}>
            <FavoriteIcon
              color={isFavorite ? "error" : "inherit"}
              id={`${props.name}-Fav-${currentMovie.id}`}
            />
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
          backgroundColor: "rgba(210, 204, 243, 0.816)",
        }}
      >
        <div
          className="right-block"
          style={{
            float: "right",
            width: "70%",
            height: "500px",
          }}
        >
          {currentMovie && currentMovie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
              alt="poster"
              style={{
                height: "500px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          )}
        </div>

        <div
          className="left-block"
          style={{
            color: "#fff",
            //backgroundColor: "rgba(210, 204, 243, 0.816)",
            backgroundColor: "#99a0f9",
            float: "right",
            width: "30%",
            height: "500px",
            boxShadow: "100px 0px 150px 250px #99a0f9",
          }}
        >
          <Typography>{currentMovie ? currentMovie.overview : ""}</Typography>
          <Typography>
            {currentMovie ? `${currentMovie.vote_average}/10` : ""}
          </Typography>
          <Typography>
            {currentMovie ? currentMovie.release_date : ""}
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
                    <a
                      key={`${streaming.icon}`}
                      href={`${streaming.url}`}
                      target="_blank"
                    >
                      <img src={`${streaming.icon}`}></img>
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
