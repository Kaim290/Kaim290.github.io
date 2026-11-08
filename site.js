/* =========================================================
   Shared header, footer and "more games" strip.
   Edit them here once and every page updates.
   ========================================================= */

const GAMES = [
  { id: 'gloam',      title: 'Gloam',        page: 'gloam.html',        img: 'GloamCapsule.jpg',      blurb: 'Multiplayer co-op dungeon crawler.', badge: 'In development' },
  { id: 'inherimage', title: 'In Her Image', page: 'in-her-image.html', img: 'InHerImageCapsule.jpg', blurb: 'Narrative-driven single-player horror.' },
  { id: 'halloweenie',title: 'Halloweenie',  page: 'halloweenie.html',  img: 'HalloweenieCapsule.jpg',blurb: 'Replicated multiplayer forest crawler.' },
  { id: 'unhallowed', title: 'Unhallowed',   page: 'unhallowed.html',   img: 'UnhallowedCapsule.jpg', blurb: 'Procedural dungeon crawler with boss fights.' }
];

const EMAIL = 'kaiandshane@gmail.com';

// Hides a capsule image that hasn't been added yet, so the card shows its gradient instead
function hideMissing(img) { img.style.display = 'none'; }

function cardHTML(g) {
  return `
    <a class="game-card" href="${g.page}">
      ${g.badge ? `<span class="badge">${g.badge}</span>` : ''}
      <img src="${g.img}" alt="${g.title}" onerror="hideMissing(this)">
      <div class="game-card-info">
        <h3>${g.title}</h3>
        <p>${g.blurb}</p>
        <span class="arrow">View game →</span>
      </div>
    </a>`;
}

// ---------- Header ----------
const header = document.createElement('header');
header.className = 'site-header' + (document.body.dataset.header === 'solid' ? ' solid' : '');
header.innerHTML = `
  <a class="logo" href="index.html">Kai Miller</a>
  <nav class="site-nav">
    <a href="index.html#about">About</a>
    <a href="index.html#games">Games</a>
    <a href="#contact">Contact</a>
  </nav>`;
document.body.prepend(header);

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Home page game grid ----------
const grid = document.getElementById('game-grid');
if (grid) {
  grid.innerHTML = GAMES.map(cardHTML).join('');
  grid.firstElementChild.classList.add('featured');
}

// ---------- "More games" strip on game pages ----------
const current = document.body.dataset.game;
const more = document.getElementById('more-games');
if (more && current) {
  more.innerHTML = GAMES.filter(g => g.id !== current).map(cardHTML).join('');
}

// ---------- Footer ----------
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.id = 'contact';
footer.innerHTML = `
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Kai Miller</div>
        <p>Game developer &amp; environment artist.<br>New York, New York</p>
      </div>
      <div>
        <h4>Games</h4>
        <ul>${GAMES.map(g => `<li><a href="${g.page}">${g.title}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:${EMAIL}">Email</a></li>
          <li><a href="index.html#about">About me</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Kai Miller. All rights reserved.</span>
      <a href="#top">Back to top ↑</a>
    </div>
  </div>`;
document.body.append(footer);

// ---------- Fade in on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));