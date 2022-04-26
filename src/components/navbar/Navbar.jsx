import React, {  useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });
  return (
    <nav className={"navbar " + (scrollY >= 40 ? "nav-background" : "")}>
      <ul className="navbar_ul">
        <li className="navbar_li">
          <img
            src="/assets/Netflix_2015_logo.svg"
            alt="logo"
            className="navbar_logo"
          />
        </li>
        <li className="navbar_li">Home</li>
        <li className="navbar_li">Series</li>
        <li className="navbar_li">Movies</li>
        <li className="navbar_li">New and Popular</li>
        <li className="navbar_li">My List</li>
      </ul>
      <ul className="navbar_ul">
        <li className="navbar_li">
          <SearchIcon />
        </li>
        <li className="navbar_li">KID</li>
        <li className="navbar_li">
          <ArrowDropDownIcon />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
