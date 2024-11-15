import { API_BASE_URL } from '../constants.js';
import { displayCountries } from '../views/countriesView.js';

export async function loadCountries() {
    const response = await fetch(API_BASE_URL);
    const countries = await response.json();
    displayCountries(countries);
}

export async function filterCountries(name = '', region = '') {
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

    displayCountries(countries);
}
