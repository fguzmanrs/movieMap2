import { createContext } from "react";

const CurrentUserContext = createContext({
  isLogin: false,
  userSummary: null,
  currentUser: null,
  currentPhoto: "",
  setCurrentUser: () => {},
  setCurrentPhoto: () => {},
  setLogout: () => {},
});

export default CurrentUserContext;
