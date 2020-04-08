import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './navbar/navbar.js.js';
import Carousel from './carousel/carousel.js.js';
import { Typography } from '@material-ui/core';

function App(props) {
  return (
    <div className="App App-body" >
      <Navbar />

      <Typography variant='h4'>Top Rated</Typography>
      <Carousel />

      <Typography variant='h4'>New Releases</Typography>
      <Carousel />
    </div>
  );
}

export default App;