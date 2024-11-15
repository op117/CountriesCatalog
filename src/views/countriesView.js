export function displayCountries(countries) {
    const countryList = document.getElementById('countryList');
    const countryInfo = document.getElementById('countryInfo');

    countryInfo.style.display = 'none';
    countryInfo.innerHTML = '';

    countryList.innerHTML = '';
    countryList.style.display = 'flex';

    countries.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.className = 'country';
        countryElement.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        countryElement.addEventListener('click', () => displayCountryInfo(country));
        countryList.appendChild(countryElement);
    });
}

export function displayCountryInfo(country) {
    const countryList = document.getElementById('countryList');
    const countryInfo = document.getElementById('countryInfo');

    countryList.style.display = 'none';

    countryInfo.style.display = 'block';
    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="150">
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
    `;
}
