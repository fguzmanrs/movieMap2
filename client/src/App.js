import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import Carousel from './carousel/carousel.js';
import FilmCard from './filmCard/filmCard.js';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import Profile from './profile/profile.js';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
// import react-router (use)

function App( props ) {
  return (
    <div className="App App-body" >
      
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/home">
            <Typography variant='h4'>My List</Typography>
            <Carousel />

            <Typography variant='h4'>Recommended because you searched ...</Typography>
            <Carousel />

            <Typography variant='h4'>Recommended because you watched ...</Typography>
            <Carousel />

            <Typography variant='h4'>Top Rated</Typography>
            <Carousel />

            <Typography variant='h4'>New Releases</Typography>
            <Carousel />

          </Route>
          <Route path="/filmCard">
            <FilmCard />
          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          
        </Switch>  
      </BrowserRouter>
      

           
    </div>
  );
}

export default App;
