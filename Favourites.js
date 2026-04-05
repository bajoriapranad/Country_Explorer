function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

function renderFavouritesView() {
  const view = createElement('div', { className: 'favourites-view fade-up' });
  view.appendChild(createElement('h2', {}, 'Favourites'));
  if (favourites.length === 0) {
    const empty = createElement('div', { className: 'empty-state' });
    empty.appendChild(createElement('div', { className: 'emoji' }, '♥'));
    empty.appendChild(createElement('p', {}, 'No favourites yet. Hit the ♥ on any country card to save it here.'));
    view.appendChild(empty);
    return view;
  }
  view.appendChild(createElement('p', { className: 'sub' }, `${favourites.length} saved ${favourites.length === 1 ? 'country' : 'countries'}`));
  const grid = createElement('div', { className: 'country-grid' });
  favourites.forEach(country => {
    const card = renderCountryCard(country, true);
    grid.appendChild(card);
  });
  view.appendChild(grid);
  return view;
}