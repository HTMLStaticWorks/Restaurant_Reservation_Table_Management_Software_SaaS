/* ═══════════════════════════════════════════════════════════
   TableFlow — Shared Components (Navbar + Footer)
   Injected into every page
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Resolve active page for nav link highlighting ─────────── */
const PAGE = (function () {
  const p = window.location.pathname.split('/').pop().replace('.html', '');
  return p || 'index';
})();

/* ── Inject Navbar ─────────────────────────────────────────── */
(function injectNavbar() {
  const links = [
    { href: 'index.html',    id: 'nav-home',     label: 'Home'     },
    { href: 'about.html',    id: 'nav-about',    label: 'About'    },
    { href: 'services.html', id: 'nav-services', label: 'Services' },
    { href: 'features.html', id: 'nav-features', label: 'Features' },
    { href: 'pricing.html',  id: 'nav-pricing',  label: 'Pricing'  },
    { href: 'blog.html',     id: 'nav-blog',     label: 'Blog'     },
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
          <a href="signin.html" class="btn btn-ghost" id="nav-login">Sign In</a>
          <a href="signup.html" class="btn btn-primary btn-sm" id="nav-demo">Get Started</a>
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
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="features.html">Features</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html#careers">Careers</a></li>
            <li><a href="about.html#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h4>Account</h4>
          <ul>
            <li><a href="signin.html">Sign In</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="pricing.html">View Pricing</a></li>
            <li><a href="index.html#demo">Request Demo</a></li>
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
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      open = false;
      links.classList.remove('mobile-open');
      if (cta) {
        cta.classList.remove('mobile-open');
        cta.style.top = '';
      }
    }));
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
