import { createContext } from "react";

const CurrentUserContext = createContext({
  isLogin: false,
  currentUser: null,
  //   id: "",
  //   username: "",
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  //   photo: "",
  //   myFavoriteMovies: [],
  //   myReviewedMovies: [],
  //   myWatchList: [],
  setCurrentUser: () => {},
});

export default CurrentUserContext;
