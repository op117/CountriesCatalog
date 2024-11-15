import { loadCountries, filterCountries } from './pages/countriesPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const languageInput = document.getElementById('languageInput');
    const currencyInput = document.getElementById('currencyInput');
    const capitalInput = document.getElementById('capitalInput');

    loadCountries();

    searchInput.addEventListener('input', applyFilters);
    regionFilter.addEventListener('change', applyFilters);
    languageInput.addEventListener('input', applyFilters);
    currencyInput.addEventListener('input', applyFilters);
    capitalInput.addEventListener('input', applyFilters);

    function applyFilters() {
        filterCountries(
            searchInput.value.toLowerCase(),
            regionFilter.value,
            languageInput.value.toLowerCase(),
            currencyInput.value.toLowerCase(),
            capitalInput.value.toLowerCase()
        );
    }

    window.clearField = function(fieldId) {
        document.getElementById(fieldId).value = '';
        applyFilters();
    };

    window.clearAllFields = function() {
        searchInput.value = '';
        regionFilter.value = '';
        languageInput.value = '';
        currencyInput.value = '';
        capitalInput.value = '';
        applyFilters();
    };
});
