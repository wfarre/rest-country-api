import React from "react";
import { Link } from "react-router-dom";

const Card = ({ flag, name, population, region, capital }) => {
  return (
    <Link to={`/country/${name}`} className="country-link">
      <article className="card">
        <div className="card__picture">
          <img src={flag} alt={name + "'s flag"} className="picture" />
        </div>
        <div className="card__info">
          <h3 className="card__info__title">{name}</h3>
          <div className="card__info__element">
            <h4 className="card__info__element__title">Population</h4>
            <p className="card__info__element__text">
              {population.toLocaleString("en-US")}
            </p>
          </div>
          <div className="card__info__element">
            <h4 className="card__info__element__title">Region</h4>
            <p className="card__info__element__text">{region}</p>
          </div>
          <div className="card__info__element">
            <h4 className="card__info__element__title">Capital</h4>
            <p className="card__info__element__text">{capital}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
