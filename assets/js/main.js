/* ═══════════════════════════════════════════════════════════
   NEXT RIDES UGANDA — main.js
   All site-wide JavaScript: cursor, nav, scroll reveal,
   counters, UGX toggle, car/rental renderers, forms, search
═══════════════════════════════════════════════════════════ */

/* ── Custom Cursor ─────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  if (!dot || !ring || window.matchMedia('(hover:none)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  function addHover(sel) {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
    });
  }
  addHover('a, button, .btn, .car-card, .rent-card, .soc-card, .brand-card, .fp, .cc-q, .pin-card');
})();

/* ── Currency ───────────────────────────────────────────── */
let UGX_RATE = 3700, showUGX = false;
fetch('https://api.frankfurter.app/latest?from=USD&to=UGX')
  .then(r => r.json())
  .then(d => { if (d.rates?.UGX) UGX_RATE = d.rates.UGX; })
  .catch(() => {});

const fmtUSD = n => '$' + Number(n).toLocaleString('en-US');
const fmtUGX = n => 'UGX ' + Math.round(n * UGX_RATE).toLocaleString('en-UG');

function toggleUGX() {
  showUGX = !showUGX;
  document.querySelectorAll('#ugx-btn').forEach(b => b.textContent = showUGX ? 'Show USD' : 'Show UGX');
  document.querySelectorAll('[data-usd-price]').forEach(el => {
    const v = parseFloat(el.dataset.usdPrice);
    el.textContent = showUGX ? fmtUGX(v) : fmtUSD(v);
  });
  document.querySelectorAll('[data-ugx-sub]').forEach(el => {
    const v = parseFloat(el.dataset.usdPrice);
    el.textContent = showUGX ? '' : '≈ ' + fmtUGX(v);
  });
}
document.querySelectorAll('#ugx-btn').forEach(b => b.addEventListener('click', toggleUGX));

/* ── Navbar Scroll ─────────────────────────────────────── */
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('sc', scrollY > 60);
  btt?.classList.toggle('on', scrollY > 400);
}, { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Burger / Mobile Nav ───────────────────────────────── */
const burg   = document.getElementById('burg');
const mobNav = document.getElementById('mob-nav');
burg?.addEventListener('click', () => {
  burg.classList.toggle('on');
  mobNav.classList.toggle('on');
  document.body.style.overflow = mobNav.classList.contains('on') ? 'hidden' : '';
});
document.querySelectorAll('.nav-a').forEach(a => a.addEventListener('click', () => {
  burg?.classList.remove('on');
  mobNav?.classList.remove('on');
  document.body.style.overflow = '';
}));

/* ── Scroll Reveal ─────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
}, { threshold: 0.1 });

function observeReveal(parent) {
  (parent || document).querySelectorAll('.rv,.rl,.rr').forEach(el => {
    el.classList.remove('in');
    revObs.observe(el);
  });
}
observeReveal();

/* ── Counter Animation ─────────────────────────────────── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suf || '';
  if (!target) return;
  const dur = 1800, start = performance.now();
  (function step(ts) {
    const p    = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = (Number.isInteger(target) ? Math.floor(ease * target) : (ease * target).toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ── Directions ────────────────────────────────────────── */
document.querySelectorAll('.get-dir').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = encodeURIComponent('Cadam Enterprises Naguru Road Kampala Uganda');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => window.open(`https://www.google.com/maps/dir/${p.coords.latitude},${p.coords.longitude}/${q}`, '_blank'),
        ()  => window.open(`https://www.google.com/maps/search/${q}`, '_blank')
      );
    } else {
      window.open(`https://www.google.com/maps/search/${q}`, '_blank');
    }
  });
});

/* ── Badge Class Map ───────────────────────────────────── */
const BADGE = {
  'NEW ARRIVAL': 'b-new', 'HOT DEAL': 'b-hot', 'RARE FIND': 'b-rare',
  'FEATURED': 'b-feat', 'ICON': 'b-new', 'EXECUTIVE': 'b-feat',
  'MOST POPULAR': 'b-new', 'BEST FOR GROUPS': 'b-hot', 'ULTIMATE THRILL': 'b-rare',
};
const wa_num = () => window.NR?.biz?.wa || '256753717412';

