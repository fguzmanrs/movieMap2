import { createContext } from "react";

const CurrentUserContext = createContext({
  isLogin: false,
  currentUser: null,
  currentPhoto: "",
  setCurrentUser: () => {},
  setCurrentPhoto: () => {},
  setLogout: () => {},
});

export default CurrentUserContext;
