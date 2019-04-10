import React, { Component } from "react";

//stateless functional component

const Navbar = ({ totalCounter }) => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
          <span className="badge badge-pill badge-secondary">
            {totalCounter}
          </span>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
