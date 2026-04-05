function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

function renderCountryCard(country, isFav) {
  const name = country.name.common;
  const flag = country.flags?.svg || country.flags?.png;
  const capital = getCapital(country.capital);
  const pop = formatNumber(country.population);
  const region = country.region;

  const card = createElement('div', {
    className: 'country-card',
    onclick: () => { selected = country; render(); }
  });

  const img = createElement('img', {
    className: 'card-flag',
    src: flag,
    alt: `${name} flag`,
    loading: 'lazy'
  });
  card.appendChild(img);

  const actions = createElement('div', { className: 'card-actions' });

  const favBtn = createElement('button', {
    className: `icon-btn ${isFav ? 'fav-active' : ''}`,
    onclick: (e) => { e.stopPropagation(); toggleFav(country); render(); },
    title: isFav ? 'Remove from favourites' : 'Add to favourites'
  }, '♥');
  actions.appendChild(favBtn);

  card.appendChild(actions);

  const body = createElement('div', { className: 'card-body' });
  body.appendChild(createElement('div', { className: 'card-name' }, name));
  const meta = createElement('div', { className: 'card-meta' });
  meta.appendChild(createElement('span', {}, createElement('b', {}, capital)));
  meta.appendChild(createElement('span', {}, `${region} · ${pop}`));
  body.appendChild(meta);
  card.appendChild(body);

  return card;
}