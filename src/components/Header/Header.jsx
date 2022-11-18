import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SearchLogo } from "./assets/magnifying-glass-solid.svg";
import { ReactComponent as Chevron } from "./assets/chevron-up-solid.svg";
import { ReactComponent as Check } from "./assets/check-solid.svg";
import { isVisible } from "@testing-library/user-event/dist/utils";

const Header = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onCheck = (e) => {
    setIsOpen(false);
    console.log(e.target.closest(".option"));
    setFilter(e.target.value);
  };

  useEffect(() => {
    handleSearch(search, filter);
  }, [filter, search]);

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
        {/* <select
          name="countries"
          id="countries"
          className="header__filter__select"
          placeholder="filter"
        >
          <option className="option" value="all">
            Filter by region
          </option>
          <option className="option" value="Africa">
            Africa
          </option>
          <option className="option" value="Asia">
            Asia
          </option>
          <option className="option" value="America">
            America
          </option>
          <option className="option" value="Europe">
            Europe
          </option>
          <option className="option" value="Oceania">
            Oceania
          </option>
        </select>


        <div className="header__filter__select"
          placeholder="filter">

        </div> */}

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
                    value={region}
                  >
                    {region}
                    <input type="radio" name="option" value={region} hidden />
                  </label>
                  <div className="logo-wrapper">
                    <Check className={filter === region ? "logo" : "hidden"} />
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
