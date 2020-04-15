import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FilmCard from "./filmCard.js";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const MovieCarousel = (props) => {

  const [showCard, setShowCard] = useState(false);
  console.log(props.searchedFilms)
  return (
    <React.Fragment>
      <Carousel responsive={responsive}>
        {props.movies.map((movie) => {
          return (<div key={movie.id} onClick={() => { setShowCard(true) }}>{movie.title}</div>)
        })}

      </Carousel>
      {showCard && (
        <FilmCard />
      )}

      <Carousel responsive={responsive}>
        {props.movies.map((movie) => {
          return (<div key={movie.id} onClick={() => { setShowCard(true) }}>{movie.title}</div>)
        })}

      </Carousel>
      {showCard && (
        <FilmCard />
      )}

      <Carousel responsive={responsive}>
        {props.movies.map((movie) => {
          return (<div key={movie.id} onClick={() => { setShowCard(true) }}>{movie.title}</div>)
        })}

      </Carousel>
      {showCard && (
        <FilmCard />
      )}

    </React.Fragment >
  )
};

export default MovieCarousel