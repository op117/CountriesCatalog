import { loadPage } from './util/loadPage.js';
import { createCountriesPage } from './pages/countriesPage.js';

let state = {
    data: null,
    error: null,
    loading: false,
};

function init() {
    loadPage(createCountriesPage, state);
}

init();
