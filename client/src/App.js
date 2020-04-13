import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./navbar/navbar.js";
import Carousel from "./carousel/carousel.js";
import SignIn from "./signIn/signIn.js";
import SignUp from "./signUp/signUp.js";
import About from "./about/about.js";
import Profile from "./Profile/profile.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Footer from "./footer/footer.js";
// import react-router (use)

import CurrentUserContext from "./context/current-user.context/current-user.context";

function App(props) {
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
      value={{ currentUser: userPopulated, isLogin: true }}
    >
      <div className="App App-body">
        {console.log("🥭", user, userPopulated)}
        {console.log("🦊context", currentUserContext)}
        <BrowserRouter>
          <Navbar currentUser={currentUserContext} />
          <Switch>
            <Route exact path="/" currentUser={currentUserContext}>
              {/* 
            <Typography variant="h4">My List</Typography>
            <Carousel />

            <Typography variant="h4">
              Recommended because you searched ...
            </Typography>
            <Carousel />

            <Typography variant="h4">
              Recommended because you watched ...
            </Typography>
            <Carousel />

            <Typography variant="h4">Top Rated</Typography>
            <Carousel />

            <Typography variant="h4">New Releases</Typography>
            <Carousel /> */}
            </Route>
            <Route
              path="/signIn"
              render={(props) => (
                <SignIn
                  {...props}
                  setCurrentUser={currentUserContext.setCurrentUser}
                />
              )}
            />
            {/* <Route path="/signIn" component={SignIn} /> */}
            <Route path="/signUp" component={SignUp} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