/* ── Car Card HTML ─────────────────────────────────────── */
function buildCarCard(c) {
  const waMsg = encodeURIComponent(`Hi Next Rides! 👋\nI'm interested in the ${c.year} ${c.brand} ${c.model} (${fmtUSD(c.price)}).\nCould you please share more details?`);
  const wa    = `https://wa.me/${wa_num()}?text=${waMsg}`;
  const bc    = c.badge ? (BADGE[c.badge] || 'b-feat') : '';
  return `
  <div class="car-card rv">
    ${c.badge ? `<div class="cc-badge ${bc}">${c.badge}</div>` : ''}
    <div class="cc-img">
      <img src="${c.img}" alt="${c.brand} ${c.model} ${c.year}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'">
      <div class="cc-quick">
        <a href="${wa}" target="_blank" rel="noopener" class="cc-q" title="WhatsApp">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="${wa}" target="_blank" class="cc-q" title="Enquire">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>
    <div class="cc-body">
      <div class="cc-brand">${c.brand}</div>
      <div class="cc-name">${c.model} <em>${c.year}</em></div>
      <div class="cc-specs">
        <span class="cc-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${c.mileage}
        </span>
        <span class="cc-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="3" ry="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42"/></svg>
          ${c.fuel}
        </span>
        <span class="cc-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          ${c.trans}
        </span>
        ${c.color ? `<span class="cc-spec">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20a7 7 0 10-7-7"/></svg>
          ${c.color}
        </span>` : ''}
      </div>
      <div class="cc-foot">
        <div>
          <div class="cc-price" data-usd-price="${c.price}">${fmtUSD(c.price)}</div>
          <div class="cc-ugx"  data-ugx-sub data-usd-price="${c.price}">≈ ${fmtUGX(c.price)}</div>
        </div>
        <a href="${wa}" target="_blank" rel="noopener" class="btn btn-r btn-sm">Enquire</a>
      </div>
    </div>
  </div>`;
}

/* ── Rental Card HTML ──────────────────────────────────── */
function buildRentCard(r) {
  const waMsg = encodeURIComponent(`Hi Next Rides! 👋\nI'd like to book the ${r.brand} ${r.model} (${r.year}).\nPlease share availability and pricing.`);
  const wa    = `https://wa.me/${wa_num()}?text=${waMsg}`;
  return `
  <div class="rent-card rv">
    ${r.badge ? `<div class="rc-badge">${r.badge}</div>` : ''}
    <div class="rc-img">
      <img src="${r.img}" alt="${r.brand} ${r.model}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'">
    </div>
    <div class="rc-body">
      <div class="rc-brand">${r.brand}</div>
      <div class="rc-name">${r.model} <span style="font-size:1.1rem;color:var(--dim)">${r.year}</span></div>
      <div class="rc-feats">
        ${r.features.map(f => `<span class="rc-feat">${f}</span>`).join('')}
        <span class="rc-feat">${r.seats} Seats</span>
      </div>
      <div class="rc-foot">
        <div>
          <div class="rc-price">$${r.priceDay}<span style="font-size:1rem"> / day</span></div>
          <div class="rc-sub">$${r.priceWeek} / week</div>
        </div>
        <a href="${wa}" target="_blank" rel="noopener" class="btn btn-g btn-sm">Book Now</a>
      </div>
    </div>
  </div>`;
}

