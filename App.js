// Global state
let countries = [];
let loading = true;
let error = null;
let search = '';
let selected = null;
let view = 'explore'; // explore | favourites
let theme = 'dark';
let favourites = loadFavourites();
let region = 'All';

// DOM elements
const root = document.getElementById('root');

// Utility functions
function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

function render() {
  root.innerHTML = '';
  if (error) {
    root.appendChild(createElement('div', { className: 'loader' },
      createElement('p', { style: 'color: var(--danger)' }, '⚠ ' + error),
      createElement('p', { style: 'color: var(--muted); font-size: 0.85rem' }, 'Check your internet connection and reload.')
    ));
    return;
  }

  // Apply theme
  document.documentElement.setAttribute('data-theme', theme);

  const appDiv = createElement('div');

  // Navbar
  appDiv.appendChild(renderNavbar());

  // Main views
  if (view === 'explore') {
    appDiv.appendChild(renderCountryGrid());
  } else if (view === 'favourites') {
    appDiv.appendChild(renderFavouritesView());
  }

  root.appendChild(appDiv);

  // Country detail modal (at root level)
  if (selected) {
    root.appendChild(renderCountryDetail());
  }
}

function renderNavbar() {
  const nav = createElement('nav', { className: 'navbar' });

  const logo = createElement('div', { className: 'navbar-logo' }, 'PRANAD BAJORIA 24BAI0352');
  nav.appendChild(logo);

  const searchWrap = createElement('div', { className: 'search-wrap' });
  searchWrap.appendChild(createElement('span', { className: 'search-icon' }, '🔍'));
  const searchInput = createElement('input', {
    type: 'text',
    placeholder: 'Search countries...',
    value: search,
    oninput: (e) => { search = e.target.value; render(); }
  });
  searchWrap.appendChild(searchInput);
  nav.appendChild(searchWrap);

  const actions = createElement('div', { className: 'navbar-actions' });

  const exploreBtn = createElement('button', {
    className: `nav-btn ${view === 'explore' ? 'active' : ''}`,
    onclick: () => { view = 'explore'; render(); }
  }, 'Explore');
  actions.appendChild(exploreBtn);

  const favBtn = createElement('button', {
    className: `nav-btn ${view === 'favourites' ? 'active' : ''}`,
    onclick: () => { view = 'favourites'; render(); }
  }, '♥ ' + (favourites.length > 0 ? favourites.length : ''));
  actions.appendChild(favBtn);

  const themeBtn = createElement('button', {
    className: 'nav-btn theme-btn',
    onclick: () => { theme = theme === 'dark' ? 'light' : 'dark'; render(); }
  }, theme === 'dark' ? '☀' : '☾');
  actions.appendChild(themeBtn);

  nav.appendChild(actions);
  return nav;
}

function renderCountryGrid() {
  const grid = createElement('div');

  if (loading) {
    grid.appendChild(createElement('div', { className: 'loader' },
      createElement('div', { className: 'spinner' }),
      createElement('p', { style: 'color: var(--muted); font-size: 0.85rem' }, 'Loading countries...')
    ));
    return grid;
  }

  const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const filterDiv = createElement('div', { className: 'region-filter' });
  REGIONS.forEach(r => {
    const btn = createElement('button', {
      className: `region-chip ${region === r ? 'active' : ''}`,
      onclick: () => { region = r; render(); }
    }, r);
    filterDiv.appendChild(btn);
  });
  grid.appendChild(filterDiv);

  const header = createElement('div', { className: 'grid-header' });
  const filtered = getFilteredCountries();
  header.appendChild(createElement('p', {}, filtered.length + ' countries'));
  grid.appendChild(header);

  const gridDiv = createElement('div', { className: 'country-grid' });
  const favCodes = new Set(favourites.map(f => f.cca3));

  filtered.forEach(country => {
    const card = renderCountryCard(country, favCodes.has(country.cca3));
    gridDiv.appendChild(card);
  });
  grid.appendChild(gridDiv);

  return grid;
}

function renderFavouritesView() {
  const view = createElement('div');
  if (favourites.length === 0) {
    view.appendChild(createElement('p', {}, 'No favourites yet.'));
    return view;
  }
  favourites.forEach(country => {
    const card = renderCountryCard(country, true);
    view.appendChild(card);
  });
  return view;
}

function getFilteredCountries() {
  let filtered = countries;
  const q = search.toLowerCase().trim();
  if (q) {
    filtered = filtered.filter(c =>
      c.name.common.toLowerCase().includes(q) ||
      c.name.official?.toLowerCase().includes(q) ||
      getCapital(c.capital).toLowerCase().includes(q) ||
      c.region?.toLowerCase().includes(q)
    );
  }
  if (region !== 'All') {
    filtered = filtered.filter(c => c.region === region);
  }
  return filtered;
}

function toggleFav(country) {
  const exists = favourites.some(f => f.cca3 === country.cca3);
  if (exists) {
    favourites = favourites.filter(f => f.cca3 !== country.cca3);
  } else {
    favourites = [...favourites, country];
  }
  saveFavourites(favourites);
}

// Initialize
fetchAllCountries()
  .then(data => {
    countries = data;
    loading = false;
    render();
  })
  .catch(err => {
    error = err.message;
    loading = false;
    render();
  });