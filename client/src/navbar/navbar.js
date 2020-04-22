import React, { useContext } from "react";
import axios from "axios";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Searchbar from "./searchbar.js";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import OptionSelect from "./option-select";

import SearchBarKeyword from "./searchbar-keyword";

import "./navbar.css";

//! Bring Context(Global stsate)
import CurrentUserContext from "../context/current-user.context";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderBottom: "none",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    borderBottom: "none",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    borderBottom: "none",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    borderBottom: "none",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [option, setOption] = React.useState("genre");

  const handleOptionOnChange = (e) => {
    setOption(e.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const loggedIn = false;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">My Account</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Link to="/signIn">Login / Sign Up</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/about">About</Link>
      </MenuItem>
      {loggedIn && (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
    </Menu>
  );

  //! Use Context data
  const { isLogin, currentUser, currentPhoto } = useContext(CurrentUserContext);

  return (
    <div className={classes.grow}>
      {console.log(
        "🐸ContextAPI data in nav from App.js",
        isLogin,
        currentUser,
        currentPhoto
      )}
      {console.log("🍙props from navbar:", props)}
      <AppBar position="static" style={{ backgroundColor: "#305360" }}>
        <Toolbar>
          <Typography
            className={(classes.title, "navMenu")}
            variant="h6"
            noWrap
          >
            <Link to="/">Movie Map</Link>
          </Typography>
          {/* //! Option select */}
          <OptionSelect onChange={handleOptionOnChange} />
          {/* //! Searchbar */}
          {option === "genre" ? (
            <Searchbar onChange={props.onChange} />
          ) : (
            <SearchBarKeyword onSubmit={props.onSubmit} />
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
              alt="e"
              src={
                isLogin
                  ? `/images/users/${currentUser.photo}`
                  : // ? `/images/users/${currentPhoto}`
                    "/images/users/user-default.png"
              }
            />
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {loggedIn && renderMenu}
    </div>
  );
}
