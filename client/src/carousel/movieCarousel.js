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
  const [showCard1, setShowCard1] = useState(false);
  const [card1Index, setCard1Index] = useState(-1);

  // const [showCard1, setShowCard1] = useState({show:false, movieType: "newMovies", index: 0}); // {show: boolean, movieType: "", index: n }
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);

  //! 1. Define state(local variable for this comp) using a useState(init value)
  // reason: sometimes general variable cannot properly work to be used inside of Return(below HTML rendering part) and it helps auto re-rendering
  // const [movies, setMovies] = useState([]);

  // console.log("🥩 props: ", props);

  //! 2. Add Event handler using useEffect()
  // whenever the second parameter is changed, this will be triggered and run the code again.
  // [] means only one time render after HTML page is rendered.
  // useEffect(() => {
  //   //! 3. Define Function(API call & store data to the state)
  //   const getData = async function () {
  //     //! 4. Prepare a query(Search keyword)
  //     // print out the query to console and make sure this is the exact search keyword
  //     // const query = props.searchedFilms;
  //     const query = "horror"; // test

  //     //* Calling API to get searched movies with axios and return the data
  //     const res = await axios.get(`/api/movies/search/keyword/${query}`);

  //     //* Store this data to the state using useState's set method you defined above
  //     setMovies(res.data.data);
  //   };

  //   //! 5. Call Fuction you defined
  //   getData();
  // }, []);

  return (
    <React.Fragment>
      {
        //! 6. Inject state data to component
        console.log("🥕movies: ", props.newMovies)
      }
      <Carousel id="carousel1" responsive={responsive}>
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
      )}

      {/* <Carousel id="carousel2" responsive={responsive}>
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
      {showCard3 && <FilmCard id="filmCard3" />} */}
    </React.Fragment>
  );
};

export default MovieCarousel;
