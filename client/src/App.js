import React from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import Carousel from './carousel/carousel.js';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import Profile from './Profile/profile.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Footer from './footer/footer.js';
// import react-router (use)

function App(props) {
  return (
    <div className="App App-body" >

      <BrowserRouter>

        <Switch>
          <Route path="/home">
            <Navbar />

            <br></br>
            <Typography variant='h4'>My List</Typography>
            <Carousel />

            <br></br>
            <Typography variant='h4'>Recommended because you searched ...</Typography>
            <Carousel />

            <br></br>
            <Typography variant='h4'>Recommended because you watched ...</Typography>
            <Carousel />

            <br></br>
            <Typography variant='h4'>Top Rated</Typography>
            <Carousel />

            <br></br>
            <Typography variant='h4'>New Releases</Typography>
            <Carousel />

          </Route>
          <Route path="/signIn">
            <SignIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/about">
            <Navbar />
            <About />
          </Route>
          <Route path="/profile">
            <Navbar />
            <Profile />
          </Route>

        </Switch>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
