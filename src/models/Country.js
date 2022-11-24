class Country {
  constructor(data, countryList) {
    this._flag = data.flags.png;
    this._name = data.name.common;
    this._population = data.population;
    this._region = data.region;
    this._capital = data.capital;
    this._subRegion = data.subregion;
    this._topLevelDomain = data.tld;
    // this._languages = Object.values(data.languages);
    // this._currencies = Object.values(data.currencies);
    // this._keyLanguage = Object.keys(data.languages);
    this._languages = data.languages;
    this._currencies = data.currencies;
    this._countryList = countryList;
    this._nativeName = data.name.nativeName;
    this._borders = data.borders;
  }

  get name() {
    return this._name;
  }

  get population() {
    return this._population;
  }

  get region() {
    return this._region;
  }

  get capital() {
    if (this._capital) {
      return this._capital;
    }
    return "";
  }

  get subRegion() {
    if (this._subRegion) {
      return this._subRegion;
    }
    return "";
  }

  get languages() {
    if (this._languages !== undefined) {
      return Object.values(this._languages);
      // return Object.values(Object.values(data.languages));
    }
    return [];
  }

  get currencies() {
    let currenciesArray = [];
    if (this._currencies) {
      Object.values(this._currencies).forEach((currency) => {
        currenciesArray.push(currency.name);
      });
    }
    return currenciesArray;
  }

  get topLevelDomain() {
    return this._topLevelDomain;
  }

  get borders() {
    if (this._borders !== undefined) {
      let newBorders = [];

      this._borders.forEach((border) => {
        this._countryList.forEach((country) => {
          if (country.abbrev === border) {
            newBorders.push(country.name);
          }
        });
      });
      return newBorders;
    } else return [];
  }

  get nativeName() {
    let languageKey = Object.keys(this._languages)[0];
    return this._nativeName[languageKey].common;
  }

  get flag() {
    return this._flag;
  }
}

export default Country;
