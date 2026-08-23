/* Next Rides motion system — transform/opacity only, reduced-motion aware. */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  function init() {
    const body = document.body;
    const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','') || 'home';
    body.dataset.page = page === 'index' ? 'home' : page;

    const progress = document.createElement('div');
    progress.className = 'nr-scroll-progress';
    progress.setAttribute('aria-hidden','true');
    body.appendChild(progress);

    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(updateProgress); }, { passive:true });
    updateProgress();

    const lazyVideos = document.querySelectorAll('video[data-nr-video]');
    if (lazyVideos.length && !reduce) {
      const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (!video.src && video.dataset.src) video.src = video.dataset.src;
          video.play().catch(() => {});
        } else if (!video.paused) video.pause();
      }), { rootMargin:'320px 0px', threshold:.01 });
      lazyVideos.forEach(video => videoObserver.observe(video));
    }

    if (!reduce) {
      root.classList.add('nr-motion');
      const candidates = document.querySelectorAll([
        'body:not(.home-v2) section > .w > .sh',
        '.editorial-head','.car-card','.rent-card','.news-card','.brand-card',
        '.event-card','.latest-social-card','.service-tile','.how-step',
        '.form-panel','.contact-card','.vehicle-gallery img','.vehicle-summary',
        '.lifestyle-card','.home-guide article'
      ].join(','));
      candidates.forEach((el,index) => {
        el.dataset.nrMotion = el.matches('img,.service-tile,.lifestyle-card') ? 'image' : 'up';
        el.style.setProperty('--nr-delay', `${Math.min(index % 6,5) * 70}ms`);
      });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin:'0px 0px -8% 0px', threshold:.08 });
      candidates.forEach(el => observer.observe(el));

      document.querySelectorAll('.car-card,.rent-card,.news-card,.latest-social-card').forEach(card => {
        card.dataset.nrPointer = 'true';
        card.addEventListener('pointermove', event => {
          const box = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${event.clientX - box.left}px`);
          card.style.setProperty('--my', `${event.clientY - box.top}px`);
        }, { passive:true });
      });

      /* Inventory/news cards are data-rendered on DOMContentLoaded. Pick up any
         nodes added by that render after the initial static-page scan. */
      setTimeout(() => {
        document.querySelectorAll('.car-card,.rent-card,.news-card,.brand-card,.event-card,.latest-social-card').forEach((el,index) => {
          if (!el.dataset.nrMotion) {
            el.dataset.nrMotion = 'up';
            el.style.setProperty('--nr-delay', `${Math.min(index % 6,5) * 70}ms`);
            observer.observe(el);
          }
          if (!el.dataset.nrPointer && el.matches('.car-card,.rent-card,.news-card,.latest-social-card')) {
            el.dataset.nrPointer = 'true';
            el.addEventListener('pointermove', event => {
              const box = el.getBoundingClientRect();
              el.style.setProperty('--mx', `${event.clientX - box.left}px`);
              el.style.setProperty('--my', `${event.clientY - box.top}px`);
            }, { passive:true });
          }
        });
      }, 120);

      const heroImage = document.querySelector('.showroom-hero__image');
      if (heroImage && matchMedia('(hover:hover)').matches) {
        let px = 0, py = 0, tx = 0, ty = 0;
        const move = event => {
          tx = (event.clientX / innerWidth - .5) * 12;
          ty = (event.clientY / innerHeight - .5) * 8;
        };
        const tick = () => {
          px += (tx - px) * .055; py += (ty - py) * .055;
          heroImage.style.translate = `${px}px ${py}px`;
          requestAnimationFrame(tick);
        };
        addEventListener('pointermove', move, { passive:true });
        tick();
      }
    }

    const wipe = document.createElement('div');
    wipe.className = 'nr-page-wipe is-leaving';
    wipe.setAttribute('aria-hidden','true');
    body.appendChild(wipe);
    if (!reduce) {
      document.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const url = new URL(link.href, location.href);
        if (link.target || url.origin !== location.origin || url.hash || url.pathname === location.pathname) return;
        event.preventDefault();
        wipe.classList.remove('is-leaving');
        wipe.classList.add('is-entering');
        setTimeout(() => { location.href = url.href; }, 420);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