/* ── Testimonial HTML ──────────────────────────────────── */
function buildTestCard(t) {
  const stars = Array(t.stars).fill(`<svg class="test-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');
  return `
  <div class="test-card rv">
    <div class="test-stars">${stars}</div>
    <p class="test-txt">"${t.text}"</p>
    <div class="test-auth">
      <div class="test-av">${t.name[0]}</div>
      <div>
        <div class="test-name">${t.name}</div>
        <div class="test-loc">${t.loc}</div>
      </div>
    </div>
  </div>`;
}

/* ── Brands Marquee HTML ───────────────────────────────── */
function buildMarquee(container) {
  if (!container || !window.NR?.brands) return;
  const html = window.NR.brands.map(b =>
    `<div class="mq-item"><div class="mq-dot"></div><div class="mq-name">${b.name}</div></div>`
  ).join('');
  container.innerHTML = html + html; // duplicate for seamless loop
}

/* ── Render Helper ─────────────────────────────────────── */
function render(id, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = html;
  observeReveal(el);
  el.querySelectorAll('[data-target]').forEach(e => cntObs.observe(e));
}

/* ── Page Renderers ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const D = window.NR;
  if (!D) return;

  /* Marquee — on every page */
  buildMarquee(document.getElementById('mq-track'));

  /* Hero Stats */
  const statsEl = document.getElementById('hero-stats');
  if (statsEl) {
    statsEl.innerHTML = D.stats.map(s =>
      `<div class="h-stat">
         <div class="h-stat-v" data-target="${s.v}" data-suf="${s.s}">${s.v}${s.s}</div>
         <div class="h-stat-l">${s.l}</div>
       </div>`
    ).join('');
    statsEl.querySelectorAll('[data-target]').forEach(e => cntObs.observe(e));
  }

  /* Featured Cars (homepage) */
  const feat = document.getElementById('featured-cars');
  if (feat) {
    render('featured-cars', D.cars.filter(c => c.featured).map(buildCarCard).join(''));
  }

  /* Full Inventory */
  const inv = document.getElementById('inventory-grid');
  if (inv) {
    render('inventory-grid', D.cars.map(buildCarCard).join(''));

    /* Filter buttons */
    document.querySelectorAll('.fp[data-f]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fp[data-f]').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const v    = btn.dataset.f;
        const pool = v === 'all' ? D.cars : D.cars.filter(c => c.brand === v);
        render('inventory-grid', pool.length
          ? pool.map(buildCarCard).join('')
          : `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--muted)">
               <div style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--dim);margin-bottom:12px">No Vehicles Found</div>
               <p>Try a different filter or <a href="order.html" style="color:var(--red3)">place a custom order.</a></p>
             </div>`
        );
      });
    });
  }

  /* Rentals */
  const rentEl = document.getElementById('rental-grid');
  if (rentEl) render('rental-grid', D.rentals.map(buildRentCard).join(''));

  /* Brands page */
  const brandsEl = document.getElementById('brands-grid');
  if (brandsEl) {
    render('brands-grid', D.brands.map(b => {
      const initials = b.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      const logoHtml = b.logo
        ? `<img src="${b.logo}" alt="${b.name}" class="bc-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          + `<div class="bc-logo-init" style="display:none">${initials}</div>`
        : `<div class="bc-logo-init">${initials}</div>`;
      return `
        <div class="brand-card rv" data-origin="${b.origin}">
          <div class="bc-logo-wrap">${logoHtml}</div>
          <div class="bc-name">${b.name}</div>
          <div class="bc-tag">${b.tag}</div>
        </div>`;
    }).join(''));
  }

  /* Testimonials */
  const testEl = document.getElementById('testimonials');
  if (testEl) render('testimonials', D.testimonials.map(buildTestCard).join(''));

  /* About page stats */
  const aStats = document.getElementById('about-stats');
  if (aStats) {
    const pairs = [['5K+','Happy Clients'],['8+','Years'],['34','Brands'],['5★','Rating']];
    aStats.innerHTML = pairs.map(([v,l]) => `
      <div class="rv">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:3.5rem;letter-spacing:.04em;line-height:1" class="t-r">${v}</div>
        <div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin-top:6px">${l}</div>
      </div>`).join('');
    observeReveal(aStats);
  }

  /* Re-run cursor hover on new elements */
  document.querySelectorAll('a,button,.btn,.car-card,.rent-card,.brand-card,.fp,.cc-q').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });
});

