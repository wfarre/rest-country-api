import React, { useState } from "react";

import { ReactComponent as Chevron } from "./assets/chevron-up-solid.svg";
import { ReactComponent as Check } from "./assets/check-solid.svg";

const Select = ({ regions, filter, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * The user will choose an option.
   * Once the option is choosen, it will set the filter state and pass it to the parent element.
   * Then, it will close the select menu.
   * @param {*} e
   */
  const onCheck = (e) => {
    setIsOpen(false);
    handleSelect(e.target.innerHTML);
  };

  return (
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
  );
};

export default Select;
