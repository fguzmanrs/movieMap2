import React from 'react';
import './App.css';
import Navbar from './navbar/navbar.js';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import Profile from './Profile/profile.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './footer/footer.js';
import Layout from './layout/layout.js';
// import { Route } from 'react-router-dom';

function App(props) {
  return (
    <div className="App App-body" >

      {/* // State : getting user info: null or signin = (userinfo)       */}
      {/* // categoryRegistered = ['My List', 'Because you searched ...', 'Because you watched ... ', 'New Releases', 'Top Rated']; */}
      {/* // categoryVisitor = ['New Releases', 'Top Rated']; */}

      {/* //State : signIN and signUp footer: null */}

      <BrowserRouter>

        {/* <Route path={user ? "/home" : "signin"} component={} /> */}

        <Switch>
          {/* <Navbar />
          // User signed in 
          <Route path="/home">
            
            {/* {js code map } */}
          {/* {category.map{el => <Carousel title={el}} */}
          {/* <Footer />
          </Route> */}
          <Route path='/home'>
            <Layout>
              {/* <Carousel /> */}
            </Layout>

          </Route>

          <Route path="/about">
            <Layout>
              <About />
            </Layout>
          </Route>

          <Route path="/profile">
            <Layout>
              <About />
            </Layout>
          </Route>

          <Route path="/signIn">
            <Layout noHeader>
              <SignIn />
            </Layout>
          </Route>

          <Route path="/signUp">
            <Layout noHeader>
              <SignUp />
            </Layout>
          </Route>

        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;