/* ── Search (on homepage and inventory page) ───────────── */
function doSearch() {
  const brand  = document.getElementById('s-brand')?.value  || '';
  const budget = document.getElementById('s-budget')?.value || '';
  const type   = document.getElementById('s-type')?.value   || '';
  const D      = window.NR;
  if (!D) return;

  const res = D.cars.filter(c => {
    const bOk  = !brand  || c.brand === brand;
    const tOk  = !type   || c.trans === type;
    const buOk = !budget || (() => {
      const b = parseFloat(budget);
      if (b === 30000)  return c.price < 30000;
      if (b === 60000)  return c.price < 60000;
      if (b === 100000) return c.price < 100000;
      if (b === 999999) return c.price >= 100000;
      return true;
    })();
    return bOk && tOk && buOk;
  });

  const target = document.getElementById('inventory-grid') || document.getElementById('featured-cars');
  if (!target) {
    window.location.href = 'inventory.html';
    return;
  }
  render(target.id, res.length
    ? res.map(buildCarCard).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--muted)">
         <div style="font-family:'Bebas Neue',sans-serif;font-size:3rem;color:var(--dim);margin-bottom:12px">No Results Found</div>
         <p>Try adjusting your search or <a href="order.html" style="color:var(--red3)">place a custom order.</a></p>
       </div>`
  );
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('search-btn')?.addEventListener('click', doSearch);

/* ── Order Form ────────────────────────────────────────── */
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const msg = encodeURIComponent(
      `Hello Next Rides! 🚗\n\n*CUSTOM ORDER REQUEST*\n`+
      `Name:   ${f.name?.value}\n`+
      `Phone:  ${f.phone?.value}\n`+
      `Email:  ${f.email?.value || '—'}\n`+
      `Brand:  ${f.brand?.value}\n`+
      `Model:  ${f.model?.value}\n`+
      `Year:   ${f.yr?.value}\n`+
      `Budget: ${f.budget?.value}\n`+
      `Colour: ${f.colour?.value || '—'}\n`+
      `Notes:  ${f.notes?.value || '—'}`
    );
    window.open(`https://wa.me/${wa_num()}?text=${msg}`, '_blank');
    const ok = document.getElementById('order-ok');
    if (ok) { orderForm.style.display = 'none'; ok.style.display = 'flex'; }
    else f.reset();
  });
}

/* ── Contact Form ──────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const msg = encodeURIComponent(
      `Hello Next Rides! 👋\n`+
      `Name:    ${f.name?.value}\n`+
      `Phone:   ${f.phone?.value}\n`+
      `Subject: ${f.subject?.value}\n`+
      `Message: ${f.message?.value}`
    );
    window.open(`https://wa.me/${wa_num()}?text=${msg}`, '_blank');
    const ok = document.getElementById('contact-ok');
    if (ok) { contactForm.style.display = 'none'; ok.style.display = 'flex'; }
    else f.reset();
  });
}

/* ═══════════════════════════════════════════════════════════
   PREMIUM FX — Speed streaks · Particles · Glow · Glitch
═══════════════════════════════════════════════════════════ */

/* ── Speed streaks in hero ── */
(function spawnStreaks() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const wrap = document.createElement('div');
  wrap.className = 'h-streaks';
  hero.appendChild(wrap);

  function makeStreak() {
    const el = document.createElement('div');
    el.className = 'h-streak';
    const top  = Math.random() * 100;
    const w    = 80 + Math.random() * 220;
    const dur  = 1.4 + Math.random() * 1.8;
    const del  = Math.random() * 3;
    const opacity = 0.2 + Math.random() * 0.5;
    el.style.cssText = [
      'top:' + top + '%',
      'width:' + w + 'px',
      'animation-duration:' + dur + 's',
      'animation-delay:' + del + 's',
      'opacity:' + opacity
    ].join(';');
    wrap.appendChild(el);
    setTimeout(() => el.remove(), (dur + del) * 1000 + 600);
  }

  // Spawn 20 initial streaks staggered
  for (let i = 0; i < 20; i++) setTimeout(makeStreak, i * 160);
  // Keep spawning
  setInterval(makeStreak, 280);
})();

