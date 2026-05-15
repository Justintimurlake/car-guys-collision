/* =============================================
   CAR GUYS COLLISION — main.js
   Hero video chain · Mobile menu · GSAP scroll
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- Year in footer -------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Nav scroll state -------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu -------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* -------- Hero video chain: 1.mp4 -> 2.mp4 -> 1.mp4 ... -------- */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const sources = ['assets/video/hero-1.mp4', 'assets/video/hero-2.mp4'];
    let idx = 0;

    const playNext = () => {
      idx = (idx + 1) % sources.length;
      heroVideo.src = sources[idx];
      heroVideo.play().catch(() => {});
    };
    heroVideo.addEventListener('ended', playNext);

    // Autoplay safety: re-try after first user gesture if blocked
    const attemptPlay = () => heroVideo.play().catch(() => {});
    attemptPlay();
    ['click', 'touchstart', 'scroll'].forEach(ev =>
      window.addEventListener(ev, attemptPlay, { once: true, passive: true })
    );
  }

  /* -------- GSAP scroll animations -------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* Pinned section — video.currentTime is driven by scroll progress.
       Smoothing strategy:
         1. GSAP scrub: 1 — heavily smooths scroll input (lerps over ~1s)
         2. lerp the video.currentTime toward the target each RAF tick
         3. Only seek when the delta exceeds one frame (~1/30s) to avoid
            spamming the decoder with redundant seek requests. */
    const panels = gsap.utils.toArray('.panel');
    const pinnedSection = document.querySelector('.pinned');
    const pinnedVideo = document.querySelector('.pinned__video');
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    if (panels.length && pinnedSection) {
      let currentIdx = -1;

      const activatePanel = (idx) => {
        if (idx === currentIdx) return;
        currentIdx = idx;

        panels.forEach((p, i) => {
          const active = i === idx;
          p.classList.toggle('is-active', active);

          if (active) {
            const children = p.querySelectorAll(
              '.panel__label, .panel__title, .panel__sub, .panel__list > li, .panel__why > li, .carriers > span'
            );
            gsap.fromTo(children,
              { y: isMobile ? 24 : 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.7 : 0.9,
                stagger: isMobile ? 0.04 : 0.06,
                ease: 'power3.out',
                overwrite: 'auto'
              }
            );
          }
        });
      };

      activatePanel(0);

      const setupScrub = () => {
        if (!pinnedVideo || !pinnedVideo.duration) return;

        // Scroll drives video.currentTime on every device.
        // The all-keyframe encoded scroll-smooth.mp4 lets mobile browsers
        // seek instantly without decoder lag.
        pinnedVideo.pause();
        pinnedVideo.loop = false;

        // Show first frame immediately so the section never appears black
        // before the user starts scrolling.
        if (pinnedVideo.currentTime === 0) {
          pinnedVideo.currentTime = 0.05;
        }

        let targetTime = 0;
        let isSeeking = false;
        pinnedVideo.addEventListener('seeking', () => { isSeeking = true; });
        pinnedVideo.addEventListener('seeked', () => { isSeeking = false; });

        const tick = () => {
          if (pinnedVideo.duration && !isSeeking) {
            const delta = targetTime - pinnedVideo.currentTime;
            if (Math.abs(delta) > 0.04) {
              pinnedVideo.currentTime = targetTime;
            }
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        ScrollTrigger.create({
          trigger: pinnedSection,
          start: 'top top',
          end: () => `+=${pinnedSection.offsetHeight - window.innerHeight}`,
          scrub: isMobile ? 0.6 : 1.2,
          invalidateOnRefresh: true,
          onUpdate: self => {
            targetTime = Math.max(0.05, self.progress * pinnedVideo.duration);
            const idx = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
            activatePanel(idx);
          }
        });
      };

      if (pinnedVideo) {
        if (pinnedVideo.readyState >= 1) setupScrub();
        else pinnedVideo.addEventListener('loadedmetadata', setupScrub, { once: true });
      }
    }

    /* Story panels — parallax on bg image (desktop only), quote fade everywhere */
    gsap.utils.toArray('.story').forEach(story => {
      const bg = story.querySelector('.story__bg');
      const bgStyle = getComputedStyle(story).getPropertyValue('--bg').trim();
      if (bg && bgStyle) {
        bg.style.backgroundImage = bgStyle;
      }

      if (!isMobile && bg) {
        gsap.fromTo(bg,
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: story,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      const body = story.querySelector('.story__body');
      gsap.from(body, {
        y: isMobile ? 36 : 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: story,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    /* Section reveals — stories intro and contact (footer stays always visible) */
    gsap.utils.toArray('.stories__intro, .contact__inner').forEach(el => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* Refresh whenever layout settles (fonts, full load, video metadata) */
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    document.querySelectorAll('video').forEach(v => {
      if (v.readyState >= 1) refresh();
      else v.addEventListener('loadedmetadata', refresh, { once: true });
    });
    // Final safety refresh after first paint
    requestAnimationFrame(() => requestAnimationFrame(refresh));
  }

  /* -------- Smooth anchor offset for fixed nav -------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 0;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
