import React from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import Profile from './Profile/profile.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/footer.js';
// import { Route } from 'react-router-dom';

function App(props) {
  return (
    <div className="App App-body" >

      {/* // State : getting user info: null or signin = (userinfo)       */}
      {/* // categoryRegistered = ['My List', 'Because you searched ...', 'Because you watched ... ', 'New Releases', 'Top Rated']; */}
      {/* // categoryVisitor = ['New Releases', 'Top Rated']; */}

      {/* //State : signIN and signUp footer: null */}

      <BrowserRouter>

        <Route path={user ? "/home" : "signin"} component={} />
        <Navbar />

        <Switch>
          
          // User signed in 
          <Route path="/home">
            {js code map }
            {/* {category.map{el => <Carousel title={el}} */}
            <Footer />
          </Route>

          <Route path="/about">
            <About />
            <Footer />
          </Route>

          <Route path="/profile">
            <Profile />
            <Footer />
          </Route>

          <Route path="/signIn">
            <SignIn />
          </Route>

          <Route path="/signUp">
            <SignUp />
          </Route>

        </Switch>

      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;