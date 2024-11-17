export function displayCountries(countries, countryList) {
    countryList.innerHTML = '';

    countries.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.className = 'country';
        countryElement.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
            <p>Population: ${country.population.toLocaleString()}</p>
        `;
        
        countryElement.addEventListener('click', () => {
            displayCountryInfo(country, countryList);
        });
        countryList.appendChild(countryElement);
    });
}

export function displayCountryInfo(country, countryList) {
    const countryInfo = document.getElementById('countryInfo');
    if (!countryInfo) return;

    countryList.style.display = 'none';

    countryInfo.style.display = 'block';
    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="150">
        <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region || 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
    `;
}
