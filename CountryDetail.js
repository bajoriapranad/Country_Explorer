function createElement(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  Object.assign(el, props);
  children.forEach(child => {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  });
  return el;
}

function renderCountryDetail() {
  try {
    if (!selected) return null;

    const overlay = createElement('div', { className: 'detail-overlay', onclick: (e) => { if (e.target === e.currentTarget) { selected = null; render(); } } });
    const panel = createElement('div', { className: 'detail-panel' });

    // Safely extract properties with fallbacks
    const name = selected?.name?.common || 'Unknown';
    const flag = selected?.flags?.svg || selected?.flags?.png || '';
    const capital = getCapital(selected?.capital);
    const pop = formatNumber(selected?.population);
    const area = formatArea(selected?.area);
    const region = selected?.region || '—';
    const subregion = selected?.subregion || '—';
    const currency = getCurrency(selected?.currencies);
    const langs = getLanguages(selected?.languages);
    const cca3 = selected?.cca3 || '—';

    // Build hero section
    const hero = createElement('div', { className: 'detail-hero' });
    if (flag) {
      hero.appendChild(createElement('img', { src: flag, alt: name }));
    }
    const overlayDiv = createElement('div', { className: 'detail-hero-overlay' });
    hero.appendChild(overlayDiv);
    const closeBtn = createElement('button', { className: 'detail-close', onclick: () => { selected = null; render(); } }, '✕');
    hero.appendChild(closeBtn);
    panel.appendChild(hero);

    // Build body section
    const body = createElement('div', { className: 'detail-body' });
    body.appendChild(createElement('h2', { className: 'detail-title' }, name));
    body.appendChild(createElement('p', { className: 'detail-subtitle' }, `${subregion} · ${region}`));

    // Build stats grid
    const grid = createElement('div', { className: 'detail-grid' });
    const stats = [
      ['Population', pop],
      ['Capital', capital],
      ['Area', area],
      ['Currency', currency],
      ['Languages', langs],
      ['Region', region],
      ['Subregion', subregion],
      ['Country Code', cca3]
    ];
    
    stats.forEach(([label, value]) => {
      const stat = createElement('div', { className: 'detail-stat' });
      stat.appendChild(createElement('div', { className: 'stat-label' }, label));
      const valueClass = label === 'Population' ? 'stat-value accent' : 'stat-value';
      stat.appendChild(createElement('div', { className: valueClass }, value || '—'));
      grid.appendChild(stat);
    });
    
    body.appendChild(grid);
    panel.appendChild(body);
    overlay.appendChild(panel);
    return overlay;
  } catch (error) {
    console.error('Error rendering country detail:', error);
    // Return a simple error message
    const overlay = createElement('div', { className: 'detail-overlay', onclick: (e) => { if (e.target === e.currentTarget) { selected = null; render(); } } });
    const panel = createElement('div', { className: 'detail-panel' });
    const body = createElement('div', { className: 'detail-body' });
    body.appendChild(createElement('h2', { className: 'detail-title' }, 'Error'));
    body.appendChild(createElement('p', {}, 'Unable to load country details. Please try again.'));
    panel.appendChild(body);
    overlay.appendChild(panel);
    return overlay;
  }
}