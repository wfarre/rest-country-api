import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SearchLogo } from "./assets/magnifying-glass-solid.svg";
import { ReactComponent as Chevron } from "./assets/chevron-up-solid.svg";
import { ReactComponent as Check } from "./assets/check-solid.svg";

const Header = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // The different options for the select component
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  /**
   * if the user enters a research it will update search state
   *  and update the serach state in the parent component
   */
  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value, filter);
  };

  /**
   * The user will choose an option.
   * Once the option is choosen, it will set the filter state and pass it to the parent element.
   * Then, it will close the select menu.
   * @param {*} e
   */
  const onCheck = (e) => {
    setIsOpen(false);
    setFilter(e.target.innerHTML);
    handleSearch(search, e.target.innerHTML);
  };

  /**
   * It will close the select menu, if the user click somewehere else in the page.
   */
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", (e) => {
        if (e.target.closest(".select") === null) {
          setIsOpen(false);
        }
      });
    }
  }, [isOpen]);

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
          <SearchLogo className="logo" />
        </div>
      </div>
      <div className="header__filter">
        <div className="select">
          <button
            type="button"
            aria-controls="options"
            className="placeholder"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="placeholder__text">Filter by region</span>
            <span className={isOpen ? "logo-wrapper reverse" : "logo-wrapper"}>
              <Chevron className="logo" />
            </span>
          </button>
          {isOpen && (
            <ul id={"options"} className={"options"}>
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
