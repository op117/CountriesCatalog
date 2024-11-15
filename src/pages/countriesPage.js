import { API_BASE_URL } from '../constants.js';
import { displayCountries } from '../views/countriesView.js';

export async function loadCountries() {
    const response = await fetch(API_BASE_URL);
    const countries = await response.json();
    displayCountries(countries);
}

export async function filterCountries(name = '', region = '', language = '', currency = '', capital = '') {
    const response = await fetch(API_BASE_URL);
    let countries = await response.json();

    if (name) {
        countries = countries.filter(country =>
            country.name.common.toLowerCase().includes(name)
        );
    }

    if (region) {
        countries = countries.filter(country => country.region === region);
    }

    if (language) {
        countries = countries.filter(country =>
            Object.values(country.languages || {}).some(lang => lang.toLowerCase().includes(language))
        );
    }

    if (currency) {
        countries = countries.filter(country =>
            Object.values(country.currencies || {}).some(curr => curr.name.toLowerCase().includes(currency))
        );
    }

    if (capital) {
        countries = countries.filter(country =>
            country.capital && country.capital[0].toLowerCase().includes(capital)
        );
    }

    displayCountries(countries);
}
