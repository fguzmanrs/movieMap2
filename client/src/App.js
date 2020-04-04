import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import Carousel from './carousel/carousel.js';

function App() {
  return (
    <div className="App App-body" >
      <Navbar />
      <Carousel />
    </div>
  );
}

export default App;
