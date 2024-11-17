import { displayCountries } from '../views/countriesView.js';

export function createCountriesPage(state) {
    const root = document.createElement('div');
    root.innerHTML = `
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
                    <input type="text" id="searchInput" placeholder="Search by name...">
                    <button class="clear-btn">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="languageInput" placeholder="Search by language...">
                    <button class="clear-btn">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="currencyInput" placeholder="Search by currency...">
                    <button class="clear-btn">x</button>
                </div>
                <div class="input-with-clear">
                    <input type="text" id="capitalInput" placeholder="Search by capital...">
                    <button class="clear-btn">x</button>
                </div>
                <button id="clearAllBtn">Clear All Filters</button>
            </div>
        </div>
        <div id="countryList"></div>
        <div id="countryInfo" style="display: none;"></div>
    `;

    const countryList = root.querySelector('#countryList');
    const countryInfo = root.querySelector('#countryInfo');
    const searchInput = root.querySelector('#searchInput');
    const regionFilter = root.querySelector('#regionFilter');
    const languageInput = root.querySelector('#languageInput');
    const currencyInput = root.querySelector('#currencyInput');
    const capitalInput = root.querySelector('#capitalInput');
    const clearBtns = root.querySelectorAll('.clear-btn');
    const clearAllBtn = root.querySelector('#clearAllBtn');

    function loadCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(countries => {
                state.data = countries;
                displayCountries(countries, countryList);
            })
            .catch(error => console.error('Countries loading error:', error));
    }

    function applyFilters() {
        const name = searchInput.value.toLowerCase();
        const region = regionFilter.value;
        const language = languageInput.value.toLowerCase();
        const currency = currencyInput.value.toLowerCase();
        const capital = capitalInput.value.toLowerCase();

        const filtered = state.data.filter(country => {
            const matchesName = name ? country.name.common.toLowerCase().includes(name) : true;
            const matchesRegion = region ? country.region === region : true;
            const matchesLanguage = language
                ? Object.values(country.languages || {}).some(lang => lang.toLowerCase().includes(language))
                : true;
            const matchesCurrency = currency
                ? Object.values(country.currencies || {}).some(curr => curr.name.toLowerCase().includes(currency))
                : true;
            const matchesCapital = capital
                ? (country.capital || []).some(cap => cap.toLowerCase().includes(capital))
                : true;

            return matchesName && matchesRegion && matchesLanguage && matchesCurrency && matchesCapital;
        });

        countryInfo.style.display = 'none';
        countryList.style.display = 'flex';

        displayCountries(filtered, countryList);
    }

    function clearField(fieldId) {
        const field = root.querySelector(`#${fieldId}`);
        if (field) {
            field.value = '';
            applyFilters();
        }
    }

    function clearAllFields() {
        searchInput.value = '';
        regionFilter.value = '';
        languageInput.value = '';
        currencyInput.value = '';
        capitalInput.value = '';
        applyFilters();
    }

    clearBtns.forEach((btn, index) => {
        const fieldId = ['searchInput', 'languageInput', 'currencyInput', 'capitalInput'][index];
        btn.addEventListener('click', () => clearField(fieldId));
    });

    clearAllBtn.addEventListener('click', clearAllFields);

    searchInput.addEventListener('input', applyFilters);
    regionFilter.addEventListener('change', applyFilters);
    languageInput.addEventListener('input', applyFilters);
    currencyInput.addEventListener('input', applyFilters);
    capitalInput.addEventListener('input', applyFilters);

    loadCountries();

    return { root };
}
