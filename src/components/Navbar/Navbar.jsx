import React from "react";

import { ReactComponent as DarkMode } from "./assets/moon-regular.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__title">
        <h1 className="navbar__title__main">Where in the world?</h1>
      </div>
      <div className="navbar__switch">
        <div className="logo-wrapper">
          <DarkMode />
        </div>
        <div className="mode-state">
          <span>Light mode</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
