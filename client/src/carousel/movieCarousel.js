import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FilmCard from "./filmCard.js";
// import axios from "axios";
import CurrentUserContext from "../context/current-user.context";

import "./movieCarousel.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieCarousel = (props) => {
  const { currentUser, userSummary } = useContext(CurrentUserContext);

  //! First Carousel
  const [showCard1, setShowCard1] = useState(false);
  const [cardIndex1, setCardIndex1] = useState(-1);

  //! Second Carousel: Last Searched
  const [showCard2, setShowCard2] = useState(false);
  const [cardIndex2, setCardIndex2] = useState(-1);

  //! Third Carousel
  const [showCard3, setShowCard3] = useState(false);
  const [cardIndex3, setCardIndex3] = useState(-1);

  //! Fourth Carousel
  const [showCard4, setShowCard4] = useState(false);
  const [cardIndex4, setCardIndex4] = useState(-1);

  // const [myFavoiteList, setMyFavoriteList] = useState(props.myFavoriteList);

  // Force closing 1st carousel
  // useEffect(() => {
  //   if (userSummary && userSummary.myFavoriteMovies.length > 1) {
  //     if(userSummary.myFavoriteMovies.includes(props.newMovies))
  //     setShowCard1(false);
  //     // setShowCard2(false);
  //     // setShowCard3(false);
  //   }
  // }, [userSummary]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setMyFavoriteList(currentUser.myFavoriteMovies);
  //   }
  // }, [currentUser]);

  //! Carousle Generator
  const carouselGenerator = (
    carouselName,
    moviesData,
    cardIndex,
    showCard,
    setCardIndex,
    setShowCard
  ) => {
    //* Carousel's title
    const titleSelector = () => {
      switch (carouselName) {
        case "searchMovies":
          return `Recommended by Your Last Search: ${
            props.search.name ? props.search.name : props.search.word
          }`;
        case "userFavorite":
          return `Your Favorites`;
        case "similarMovies":
          // return `Recommeded by Your Last Favorite Movie: ${props.myFavoriteList && .myFavoriteMovies[0].title}`;
          return `Recommeded by Your Last Favorite Movie: ${
            props.myFavoriteList && props.myFavoriteList[0].title
          }`;
        default:
          return "Most Popular New Movies";
      }
    };

    return (
      <div>
        {console.log("🥑currentUser from context: ", currentUser)}
        {console.log("🥑🥑🥑moviesData: ", moviesData)}
        {console.log("🥑🥑🥑🥑🥑myfavorite list: ", props.myFavoriteList)}
        <h2 style={{ color: "#fff" }}>
          {moviesData.length > 0 && titleSelector()}
        </h2>
        <Carousel
          id="carousel1"
          responsive={responsive}
          style={{ marginBottom: "50px" }}
        >
          {moviesData.map((movie, i) => {
            //* 1. Card click event handler
            const handleClick = (e) => {
              console.log(
                "🥨 e.target: ",
                e.target.closest(`.${carouselName}Poster`)
              );

              //* 2. Determin which poster is clicked and render accordingly
              const posterHtml = e.target.closest(`.${carouselName}Poster`);
              const index = posterHtml.id.split(`${carouselName}Poster-`)[1];
              console.log("🍞 index: ", index);

              if (cardIndex === index) {
                console.log("you clicked the same poster so close it.");
                setShowCard(!showCard);
              } else {
                console.log(
                  "you clicked differrent poster so keep it open but change poster."
                );
                setShowCard(true);
                setCardIndex(index);
              }
            };

            return (
              <div
                key={`${carouselName}-${i}`}
                className={`${carouselName}Poster`}
                id={`${carouselName}Poster-${i}`}
              >
                {console.log("when render b", showCard, cardIndex)}
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="poster"
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                />
              </div>
            );
          })}
        </Carousel>
        {/* no show after deleting the last movie in carousel */}
        {showCard && cardIndex <= moviesData.length - 1 ? (
          <FilmCard
            id="filmCard1"
            cardIndex={cardIndex}
            movies={moviesData}
            name={carouselName}
            favList={props.myFavoriteList}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      {console.log("🥕new moviesss: ", props.newMovies)}
      {console.log("🥕search movies: ", props.searchMovies)}
      {console.log("🥕my fav movies: ", props.myFavoriteList)}
      {props.newMovies &&
        carouselGenerator(
          "newMovies",
          props.newMovies,
          cardIndex1,
          showCard1,
          setCardIndex1,
          setShowCard1
        )}
      {props.searchMovies.length > 0 &&
        carouselGenerator(
          "searchMovies",
          props.searchMovies,
          cardIndex2,
          showCard2,
          setCardIndex2,
          setShowCard2
        )}
      {/* currentUser.myFavoriteMovies, */}
      {/* {props.myFavoriteList} */}
      {/* {console.log("🧁🧁", currentUser, myFavoiteList)} */}
      {console.log("🧁🧁", currentUser)}
      {/* {currentUser && myFavoiteList && myFavoiteList.length > 0 */}
      {currentUser && props.myFavoriteList.length > 0
        ? carouselGenerator(
            "userFavorite",
            props.myFavoriteList,
            cardIndex3,
            showCard3,
            setCardIndex3,
            setShowCard3
          )
        : ""}
      {currentUser && props.similarMovies.length > 0
        ? carouselGenerator(
            "similarMovies",
            props.similarMovies,
            cardIndex4,
            showCard4,
            setCardIndex4,
            setShowCard4
          )
        : ""}
    </React.Fragment>
  );
};

export default MovieCarousel;
