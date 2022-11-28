import React, { useEffect } from "react";
import { useState } from "react";
import Select from "../Select/Select";
import SearchBar from "../SearchBar/SearchBar";

const Header = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // The different options for the select component
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleSelect = (select) => {
    if (select === "All") {
      setFilter("");
      handleSearch(search, "");
      return;
    }
    setFilter(select);
    handleSearch(search, select);
  };

  const handleInput = (input) => {
    setSearch(input);
    handleSearch(input, filter);
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
      <SearchBar search={search} handleInput={handleInput} />
      <div className="header__filter">
        <Select regions={regions} filter={filter} handleSelect={handleSelect} />
      </div>
    </header>
  );
};

export default Header;
