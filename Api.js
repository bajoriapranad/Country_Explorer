// fetches all countries from the REST Countries API
async function fetchAllCountries() {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,area,currencies,languages,cca3'
  );
  if (!res.ok) throw new Error('Failed to fetch countries');
  const data = await res.json();
  return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

// fetch a single country by cca3 code
async function fetchCountryByCode(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data[0];
}