import React from "react";
import { NavLink, Link } from "react-router-dom";

const MenuLink = ({ to, label }) => (
  <span data-toggle="collapse" data-target="#navbarNav">
    <NavLink className="nav-item nav-link" to={to}>
      {label}
    </NavLink>
  </span>
);

const NavBar = ({ user }) => {
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
          <MenuLink to="/movies" label="Movies" />
          <MenuLink to="/customers" label="Customers" />
          <MenuLink to="/rentals" label="Rentals" />
          {!user && (
            <React.Fragment>
              <MenuLink to="/login" label="Login" />
              <MenuLink to="/register" label="Register" />
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <MenuLink to="/profile" label={user.name} />
              <MenuLink to="/logout" label="Logout" />
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
