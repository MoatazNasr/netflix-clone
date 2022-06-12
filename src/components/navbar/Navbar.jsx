import React, { useState, useContext, useEffect } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/Provider";
import { logoutUser } from "../../context/actions/userActions";
import { removeWishlist } from "../../context/actions/wishlistActions";
import { setMovieOrTv } from "../../context/actions/movie-tvActions";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { setErrorMessage } from "../../context/actions/errMessageActions";
import { setSuccessfulMessage } from "../../context/actions/succesfulMessageActions";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = ({ setSearchInput }) => {
  const [scrollY, setScrollY] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [userBTN, setUserBTN] = useState(false);
  const [searchBTN, setSearchBTN] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const {
    userState,
    movieOrtvState,
    userDispatch,
    wishlistDispatch,
    movieOrtvDispatch,
    successfulMessageDispatch,
    errorMessageDispatch,
  } = useContext(GlobalContext);
  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });
  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });
  const handleLogout = () => {
    navigate("/signin");
    logoutUser(userDispatch);
    setSuccessfulMessage(null, successfulMessageDispatch);
    setErrorMessage(null, errorMessageDispatch);
    removeWishlist(wishlistDispatch);
  };
  useEffect(() => {
    setOpenNav(false);
  }, [movieOrtvState]);
  return (
    <header>
      {openNav === false ? (
        <button className="open-nav-button">
          <MenuIcon onClick={() => setOpenNav(true)} />
        </button>
      ) : (
        <button className="close-nav-button">
          <CloseIcon onClick={() => setOpenNav(false)} />
        </button>
      )}

      <nav
        className={
          "navbar " +
          (scrollY >= 40 ? "nav-background " : "") +
          (width <= 768 ? (openNav ? "show-nav" : "hide-nav") : "")
        }
      >
        <ul className="navbar_ul">
          <li className="navbar_li">
            <img
              src="/assets/Netflix_2015_logo.svg"
              alt="logo"
              className="navbar_logo"
            />
          </li>
          <li className="navbar_li">
            <NavLink to="/" className="links">
              Home
            </NavLink>
          </li>
          <li className="navbar_li">
            {" "}
            <button onClick={() => setMovieOrTv("tv", movieOrtvDispatch)}>
              TV Shows
            </button>
          </li>
          <li className="navbar_li">
            {" "}
            <button onClick={() => setMovieOrTv("movie", movieOrtvDispatch)}>
              Movies
            </button>
          </li>
          <li className="navbar_li">
            <NavLink to="/mylist" className="links">
              My List
            </NavLink>
          </li>
        </ul>
        <ul className="navbar_ul">
          <li className="navbar_li">
            {!searchBTN ? (
              <button onClick={() => setSearchBTN(true)}>
                <SearchIcon fontSize={`${width > 768 ? "medium" : "large"}`} />
                <span>Search</span>
              </button>
            ) : (
              <>
                <span className="search-input-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="search-input"
                  onChange={(event) => setSearchInput(event.target.value)}
                />
                <button
                  onClick={() => {
                    setSearchBTN(false);
                    setSearchInput("");
                  }}
                  className="search-input-close"
                >
                  <CloseIcon />
                </button>
              </>
            )}
          </li>
          <li className="navbar_li">
            {userState.age > "18" ? "ADULT" : "KID"}
          </li>
          <li className="navbar_li">
            <img alt="user" src={userState.img} className="user_img" />
          </li>
          <li className="navbar_li">
            {userBTN ? (
              <>
                <button
                  onClick={() => setUserBTN(false)}
                  className="user-settings-btn"
                >
                  <ArrowDropUpIcon />
                </button>
                <div className="user_settings">
                  <NavLink to="/settings" className="links">
                    Settings
                  </NavLink>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              </>
            ) : (
              <button onClick={() => setUserBTN(true)}>
                <ArrowDropDownIcon />
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
