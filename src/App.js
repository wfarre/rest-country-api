import "./App.css";
import "./styles/styles.css";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import { useEffect, useState } from "react";

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
      return country.name.common.toLowerCase().includes(search.toLowerCase());
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
        if (research.input !== "" || research.filter !== "") {
          const filteredData = searchByFilter(data, research.filter);
          setData(filterCountriesBySearch(filteredData, research.input));
          setIsLoaded(true);
          return;
        }
        setData(data);
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
    return <div>Loading ... </div>;
  } else {
    // console.log(data);
    return (
      <div className="App">
        <Header handleSearch={handleSearch} />

        <section className="section section--results">
          <header>
            <h2 className="sr-only" hidden>
              Search results
            </h2>
          </header>

          <div className="container">
            {data.map((country, key = 0) => {
              key++;
              return (
                <Card
                  key={key}
                  flag={country.flags.png}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
