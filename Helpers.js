// format big numbers nicely: 1400000 → "1.4M"
function formatNumber(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)         return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

// get first currency name from currencies object
function getCurrency(currencies) {
  if (!currencies) return '—';
  const keys = Object.keys(currencies);
  if (!keys.length) return '—';
  const c = currencies[keys[0]];
  return `${c.name} (${c.symbol || keys[0]})`;
}

// get languages as a comma-separated string
function getLanguages(languages) {
  if (!languages) return '—';
  return Object.values(languages).join(', ');
}

// format area
function formatArea(area) {
  if (!area) return '—';
  return formatNumber(area) + ' km²';
}

// get capital or fallback
function getCapital(capital) {
  if (!capital || !capital.length) return '—';
  return capital[0];
}

// persist favourites in localStorage
function loadFavourites() {
  try { return JSON.parse(localStorage.getItem('ce_favs') || '[]'); }
  catch { return []; }
}

function saveFavourites(favs) {
  localStorage.setItem('ce_favs', JSON.stringify(favs));
}