/* ── Floating particles in hero ── */
(function spawnParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const wrap = document.createElement('div');
  wrap.className = 'h-particles';
  hero.appendChild(wrap);

  function makeParticle() {
    const el = document.createElement('div');
    el.className = 'h-particle';
    el.style.cssText = [
      'left:' + (5 + Math.random() * 50) + '%',
      'bottom:' + (10 + Math.random() * 60) + '%',
      'animation-duration:' + (3 + Math.random() * 4) + 's',
      'animation-delay:' + (Math.random() * 3) + 's',
      'width:' + (1 + Math.random() * 2) + 'px',
      'height:' + (1 + Math.random() * 2) + 'px',
      'background:' + (Math.random() > .6 ? 'rgba(140,147,157,.9)' : 'rgba(184,31,10,.9)')
    ].join(';');
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 7500);
  }

  for (let i = 0; i < 18; i++) setTimeout(makeParticle, i * 220);
  setInterval(makeParticle, 350);
})();

/* ── Ambient mouse glow on hero ── */
(function heroMouseGlow() {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(hover:none)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'h-mouse-glow';
  hero.appendChild(glow);

  hero.addEventListener('mousemove', function(e) {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + 'px';
    glow.style.top  = (e.clientY - r.top)  + 'px';
  });
})();

/* ── Spark burst on btn-r click ── */
(function btnSparks() {
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-r, .btn-g');
    if (!btn) return;
    // Create ripple
    var ripple = document.createElement('span');
    ripple.style.cssText = [
      'position:absolute',
      'border-radius:50%',
      'width:200px',
      'height:200px',
      'background:rgba(255,255,255,.18)',
      'pointer-events:none',
      'transform:translate(-50%,-50%) scale(0)',
      'animation:sparkPop .55s cubic-bezier(.22,1,.36,1) forwards',
      'top:' + (e.offsetY || 50) + 'px',
      'left:' + (e.offsetX || 50) + 'px',
      'z-index:99'
    ].join(';');
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
})();

/* ── Glitch text — add data-text to .sh h2 .t-r spans ── */
(function initGlitch() {
  document.querySelectorAll('.sh h2 .t-r').forEach(function(el) {
    el.classList.add('glitch');
    el.dataset.text = el.textContent;
  });
})();

/* ── Section heading neon underline trigger ── */
(function initNeonLine() {
  const shs = document.querySelectorAll('.sh.c');
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: .3 });
  shs.forEach(function(el) { obs.observe(el); });
})();

/* ── Magnetic buttons — subtle pull towards cursor ── */
(function magneticBtns() {
  if (window.matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.btn-r, .btn-g').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.18;
      const y = (e.clientY - r.top  - r.height / 2) * 0.18;
      btn.style.transform = 'translate(' + x + 'px,' + y + 'px) translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
    });
  });
})();

/* ── 3D tilt on car cards ── */
(function cardTilt() {
  if (window.matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.car-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const r   = card.getBoundingClientRect();
      const cx  = r.width  / 2;
      const cy  = r.height / 2;
      const dx  = (e.clientX - r.left - cx) / cx;
      const dy  = (e.clientY - r.top  - cy) / cy;
      card.style.transform = [
        'translateY(-10px)',
        'rotateY(' + (dx * 5) + 'deg)',
        'rotateX(' + (-dy * 4) + 'deg)',
        'scale(1.01)'
      ].join(' ');
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
})();

/* ── Page wipe transition on internal links ── */
(function pageWipe() {
  // Inject wipe overlay once
  var wipe = document.createElement('div');
  wipe.className = 'page-wipe';
  document.body.appendChild(wipe);

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var rawHref = link.getAttribute('href');
    var absHref  = link.href; // always fully resolved by browser
    // Skip: anchors, external, mailto, tel, whatsapp, new-tab
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto') ||
        rawHref.startsWith('tel') || rawHref.startsWith('wa.me') ||
        link.target === '_blank') return;
    // Skip external domains
    if (link.hostname && link.hostname !== location.hostname) return;

    e.preventDefault();
    wipe.style.transform = 'scaleX(1)';
    wipe.style.transformOrigin = 'left';
    setTimeout(function() { window.location.href = absHref; }, 380);
  });

  // On page load — wipe out from right
  wipe.style.transform = 'scaleX(1)';
  wipe.style.transformOrigin = 'right';
  wipe.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
  requestAnimationFrame(function() {
    setTimeout(function() { wipe.style.transform = 'scaleX(0)'; }, 60);
  });
})();

