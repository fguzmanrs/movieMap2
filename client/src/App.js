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
  let { currentUser, isLogin, setCurrentUser } = useContext(CurrentUserContext);

  const [user, setUser] = useState(currentUser);
  const [myFavoriteMovies, setMyFavoriteMovies] = useState(undefined);

  setCurrentUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    if (user) {
      const fetchFunc = async () => {
        console.log("🐔");
        try {
          // const instance = axios.create({
          //   // baseURL: `${URL}:${PORT}`,
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //   },
          //   withCredentials: true,
          // });
          console.log("🐮", document.cookie);

          const res = await axios.get(
            // `http://localhost:3000/api/users/populateMyMovieLists`
            // `http://localhost:3000/api/users/foryou/because/favorite/movie/${user.myFavoriteMovies[0]}`
            `http://localhost:3000/api/movies/similar/338762`,
            { withCredentials: true }
          );
          // header: { Cookie: document.cookie }
          console.log("🐼 pop data", res.data);

          setMyFavoriteMovies(res.data.data);
        } catch (err) {
          console.log("🚨", err.response.data.message);
        }
      };

      fetchFunc();
    }
  }, [user]);

  console.log("🍅", setCurrentUser);

  return (
    <div className="App App-body">
      {console.log("🥭", user, myFavoriteMovies)}
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route exact path="/" currentUser={currentUser}>
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
              <SignIn {...props} setCurrentUser={setCurrentUser} />
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
  );
}

export default App;
