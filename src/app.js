import { loadCountries, filterCountries } from './pages/countriesPage.js';

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');

    if (!appRoot) {
        console.error('Ошибка: элемент с id="app-root" не найден.');
        return;
    }

    const htmlContent = `
        <div class="header-container">
            <h1>Countries Catalog</h1>
            <div class="search-container">
                <select id="regionFilter">
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <div class="input-with-clear">
                    <input type="text" id="searchInput" placeholder="Search for a country...">
                    <button class="clear-btn" onclick="clearField('searchInput')">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="languageInput" placeholder="Search by language...">
                    <button class="clear-btn" onclick="clearField('languageInput')">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="currencyInput" placeholder="Search by currency...">
                    <button class="clear-btn" onclick="clearField('currencyInput')">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="capitalInput" placeholder="Search by capital...">
                    <button class="clear-btn" onclick="clearField('capitalInput')">x</button>
                </div>
                <button id="clearAllBtn" onclick="clearAllFields()">Clear All Filters</button>
            </div>
        </div>
        <div id="countryList"></div>
        <div id="countryInfo" style="display: none;"></div>
    `;

    appRoot.innerHTML = htmlContent;

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
