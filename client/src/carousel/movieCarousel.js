import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FilmCard from "./filmCard.js";
import axios from "axios";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieCarousel = (props) => {
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);

  //! 1. Define state(local variable for this comp) using a useState(init value)
  // reason: sometimes general variable cannot properly work to be used inside of Return(below HTML rendering part) and it helps auto re-rendering
  const [movies, setMovies] = useState([]);

  console.log("🥩 props: ", props);

  //! 2. Add Event handler using useEffect()
  // whenever the second parameter is changed, this will be triggered and run the code again.
  // [] means only one time render after HTML page is rendered.
  useEffect(() => {
    //! 3. Define Function(API call & store data to the state)
    const getData = async function () {
      //! 4. Prepare a query(Search keyword)
      // print out the query to console and make sure this is the exact search keyword
      // const query = props.searchedFilms;
      const query = "horror"; // test

      //* Calling API to get searched movies with axios and return the data
      const res = await axios.get(`/api/movies/search/keyword/${query}`);

      //* Store this data to the state using useState's set method you defined above
      setMovies(res.data.data);
    };

    //! 5. Call Fuction you defined
    getData();
  }, []);

  return (
    <React.Fragment>
      {
        //! 6. Inject state data to component
        console.log(
          "🥕api data, movies: YOU CAN USE THIS DATA FOR YOUR COMPONENT like this",
          movies,
          movies[0]
        )
      }
      <Carousel id="carousel1" responsive={responsive}>
        {props.movies.map((movie) => {
          return (
            <div
              key={movie.id}
              onClick={() => {
                setShowCard1(true);
              }}
            >
              {movie.title}
            </div>
          );
        })}
      </Carousel>
      {showCard1 && <FilmCard id="filmCard1" />}

      <Carousel id="carousel2" responsive={responsive}>
        {props.movies.map((movie) => {
          return (
            <div
              key={movie.id}
              onClick={() => {
                setShowCard2(true);
              }}
            >
              {movie.title}
            </div>
          );
        })}
      </Carousel>
      {showCard2 && <FilmCard id="filmCard2" />}

      <Carousel id="carousel3" responsive={responsive}>
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
      {showCard3 && <FilmCard id="filmCard3" />}
    </React.Fragment>
  );
};

export default MovieCarousel;
