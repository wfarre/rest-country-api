import React, { useContext } from "react";
import { themeContext } from "../../utils/context/context";

const Loader = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  return (
    <div className={"loader-wrapper " + theme}>
      <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
      </div>
    </div>
  );
};

export default Loader;
