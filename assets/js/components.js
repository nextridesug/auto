/* ═══════════════════════════════════════════════════════════
   NEXT RIDES — components.js  v5.3
   Auto-injects navbar + footer.
   CRITICAL FIX: Footer injected on DOMContentLoaded so it
   always renders AFTER page body content, not before.
═══════════════════════════════════════════════════════════ */
(function () {
  /* ── Path resolution ── */
  const depth = (location.pathname.match(/\//g) || []).length - 1;
  const root  = depth > 0 ? '../'.repeat(depth) : './';
  const page  = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { h: 'index.html',     l: 'Home'      },
    { h: 'inventory.html', l: 'Buy a Car' },
    { h: 'rent.html',      l: 'Rent'      },
    { h: 'brands.html',    l: 'Brands'    },
    { h: 'events.html',    l: 'Events'    },
    { h: 'news.html',      l: 'News'      },
    { h: 'social.html',    l: 'Social'    },
    { h: 'about.html',     l: 'About'     },
    { h: 'contact.html',   l: 'Contact'   },
  ];

  /* ── SVG Icons ── */
  const SVG = {
    ig: `<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    tt: `<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>`,
    fb: `<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    th: `<svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068v-.137c0-3.519.85-6.372 2.495-8.422C5.845 1.205 8.598.024 12.18 0h.014c2.746.018 5.145.849 6.93 2.408 1.73 1.51 2.702 3.661 2.89 6.39l.012.177h-3.507l-.006-.147c-.157-1.752-.806-3.226-1.876-4.259-1.075-1.038-2.527-1.566-4.313-1.569h-.01c-2.059 0-3.739.597-4.993 1.775C6.062 5.9 5.385 7.615 5.369 9.853v.159c-.016 2.238.658 3.952 2.004 5.083C8.72 16.214 10.4 16.811 12.46 16.811h.01c1.786-.003 3.238-.531 4.312-1.569 1.07-1.033 1.72-2.507 1.876-4.259l.006-.147h3.507l-.012.177c-.188 2.729-1.16 4.88-2.89 6.39-1.785 1.559-4.184 2.39-6.93 2.408h-.007z"/></svg>`,
    loc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    ph:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z"/></svg>`,
    em:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    up:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="17" height="17"><polyline points="18 15 12 9 6 15"/></svg>`,
  };

  /* ── Logo builder ── */
  const logoId = 'lf' + Math.random().toString(36).slice(2);
  function logoFull(lr) {
    return `<a href="${lr}index.html" class="logo">
      <img src="${lr}assets/img/logo.png" alt="Next Rides Uganda"
           class="logo-img" id="logo-img-${logoId}"
           onerror="this.style.display='none';var f=this.parentElement.querySelector('.logo-fallback');if(f)f.style.display='flex'">
      <div class="logo-fallback" style="display:none">
        <div style="display:flex;align-items:center">
          <span class="logo-nex">NEX</span><span class="logo-t">T</span>
        </div>
      </div>
      <span class="logo-sub">Rides Uganda</span>
    </a>`;
  }

  /* ── 1. Inject cursor (first thing in body) ── */
  document.body.insertAdjacentHTML('afterbegin',
    `<div class="cursor-dot" id="cdot"></div><div class="cursor-ring" id="cring"></div>`);

  /* ── 2. Inject Navbar (second thing) ── */
  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="nav">
      <div class="ni">
        ${logoFull(root)}
        <div id="mob-nav">
          <div class="nav-links">
            ${links.map(l => `<a href="${root}${l.h}" class="nav-a${page === l.h ? ' act' : ''}">${l.l}</a>`).join('')}
          </div>
          <div class="nav-acts">
            <button class="btn btn-gl btn-sm" id="ugx-btn">Show UGX</button>
            <a href="${root}order.html" class="btn btn-r btn-sm">Order a Car</a>
          </div>
        </div>
        <button id="burg" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`);

  /* ── 3. Inject Footer AFTER DOM is ready ── */
  /*    This is the critical fix — DOMContentLoaded ensures footer  */
  /*    goes AFTER all page content, not before it.                  */
  function injectFooter() {
    const B = window.NR?.biz || {};

    /* Remove any stray footer that snuck in early */
    document.querySelectorAll('footer').forEach(f => f.remove());

    document.body.insertAdjacentHTML('beforeend', `
      <footer>
        <div class="w">
          <div class="footer-grid">

            <div class="footer-brand">
              ${logoFull(root)}
              <p>Uganda's most exclusive destination for premium automobiles.
              Buy, rent, or custom-order your dream car — delivered right here in Kampala.</p>
              <div class="footer-soc">
                <a href="${B.ig||'https://www.instagram.com/next_rides_ug'}" target="_blank" rel="noopener" class="fsb" title="Instagram">${SVG.ig}</a>
                <a href="${B.tt||'https://www.tiktok.com/@next_rides'}" target="_blank" rel="noopener" class="fsb" title="TikTok">${SVG.tt}</a>
                <a href="${B.fb||'https://www.facebook.com/share/1GEqttukNw/'}" target="_blank" rel="noopener" class="fsb" title="Facebook">${SVG.fb}</a>
                <a href="${B.th||'https://www.threads.net/@next_rides_ug'}" target="_blank" rel="noopener" class="fsb" title="Threads">${SVG.th}</a>
              </div>
            </div>

            <div class="fc">
              <h4>Buy &amp; Rent</h4>
              <nav>
                <a href="${root}inventory.html">Cars for Sale</a>
                <a href="${root}rent.html">Rent a Car</a>
                <a href="${root}brands.html">Our Brands</a>
                <a href="${root}order.html">Custom Order</a>
              </nav>
            </div>

            <div class="fc">
              <h4>Company</h4>
              <nav>
                <a href="${root}about.html">About Us</a>
                <a href="${root}events.html">Events</a>
                <a href="${root}news.html">News</a>
                <a href="${root}social.html">Social Feed</a>
                <a href="${root}contact.html">Contact</a>
                <a href="${root}terms.html">Terms</a>
                <a href="${root}privacy.html">Privacy</a>
              </nav>
            </div>

            <div class="fc">
              <h4>Get In Touch</h4>
              <div class="fci">
                <div class="fct">${SVG.loc}<span>${B.address||'Naguru Road, Cadam Enterprises, Kampala'}</span></div>
                <div class="fct">${SVG.ph}<div>
                  <a href="tel:+256753717412">+256 0753 717 412</a><br>
                  <a href="tel:+256771572016">+256 0771 572 016</a>
                </div></div>
                <div class="fct">${SVG.em}<a href="mailto:info.nextridesug@gmail.com">info.nextridesug@gmail.com</a></div>
                <a href="https://maps.google.com/?q=Naguru+Road+Cadam+Enterprises+Kampala+Uganda"
                   target="_blank" class="btn btn-r btn-sm get-dir" style="margin-top:4px;width:100%;justify-content:center">
                  ${SVG.loc} Get Directions
                </a>
              </div>
            </div>

          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 Next Rides Uganda. All rights reserved.</p>
            <div class="footer-bl">
              <a href="${root}terms.html">Terms</a>
              <a href="${root}privacy.html">Privacy</a>
              <a href="${root}contact.html">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <button id="btt" aria-label="Back to top">${SVG.up}</button>`);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter(); // already parsed
  }

})();
