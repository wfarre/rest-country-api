import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import CountryFactory from "../factories/CountryFactory";
import { themeContext } from "../utils/context/context";
import { ReactComponent as ArrowBack } from "../assets/arrow-left-solid.svg";

const Country = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();
  const [countryNames, setCountryNames] = useState([]);

  const { theme, toggleTheme } = useContext(themeContext);

  useEffect(() => {
    // if (
    //   localStorage.getItem("countryNames") ||
    //   JSON.parse(localStorage.getItem("countryNames")) !== []
    // ) {
    //   setCountryNames(JSON.parse(localStorage.getItem("countryNames")));
    // } else {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        // console.log("hello");
        // console.log(data);
        let myCountryNames = [];
        data.forEach((country) => {
          myCountryNames.push({
            name: country.name.common,
            abbrev: country.cca3,
          });
        });
        // console.log(myCountryNames);
        localStorage.setItem("countryNames", myCountryNames);
        setCountryNames(myCountryNames);
      })
      .catch((err) => console.log(err));
    // }
  }, []);

  // console.log(countryNames);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/" + params.name)
      .then((res) => res.json())
      .then((data) => {
        console.log(countryNames);
        let yoData = new CountryFactory(data[0], "apiv3", countryNames);
        console.log(yoData);
        setIsLoaded(true);
        setData(yoData);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [params, countryNames]);

  if (error) {
    return <div> error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div className={"Country page " + theme}>
        <header className="header">
          <Link to={"/"} className="btn btn--back">
            <div className="logo-wrapper">
              <ArrowBack className="logo" />
            </div>
            <p>Back</p>
          </Link>
        </header>

        <main>
          <section className="section section--country">
            <div className="container">
              <div className="flag-wrapper">
                <img className="flag" src={data.flag} alt={"country's flag"} />
              </div>
              <div className="information">
                <div className="information__title">
                  <h2 className="information__title__main">{data.name}</h2>
                </div>
                <div className="information__metadata">
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Native Name:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.nativeName}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Population:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.population.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Region:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.region}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Sub Region:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.subRegion}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Capital:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.capital}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Top Level Domain:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.topLevelDomain}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Currencies:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.currencies.join(", ")}
                    </p>
                  </div>
                  <div className="information__metadata__element">
                    <h4 className="information__metadata__element__title">
                      Languages:
                    </h4>
                    <p className="information__metadata__element__text">
                      {data.languages.join(", ")}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    data.borders.length !== 0 ? "information__tags" : "hidden"
                  }
                >
                  <h3 className="information__tags__title">
                    Border countries:
                  </h3>
                  <ul className="tags">
                    {data.borders.map((border) => {
                      return (
                        <li className="tags__item" key={border}>
                          {border}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
};

export default Country;
