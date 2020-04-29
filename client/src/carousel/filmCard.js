import React, { useCallback, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
/*import ShareIcon from '@material-ui/icons/Share';*/
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import CurrentUserContext from "../context/current-user.context";
import "./filmCard.css";

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
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const currentUserContext = useContext(CurrentUserContext);

  const currentMovie = props.movies[props.cardIndex];
  // const [currentMovie, setCurrentMovie] = useState(null);
  const [streamingList, setStreamingList] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [myFavList, setMyFavList] = useState([]); //! removable?

  const utilSetIsFavorite = useCallback(() => {
    // if (!currentMovie) return;
    const favMovieIds = props.favList.map((movieObj) => movieObj.id);

    // if (myFavList.includes(currentMovie.id)) {
    if (favMovieIds.includes(currentMovie.id)) {
      console.log(
        "😜 inside of setIsfavorite(true)",
        favMovieIds,
        currentMovie.id
      );
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [props.favList, currentMovie.id]);

  // Favorite Heart Icon click event handler
  const handleClick = (e) => {
    console.log("🍒 heart clicked", e);

    const updateFavoriteList = async () => {
      console.log("🍊 movie id, isFavorite", currentMovie.id, isFavorite);

      let res;
      try {
        if (isFavorite) {
          res = await axios.delete(
            `/api/users/${currentMovie.id}/from/favorite`
          );
        } else {
          res = await axios.patch(
            `/api/users/addTo/favorite/movieId/${currentMovie.id}`
          );
        }
      } catch (err) {
        console.log(err);
        if (err.respond) {
          console.log("🚩", err.respond);
        }
      }

      if (res.data) {
        const updatedUser = res.data.data;
        console.log("🎂updated user:", updatedUser);
        // Set user in App.js with updated user info
        currentUserContext.setCurrentUser(updatedUser);

        setIsFavorite(!isFavorite);
      }
    };

    updateFavoriteList();
    utilSetIsFavorite();
  };

  //* Set initial favlist when user login
  // useEffect(() => {
  //   if (
  //     currentUserContext.userSummary &&
  //     currentUserContext.userSummary.myFavoriteMovies
  //     //? props.movies.length > 0
  //   ) {
  //     // [12,324]
  //     const myFavListArr = currentUserContext.userSummary.myFavoriteMovies;
  //     // set myFavList array
  //     setMyFavList(myFavListArr);
  //   }
  // }, [currentUserContext.userSummary]);

  //* Rerender fav heart icon when myFavlist is changed
  useEffect(() => {
    //Check this movie is included in user's favorite movie list
    utilSetIsFavorite();
    // }, [myFavList, props.movies]);
  }, [props.favList, props.movies, utilSetIsFavorite]);

  //* Rerender a card when index is changed
  useEffect(() => {
    // if (currentMovie) {
    // setCurrentMovie(props.movies[props.cardIndex]);

    const getProviders = async () => {
      const res = await axios.get(`/api/movies/providers/${currentMovie.id}`);
      const providers = res.data.data;
      console.log("🎞 providers:", providers);

      setStreamingList(providers);
    };
    getProviders();
    utilSetIsFavorite();
    // }
  }, [props.cardIndex]);

  //rgba(210, 204, 243, 0.816)
  return (
    <Card
      className={classes.root}
      style={{
        border: "none",
        boxShadow: "0px -5px 20px 20px #305360",
        borderRadius: "none",
        marginBottom: "50px",
      }}
    >
      {console.log("🍓 currentUserContext in filmCard: ", currentUserContext)}
      {console.log("🍋 movies for carousel: ", props.movies)}
      {console.log("🍇 favorite list: ", props.favList)}
      <CardHeader
        style={{
          borderRadius: "0px",
          backgroundColor: "#BCE0EF",
          color: "white",
          backgroundImage: "linear-gradient(-90deg, #305360, #8BAEBD)",
        }}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        action={
          <IconButton aria-label="add to favorites" onClick={handleClick}>
            {props.movies.length > 0 &&
            currentMovie &&
            currentUserContext.isLogin ? (
              <FavoriteIcon
                color={isFavorite ? "error" : "inherit"}
                id={`${props.name}-Fav-${currentMovie.id}`}
              />
            ) : (
              ""
            )}
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
        <div className="right-block">
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

        <div className="left-block">
          <Typography
            style={{
              color: "black",
              padding: "10px",
              // paddingLeft: "20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {currentMovie ? currentMovie.overview : ""}
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "25px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Rating: {currentMovie ? `${currentMovie.vote_average}/10` : ""}
          </Typography>
          <Typography
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "25px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Release Date: {currentMovie ? currentMovie.release_date : ""}
          </Typography>
          <Typography>{currentMovie ? currentMovie.genre_ides : ""}</Typography>
          <div
          // style={{
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   height: "100%",
          // }}
          >
            {streamingList &&
              streamingList.map((streaming, i) => {
                //! Skip some broken logo links
                if (
                  streaming.name !== "AtomTicketsIVAUS" &&
                  streaming.name !== "HBOIVAUS"
                ) {
                  return (
                    <div
                      key={
                        currentMovie.title &&
                        `${currentMovie.title}-${streaming.name}-${i}`
                      }
                    >
                      <a
                        style={{ marginLeft: "20px" }}
                        key={`${streaming.icon}`}
                        href={`${streaming.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          // style={{ height: "50px" }}
                          src={`${
                            streaming.name !== "DisneyPlusIVAUS"
                              ? streaming.icon
                              : "/images/disney-plus-logo-high-80w.png"
                          }`}
                          alt={`${streaming.name}-icon`}
                        ></img>
                      </a>
                    </div>
                  );
                } else {
                  return "";
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
