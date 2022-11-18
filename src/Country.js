import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Country = () => {
  const [data, setData] = useState([]);
  const [languageKeys, setLanguageKeys] = useState([]);
  const [currencyKeys, setCurrencyKeys] = useState([]);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/" + params.name)
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setLanguageKeys(Object.keys(data[0].languages));

        const currencyArray = [];
        Object.values(data[0].currencies).forEach((currency) =>
          currencyArray.push(currency.name)
        );
        setCurrencyKeys(currencyArray);

        setData(data);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [params]);

  //   useEffect(() => {
  //     console.log(data[0].landlocked);
  //   }, [data]);

  //   useEffect(() =>
  //     const languageKeys = Object.keys(data[0].languages);

  //   )

  if (error) {
    return <div> error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading ... </div>;
  } else {
    const firstLg = languageKeys[0];
    console.log(currencyKeys);
    console.log(data[0]);

    return (
      <div className="Country">
        <header className="header">
          <Link to={"/"} className="btn btn--back">
            <div className="icon-wrapper"></div>
            <p>Back</p>
          </Link>
        </header>

        <section className="section section--country">
          <div className="container">
            <div className="flag-wrapper">
              <img
                className="flag"
                src={data[0].flags.png}
                alt={"country's flag"}
              />
            </div>
            <div className="information">
              <div className="information__title">
                <h2 className="information__title__main">
                  {data[0].name.common}
                </h2>
              </div>
              <div className="information__metadata">
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Native Name:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].name.nativeName[languageKeys[0]].common}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Population:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].population}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Region:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].region}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Sub Region:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].subregion}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Capital:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].capital}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Top Level Domain:
                  </h4>
                  <p className="information__metadata__element__text">
                    {data[0].tld}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Currencies:
                  </h4>
                  <p className="information__metadata__element__text">
                    {currencyKeys.join(", ")}
                  </p>
                </div>
                <div className="information__metadata__element">
                  <h4 className="information__metadata__element__title">
                    Languages:
                  </h4>
                  <p className="information__metadata__element__text">
                    {languageKeys.map((language, index = 0) => {
                      index++;
                      if (index === 1)
                        return (
                          <span key={data[0].languages[language]}>
                            {data[0].languages[language]}
                          </span>
                        );
                      else
                        return (
                          <span key={data[0].languages[language]}>
                            , {data[0].languages[language]}
                          </span>
                        );
                    })}
                  </p>
                </div>
              </div>
              <div className="information__tags">
                <h3 className="information__tags__title">Border countries:</h3>
                <ul className="tags">
                  <li className="tags__item">France</li>
                  <li className="tags__item">Germany</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Country;
