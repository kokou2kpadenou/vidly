import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import $ from "jquery";

class NavBar extends Component {
  MenuLink = ({ to, label }) => {
    return (
      <span
        onClick={() => {
          if ($("#navbar-toggler").css("display") === "block") {
            $("#navbarNav").collapse("toggle");
          }
        }}
      >
        <NavLink className="nav-item nav-link" to={to}>
          {label}
        </NavLink>
      </span>
    );
  };
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <Link className="navbar-brand" to="/">
          <svg className="icon icon-vynil align-top mr-2">
            <use xlinkHref="#icon-vynil" href="#icon-vynil" />
          </svg>
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          id="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <this.MenuLink to="/movies" label="Movies" />
            <this.MenuLink to="/customers" label="Customers" />
            <this.MenuLink to="/rentals" label="Rentals" />
            {!user && (
              <React.Fragment>
                <this.MenuLink to="/login" label="Login" />
                <this.MenuLink to="/register" label="Register" />
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <this.MenuLink to="/profile" label={user.name} />
                <this.MenuLink to="/logout" label="Logout" />
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
