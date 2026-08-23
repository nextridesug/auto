/* ═══════════════════════════════════════════════════════════
   NEXT RIDES — components.js  v5.3
   Auto-injects navbar + footer.
   CRITICAL FIX: Footer injected on DOMContentLoaded so it
   always renders AFTER page body content, not before.
═══════════════════════════════════════════════════════════ */
(function () {
  /* ── Path resolution ──
     All HTML files are at the same repo root level.
     Root is always the directory of the current page.
     Using empty string (not '../') so links stay within
     the same folder regardless of base path depth (GitHub Pages). */
  const page  = location.pathname.split('/').pop() || 'index.html';
  const root  = '';  // all pages are siblings — no relative-path traversal needed

  const links = [
    { h: 'inventory.html', l: 'Cars for sale' },
    { h: 'rent.html',      l: 'Hire a car'    },
    { h: 'events.html',    l: 'Occasions'     },
    { h: 'order.html',     l: 'Import a car'  },
    { h: 'social.html',    l: 'Stories'       },
    { h: 'about.html',     l: 'Our showroom'  },
  ];

  /* ── SVG Icons ── */
  const SVG = {
    ig: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    tt: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/></svg>`,
    fb: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    th: `<svg viewBox="0 0 192 192" fill="currentColor" width="18" height="18"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0726C19.8819 44.4869 13.2244 67.3197 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.68 19.8819 147.513 32.7883 163.927C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.698 128.946 98.4405 129.507Z"/></svg>`,
    loc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    ph:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14z"/></svg>`,
    em:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    up:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="17" height="17"><polyline points="18 15 12 9 6 15"/></svg>`,
    yt:  `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805z"/><polygon fill="currentColor" points="9.609 15.601 9.609 8.408 15.873 12.004"/></svg>`,
  };

  /* ── Logo builder ── */
  const logoId = 'lf' + Math.random().toString(36).slice(2);
  function logoFull() {
    /* Try logo.png first, fallback to logo.svg, fallback to styled text */
    return `<a href="index.html" class="logo" style="display:flex;align-items:center;gap:10px;text-decoration:none">
      <img src="assets/img/logo.png" alt="Next Rides Uganda"
           class="logo-img" id="logo-img-${logoId}"
           style="height:44px;width:auto;object-fit:contain;display:block"
           onerror="this.onerror=null;this.src='assets/img/logo.svg';this.onerror=function(){this.style.display='none';var f=document.getElementById('lf-${logoId}');if(f)f.style.display='flex'}">
      <div id="lf-${logoId}" style="display:none;align-items:center;gap:6px">
        <div style="display:flex;align-items:center">
          <span class="logo-nex">NEX</span><span class="logo-t">T</span>
        </div>
        <span class="logo-sub">Rides Uganda</span>
      </div>
    </a>`;
  }

  /* ── 1. Inject cursor (first thing in body) ── */
  document.body.insertAdjacentHTML('afterbegin',
    `<div class="cursor-dot" id="cdot"></div><div class="cursor-ring" id="cring"></div>`);

  /* ── 2. Inject Navbar (second thing) ── */
  document.body.insertAdjacentHTML('afterbegin', `
    <nav id="nav">
      <div class="ni">
        ${logoFull()}
        <div id="mob-nav">
          <div class="nav-links">
            ${links.map(l => `<a href="${l.h}" class="nav-a${page === l.h ? ' act' : ''}">${l.l}</a>`).join('')}
          </div>
          <div class="nav-acts">
            <button id="theme-toggle" aria-label="Toggle theme" title="Toggle dark / light mode">
              <svg class="tt-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              <svg class="tt-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button class="btn btn-gl btn-sm nav-currency" id="ugx-btn">UGX prices</button>
            <a href="contact.html" class="btn btn-r btn-sm">Talk to us</a>
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
              ${logoFull()}
              <p>Cars for Uganda, selected in Kampala. Buy from current stock, custom-import a specific model, or book transport for your next occasion.</p>
              <div class="footer-soc">
                <a href="${B.ig||'https://www.instagram.com/next_rides_ug'}" target="_blank" rel="noopener" class="fsb" title="Instagram">${SVG.ig}</a>
                <a href="${B.tt||'https://www.tiktok.com/@next_rides'}" target="_blank" rel="noopener" class="fsb" title="TikTok">${SVG.tt}</a>
                <a href="${B.fb||'https://www.facebook.com/share/1GEqttukNw/'}" target="_blank" rel="noopener" class="fsb" title="Facebook">${SVG.fb}</a>
                <a href="${B.th||'https://www.threads.net/@next_rides_ug'}" target="_blank" rel="noopener" class="fsb" title="Threads">${SVG.th}</a>
                <a href="${B.yt||'https://www.youtube.com/@NEXTRIDES'}" target="_blank" rel="noopener" class="fsb fsb-yt" title="YouTube">${SVG.yt}</a>
              </div>
            </div>

            <div class="fc">
              <h4>Find a vehicle</h4>
              <nav>
                <a href="inventory.html">Cars for Sale</a>
                <a href="order.html">Custom Import</a>
                <a href="rent.html">Wedding &amp; Event Hire</a>
                <a href="rent.html#rental-fleet">Airport &amp; Convoy Hire</a>
              </nav>
            </div>

            <div class="fc">
              <h4>Next Rides</h4>
              <nav>
                <a href="about.html">About Us</a>
                <a href="events.html">Occasions &amp; Car Events</a>
                <a href="social.html">Latest Stories</a>
                <a href="contact.html">Contact</a>
                <a href="terms.html">Terms</a>
                <a href="privacy.html">Privacy</a>
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
              <a href="terms.html">Terms</a>
              <a href="privacy.html">Privacy</a>
              <a href="contact.html">Contact</a>
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
