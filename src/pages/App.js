// import "./App.css";
import "../styles/styles.css";

import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import CountryFactory from "../factories/CountryFactory";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [research, setResearch] = useState({
    input: "",
    filter: "",
  });

  const filterCountriesBySearch = (array, search) => {
    let filteredArray = array.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });

    return filteredArray;
  };

  const searchByFilter = (array, filter) => {
    if (filter === "") {
      return array;
    }

    let filteredArray = array.filter((country) => {
      return country.region.toLowerCase() === filter.toLowerCase();
    });

    return filteredArray;
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        let countryNames = [];
        data.forEach((country) => {
          countryNames.push({
            name: country.name.common,
            abbrev: country.cca3,
          });
        });

        localStorage.setItem("countryNames", JSON.stringify(countryNames));

        let countryData = data.map((country) => {
          return new CountryFactory(country, "apiv3", countryNames);
        });

        if (research.input !== "" || research.filter !== "") {
          const filteredData = searchByFilter(countryData, research.filter);
          setData(filterCountriesBySearch(filteredData, research.input));
          setIsLoaded(true);
          return;
        }
        setData(countryData);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [research]);

  const handleSearch = (search, filter) => {
    setResearch({
      input: search,
      filter: filter,
    });
  };

  if (error) {
    return <div> error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div className={"App page "}>
        <Header handleSearch={handleSearch} />
        <main>
          <section className="section section--results">
            <header>
              <h2 className="sr-only" hidden>
                Search results
              </h2>
            </header>

            <div className="container">
              {data.length === 0 ? (
                <p className="not-found">No country found!</p>
              ) : (
                data.map((country, key = 0) => {
                  key++;
                  return (
                    <Card
                      key={key}
                      flag={country.flag}
                      name={country.name}
                      population={country.population}
                      region={country.region}
                      capital={country.capital ? country.capital : ""}
                    />
                  );
                })
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
