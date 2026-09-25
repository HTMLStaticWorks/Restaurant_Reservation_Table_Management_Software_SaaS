/* ═══════════════════════════════════════════════════════════
   TableFlow — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Navbar scroll effect ─────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();

/* ── Mobile hamburger menu ────────────────────────────────── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  const cta   = document.querySelector('.nav-cta');
  if (!btn || !links) return;

  let open = false;

  function openMenu() {
    open = true;
    links.classList.add('mobile-open');
    if (cta) {
      cta.classList.add('mobile-open');
      cta.style.top = (72 + links.offsetHeight) + 'px';
    }
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    open = false;
    links.classList.remove('mobile-open');
    if (cta) {
      cta.classList.remove('mobile-open');
      cta.style.top = '';
    }
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    if (open) closeMenu(); else openMenu();
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();

/* ── Scroll reveal animation ──────────────────────────────── */
(function initReveal() {
  // Add reveal classes to elements
  const revealMap = [
    // Hero
    { sel: '#hero-badge',       cls: 'reveal' },
    { sel: '#hero-headline',    cls: 'reveal stagger-1' },
    { sel: '#hero-subtext',     cls: 'reveal stagger-2' },
    { sel: '#hero-ctas',        cls: 'reveal stagger-3' },
    { sel: '#hero-stats',       cls: 'reveal stagger-4' },
    { sel: '#hero-image-wrap',  cls: 'reveal-right stagger-1' },
    // Section 2
    { sel: '#res-img-wrap',     cls: 'reveal-left' },
    { sel: '#res-content',      cls: 'reveal-right' },
    // Section 3
    { sel: '#tables-content',   cls: 'reveal-left' },
    { sel: '#tables-img-wrap',  cls: 'reveal-right' },
    // Section 4
    { sel: '#features-header',  cls: 'reveal' },
    { sel: '#feature-waitlist', cls: 'reveal stagger-1' },
    { sel: '#feature-noshow',   cls: 'reveal stagger-2' },
    { sel: '#feature-profiles', cls: 'reveal stagger-3' },
    { sel: '#feature-preferences', cls: 'reveal stagger-4' },
    { sel: '#feature-analytics',   cls: 'reveal stagger-5' },
    { sel: '#feature-multilocation', cls: 'reveal stagger-6' },
    // Section 5
    { sel: '#cta-content',      cls: 'reveal' },
  ];

  revealMap.forEach(({ sel, cls }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    cls.split(' ').forEach(c => el.classList.add(c));
  });

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
})();

/* ── Smooth scroll for anchor links ──────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── Floating card entrance animation ────────────────────── */
(function initFloatingCards() {
  const cards = document.querySelectorAll('.floating-card, .split-overlay-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px) scale(0.95)';
    card.style.transition = `opacity 0.6s ease ${0.8 + i * 0.2}s, transform 0.6s ease ${0.8 + i * 0.2}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    }, 200);
  });
})();

/* ── Active nav link on scroll ───────────────────────────── */
(function initActiveNav() {
  const navHome = document.getElementById('nav-home');
  if (navHome) {
    navHome.classList.add('nav-active');
  }

  // Smooth scroll to top when clicking Home if on homepage
  document.querySelectorAll('a[href="index.html"], #nav-home, #nav-logo-link').forEach(a => {
    a.addEventListener('click', e => {
      const p = window.location.pathname.split('/').pop();
      if (!p || p === 'index.html' || p === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
})();

/* ── Counter animation for stats ─────────────────────────── */
(function initCounters() {
  const counters = [
    { el: null, selector: '.stat-num', targets: ['2,400+', '98%', '4.9★'] }
  ];

  function animateValue(el, start, end, duration) {
    const isDecimal = String(end).includes('.');
    const numEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''));
    const suffix = String(end).replace(/[0-9.,]/g, '');
    const prefix = String(end).startsWith('+') ? '+' : '';
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (numEnd - start) * eased;
      const display = isDecimal
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsSection = document.getElementById('hero-stats');
  if (!statsSection) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const statNums = statsSection.querySelectorAll('.stat-num');
      statNums.forEach((el, i) => {
        const rawTargets = ['2400', '98', '4.9'];
        const suffixes  = ['+', '%', '★'];
        const numStart = 0;
        const numEnd   = parseFloat(rawTargets[i]);
        const suffix   = suffixes[i];
        const isDecimal = rawTargets[i].includes('.');
        animateValue(el, numStart, numEnd, 1800);
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  obs.observe(statsSection);
})();

console.log('TableFlow homepage loaded ✓');
