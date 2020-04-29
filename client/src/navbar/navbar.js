import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import Searchbar from "./searchbar.js";
import OptionSelect from "./option-select";
import SearchBarWord from "./searchbar-keyword";
import logo from "./logo.png";

import "./navbar.css";

//! Bring Context(Global stsate)
import CurrentUserContext from "../context/current-user.context";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "40px !important",
    height: "40px !important",
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      "& a": {
        color: "#fff",
        textDecoration: "none",
      },
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [option, setOption] = React.useState("genre");
  const [showMobileLogo, setShowMobileLogo] = React.useState(false);

  //! Use Context data
  const { isLogin, currentUser, currentPhoto } = useContext(CurrentUserContext);

  const handleResize = (e) => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // console.log("🥤 resized!", screenWidth);

    if (screenWidth >= 768) {
      setShowMobileLogo(false);
    } else {
      setShowMobileLogo(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionOnChange = (e) => {
    setOption(e.target.value);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const menu = (isLogin, deviceStyle) => {
    return (
      <div className={deviceStyle}>
        {isLogin ? (
          <div className="navMenu">
            <Link to="/" onClick={props.setLogout}>
              Logout
            </Link>
            <Link to="/profile">Account</Link>
          </div>
        ) : (
          <div className="navMenu">
            <Link to="/signIn">Login</Link>
            <Link to="/signUp">Signup</Link>
          </div>
        )}
        <div className="navMenu">
          <Link to="/about">About</Link>
        </div>
        <Avatar
          className={classes.avatar}
          alt={
            currentUser && currentUser.firstName
              ? currentUser.firstName.substr(0, 1)
              : "A"
          }
          src={
            isLogin
              ? `/images/users/${currentUser.photo}`
              : "/images/users/user-default.png"
          }
        />
      </div>
    );
  };

  return (
    <div className={classes.grow}>
      {console.log(
        "🐸ContextAPI data in nav from App.js",
        isLogin,
        currentUser,
        currentPhoto
      )}
      {console.log("🍙props from navbar:", props)}
      {console.log("🍺 showLogo?: ", showMobileLogo)}
      <AppBar position="static" style={{ backgroundColor: "#305360" }}>
        <Toolbar>
          <div>
            {showMobileLogo ? (
              <Link to="/">
                <img src={logo} className={"navLogo"} />
              </Link>
            ) : (
              <Link to="/" className="logo-desk">
                <span>Movie Map</span>
                <img src={logo} className={"navLogo"} />
              </Link>
            )}
          </div>

          <OptionSelect onChange={handleOptionOnChange} />
          {option === "genre" ? (
            <Searchbar onChange={props.onChange} />
          ) : (
            <SearchBarWord onSubmit={props.onSubmit} type={option} />
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {menu(isLogin, "desktopStyle")}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              style={{ marginLeft: "15px", transform: "translateY(3px)" }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {menu(isLogin, "mobileStyle")}
      </Menu>
    </div>
  );
}
