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
fetch('https://open.er-api.com/v6/latest/USD')
  .then(r => r.json())
  .then(d => { if (d.rates?.UGX) UGX_RATE = d.rates.UGX; })
  .catch(() => {});
const fmtUSD = n => '$' + Number(n).toLocaleString('en-US');
const fmtUGX = n => 'UGX ' + Math.round(n * UGX_RATE).toLocaleString('en-UG');
const fmtFixedUGX = n => 'UGX ' + Number(n).toLocaleString('en-UG');
const slugify = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const vehicleUrl = c => `cars/${slugify(`${c.year}-${c.brand}-${c.model}`)}.html`;

function toggleUGX() {
  showUGX = !showUGX;
  document.querySelectorAll('#ugx-btn').forEach(b => b.textContent = showUGX ? 'Show USD' : 'Show UGX');

  // ── Sale car prices ──
  document.querySelectorAll('[data-usd-price]:not([data-ugx-mode]):not([data-ugx-sub])').forEach(el => {
    const v = parseFloat(el.dataset.usdPrice);
    el.textContent = showUGX ? fmtUGX(v) : fmtUSD(v);
  });
  document.querySelectorAll('[data-ugx-sub]').forEach(el => {
    const v = parseFloat(el.dataset.usdPrice);
    el.textContent = showUGX ? '' : '≈ ' + fmtUGX(v);
  });

  // ── Rental prices: day ──
  document.querySelectorAll('[data-ugx-mode="day"]').forEach(el => {
    const dayV = parseFloat(el.dataset.usdPrice);
    const perEl = el.querySelector('.rc-per');
    const txt   = showUGX ? fmtUGX(dayV) : fmtUSD(dayV);
    if (perEl) { perEl.previousSibling ? perEl.previousSibling.textContent = txt : el.prepend(document.createTextNode(txt)); }
    else { el.childNodes[0].textContent = txt; }
  });

  // ── Rental prices: week ──
  document.querySelectorAll('[data-ugx-mode="week"]').forEach(el => {
    const weekV = parseFloat(el.dataset.usdWeek);
    el.textContent = (showUGX ? fmtUGX(weekV) : fmtUSD(weekV)) + ' / week';
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
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.classList.add('vis'); // also support .vis
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

function observeReveal(parent) {
  (parent || document).querySelectorAll('.rv,.rl,.rr').forEach(el => {
    // If already in view (above fold), show immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in');
      el.classList.add('vis');
    } else {
      el.classList.remove('in');
      el.classList.remove('vis');
      revObs.observe(el);
    }
  });
}
observeReveal();

/* ── Counter Animation ─────────────────────────────────── */
function animateCounter(el) {
  const raw    = el.dataset.target || '';
  const suffix = el.dataset.suf || '';
  /* If value contains K, M, ★ or + after digits, just display as-is */
  if (/[KkMm★+]/.test(raw)) { el.textContent = raw + suffix; return; }
  const target = parseFloat(raw);
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
  'EN ROUTE': 'b-enroute',
};

/* ── Car Slideshow Controls ────────────────────────────── */
function ccGoto(id, idx) {
  const el = document.getElementById(id);
  if (!el) return;
  const total = parseInt(el.dataset.total) || 1;
  idx = Math.max(0, Math.min(idx, total-1));
  el.dataset.slide = idx;
  el.querySelector('.cc-slides').style.transform = `translateX(-${idx*100}%)`;
  el.querySelectorAll('.cc-dot').forEach((d,i) => d.classList.toggle('on', i===idx));
  el.querySelectorAll('.cc-slide video').forEach((video,i) => {
    const slide = video.closest('.cc-slide');
    const selected = Array.from(el.querySelectorAll('.cc-slide')).indexOf(slide) === idx;
    if (selected) {
      if (!video.src && video.dataset.src) video.src = video.dataset.src;
      video.play().catch(() => {});
    } else if (!video.paused) video.pause();
  });
}
function ccNext(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const cur   = parseInt(el.dataset.slide) || 0;
  const total = parseInt(el.dataset.total) || 1;
  ccGoto(id, (cur+1) % total);
}
function ccPrev(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const cur   = parseInt(el.dataset.slide) || 0;
  const total = parseInt(el.dataset.total) || 1;
  ccGoto(id, (cur-1+total) % total);
}

/* ── YouTube Video Wall (home page) ────────────────────── */
function buildYtWall(container) {
  if (!container || !window.NR?.ytVideos) return;
  const videos = window.NR.ytVideos;
  if (!videos.length) {
    const sec = container.closest('section, .vp-section');
    if (sec) sec.style.display = 'none';
    return;
  }
  container.innerHTML = videos.map((v,i) => {
    const cls = v.large ? 'vp-cell large' : 'vp-cell';
    const isLocal = v.src && (v.src.endsWith('.mp4') || v.src.startsWith('assets/'));
    if (isLocal) {
      // Local mp4 — autoplay muted video tile
      return `
    <div class="${cls} rv" style="position:relative;border-radius:14px;overflow:hidden;background:#000">
      <video src="${v.src}" autoplay muted loop playsinline
             style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none"></video>
      <div style="position:absolute;inset:0;background:rgba(0,0,0,.25)"></div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 18px;background:linear-gradient(transparent,rgba(0,0,0,.85));pointer-events:none">
        <div style="font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:3px">${v.brand}</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(.9rem,1.2vw,1.2rem);letter-spacing:.05em;color:#fff;line-height:1.1">${v.title}</div>
        <div style="font-size:.6rem;color:rgba(255,255,255,.45);margin-top:3px">${v.sub}</div>
      </div>
    </div>`;
    }
    // YouTube fallback (legacy)
    return `
    <div class="${cls} yt-wall-cell rv" style="position:relative;border-radius:14px;overflow:hidden;background:#000">
      <div class="yt-wall-thumb" style="position:absolute;inset:0;background-image:url(${v.thumb});background-size:cover;background-position:center;transition:opacity .4s"></div>
      <div class="yt-wall-play" onclick="ytWallPlay(this,'${v.ytId}')" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;background:rgba(0,0,0,.38);transition:background .3s" onmouseenter="this.style.background='rgba(0,0,0,.52)'" onmouseleave="this.style.background='rgba(0,0,0,.38)'">
        <div style="width:${v.large?'64px':'52px'};height:${v.large?'64px':'52px'};border-radius:50%;background:#FF0000;display:flex;align-items:center;justify-content:center;box-shadow:0 0 24px rgba(255,0,0,.5)">
          <svg viewBox="0 0 24 24" fill="white" width="${v.large?'28':'20'}" height="${v.large?'28':'20'}"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        </div>
        <span style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)">Watch ↗</span>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 18px;background:linear-gradient(transparent,rgba(0,0,0,.85));pointer-events:none">
        <div style="font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:3px">${v.brand}</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(.9rem,1.2vw,1.2rem);letter-spacing:.05em;color:#fff;line-height:1.1">${v.title}</div>
        <div style="font-size:.6rem;color:rgba(255,255,255,.45);margin-top:3px">${v.sub}</div>
      </div>
    </div>`;
  }).join('');
}

function ytWallPlay(playBtn, ytId) {
  /* Inject inline iframe directly in the cell so video plays on-page */
  const cell = playBtn.closest('.yt-wall-cell');
  if (!cell) return;
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId + '?autoplay=1&rel=0&modestbranding=1';
  iframe.allow = 'autoplay; encrypted-media; fullscreen';
  iframe.allowFullscreen = true;
  iframe.frameBorder = '0';
  iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;background:#000';
  cell.appendChild(iframe);
  playBtn.style.display = 'none';
  const thumb = cell.querySelector('.yt-wall-thumb');
  if (thumb) thumb.style.opacity = '0';
}
const wa_num = () => window.NR?.biz?.wa || '256771572016';

/* ── Car Card HTML ─────────────────────────────────────── */
function buildCarCard(c) {
  const waMsg = encodeURIComponent(`Hi Next Rides! 👋\nI'm interested in the ${c.year} ${c.brand} ${c.model}${c.price > 0 ? ' (' + fmtUSD(c.price) + ')' : ''}.\nCould you please share more details?`);
  const wa    = `https://wa.me/${wa_num()}?text=${waMsg}`;
  const bc    = c.badge ? (BADGE[c.badge] || 'b-feat') : '';
  /* ── Separate photo images from video on cards ── */
  const isLocalVidSrc = v => v && v.endsWith('.mp4');
  const rawImgsFull = (c.images && c.images.length > 0) ? c.images : (c.img ? [c.img] : []);
  /* Filter mp4s out of photo slides */
  const imgs  = rawImgsFull.filter(s => !isLocalVidSrc(s));
  const hasVid = !!c.video;
  const isLocalVid = hasVid && isLocalVidSrc(c.video);

  /* Toyota Crown (c18) — single image, no slideshow */
  const noSlide = c.id === 'c18';
  const photoSlideImgs = noSlide ? imgs.slice(0,1) : imgs;

  /* Video slide — always LAST after photos, clearly separate */
  const vidSlide = isLocalVid
    ? `<div class="cc-slide cc-slide-video" style="position:relative">
        <video data-src="${c.video}" preload="none" playsinline muted loop
               style="width:100%;height:100%;object-fit:cover"></video>
        <div style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);
             background:rgba(0,0,0,.6);color:#fff;font-size:.55rem;font-weight:800;
             letter-spacing:.1em;padding:3px 9px;border-radius:20px;
             font-family:'Syne',sans-serif">▶ VIDEO</div>
       </div>`
    : '';
  const ytSlide = (hasVid && !isLocalVid)
    ? `<div class="cc-slide cc-slide-video">
        <iframe src="https://www.youtube-nocookie.com/embed/${c.video}?rel=0&modestbranding=1"
                title="${c.brand} ${c.model}" frameborder="0"
                allow="autoplay;encrypted-media" loading="lazy"></iframe>
       </div>`
    : '';
  const imgSlides = photoSlideImgs.map((src,i) =>
    `<div class="cc-slide">
      <img src="${src}" alt="${c.brand} ${c.model} ${c.year} ${i+1}"
           loading="${i===0?'eager':'lazy'}"
           fetchpriority="${i===0?'high':'low'}"
           decoding="async"
           onerror="this.style.opacity='0'">
    </div>`
  ).join('');
  /* Photos first, then video as its own last slide */
  const slides = imgSlides + vidSlide + ytSlide;
  const totalSlides = noSlide ? 1 : (photoSlideImgs.length + (isLocalVid||ytSlide?1:0));
  const cid   = 'cs_' + c.id;

  const dots = totalSlides > 1
    ? `<div class="cc-dots">${Array.from({length:totalSlides},(_,i)=>{
        const isVidDot = isLocalVid && i === photoSlideImgs.length;
        return `<button class="cc-dot${i===0?' on':''}" onclick="ccGoto('${cid}',${i})"
          aria-label="${isVidDot?'Video':'Photo '+(i+1)}"
          title="${isVidDot?'▶ Video':'📷 Photo '+(i+1)}"></button>`;
      }).join('')}</div>` : '';

  const navBtns = totalSlides > 1
    ? `<button class="cc-nav prev" onclick="ccPrev('${cid}')" aria-label="Previous">&#8249;</button>
       <button class="cc-nav next" onclick="ccNext('${cid}')" aria-label="Next">&#8250;</button>` : '';

  return `
  <div class="car-card rv">
    ${c.badge ? `<div class="cc-badge ${bc}">${c.badge}</div>` : ''}
    <div class="cc-img cc-slideshow" id="${cid}" data-slide="0" data-total="${totalSlides}">
      ${(()=>{
        const tagCfg = {
          'AVAILABLE':    {bg:'rgba(22,163,74,0.90)',  icon:'✓ ', text:'AVAILABLE'},
          'HOT DEAL':     {bg:'rgba(220,38,38,0.92)',  icon:'🔥 ', text:'HOT DEAL'},
          'MOST SHIPPED': {bg:'rgba(234,88,12,0.92)',  icon:'📦 ', text:'MOST SHIPPED'},
          'EN ROUTE':     {bg:'rgba(37,99,235,0.93)',  icon:'🚢 ', text:'EN ROUTE'},
          'FEATURED':     {bg:'rgba(168,85,247,0.92)', icon:'★ ', text:'FEATURED'},
          'RARE FIND':    {bg:'rgba(217,70,239,0.92)', icon:'💎 ', text:'RARE FIND'},
          'NEW ARRIVAL':  {bg:'rgba(16,185,129,0.92)', icon:'🆕 ', text:'NEW ARRIVAL'},
        };
        const t = c.tag && tagCfg[c.tag];
        return t ? `<div style="position:absolute;bottom:0;left:0;z-index:4;background:${t.bg};color:#fff;font-family:'Syne',sans-serif;font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:0 10px 0 0;backdrop-filter:blur(6px);pointer-events:none">${t.icon}${t.text}</div>` : '';
      })()}
      <div class="cc-slides">${slides}</div>
      ${dots}${navBtns}
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
          ${c.price === 0
            ? `<div class="cc-price" style="font-size:.78em;letter-spacing:.03em">Price on Request</div>
               <div class="cc-ugx" style="color:var(--gold2);font-weight:600">${c.priceRange ? 'Est. ' + c.priceRange : 'Contact for details'}</div>`
            : `<div class="cc-price" data-usd-price="${c.price}">${fmtUSD(c.price)}</div>
               <div class="cc-ugx" data-ugx-sub data-usd-price="${c.price}">${c.ugxPrice ? 'UGX ' + c.ugxPrice : '≈ ' + fmtUGX(c.price)}</div>`
          }
        </div>
        <a href="${wa}" target="_blank" rel="noopener" class="btn btn-r btn-sm">Enquire</a>
      </div>
    </div>
    <a class="cc-preview-btn" href="${vehicleUrl(c)}" aria-label="View ${c.year} ${c.brand} ${c.model} details">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      Full vehicle details
    </a>
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
      <img src="${r.img}" alt="${r.brand} ${r.model}"
           loading="eager" fetchpriority="high" decoding="async"
           onerror="this.style.opacity='0'">
    </div>
    <div class="rc-body">
      <div class="rc-brand">${r.brand}</div>
      <div class="rc-name">${r.model} <span style="font-size:1.1rem;color:var(--dim)">${r.year}</span></div>
      <div class="rc-feats">
        ${(r.uses || []).map(u => `<span class="rc-use">${u}</span>`).join('')}
        ${r.features.map(f => `<span class="rc-feat">${f}</span>`).join('')}
      </div>
      <div class="rc-foot">
        <div>
          <div class="rc-price">from ${fmtFixedUGX(r.priceDayUGX)}<span class="rc-per"> / day</span></div>
          <div class="rc-sub">Indicative base rate · confirm route &amp; date</div>
        </div>
        <a href="${wa}" target="_blank" rel="noopener" class="btn btn-r btn-sm">Check date</a>
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

  /* YouTube Video Wall */
  const ytWall = document.getElementById('yt-wall-grid');
  if (ytWall) buildYtWall(ytWall);

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
    const homePriority = ['c37','c38','c40','c41','c01','c24'];
    const featuredCars = homePriority.map(id => D.cars.find(c => c && c.id === id)).filter(Boolean);
    render('featured-cars', featuredCars.map(buildCarCard).join(''));
    /* Preload first 4 featured car images for instant display */
    featuredCars.slice(0,4).forEach(c => {
      const src = (c.images && c.images[0]) || c.img;
      if (src && !src.endsWith('.mp4')) {
        const lnk = document.createElement('link');
        lnk.rel = 'preload'; lnk.as = 'image'; lnk.href = src;
        lnk.fetchPriority = 'high';
        document.head.appendChild(lnk);
      }
    });
  }

  /* Full Inventory */
  const inv = document.getElementById('inventory-grid');
  if (inv) {
    render('inventory-grid', D.cars.filter(c => c.visible !== false).map(buildCarCard).join(''));

    /* Filter buttons */
    document.querySelectorAll('.fp[data-f]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fp[data-f]').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const v    = btn.dataset.f;
        const pool = v === 'all' ? D.cars.filter(c => c.visible !== false) : v === 'EN ROUTE' ? D.cars.filter(c => c.enRoute && c.visible !== false) : D.cars.filter(c => c.brand === v && c.visible !== false);
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
  if (rentEl) {
    const drawRentals = use => {
      let pool = D.rentals.filter(r => r.visible !== false && (!use || (r.uses || []).includes(use)));
      if (!document.querySelector('[data-rent-filter]')) pool = pool.slice(0, 3);
      render('rental-grid', pool.map(buildRentCard).join(''));
    };
    drawRentals('');
    document.querySelectorAll('[data-rent-filter]').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('[data-rent-filter]').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      drawRentals(btn.dataset.rentFilter);
    }));
  }

  const latestSocial = document.getElementById('latest-social-grid');
  if (latestSocial && D.latestSocial) {
    render('latest-social-grid', D.latestSocial.map(p => `
      <a class="latest-social-card rv" href="${p.url}" target="_blank" rel="noopener">
        <div class="latest-social-media">
          <img src="${p.img}" alt="${p.title} — Next Rides Uganda" loading="lazy" decoding="async">
          <span class="latest-social-play" aria-hidden="true">▶</span>
        </div>
        <div class="latest-social-copy">
          <span>${p.type} · ${p.date}</span>
          <h3>${p.title}</h3>
          <p>${p.meta}</p>
        </div>
      </a>`).join(''));
  }

  /* Brands page */
  const brandsEl = document.getElementById('brands-grid');
  if (brandsEl) {
    render('brands-grid', D.brands.map(b => {
      const initials = b.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      // Logo is now an inline SVG string — renders without CDN
      const logoHtml = b.logo
        ? (b.logo.startsWith('http')
            ? `<img class="bc-logo-img" src="${b.logo}" alt="${b.name}" loading="lazy" width="42" height="42">`
            : `<div class="bc-logo-svg">${b.logo}</div>`)
        : `<div class="bc-logo-init">${initials}</div>`;
      return `
        <a class="brand-card rv" data-origin="${b.origin}" href="inventory.html?q=${encodeURIComponent(b.name)}" aria-label="Browse ${b.name} cars for sale in Uganda">
          <div class="bc-logo-wrap">${logoHtml}</div>
          <div class="bc-name">${b.name}</div>
          <div class="bc-tag">${b.tag}</div>
        </a>`;
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

  /* Re-observe all static .rv elements (pages where scripts load before HTML) */
  observeReveal(document.body);

  /* ── Slideshow Autoplay ───────────────────────────────── */
  /* Every 4s, advance each visible slideshow that has >1 slide */
  setInterval(() => {
    document.querySelectorAll('.cc-slideshow[data-total]').forEach(sl => {
      const total = parseInt(sl.dataset.total);
      if (total < 2) return;
      const cur = parseInt(sl.dataset.slide) || 0;
      const id  = sl.id;
      // Only autoplay if the element is in viewport (avoid background loops)
      const rect = sl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight + 200 && rect.bottom > -200;
      if (inView) ccNext(id);
    });
  }, 4000);

  /* ── Homepage social-links section ─────────────────── */
  const socLinks = document.getElementById('social-links');
  if (socLinks && D.biz) {
    const B = D.biz;
    socLinks.innerHTML = [
      { href: B.ig||'https://www.instagram.com/next_rides_ug', icon:'<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>', handle:'@next_rides_ug', sub:'24K followers · 1,900+ posts · Daily updates', color:'rgba(225,48,108,0.12)', bdcolor:'rgba(225,48,108,0.22)', iconcolor:'#E1306C' },
      { href: B.tt||'https://www.tiktok.com/@next_rides', icon:'<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>', handle:'@next_rides', sub:'TikTok · Car reels, reveals & deliveries', color:'rgba(255,255,255,0.05)', bdcolor:'rgba(255,255,255,0.1)', iconcolor:'#E8E4DE' },
      { href: B.yt||'https://www.youtube.com/@NEXTRIDES', icon:'<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805z"/><polygon points="9.609 15.601 9.609 8.408 15.873 12.004"/></svg>', handle:'@NEXTRIDES', sub:'YouTube · Full reviews, deliveries & tours', color:'rgba(255,0,0,0.10)', bdcolor:'rgba(255,0,0,0.22)', iconcolor:'#FF0000' },
    ].map(s => `
      <a href="${s.href}" target="_blank" rel="noopener" class="soc-link-card rv"
         style="display:flex;align-items:center;gap:16px;padding:20px 28px;border-radius:18px;
                border:1px solid ${s.bdcolor};text-decoration:none;
                transition:transform .3s,box-shadow .3s;min-width:260px;flex:1;max-width:320px">
        <div style="width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;
                    background:${s.color};border:1px solid ${s.bdcolor};flex-shrink:0;color:${s.iconcolor}">
          ${s.icon}
        </div>
        <div>
          <div style="font-family:'Syne',sans-serif;font-size:.9rem;font-weight:800;letter-spacing:.03em;color:var(--fg);margin-bottom:3px">${s.handle}</div>
          <div style="font-size:.75rem;color:var(--fg-muted);line-height:1.5">${s.sub}</div>
        </div>
      </a>`
    ).join('');
    observeReveal(socLinks);
  }
});

/* ── Search (on homepage and inventory page) ───────────── */
function doSearch() {
  const query  = (document.getElementById('s-query')?.value || '').trim().toLowerCase();
  const brand  = document.getElementById('s-brand')?.value  || '';
  const budget = document.getElementById('s-budget')?.value || '';
  const type   = document.getElementById('s-type')?.value   || '';
  const D      = window.NR;
  if (!D) return;

  const res = D.cars.filter(c => {
    const haystack = `${c.brand} ${c.model} ${c.year} ${c.fuel} ${c.trans} ${c.condition || ''} ${c.desc || ''}`.toLowerCase();
    const qOk  = !query || haystack.includes(query);
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
    return qOk && bOk && tOk && buOk;
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
document.getElementById('s-query')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

/* Deep-link inventory filters from homepage and search engines. */
if (document.getElementById('inventory-grid')) {
  const params = new URLSearchParams(location.search);
  const linkedBrand = params.get('brand');
  const linkedQuery = params.get('q');
  const brandField = document.getElementById('s-brand');
  const queryField = document.getElementById('s-query');
  if (linkedBrand && brandField && [...brandField.options].some(o => o.value === linkedBrand)) brandField.value = linkedBrand;
  if (linkedQuery && queryField) queryField.value = linkedQuery;
  if (linkedBrand || linkedQuery) document.addEventListener('DOMContentLoaded', doSearch, { once:true });
}

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
      `Mombasa transport: ${f.transport?.value || 'Discuss with me'}\n`+
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

/* ══════════════════════════════════════════════════════════
   THEME TOGGLE — Light (default) / Dark
   Persists via localStorage. Applies to <html data-theme>.
══════════════════════════════════════════════════════════ */
(function themeToggle() {
  var STORE = 'nr-theme';
  var html  = document.documentElement;
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  /* Respect an explicit preference; otherwise follow the device theme. */
  var saved = localStorage.getItem(STORE);
  if (saved === 'dark' || (!saved && systemTheme.matches)) html.setAttribute('data-theme', 'dark');
  else html.removeAttribute('data-theme');

  function syncThemeButton() {
    var btn = document.getElementById('theme-toggle');
    var dark = html.getAttribute('data-theme') === 'dark';
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#0c0d0f' : '#fbfaf7');
    if (!btn) return;
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-pressed', String(dark));
  }

  function setTheme(dark, persist) {
    if (dark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    if (persist) localStorage.setItem(STORE, dark ? 'dark' : 'light');
    syncThemeButton();
  }

  systemTheme.addEventListener?.('change', function(event) {
    if (!localStorage.getItem(STORE)) setTheme(event.matches, false);
  });

  /* Wire button after DOM ready */
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    syncThemeButton();
    btn.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      setTheme(!isDark, true);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   CAR DETAIL MODAL — with Reviews, Likes & EN ROUTE status
   Firebase Realtime Database — syncs across ALL site users
═══════════════════════════════════════════════════════════ */
(function initCarModal() {

  /* ── Firebase config (set in <head> via firebase-config.js) ──
     NR_FB_DB is the Firebase database URL set globally.
     All reads/writes go to:
       {DB}/likes/{cid}   → { count: N }
       {DB}/reviews/{cid} → [ {name, text, stars, date, ts} ]
  ── */
  const DB = window.NR_FB_DB || null; // set via firebase-config.js

  /* ── Per-device like state (still local — prevents double-liking) ── */
  function getLiked(cid) {
    try { return localStorage.getItem('nr_liked_' + cid) === '1'; } catch(e){ return false; }
  }
  function setLiked(cid, v) {
    try { localStorage.setItem('nr_liked_' + cid, v ? '1' : '0'); } catch(e){}
  }

  /* ── Firebase REST helpers ── */
  async function fbGet(path) {
    if (!DB) return null;
    try {
      const r = await fetch(`${DB}/${path}.json`);
      return r.ok ? r.json() : null;
    } catch(e) { return null; }
  }
  async function fbSet(path, data) {
    if (!DB) return;
    try {
      await fetch(`${DB}/${path}.json`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
    } catch(e) {}
  }
  async function fbPush(path, data) {
    if (!DB) return;
    try {
      await fetch(`${DB}/${path}.json`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
    } catch(e) {}
  }
  async function fbTransaction(path, updateFn) {
    /* Read-modify-write for atomic like count */
    if (!DB) return;
    try {
      const r = await fetch(`${DB}/${path}.json`);
      const val = r.ok ? await r.json() : null;
      const newVal = updateFn(val);
      await fetch(`${DB}/${path}.json`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(newVal)
      });
      return newVal;
    } catch(e) { return null; }
  }

  /* ── Get likes count from Firebase (or 0) ── */
  async function getLikes(cid) {
    const data = await fbGet(`likes/${cid}`);
    return (data && typeof data.count === 'number') ? data.count : 0;
  }

  /* ── Get reviews array from Firebase (or []) ── */
  async function getReviews(cid) {
    const data = await fbGet(`reviews/${cid}`);
    if (!data) return [];
    /* Firebase POST returns an object keyed by push IDs */
    if (Array.isArray(data)) return data.filter(Boolean);
    return Object.values(data).filter(Boolean).sort((a,b) => (a.ts||'') < (b.ts||'') ? -1 : 1);
  }

  /* ── Inject modal HTML shell once ── */
  const shell = document.createElement('div');
  shell.id = 'car-modal-overlay';
  shell.setAttribute('role', 'dialog');
  shell.setAttribute('aria-modal', 'true');
  shell.style.cssText = `
    display:none;position:fixed;inset:0;z-index:10000;
    background:rgba(0,0,0,.82);backdrop-filter:blur(8px);
    overflow-y:auto;padding:20px 16px 40px;
  `;
  shell.innerHTML = `<div id="car-modal" style="
    max-width:960px;margin:0 auto;
    background:var(--surface,#fff);border-radius:18px;overflow:hidden;
    box-shadow:0 32px 80px rgba(0,0,0,.6);position:relative;
  ">
    <button onclick="closeCarModal()" style="
      position:absolute;top:16px;right:16px;z-index:10;
      width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;
      background:rgba(0,0,0,.35);color:#fff;font-size:1.2rem;
      display:flex;align-items:center;justify-content:center;
    " aria-label="Close">✕</button>
    <div id="car-modal-body"></div>
  </div>`;
  document.body.appendChild(shell);

  /* Close on backdrop click */
  shell.addEventListener('click', e => { if (e.target === shell) closeCarModal(); });

  /* Close on Escape */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCarModal(); });

  window.closeCarModal = function() {
    shell.style.display = 'none';
    document.body.style.overflow = '';
  };

  /* ── Render star picker ── */
  function starPicker(name) {
    return `<div class="nr-star-pick" id="sp-${name}" style="display:flex;gap:6px;margin-bottom:8px">
      ${[1,2,3,4,5].map(n=>`<button type="button" onclick="nrPickStar('${name}',${n})" data-v="${n}"
        style="background:none;border:none;cursor:pointer;font-size:1.5rem;padding:0;line-height:1;opacity:.35;transition:all .15s"
        aria-label="${n} star">★</button>`).join('')}
    </div>`;
  }

  window.nrPickStar = function(name, val) {
    const container = document.getElementById('sp-' + name);
    if (!container) return;
    container.dataset.selected = val;
    container.querySelectorAll('button').forEach((b,i) => {
      b.style.opacity = i < val ? '1' : '.25';
      b.style.color = i < val ? '#F59E0B' : '';
    });
  };

  /* ── Render review list ── */
  function renderReviews(reviews) {
    if (!reviews.length) return `
      <div style="text-align:center;padding:28px 0;color:var(--dim,#999);font-size:.9rem">
        No reviews yet — be the first to share your thoughts!
      </div>`;
    return reviews.slice().reverse().map(r => `
      <div style="padding:16px 0;border-bottom:1px solid var(--border,#eee)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#B81F0A,#D62B12);
               color:#fff;display:flex;align-items:center;justify-content:center;
               font-family:'Syne',sans-serif;font-weight:800;font-size:.85rem;flex-shrink:0">
            ${r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-weight:700;font-size:.9rem;color:var(--fg,#111)">${escHtml(r.name)}</div>
            <div style="font-size:.72rem;color:var(--dim,#999)">${r.date}</div>
          </div>
          <div style="margin-left:auto;color:#F59E0B;font-size:1rem">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
        </div>
        <p style="margin:0;font-size:.88rem;color:var(--fg-muted,#555);line-height:1.55">${escHtml(r.text)}</p>
      </div>`).join('');
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Main open function ── */
  window.openCarModal = async function(cid) {
    const c = (window.NR && window.NR.cars) ? window.NR.cars.find(x => x.id === cid) : null;
    if (!c) return;

    const waMsg  = encodeURIComponent(`Hi Next Rides! 👋\nI'm interested in the ${c.year} ${c.brand} ${c.model}.\nCould you please share more details?`);
    const wa     = `https://wa.me/${wa_num()}?text=${waMsg}`;

    /* ── Separate photo slides from video slides ── */
    const isLocalVid = v => v && v.endsWith('.mp4');

    /* Photo-only images array (filter out any mp4 accidentally in images[]) */
    const rawImgs = (c.images && c.images.length) ? c.images : (c.img ? [c.img] : []);
    const photoImgs = rawImgs.filter(s => !isLocalVid(s));

    /* Video slide (mp4 asset) — shown as its own dedicated slide AFTER photos */
    const hasLocalVid = isLocalVid(c.video);
    const videoSlide = hasLocalVid ? `
      <div style="flex-shrink:0;width:100%;height:100%;position:relative;background:#000">
        <video src="${c.video}" autoplay muted loop playsinline
               style="width:100%;height:100%;object-fit:cover"></video>
        <div style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);
             background:rgba(0,0,0,.65);color:#fff;font-size:.62rem;font-weight:700;
             letter-spacing:.12em;padding:4px 12px;border-radius:20px;
             font-family:'Syne',sans-serif;backdrop-filter:blur(6px)">▶ VIDEO</div>
      </div>` : '';

    /* Toyota Crown c18 — no slideshow (single img, no dots/arrows) */
    const noSlide = c.id === 'c18';
    const imgs = noSlide ? (photoImgs.length ? [photoImgs[0]] : []) : photoImgs;

    const liked   = getLiked(cid);
    const [likes, reviews] = await Promise.all([getLikes(cid), getReviews(cid)]);

    /* Photo slides HTML */
    const slidesHtml = imgs.map((src,i) => `
      <div class="nm-slide" style="flex-shrink:0;width:100%;height:100%;position:relative">
        <img src="${src}" alt="${c.brand} ${c.model}"
             loading="${i?'lazy':'eager'}"
             fetchpriority="${i?'low':'high'}"
             decoding="async"
             style="width:100%;height:100%;object-fit:cover;opacity:${i?0:1};transition:opacity .4s"
             onload="this.style.opacity='1'"
             onerror="this.style.opacity='0.2'">
      </div>`).join('');

    /* Total slides = photos + video (if any) */
    const totalSlides = imgs.length + (hasLocalVid ? 1 : 0);

    const dotsHtml = totalSlides > 1 ? `<div style="display:flex;justify-content:center;gap:6px;padding:10px 0">
      ${Array.from({length:totalSlides},(_,i) => {
        const isVid = hasLocalVid && i === imgs.length;
        return `<button onclick="nmGoto(${i})" data-nm-dot="${i}"
          style="width:${i===0?'20px':'8px'};height:8px;border-radius:4px;border:none;cursor:pointer;
          background:${i===0?'#B81F0A':'rgba(0,0,0,.2)'};transition:all .25s"
          title="${isVid?'Video':'Photo '+(i+1)}"></button>`;
      }).join('')}
    </div>` : '';

    /* Spec chips */
    const specs = [
      c.mileage ? `<span>🛣️ ${c.mileage}</span>` : '',
      c.fuel    ? `<span>⛽ ${c.fuel}</span>` : '',
      c.trans   ? `<span>⚙️ ${c.trans}</span>` : '',
      c.condition?`<span>🏷️ ${c.condition}</span>` : '',
      c.color   ? `<span>🎨 ${c.color}</span>` : '',
    ].filter(Boolean).join('');

    /* EN ROUTE banner */
    const enRouteBanner = c.enRoute ? `
      <div style="background:linear-gradient(135deg,#1E3A8A,#2563EB);color:#fff;
           padding:12px 20px;display:flex;align-items:center;gap:10px;font-family:'Syne',sans-serif">
        <span style="font-size:1.2rem">🚢</span>
        <div>
          <div style="font-weight:800;font-size:.78rem;letter-spacing:.12em">EN ROUTE — ARRIVING SOON</div>
          <div style="font-size:.73rem;opacity:.85">Arriving in ${c.enRouteETA || '2–4 weeks'} · Reserve now to secure your unit</div>
        </div>
      </div>` : '';

    document.getElementById('car-modal-body').innerHTML = `
      <!-- Image slider -->
      <div style="position:relative;background:#000;height:clamp(240px,42vw,480px);overflow:hidden">
        <div id="nm-slides" style="display:flex;height:100%;transition:transform .35s cubic-bezier(.4,0,.2,1)">
          ${slidesHtml}
          ${videoSlide}
        </div>
        ${totalSlides > 1 ? `
          <button onclick="nmPrev()" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);
            width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;
            background:rgba(0,0,0,.5);color:#fff;font-size:1.4rem;backdrop-filter:blur(4px)">&#8249;</button>
          <button onclick="nmNext(${totalSlides})" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);
            width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;
            background:rgba(0,0,0,.5);color:#fff;font-size:1.4rem;backdrop-filter:blur(4px)">&#8250;</button>` : ''}
        ${c.badge ? `<div style="position:absolute;top:14px;left:14px;background:${c.enRoute?'#2563EB':'#B81F0A'};
          color:#fff;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:800;letter-spacing:.12em;
          padding:5px 12px;border-radius:6px;text-transform:uppercase">${c.badge}</div>` : ''}
      </div>
      ${dotsHtml}
      ${enRouteBanner}

      <!-- Details -->
      <div style="padding:24px 28px">
        <div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap">
          <div style="flex:1;min-width:220px">
            <div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.14em;
                 text-transform:uppercase;color:var(--red,#B81F0A);margin-bottom:4px">${c.brand}</div>
            <h2 style="margin:0 0 4px;font-family:'Bebas Neue',sans-serif;font-size:clamp(1.6rem,4vw,2.4rem);
                 line-height:1;color:var(--fg,#111)">${c.model} <span style="opacity:.5">${c.year}</span></h2>
          </div>
          <div style="text-align:right;min-width:140px">
            ${c.price === 0
              ? `<div style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:var(--fg,#111)">Price on Request</div>
                 <div style="font-size:.8rem;color:var(--red,#B81F0A);font-weight:600">${c.priceRange ? 'Est. ' + c.priceRange : 'Contact us'}</div>`
              : `<div style="font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:var(--red,#B81F0A)">$${Number(c.price).toLocaleString()}</div>
                 <div style="font-size:.78rem;color:var(--dim,#999)">${c.ugxPrice ? 'UGX ' + c.ugxPrice : ''}</div>`}
          </div>
        </div>

        <!-- Spec chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin:16px 0">
          ${specs.split('</span>').filter(Boolean).map(s => s + '</span>').map(s => `
            <div style="background:var(--surface2,#f5f5f5);padding:6px 12px;border-radius:20px;
                 font-size:.75rem;font-weight:600;color:var(--fg-muted,#555)">${s}</div>`).join('')}
        </div>

        <!-- Description -->
        ${c.desc ? `<p style="margin:0 0 20px;font-size:.9rem;line-height:1.65;color:var(--fg-muted,#444)">${c.desc}</p>` : ''}

        <!-- Like + CTA row -->
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:28px">
          <button id="nm-like-btn" onclick="nmToggleLike('${cid}')" style="
            display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:30px;
            border:2px solid ${liked?'#E11D48':'var(--border,#ddd)'};cursor:pointer;
            background:${liked?'rgba(225,29,72,.08)':'transparent'};
            color:${liked?'#E11D48':'var(--dim,#777)'};font-weight:700;font-size:.85rem;
            transition:all .2s;font-family:'Syne',sans-serif">
            <span style="font-size:1.1rem">${liked?'❤️':'🤍'}</span>
            <span id="nm-like-count">${likes}</span> ${likes === 1 ? 'Like' : 'Likes'}
          </button>
          <a href="${wa}" target="_blank" rel="noopener" style="
            flex:1;min-width:160px;display:flex;align-items:center;justify-content:center;gap:8px;
            padding:12px 24px;border-radius:30px;background:#25D366;color:#fff;font-weight:700;
            font-size:.9rem;text-decoration:none;font-family:'Syne',sans-serif">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Enquiry
          </a>
          <a href="order.html" style="
            display:flex;align-items:center;gap:8px;padding:12px 24px;border-radius:30px;
            background:var(--red,#B81F0A);color:#fff;font-weight:700;font-size:.9rem;
            text-decoration:none;font-family:'Syne',sans-serif">
            Order This Car
          </a>
        </div>

        <!-- Divider -->
        <hr style="border:none;border-top:1px solid var(--border,#eee);margin:0 0 24px">

        <!-- Reviews Section -->
        <div>
          <h3 style="margin:0 0 18px;font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;
               letter-spacing:.06em;color:var(--fg,#111)">
            REVIEWS &amp; REACTIONS
            <span style="font-size:.75rem;font-weight:400;color:var(--dim,#999);margin-left:8px">${reviews.length} review${reviews.length!==1?'s':''}</span>
          </h3>

          <!-- Review list -->
          <div id="nm-reviews-list">${renderReviews(reviews)}</div>

          <!-- Add review form -->
          <div style="margin-top:24px;padding:20px;background:var(--surface2,#f8f8f8);border-radius:14px">
            <h4 style="margin:0 0 14px;font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;
                 letter-spacing:.06em;color:var(--fg,#111)">LEAVE A REVIEW</h4>
            <input id="nm-rev-name" type="text" placeholder="Your name *" maxlength="60"
                   style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:10px;
                   border:1.5px solid var(--border,#ddd);background:var(--surface,#fff);
                   color:var(--fg,#111);font-family:'DM Sans',sans-serif;font-size:.88rem;
                   margin-bottom:10px;outline:none">
            ${starPicker(cid)}
            <textarea id="nm-rev-text" placeholder="Share your thoughts about this car…" rows="3" maxlength="400"
                      style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:10px;
                      border:1.5px solid var(--border,#ddd);background:var(--surface,#fff);
                      color:var(--fg,#111);font-family:'DM Sans',sans-serif;font-size:.88rem;
                      resize:vertical;margin-bottom:12px;outline:none"></textarea>
            <button onclick="nmSubmitReview('${cid}')" style="
              padding:11px 28px;border-radius:30px;border:none;cursor:pointer;
              background:var(--red,#B81F0A);color:#fff;font-family:'Syne',sans-serif;
              font-weight:700;font-size:.85rem;letter-spacing:.06em;transition:opacity .2s"
              onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
              Post Review
            </button>
            <div id="nm-rev-msg" style="margin-top:8px;font-size:.8rem;min-height:18px"></div>
          </div>
        </div>
      </div>`;

    /* Init slideshow index */
    shell.dataset.nmIdx = '0';
    shell.dataset.nmTotal = imgs.length + (c.video?1:0);
    shell.dataset.nmCid = cid;

    shell.style.display = 'block';
    document.body.style.overflow = 'hidden';
    shell.scrollTop = 0;
  };

  /* ── Slideshow nav ── */
  window.nmGoto = function(idx) {
    const slides = document.getElementById('nm-slides');
    if (!slides) return;
    shell.dataset.nmIdx = idx;
    slides.style.transform = `translateX(-${idx*100}%)`;
    document.querySelectorAll('[data-nm-dot]').forEach(d => {
      const i = parseInt(d.dataset.nmDot);
      d.style.width = i===idx ? '20px' : '8px';
      d.style.background = i===idx ? '#B81F0A' : 'rgba(0,0,0,.2)';
    });
  };
  window.nmPrev = function() {
    const total = parseInt(shell.dataset.nmTotal||1);
    const idx   = ((parseInt(shell.dataset.nmIdx||0) - 1) + total) % total;
    nmGoto(idx);
  };
  window.nmNext = function(total) {
    const t = total || parseInt(shell.dataset.nmTotal||1);
    const idx = (parseInt(shell.dataset.nmIdx||0) + 1) % t;
    nmGoto(idx);
  };

  /* ── Like toggle — synced via Firebase ── */
  window.nmToggleLike = async function(cid) {
    const wasLiked = getLiked(cid);
    const newLiked = !wasLiked;
    setLiked(cid, newLiked);

    /* Optimistic UI update */
    const btn = document.getElementById('nm-like-btn');
    if (btn) btn.style.opacity = '0.6';

    /* Atomic count update on Firebase */
    const result = await fbTransaction(`likes/${cid}`, (cur) => {
      const prev = (cur && typeof cur.count === 'number') ? cur.count : 0;
      const next = Math.max(0, prev + (newLiked ? 1 : -1));
      return { count: next };
    });

    const safeCount = result ? result.count : 0;
    if (btn) {
      btn.style.opacity = '1';
      btn.style.borderColor = newLiked ? '#E11D48' : 'var(--border,#ddd)';
      btn.style.background  = newLiked ? 'rgba(225,29,72,.08)' : 'transparent';
      btn.style.color       = newLiked ? '#E11D48' : 'var(--dim,#777)';
      btn.innerHTML = `<span style="font-size:1.1rem">${newLiked?'❤️':'🤍'}</span>
        <span id="nm-like-count">${safeCount}</span> ${safeCount===1?'Like':'Likes'}`;
    }
  };

  /* ── Submit review ── */
  window.nmSubmitReview = async function(cid) {
    const nameEl = document.getElementById('nm-rev-name');
    const textEl = document.getElementById('nm-rev-text');
    const spEl   = document.getElementById('sp-' + cid);
    const msgEl  = document.getElementById('nm-rev-msg');
    const name   = (nameEl?.value || '').trim();
    const text   = (textEl?.value || '').trim();
    const stars  = parseInt(spEl?.dataset.selected || '0', 10);

    if (!name) { if(msgEl) msgEl.innerHTML = '<span style="color:#E11D48">Please enter your name.</span>'; return; }
    if (!stars){ if(msgEl) msgEl.innerHTML = '<span style="color:#E11D48">Please select a star rating.</span>'; return; }
    if (!text)  { if(msgEl) msgEl.innerHTML = '<span style="color:#E11D48">Please write a review.</span>'; return; }

    /* Disable button during submit */
    const submitBtn = document.querySelector('#car-modal-body button[onclick*="nmSubmitReview"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Posting…'; }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-UG', {day:'numeric', month:'short', year:'numeric'});
    const newReview = { name, text, stars, date: dateStr, ts: now.toISOString() };

    /* Push to Firebase */
    await fbPush(`reviews/${cid}`, newReview);

    /* Re-fetch fresh list to show all reviews from all users */
    const updated = await getReviews(cid);

    /* Update UI */
    document.getElementById('nm-reviews-list').innerHTML = renderReviews(updated);
    nameEl.value = '';
    textEl.value = '';
    if (spEl) { delete spEl.dataset.selected; spEl.querySelectorAll('button').forEach(b => { b.style.opacity='.35'; b.style.color=''; }); }
    if (msgEl) msgEl.innerHTML = '<span style="color:#22C55E">✓ Review posted — thank you!</span>';
    const h3span = document.querySelector('#car-modal-body h3 span');
    if (h3span) h3span.textContent = `${updated.length} review${updated.length!==1?'s':''}`;
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Post Review'; }
  };

})();
