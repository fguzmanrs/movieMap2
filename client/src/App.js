import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./navbar/navbar.js";
import Carousel from "./carousel/carousel.js";
import SignIn from "./signIn/signIn.js";
import SignUp from "./signUp/signUp.js";
import About from "./about/about.js";
import Profile from "./Profile/profile.js";

import { Typography } from "@material-ui/core";
import Footer from "./footer/footer.js";
import Layout from "./layout/layout.js";
import MovieCarousel from "./carousel/movieCarousel.js";
// import react-router (use)
import CurrentUserContext from "./context/current-user.context/current-user.context";
const mockData = {
  data: [
    { id: 1, title: "Test 1", summary: "This is a test" },
    { id: 2, title: "Test 2", summary: "Test 2" },
    { id: 3, title: "Test 3", summary: "Test 3" },
    { id: 4, title: "Test 4", summary: "Test 4" },
    { id: 5, title: "Test 5", summary: "Test 5" },
  ],
};

function App(props) {
  //! Bring Context API(global state)
  let currentUserContext = useContext(CurrentUserContext);

  //! State: brief user info
  const [user, setUser] = useState(currentUserContext.currentUser);
  //! State: full user info (+ populated my movie lists)
  const [userPopulated, setUserPopulated] = useState(undefined);

  // Will be passed into signIn page and let it set user's info to the context state once a user sign in
  currentUserContext.setCurrentUser = (newUser) => {
    setUser(newUser);
  };

  // Detect user's change and call another ajax call for detail user info(list populated one)
  useEffect(() => {
    if (user) {
      const fetchFunc = async () => {
        try {
          const res = await axios.get(
            // `http://localhost:3000/api/users/foryou/because/youMightLike/movie/${user.myFavoriteMovies[0]}`,
            `http://localhost:3000/api/users/populateMyMovieLists`,
            { withCredentials: true }
          );

          setUserPopulated(res.data.data);
        } catch (err) {
          console.log("🚨", err.response.data.message);
        }
      };

      fetchFunc();
    }
  }, [user]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: userPopulated,
        isLogin: userPopulated ? true : false,
      }}
    >
      <div className="App App-body">
        {console.log("🥭", user, userPopulated)}
        {console.log("🦊context", currentUserContext)}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" currentUser={currentUserContext}>
              <Layout>
                <MovieCarousel movies={mockData.data} />
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

            <Route
              path="/signIn"
              render={(props) => (
                <Layout noHeader>
                  <SignIn
                    {...props}
                    setCurrentUser={currentUserContext.setCurrentUser}
                  />
                </Layout>
              )}
            ></Route>

            <Route path="/signUp">
              <Layout noHeader>
                <SignUp />
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
