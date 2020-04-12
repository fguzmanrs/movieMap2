import React, { useEffect, useContext, useState } from "react";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchFunc = async () => {
        const res = await fetch(`/api/users/populateMyMovieLists`);
        const resJson = await res.json();
        setUser(resJson[0]);
      };

      fetchFunc();
    }
  }, [user]);

  const currentUser = useContext(CurrentUserContext);
  console.log("🍅", currentUser);

  currentUser.setUser = (newUser) => {};

  return (
    <div className="App App-body">
      {console.log("🥭", user)}
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route path="/home" currentUser={currentUser}>
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
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
