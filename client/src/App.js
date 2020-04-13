import React from 'react';
import './App.css';
import SignIn from './signIn/signIn.js';
import SignUp from './signUp/signUp.js';
import About from './about/about.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './layout/layout.js';
import MovieCarousel from './carousel/movieCarousel.js'

const mockData = {
  data: [{id: 1, title: 'Test 1', summary: 'This is a test'}, 
    {id: 2, title: 'Test 2', summary: 'Test 2'},
    {id: 3, title: 'Test 3', summary: 'Test 3'},
    {id: 4, title: 'Test 4', summary: 'Test 4'},
    {id: 5, title: 'Test 5', summary: 'Test 5'},  
  ]
}

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
              <MovieCarousel movies = {mockData.data}/>
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