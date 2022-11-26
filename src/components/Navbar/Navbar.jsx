import React, { useContext, useState } from "react";
import { themeContext } from "../../utils/context/context";

import { ReactComponent as DarkModeIcon } from "./assets/moon-solid.svg";
import { ReactComponent as LightModeIcon } from "./assets/sun-regular.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <div className={theme === "dark" ? " dark" : "light"}>
      <nav className={"navbar"}>
        <div className="navbar__title">
          <h1 className="navbar__title__main">Where in the world?</h1>
        </div>
        <div className="navbar__switch">
          <div className="logo-wrapper">
            {theme === "dark" ? (
              <LightModeIcon className="logo" />
            ) : (
              <DarkModeIcon className="logo" />
            )}
          </div>
          <div className="mode-state" onClick={() => toggleTheme()}>
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
