import React from "react";
import { ReactComponent as SearchLogo } from "./assets/magnifying-glass-solid.svg";

const SearchBar = ({ search, handleInput }) => {
  const handleChange = (e) => {
    handleInput(e.target.value);
  };

  return (
    <div className="header__search">
      <input
        className="header__search__input"
        type="text"
        placeholder="Search for a country..."
        onChange={handleChange}
        value={search}
      />
      <div className="logo-wrapper">
        <SearchLogo className="logo" />
      </div>
    </div>
  );
};

export default SearchBar;
