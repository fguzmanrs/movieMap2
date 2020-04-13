import React from 'react';
import './App.css';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './layout/layout.js';
import MovieCarousel from './carousel/movieCarousel.js'

function App(props) {
  return (
    <div className="App App-body" >

      {/* // State : getting user info: null or signin = (userinfo)       */}
      {/* // categoryRegistered = ['My List', 'Because you searched ...', 'Because you watched ... ', 'New Releases', 'Top Rated']; */}
      {/* // categoryVisitor = ['New Releases', 'Top Rated']; */}

      <BrowserRouter>
        <Switch>
          <Route path='/home'>
            <Layout>
              <MovieCarousel/>
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