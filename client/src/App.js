import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";
import SignIn from "./signIn/signIn.js";
import SignUp from "./signUp/signUp.js";
import About from "./about/about.js";
import Profile from "./Profile/profile";
import Forgotpassword from "./forgot-password/forgot-password";

// import { Typography } from "@material-ui/core";
// import Footer from "./footer/footer.js";
import Layout from "./layout/layout.js";
import MovieCarousel from "./carousel/movieCarousel.js";
import CurrentUserContext from "./context/current-user.context";

function App(props) {
  //! Bring Context API(global state)
  let currentUserContext = useContext(CurrentUserContext);

  //! State: brief user info
  const [user, setUser] = useState(undefined);
  //! State: full user info (+ populated my movie lists)
  const [userPopulated, setUserPopulated] = useState(undefined);
  //! State: new movies
  const [newMovies, setNewMovies] = useState([]);
  //! State: search by genre or keyword, search movies
  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  // //! State: search by keyword, search movies
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [searchKeywordMovies, setSearchKeywordMovies] = useState([]);
  //! State: last movies
  const [myFavoriteList, setMyFavoriteList] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const handleChange = (value) => {
    setSearch(value);
  };

  const handleSubmit = (searchObj) => {
    // type === "keyword" && setSearchKeyword(value);
    // searchObj.type === "keyword" setSearch(value);
    setSearch(searchObj);
  };

  // Will be passed into signIn page and let it set user's info to the context state once a user sign in
  currentUserContext.setCurrentUser = (newUser) => {
    setUser(newUser);
  };
  // currentUserContext.setCurrentPhoto = (newPhoto) => {
  //   setPhoto(newPhoto);
  // };

  currentUserContext.setLogout = (e) => {
    // Logout from server(delete cooki with JWT)
    console.log("🍰clicked");
    const callLogout = async () => {
      const res = await axios.get("/api/users/logout");
    };

    callLogout();

    // change isLogin to false

    // delete contextAPI user, userPopulated
    setUserPopulated(undefined);
    setUser(undefined);
    console.log("🍦props in app.js: ", props);
    // window.location.assign("/");
  };

  //* Detect user's change and call another ajax call for detail user info(list populated one)
  useEffect(() => {
    if (user && user.myFavoriteMovies && user.myFavoriteMovies.length > 0) {
      const fetchFunc = async () => {
        try {
          const res = await axios.get(
            // `http://localhost:3000/api/users/populateMyMovieLists`,
            `/api/users/populateMyMovieLists`,
            { withCredentials: true }
          );

          console.log("🍯rrressss", res);

          setUserPopulated(res.data.data);
          // setMyFavoriteList(userPopulated.myFavoriteMovies);
        } catch (err) {
          console.log("🚨", err.response.data.message);
        }
      };

      fetchFunc();
    } else if (user && user.myFavoriteMovies && !user.myFavoriteMovies.length) {
      // const userWithInitMyFavList = Object.assign(user, { myFavoriteList: [] });
      // console.log("🚒 userWithInitMyFavList", userWithInitMyFavList);
      console.log("🚒 user having no fav movie(populated):", user);
      setUserPopulated(user);
    }
  }, [user]);

  //* Get new movies
  useEffect(() => {
    const fetchFunc = async () => {
      const res = await axios.get("/api/movies/recent");
      const newMovies = res.data.data;
      console.log("🍿 newMovies: ", newMovies);

      setNewMovies(newMovies);
    };

    fetchFunc();
  }, []);

  //* Get movies : search by genre or keyword
  useEffect(() => {
    if (search) {
      const fetchFunc = async () => {
        let res = {};

        if (search.id) {
          // search = {id: <genre id>, name: <genre name>}
          res = await axios.get(`/api/movies/search/genre/${search.id}`);
        } else if (!search.id && search.type === "keyword") {
          // search = {type: <keyword || title>, word: <input value>}
          res = await axios.get(`/api/movies/search/keyword/${search.word}`);
        } else if (!search.id && search.type === "title") {
          res = await axios.get(`/api/movies/search/title/${search.word}`);
        }

        const searchMovies = res.data.data;
        console.log("🍿 seachMovies: ", searchMovies);

        const filteredMovies = searchMovies.filter(
          (movieObj) => movieObj.poster_path && movieObj.backdrop_path
        );
        setSearchMovies(filteredMovies);
      };

      fetchFunc();
    }
  }, [search]);

  //* Get movies : search by keyword
  // useEffect(() => {
  //   if (searchKeyword) {
  //     const fetchFunc = async () => {
  //       const res = await axios.get(
  //         `/api/movies/search/keyword/${searchKeyword}`
  //       );
  //       const searchMovies = res.data.data;
  //       console.log("🍿 seachMovies: ", searchMovies);

  //       setSearchKeywordMovies(searchMovies);
  //     };

  //     fetchFunc();
  //   }
  // }, [searchKeyword]);

  //* Get recommended movies: because you watch...
  useEffect(() => {
    if (userPopulated && userPopulated.myFavoriteMovies.length > 0) {
      const fetchFunc = async () => {
        const myFavList = userPopulated.myFavoriteMovies;
        console.log("🍩", myFavList);

        setMyFavoriteList(myFavList);

        const lastFavorite = myFavList[0];
        console.log("🌰", lastFavorite);

        const res = await axios.get(`/api/movies/similar/${lastFavorite.id}`);
        const similarMovies = res.data.data;

        console.log("🍿 lastMovie: ", similarMovies);

        setSimilarMovies(similarMovies);
      };

      fetchFunc();
    } else {
      setMyFavoriteList([]);
      setSimilarMovies([]);
    }
  }, [userPopulated]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: userPopulated,
        isLogin: userPopulated ? true : false,
        setCurrentUser: currentUserContext.setCurrentUser,
        userSummary: user,
        // currentPhoto: userPopulated ? userPopulated.photo : "",
        // currentPhoto: userPopulated ? photo : "",
      }}
    >
      <div className="App App-body" style={{ height: "100%", margin: "0" }}>
        {console.log("🥭user in App", user, userPopulated)}
        {console.log("🦊user context(global data) in App", currentUserContext)}
        {console.log("🦁user populated in App", userPopulated)}
        {/* {console.log("🍭setlogout: ", currentUserContext.setLogout)} */}
        {console.log("🥗search genre or keyword: ", search)}
        {/* {console.log("🥘search keyword: ", searchKeyword, searchKeywordMovies)} */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" currentUser={currentUserContext}>
              <Layout
                onChange={handleChange}
                onSubmit={handleSubmit}
                setLogout={currentUserContext.setLogout}
              >
                <MovieCarousel
                  newMovies={newMovies}
                  searchMovies={searchMovies}
                  search={search}
                  // favMovies={favMovies}
                  similarMovies={similarMovies}
                  myFavoriteList={myFavoriteList}
                />
              </Layout>
            </Route>

            <Route path="/about">
              <Layout setLogout={currentUserContext.setLogout}>
                <About />
              </Layout>
            </Route>

            <Route
              path="/profile"
              render={(props) =>
                userPopulated ? (
                  <Layout setLogout={currentUserContext.setLogout}>
                    <Profile
                      {...props}
                      user={userPopulated}
                      // setCurrentPhoto={currentUserContext.setCurrentPhoto}
                      setCurrentUser={currentUserContext.setCurrentUser}
                    />
                  </Layout>
                ) : (
                  <Redirect to="/" />
                )
              }
            ></Route>

            <Route
              path="/signIn"
              render={(props) => (
                <Layout noHeader setLogout={currentUserContext.setLogout}>
                  <SignIn
                    {...props}
                    setCurrentUser={currentUserContext.setCurrentUser}
                  />
                </Layout>
              )}
            ></Route>

            <Route
              path="/signUp"
              render={(props) => (
                <Layout noHeader setLogout={currentUserContext.setLogout}>
                  <SignUp
                    {...props}
                    setCurrentUser={currentUserContext.setCurrentUser}
                  />
                </Layout>
              )}
            ></Route>

            <Route
              path="/forgotpassword"
              render={(props) => (
                <Layout noHeader>
                  <Forgotpassword {...props} />
                </Layout>
              )}
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
