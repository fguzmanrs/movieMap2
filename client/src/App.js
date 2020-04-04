import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./navbar/navbar.js";
// import Carousel from './carousel/carousel.js';
import { MovieCarousel } from "./components/carousel/carousel.component";

function App() {
  return (
    <div className="App App-body">
      <Navbar />
      <MovieCarousel />
    </div>
  );
}

export default App;
