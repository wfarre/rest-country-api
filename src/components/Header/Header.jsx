import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SearchLogo } from "./assets/magnifying-glass-solid.svg";
import { ReactComponent as Chevron } from "./assets/chevron-up-solid.svg";
import { ReactComponent as Check } from "./assets/check-solid.svg";

const Header = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value, filter);
  };

  const onCheck = (e) => {
    setIsOpen(false);
    setFilter(e.target.innerHTML);
    handleSearch(search, e.target.innerHTML);
  };

  return (
    <header className="header">
      <div className="header__search">
        <input
          className="header__search__input"
          type="text"
          placeholder="Search for a country..."
          onChange={handleChange}
          value={search}
        />
        <div className="logo-wrapper">
          <SearchLogo />
        </div>
      </div>
      <div className="header__filter">
        <div className="select">
          <div className="placeholder" onClick={() => setIsOpen(!isOpen)}>
            <span className="placeholder__text">Filter by region</span>
            <div className="logo-wrapper">
              <Chevron className="logo" />
            </div>
          </div>
          <ul className={isOpen ? "options" : "hidden"}>
            {regions.map((region) => {
              return (
                <li className="option" key={region}>
                  <label
                    className="option__text"
                    onClick={onCheck}
                    // value={region}
                    htmlFor={region.toLowerCase()}
                  >
                    {region}
                  </label>
                  <input
                    type="radio"
                    id={region.toLowerCase()}
                    name="option"
                    value={region}
                    hidden
                  />

                  <div className="logo-wrapper">
                    <Check
                      className={
                        filter.toLowerCase() === region.toLowerCase()
                          ? "logo"
                          : "hidden"
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
