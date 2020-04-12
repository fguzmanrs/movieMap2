import { createContext } from "react";

const CurrentUserContext = createContext({
  isLogin: false,
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  photo: "",
  myFavoriteMovies: [],
  myReviewedMovies: [],
  myWatchList: [],
  setUser: () => {},
});

export default CurrentUserContext;
