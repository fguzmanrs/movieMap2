import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './navbar/navbar.js.js';
import Carousel from './carousel/carousel.js.js';
import { Typography } from '@material-ui/core';

function App(props) {
  return (
    <div className="App App-body" >
      <Navbar />

      <Typography variant='h4'>Popular New Releases</Typography>
      <Carousel />

      <Typography variant='h4'>Your Choice Genre</Typography>
      <Carousel />
    </div>
  );
}

export default App;