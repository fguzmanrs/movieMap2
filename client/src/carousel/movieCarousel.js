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

  // const [showCard2, setShowCard2] = useState(false);
  // const [showCard3, setShowCard3] = useState(false);

  const carouselGenerator = (
    carouselName,
    moviesData,
    cardIndex,
    showCard,
    setCardIndex,
    setShowCard
  ) => {
    const titleSelector = () => {
      switch (carouselName) {
        case "searchMovies":
          return `Recommended by your search: ${props.searchGenre}`;
        default:
          return "Most Popular New Movies";
      }
    };

    return (
      <div>
        <h3>{titleSelector()}</h3>
        <Carousel id="carousel1" responsive={responsive}>
          {moviesData.map((movie, i) => {
            //* Card click event handler
            const handleClick = (e) => {
              console.log(
                "🥨 e.target: ",
                e.target.closest(`.${carouselName}Poster`)
              );

              //* Determin which poster is clicked and render accordingly
              const posterHtml = e.target.closest(`.${carouselName}Poster`);
              const index = posterHtml.id.split(`${carouselName}Poster-`)[1];
              console.log("🍞 index: ", index);

              if (cardIndex === index) {
                console.log("you clicked the same poster so close it.");
                setShowCard1(!showCard);
              } else {
                console.log("you clicked differrent poster.");
                console.log("before b", showCard);
                setShowCard(true);
                setCardIndex(index);
                console.log("after b", showCard);
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
          <FilmCard
            id="filmCard1"
            cardIndex={cardIndex}
            movies={moviesData}
            // name={carouselName}
          />
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      {
        //! 6. Inject state data to component
        console.log("🥕new movies: ", props.newMovies)
      }
      {console.log("🥕search movies: ", props.searchMovies)}
      {carouselGenerator(
        "newMovies",
        props.newMovies,
        cardIndex1,
        showCard1,
        setCardIndex1,
        setShowCard1
      )}
      {props.searchMovies &&
        carouselGenerator(
          "searchMovies",
          props.searchMovies,
          cardIndex2,
          showCard2,
          setCardIndex2,
          setShowCard2
        )}
      //! working fine
      {/* <Carousel id="carousel1" responsive={responsive}>
        {props.newMovies.map((movie, i) => {
          //* Card click event handler
          const handleClick = (e) => {
            console.log("🥨 e.target: ", e.target.closest(".newMoviePoster"));

            //* Determin which poster is clicked and render accordingly
            const posterHtml = e.target.closest(".newMoviePoster");
            const index = posterHtml.id.split("newMoviePoster-")[1];
            console.log("🍞 index: ", index);

            if (card1Index === index) {
              console.log("you clicked the same poster so close it.");
              setShowCard1(!showCard1);
            } else {
              console.log("you clicked differrent poster.");
              console.log("before b", showCard1);
              setShowCard1(true);
              setCard1Index(index);
              console.log("after b", showCard1);
            }
          };

          return (
            <div
              key={`newMovie-${i}`}
              className={`newMoviePoster`}
              id={`newMoviePoster-${i}`}
            >
              {console.log("when render b", showCard1, card1Index)}
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
      {showCard1 && (
        <FilmCard
          id="filmCard1"
          cardIndex={card1Index}
          movies={props.newMovies}
        />
      )} */}
      //! working fine
      {/* <Carousel id="carousel2" responsive={responsive}>
        {props.movies.map((movie) => {
          return (
            <div
              key={movie.id}
              onClick={() => {
                setShowCard2(true);
              }}
            ></div>
          );
        })}
      </Carousel>
      {showCard2 && <FilmCard id="filmCard2" />} */}
      {/* <Carousel id="carousel3" responsive={responsive}>
        {props.movies.map((movie) => {
          return (
            <div
              key={movie.id}
              onClick={() => {
                setShowCard3(true);
              }}
            >
              {movie.title}
            </div>
          );
        })}
      </Carousel> 
      {showCard3 && <FilmCard id="filmCard3" />}*/}
    </React.Fragment>
  );
};

export default MovieCarousel;
