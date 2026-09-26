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
    btn.classList.add('open');
    links.classList.add('mobile-open');
    if (cta) {
      cta.classList.add('mobile-open');
      cta.style.top = (72 + links.offsetHeight) + 'px';
    }
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    open = false;
    btn.classList.remove('open');
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
    a.addEventListener('click', (e) => {
      if (a.id === 'nav-home' && window.innerWidth <= 1024) {
        const wrap = a.closest('.nav-dropdown-wrap');
        if (wrap) {
          e.preventDefault();
          const isOpen = wrap.classList.toggle('open');
          const chevron = a.querySelector('.dropdown-chevron');
          if (chevron) {
            chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
          }
          if (cta) {
            setTimeout(() => {
              cta.style.top = (72 + links.offsetHeight) + 'px';
            }, 50);
          }
          return;
        }
      }
      const wrap = document.querySelector('.nav-dropdown-wrap');
      if (wrap) wrap.classList.remove('open');
      closeMenu();
    });
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
/* ── Theme & RTL Toggles (Fixed logic) ──────────── */
(function initToggles() {
  const themeToggle = document.getElementById('theme-toggle');
  const rtlToggle = document.getElementById('rtl-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let current = document.documentElement.getAttribute('data-theme');
      if (!current) current = 'dark'; // Default is dark
      const newTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('tableflow-theme', newTheme);
      
      // Swap icon
      if (newTheme === 'light') {
        themeToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      } else {
        themeToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      }
    });
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let current = document.documentElement.getAttribute('dir');
      if (!current) current = 'ltr';
      const newDir = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('tableflow-dir', newDir);
    });
  }

  // Restore state
  const savedTheme = localStorage.getItem('tableflow-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle && savedTheme === 'light') {
        themeToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  }
  
  const savedDir = localStorage.getItem('tableflow-dir');
  if (savedDir) document.documentElement.setAttribute('dir', savedDir);
})();

/* -- Back to Top Button -------------------------------------- */
(function initBackToTop() {
  const style = document.createElement('style');
  style.textContent = `
    .back-to-top {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--grad-primary);
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(20, 184, 166, 0.4), 0 0 0 1px rgba(20,184,166,0.2);
      opacity: 0;
      visibility: hidden;
      transform: translateY(16px) scale(0.85);
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
      z-index: 9999;
    }
    .back-to-top.visible { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
    .back-to-top:hover { transform: translateY(-3px) scale(1.08); box-shadow: 0 8px 28px rgba(20,184,166,0.55), 0 0 0 1px rgba(20,184,166,0.3); }
    .back-to-top:active { transform: translateY(0) scale(0.96); }
    [data-theme="light"] .back-to-top { box-shadow: 0 4px 16px rgba(13,148,136,0.35), 0 0 0 1px rgba(13,148,136,0.15); }
    @media (max-width: 480px) { .back-to-top { bottom: 20px; right: 20px; width: 42px; height: 42px; } }
  `;
  document.head.appendChild(style);
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => { btn.classList.toggle('visible', window.scrollY > 300); }, { passive: true });
  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
