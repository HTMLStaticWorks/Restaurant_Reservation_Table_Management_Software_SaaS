/* ═══════════════════════════════════════════════════════════
   TableFlow — Shared Components (Navbar + Footer)
   Injected into every page
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Resolve active page for nav link highlighting ─────────── */
const PAGE = (function () {
  const p = window.location.pathname.split('/').pop().split('?')[0].split('#')[0].replace('.html', '').toLowerCase();
  return p || 'index';
})();

const isStandaloneAppPage = PAGE.includes('dashboard') || PAGE.includes('signin') || PAGE.includes('signup') || window.location.pathname.toLowerCase().includes('signin') || window.location.pathname.toLowerCase().includes('signup') || window.location.pathname.toLowerCase().includes('dashboard');

/* ── Inject Navbar ─────────────────────────────────────────── */
(function injectNavbar() {
  if (isStandaloneAppPage) return;
  const links = [
    { href: 'index.html',     id: 'nav-home',      label: 'Home'      },
    { href: 'about.html',     id: 'nav-about',     label: 'About'     },
    { href: 'services.html',  id: 'nav-services',  label: 'Services'  },
    { href: 'features.html',  id: 'nav-features',  label: 'Features'  },
    { href: 'pricing.html',   id: 'nav-pricing',   label: 'Pricing'   },
    { href: 'blog.html',      id: 'nav-blog',      label: 'Blog'      },
    { href: 'contact.html',   id: 'nav-contact',   label: 'Contact'   },
    { href: 'demo.html',      id: 'nav-demo-page', label: 'Demo'      },
    { href: 'dashboard.html', id: 'nav-dashboard', label: 'Dashboard' }
  ];

  const activeFile = (function () {
    const file = window.location.pathname.split('/').pop();
    return (!file || file === '' || file === 'index.html') ? 'index.html' : file;
  })();

  const navHTML = `
    <nav class="navbar" id="navbar">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" id="nav-logo-link">
          <div class="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span>TableFlow</span>
        </a>
        <ul class="nav-links" id="nav-links">
          <li class="nav-dropdown-wrap">
            <a href="index.html" id="nav-home" class="${activeFile === 'index.html' || activeFile === 'home2.html' ? 'nav-active' : ''}">
              Home
              <svg class="dropdown-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="nav-dropdown-menu">
              <a href="index.html" class="nav-dropdown-item">
                <div class="dd-title">Home 1 — Classic ${activeFile === 'index.html' ? '<span class="badge-pill-teal">Active</span>' : ''}</div>
                <div class="dd-desc">Platform overview &amp; feature deep-dive</div>
              </a>
              <a href="home2.html" class="nav-dropdown-item">
                <div class="dd-title">Home 2 — Interactive ${activeFile === 'home2.html' ? '<span class="badge-pill-teal">Active</span>' : '<span class="badge-pill-teal">New</span>'}</div>
                <div class="dd-desc">Live booking widget &amp; floor simulator</div>
              </a>
            </div>
          </li>
          ${links.filter(l => l.id !== 'nav-home').map(l => `<li><a href="${l.href}" id="${l.id}" class="${activeFile === l.href ? 'nav-active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
        <div class="nav-cta">
        <button id="theme-toggle" class="btn" aria-label="Toggle Theme">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <button id="rtl-toggle" class="btn" aria-label="Toggle RTL direction" title="Toggle RTL">
          RTL
        </button>
          <a href="signin.html" class="btn btn-ghost" id="nav-login">Sign In</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
})();

/* ── Inject Footer ─────────────────────────────────────────── */
(function injectFooter() {
  if (isStandaloneAppPage) return;
  const footerHTML = `
    <footer class="footer" id="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo footer-logo">
            <div class="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span>TableFlow</span>
          </a>
          <p class="footer-tagline">The complete restaurant reservation and table management platform for modern hospitality.</p>
          <div class="footer-socials">
            <a href="#" class="social-icon" aria-label="Twitter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="social-icon" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" class="social-icon" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-links-group">
          <h4>Product</h4>
          <ul>
            <li><a href="index.html">Home 1 (Classic)</a></li>
            <li><a href="home2.html">Home 2 (Interactive)</a></li>
            <li><a href="features.html">Features</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="dashboard.html">Live Dashboard</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="demo.html">Request Demo</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h4>Account</h4>
          <ul>
            <li><a href="signin.html">Sign In</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="pricing.html">View Pricing</a></li>
            <li><a href="demo.html">Book Product Demo</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <span>&copy; 2026 TableFlow Inc. All rights reserved.</span>
          <div class="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
})();

/* ── Navbar scroll + hamburger (shared) ────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    if (window.scrollY > 40) navbar.classList.add('scrolled');
  }

  // Hamburger
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  const cta   = document.querySelector('.nav-cta');
  if (btn && links) {
    let open = false;
    btn.addEventListener('click', () => {
      open = !open;
      btn.classList.toggle('open', open);
      if (open) {
        links.classList.add('mobile-open');
        if (cta) {
          cta.classList.add('mobile-open');
          cta.style.top = (72 + links.offsetHeight) + 'px';
        }
      } else {
        links.classList.remove('mobile-open');
        if (cta) {
          cta.classList.remove('mobile-open');
          cta.style.top = '';
        }
      }
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        // If clicking on the Home dropdown trigger in mobile view, toggle dropdown menu smoothly
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
        open = false;
        btn.classList.remove('open');
        links.classList.remove('mobile-open');
        const wrap = document.querySelector('.nav-dropdown-wrap');
        if (wrap) wrap.classList.remove('open');
        if (cta) {
          cta.classList.remove('mobile-open');
          cta.style.top = '';
        }
      });
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
});
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

  function updateRTLButton(isRtl) {
    if (!rtlToggle) return;
    if (isRtl) {
      rtlToggle.classList.add('rtl-active');
      rtlToggle.setAttribute('aria-pressed', 'true');
    } else {
      rtlToggle.classList.remove('rtl-active');
      rtlToggle.setAttribute('aria-pressed', 'false');
    }
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      let current = document.documentElement.getAttribute('dir');
      if (!current) current = 'ltr';
      const newDir = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('tableflow-dir', newDir);
      updateRTLButton(newDir === 'rtl');
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
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
    updateRTLButton(savedDir === 'rtl');
  }
})();

/* -- Back to Top Button -------------------------------------- */
(function initBackToTop() {
  // Inject CSS
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
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    .back-to-top:hover {
      transform: translateY(-3px) scale(1.08);
      box-shadow: 0 8px 28px rgba(20, 184, 166, 0.55), 0 0 0 1px rgba(20,184,166,0.3);
    }
    .back-to-top:active {
      transform: translateY(0) scale(0.96);
    }
    [data-theme="light"] .back-to-top {
      box-shadow: 0 4px 16px rgba(13,148,136,0.35), 0 0 0 1px rgba(13,148,136,0.15);
    }
    @media (max-width: 480px) {
      .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 42px;
        height: 42px;
      }
    }
  `;
  document.head.appendChild(style);

  // Inject button HTML
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
