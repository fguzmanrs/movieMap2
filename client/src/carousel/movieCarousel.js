import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FilmCard from "./filmCard.js";
import axios from "axios";

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
  //! First Carousel
  const [showCard1, setShowCard1] = useState(false);
  const [cardIndex1, setCardIndex1] = useState(-1);

  //! Second Carousel
  const [showCard2, setShowCard2] = useState(false);
  const [cardIndex2, setCardIndex2] = useState(-1);

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
          return `Recommended by Your Last Search: ${props.searchGenre}`;
        default:
          return "Popular New Releases";
      }
    };

    return (
      <div>
        <h2 style = {{color: "#fff"}}>{titleSelector()}</h2>
        <Carousel id="carousel1" responsive={responsive} style = {{marginBottom: "50px"}}>
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
        {showCard && (
          <FilmCard id="filmCard1" cardIndex={cardIndex} movies={moviesData} />
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      {console.log("🥕new movies: ", props.newMovies)}
      {console.log("🥕search movies: ", props.searchMovies)}
      {carouselGenerator(
        "newMovies",
        props.newMovies,
        cardIndex1,
        showCard1,
        setCardIndex1,
        setShowCard1
      )}
      {props.searchMovies.length > 1 &&
        carouselGenerator(
          "searchMovies",
          props.searchMovies,
          cardIndex2,
          showCard2,
          setCardIndex2,
          setShowCard2
        )}
    </React.Fragment>
  );
};

export default MovieCarousel;
