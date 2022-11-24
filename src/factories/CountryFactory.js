import Country from "../models/Country";

class CountryFactory {
  constructor(data, type, countryList) {
    if (type === "apiv3") {
      return new Country(data, countryList);
    }
  }
}

export default CountryFactory;
