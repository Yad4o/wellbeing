// ── LOADER ───────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.querySelector('.hero-bg-img').classList.add('loaded');
    revealInit();
  }, 1600);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  const animTrail = () => {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  };
  animTrail();

  document.querySelectorAll('a, button, .night-card, .artist-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ── NAV SCROLL ────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER ─────────────────────────────────────────────────────
const ham = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
  ham.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────
function revealInit() {
  const targets = document.querySelectorAll(
    '.exp-text, .exp-img-col, .night-card, .menu-item, .cocktail-item, .gallery-item, .artist-card, .bar-img, .exp-stat, .section-heading, .section-sub, .body-text, .timeline-item'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => obs.observe(el));
}

// ── HERO PARALLAX ────────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${offset * 0.25}px)`;
    }
  });
}

// ── COUNTER ANIMATE (experience stats) ───────────────────────────
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    statsObs.unobserve(e.target);
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.exp-stats');
if (statsSection) statsObs.observe(statsSection);

// ── GALLERY LIGHTBOX (simple) ─────────────────────────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const bg = getComputedStyle(item).backgroundImage;
    const url = bg.slice(5, -2).replace(/['"]/g, '');
    const lb = document.createElement('div');
    lb.style.cssText = `position:fixed;inset:0;z-index:9000;background:rgba(8,6,4,0.96);display:flex;align-items:center;justify-content:center;cursor:zoom-out;`;
    lb.innerHTML = `<img src="${url}" style="max-width:90vw;max-height:90vh;object-fit:contain;border-radius:2px;">`;
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

// ── RESERVATION FORM ─────────────────────────────────────────────
function handleReserve(e) {
  e.preventDefault();
  document.querySelector('.reserve-form').style.display = 'none';
  document.getElementById('reserve-success').style.display = 'block';
}

// ── TICKER DUPLICATE (seamless loop) ─────────────────────────────
const ticker = document.querySelector('.ticker-inner');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML;
}
