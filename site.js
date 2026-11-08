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

// Visual art: put image files in an "art" folder and add one line per piece.
// The homepage shows the first 4; visual-art.html shows them all.
const ART = [
  { src: 'AutumnDigital.jpg',                        title: 'Autumn · Digital' },
  { src: 'art/BeachDigital.jpg',                         title: 'Beach · Digital' },
  { src: 'art/BeachOilPaint.jpg',                        title: 'Beach · Oil Paint' },
  { src: 'art/BlackWomanGreenPortraitDigital.jpg',       title: 'Portrait in Green · Digital' },
  { src: 'art/CanyonOilPaint.jpg',                       title: 'Canyon · Oil Paint' },
  { src: 'art/Field.jpg',                                title: 'Field' },
  { src: 'art/GhibiliOilPaint.jpg',                      title: 'Ghibli Study · Oil Paint' },
  { src: 'art/GifuSunset.jpg',                           title: 'Gifu Sunset' },
  { src: 'art/Horse.jpg',                                title: 'Horse' },
  { src: 'art/JungleRiverOilPastel.jpg',                 title: 'Jungle River · Oil Pastel' },
  { src: 'art/KyotoLakeOilPaint.jpg',                    title: 'Kyoto Lake · Oil Paint' },
  { src: 'art/LemonsOilPaint.jpg',                       title: 'Lemons · Oil Paint' },
  { src: 'art/MaineCliffside.jpg',                       title: 'Maine Cliffside' },
  { src: 'art/MoggingBlackdudePortraitDigital.jpg',      title: 'Portrait · Digital' },
  { src: 'art/MountainRangeOilPaint.jpg',                title: 'Mountain Range · Oil Paint' },
  { src: 'art/PigeonsOilPaint.jpg',                      title: 'Pigeons · Oil Paint' },
  { src: 'art/PumpkinOilPaint.jpg',                      title: 'Pumpkin · Oil Paint' },
  { src: 'art/RockyPeachOilPaint.jpg',                   title: 'Rocky Peach · Oil Paint' },
  { src: 'art/RuinsOilPaint.jpg',                        title: 'Ruins · Oil Paint' },
  { src: 'art/SunsetOilPaint.jpg',                       title: 'Sunset · Oil Paint' },
  { src: 'art/Waterfall.jpeg',                           title: 'Waterfall' },
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
    <a href="visual-art.html">Art</a>
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

// ---------- Visual art (homepage preview + gallery page) ----------
function artTileHTML(a, i) {
  return `
    <button class="art-tile" data-index="${i}" aria-label="${a.title || 'Artwork'}">
      <img src="${a.src}" alt="${a.title || ''}" loading="lazy">
      ${a.title ? `<span class="art-caption">${a.title}</span>` : ''}
    </button>`;
}

function emptyTiles(n) {
  return Array.from({ length: n }, () => '<div class="art-tile empty">Art coming soon</div>').join('');
}

const artPreview = document.getElementById('art-preview');
if (artPreview) {
  artPreview.innerHTML = ART.length ? ART.slice(0, 4).map(artTileHTML).join('') : emptyTiles(4);
}

const gallery = document.getElementById('gallery');
if (gallery) {
  gallery.innerHTML = ART.length ? ART.map(artTileHTML).join('') : emptyTiles(6);
}

// Click a piece to view it large; click anywhere or press Esc to close
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img alt=""><p></p>';
document.body.append(lightbox);

document.addEventListener('click', (e) => {
  const tile = e.target.closest('.art-tile[data-index]');
  if (tile) {
    const a = ART[tile.dataset.index];
    lightbox.querySelector('img').src = a.src;
    lightbox.querySelector('p').textContent = a.title || '';
    lightbox.classList.add('open');
  } else if (e.target.closest('.lightbox')) {
    lightbox.classList.remove('open');
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

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
        <h4>More</h4>
        <ul>
          <li><a href="more-about-me.html">More about me</a></li>
          <li><a href="visual-art.html">Visual art</a></li>
          <li><a href="mailto:${EMAIL}">Email</a></li>
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
