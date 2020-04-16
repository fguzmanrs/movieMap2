import { createContext } from "react";

const CurrentUserContext = createContext({
  isLogin: false,
  currentUser: null,
  currentPhoto: "",
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
  setCurrentPhoto: () => {},
});

export default CurrentUserContext;
