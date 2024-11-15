import { loadCountries, filterCountries } from './pages/countriesPage.js';

document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterCountries(query);
});

document.getElementById('regionFilter').addEventListener('change', (e) => {
    const region = e.target.value;
    filterCountries('', region);
});

loadCountries();