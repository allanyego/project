import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../utils/context";
// import logo from '../img/sparkleslogo.png';

function LoggedOutMenu() {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink exact className="nav-link" to="/" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about" activeClassName="active">
          About
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact" activeClassName="active">
          Contact
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link btn btn-outline-primary"
          to="/signin"
          activeClassName="active"
        >
          Sign In
        </NavLink>
      </li>
      &nbsp;&nbsp;
      <li className="nav-item">
        <NavLink
          className="nav-link btn btn-primary text-dark"
          to="/register"
          activeClassName="active"
        >
          Get Started
        </NavLink>
      </li>
    </ul>
  );
}

function LoggedInMenu({ onLogout }) {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <button
          className="nav-link btn btn-sm btn-danger text-dark"
          onClick={onLogout}
        >
          LOGOUT
        </button>
      </li>
    </ul>
  );
}

export default function Navbar() {
  const { currentUser, setCurrentUser } = useAppContext();

  const resizeHeaderOnScroll = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      headerEl = document.getElementById("header");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("smaller");
    } else {
      headerEl.classList.remove("smaller");
    }
  };

  const handleLogout = () => {
    // Setting current user to null, signifies a logout
    setCurrentUser(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    // Remove handler when component unmounts
    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
      <div className="container" id="header">
        <a className="navbar-brand" href="/">
          SPARKLES DIGITAL INVESTMENT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {currentUser ? (
            <LoggedInMenu onLogout={handleLogout} />
          ) : (
            <LoggedOutMenu />
          )}
        </div>
      </div>
    </nav>
  );
}
