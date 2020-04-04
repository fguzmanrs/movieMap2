import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import Carousel from './carousel/carousel.js';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
// import react-router (use)

function App( props ) {
  return (
    <div className="App App-body" >
      
      <BrowserRouter>
        <Navbar /> 
        <Switch>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
            <Carousel />
            <Carousel />
            <Carousel />
            <Carousel />
            <Carousel />
          </Route>
        </Switch>  
      </BrowserRouter>
      

           
    </div>
  );
}

export default App;
