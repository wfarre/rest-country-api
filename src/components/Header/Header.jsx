import React, { useEffect } from "react";
import { useState } from "react";

import { ReactComponent as SearchLogo } from "./assets/magnifying-glass-solid.svg";
import { ReactComponent as Chevron } from "./assets/chevron-up-solid.svg";
import { ReactComponent as Check } from "./assets/check-solid.svg";
import { unstable_createStaticHandler } from "@remix-run/router";

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

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", (e) => {
        console.log(e.target.closest(".select"));
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
