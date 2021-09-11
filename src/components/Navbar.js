import * as React from "react";
import { NavLink } from "react-router-dom";
// import logo from '../img/sparkleslogo.png';

export default class ScrollTest extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.resizeHeaderOnScroll);
  }
  resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      headerEl = document.getElementById("header");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("smaller");
    } else {
      headerEl.classList.remove("smaller");
    }
  }
  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
  };
  render() {
    let menu;

    if (this.props.user != null) {
      // console.log(this.props.setUser.user);
      menu = (
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link btn btn-sm btn-danger text-dark" to="#" activeClassName="active" onClick={this.handleLogout} >
                LOGOUT
              </NavLink>
          </li>
        </ul>
      )
    }else {
      menu = (
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  to="/"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  activeClassName="active"
                >
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
              </li>&nbsp;&nbsp;
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
      )
    }

    return (
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-dark" >
      <div class="container" id="header">
        <a class="navbar-brand" href="/">SPARKLES DIGITAL INVESTMENT</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {menu}
        </div>
      </div>
    </nav>

  );
  }
}
