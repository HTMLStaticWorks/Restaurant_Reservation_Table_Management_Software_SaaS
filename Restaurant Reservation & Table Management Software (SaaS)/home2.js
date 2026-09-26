/* ═══════════════════════════════════════════════════════════
   TableFlow — Home 2 JavaScript
   Interactive booking widget, live floor simulator & calculator
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Interactive Booking Widget in Hero ──────────────── */
  const guestsBtns = document.querySelectorAll('.party-btn');
  const slotBtns = document.querySelectorAll('.slot-btn');
  const areaBtns = document.querySelectorAll('.area-btn');
  const bookBtn = document.getElementById('hero-book-btn');
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close-btn');

  let selectedParty = '2 Guests';
  let selectedTime = '7:30 PM';
  let selectedArea = 'Main Dining';

  guestsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guestsBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedParty = btn.dataset.party || btn.textContent.trim();
      updateWidgetSummary();
    });
  });

  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTime = btn.dataset.time || btn.textContent.trim();
      updateWidgetSummary();
    });
  });

  areaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      areaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedArea = btn.dataset.area || btn.textContent.trim();
      updateWidgetSummary();
    });
  });

  function updateWidgetSummary() {
    const summaryEl = document.getElementById('booking-summary-text');
    if (summaryEl) {
      summaryEl.textContent = `${selectedParty} · Tonight at ${selectedTime} · ${selectedArea}`;
    }
  }

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalParty = document.getElementById('modal-party');
      const modalTime = document.getElementById('modal-time');
      const modalArea = document.getElementById('modal-area');
      const modalTable = document.getElementById('modal-table');

      if (modalParty) modalParty.textContent = selectedParty;
      if (modalTime) modalTime.textContent = selectedTime;
      if (modalArea) modalArea.textContent = selectedArea;
      if (modalTable) {
        const randTable = Math.floor(Math.random() * 18) + 1;
        modalTable.textContent = `Table #${randTable}`;
      }

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


  /* ── 2. Live Interactive Floor Plan Simulator ──────────── */
  const floorData = {
    main: [
      { id: 'T-01', shape: 'round', seats: 2, status: 'occupied', guest: 'Liam Vance', party: '2 Guests', server: 'Marco', time: '42m in', course: 'Entrée (Sea Bass)' },
      { id: 'T-02', shape: 'square', seats: 4, status: 'available', guest: null, party: 'Up to 4', server: 'Unassigned', time: 'Cleaned & Ready', course: 'Immediate Seating' },
      { id: 'T-03', shape: 'booth', seats: 6, status: 'reserved', guest: 'Dr. Sarah Lin', party: '5 Guests', server: 'Elena', time: 'Arriving in 15m', course: 'Reserved (Chef Tasting)' },
      { id: 'T-04', shape: 'round', seats: 4, status: 'occupied', guest: 'Alex & Noah', party: '4 Guests', server: 'Chloe', time: '1h 10m in', course: 'Dessert & Digestif' },
      { id: 'T-05', shape: 'square', seats: 2, status: 'available', guest: null, party: 'Up to 2', server: 'Unassigned', time: 'Cleaned & Ready', course: 'Immediate Seating' },
      { id: 'T-06', shape: 'booth', seats: 8, status: 'vip', guest: 'Ambassador Moreau', party: '7 Guests', server: 'Head Sommelier Julian', time: 'Seated · VIP Note', course: 'Dom Pérignon 2012' },
      { id: 'T-07', shape: 'round', seats: 2, status: 'occupied', guest: 'Emma Watson', party: '2 Guests', server: 'Marco', time: '28m in', course: 'Appetizers' },
      { id: 'T-08', shape: 'square', seats: 4, status: 'reserved', guest: 'Marcus Sterling', party: '4 Guests', server: 'Chloe', time: 'Arriving at 8:00 PM', course: 'Anniversary Setup' },
    ],
    patio: [
      { id: 'P-01', shape: 'round', seats: 4, status: 'occupied', guest: 'James Wilson', party: '3 Guests', server: 'David', time: '35m in', course: 'Woodfired Grill' },
      { id: 'P-02', shape: 'square', seats: 2, status: 'available', guest: null, party: 'Up to 2', server: 'Unassigned', time: 'Heater Active', course: 'Immediate Seating' },
      { id: 'P-03', shape: 'round', seats: 6, status: 'reserved', guest: 'Harper Family', party: '6 Guests', server: 'Rachel', time: 'Arriving 7:45 PM', course: 'Patio Birthday' },
      { id: 'P-04', shape: 'square', seats: 4, status: 'occupied', guest: 'Kenji Sato', party: '4 Guests', server: 'David', time: '55m in', course: 'Main Course' },
    ],
    lounge: [
      { id: 'L-01', shape: 'booth', seats: 10, status: 'vip', guest: 'Apex Capital Group', party: '9 Guests', server: 'VIP Lead Tyler', time: 'Seated · Open Tab', course: 'Cocktails & Caviar' },
      { id: 'L-02', shape: 'round', seats: 4, status: 'available', guest: null, party: 'Up to 4', server: 'Unassigned', time: 'Available', course: 'Walk-in Welcome' },
      { id: 'L-03', shape: 'booth', seats: 6, status: 'occupied', guest: 'Zoe Kravitz', party: '5 Guests', server: 'Tyler', time: '40m in', course: 'Bespoke Mixology' },
    ]
  };

  let currentZone = 'main';

  const zoneTabs = document.querySelectorAll('.zone-tab');
  const floorGrid = document.getElementById('interactive-floor-grid');
  const detailCard = document.getElementById('table-detail-card');

  function renderFloorPlan(zone) {
    if (!floorGrid) return;
    floorGrid.innerHTML = '';
    const tables = floorData[zone] || [];

    tables.forEach(t => {
      const el = document.createElement('div');
      el.className = `interactive-table table-${t.shape} status-${t.status}`;
      el.dataset.id = t.id;
      el.innerHTML = `
        <div class="table-badge-status"></div>
        <div class="table-num">${t.id}</div>
        <div class="table-seats">${t.seats}p</div>
      `;

      el.addEventListener('click', () => {
        document.querySelectorAll('.interactive-table').forEach(tbl => tbl.classList.remove('selected'));
        el.classList.add('selected');
        showTableDetails(t);
      });

      floorGrid.appendChild(el);
    });

    // Select the first table by default
    if (tables.length > 0) {
      const firstEl = floorGrid.firstChild;
      if (firstEl) firstEl.classList.add('selected');
      showTableDetails(tables[0]);
    }
  }

  function showTableDetails(t) {
    if (!detailCard) return;

    const statusColors = {
      available: { label: 'Available', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
      reserved:  { label: 'Reserved',  color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
      occupied:  { label: 'Occupied',  color: '#06b6d4', bg: 'rgba(6,182,212,0.15)'  },
      vip:       { label: 'VIP Reserved', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' }
    };

    const s = statusColors[t.status] || statusColors.available;

    detailCard.innerHTML = `
      <div class="detail-header">
        <div>
          <span class="detail-tag" style="background:${s.bg};color:${s.color};border:1px solid ${s.color}40;">● ${s.label}</span>
          <h3 class="detail-title">${t.id} · ${t.shape.toUpperCase()} TABLE</h3>
        </div>
        <div class="detail-capacity">${t.seats} Seats</div>
      </div>
      <div class="detail-body">
        <div class="detail-row">
          <span class="detail-label">Current Guest:</span>
          <strong class="detail-val">${t.guest || 'None (Open Table)'}</strong>
        </div>
        <div class="detail-row">
          <span class="detail-label">Party Size:</span>
          <span class="detail-val">${t.party}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Assigned Server:</span>
          <span class="detail-val">${t.server}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time &amp; Service:</span>
          <span class="detail-val">${t.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status Details:</span>
          <span class="detail-val highlight-val">${t.course}</span>
        </div>
      </div>
      <div class="detail-actions">
        ${t.status === 'available'
          ? `<button class="btn btn-primary btn-sm full-w" onclick="alert('Seating Walk-in Party at ${t.id}!')">Seat Walk-In Party</button>`
          : `<button class="btn btn-outline btn-sm" onclick="alert('SMS Sent to Guest at ${t.id}!')">Send SMS Alert</button>
             <button class="btn btn-primary btn-sm" onclick="alert('Table ${t.id} Marked Complete & Reset!')">Finish Turn</button>`
        }
      </div>
    `;
  }

  zoneTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      zoneTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentZone = tab.dataset.zone || 'main';
      renderFloorPlan(currentZone);
    });
  });

  renderFloorPlan('main');


  /* ── 3. Interactive ROI & Extra Revenue Calculator ─────── */
  const sliderTables = document.getElementById('calc-tables');
  const sliderSpend  = document.getElementById('calc-spend');
  const sliderTurns  = document.getElementById('calc-turns');

  const valTables = document.getElementById('val-tables');
  const valSpend  = document.getElementById('val-spend');
  const valTurns  = document.getElementById('val-turns');

  const resExtraMonthly = document.getElementById('res-extra-monthly');
  const resFeeSaved     = document.getElementById('res-fee-saved');
  const resTurnsLift    = document.getElementById('res-turns-lift');

  function calculateROI() {
    if (!sliderTables || !sliderSpend || !sliderTurns) return;

    const tables = parseInt(sliderTables.value, 10);
    const spend  = parseInt(sliderSpend.value, 10);
    const turns  = parseFloat(sliderTurns.value);

    if (valTables) valTables.textContent = tables;
    if (valSpend)  valSpend.textContent  = `$${spend}`;
    if (valTurns)  valTurns.textContent  = `${turns.toFixed(1)}x`;

    // Calculation logic:
    // Avg 3.2 seats per table
    const dailyCovers = tables * 3.2 * turns;
    // TableFlow optimizes turn times by ~15% and saves ~2 walk-in lost parties/day
    const extraCoversMonth = Math.round(dailyCovers * 0.12 * 30);
    const extraRevenue = Math.round(extraCoversMonth * spend);

    // Legacy platforms charge ~$1.50 per seated cover
    const monthlyCovers = Math.round(dailyCovers * 30);
    const legacyFeesSaved = Math.round(monthlyCovers * 1.50);

    const extraTurnPercentage = Math.round(turns * 18);

    if (resExtraMonthly) resExtraMonthly.textContent = `+$${extraRevenue.toLocaleString()}`;
    if (resFeeSaved)     resFeeSaved.textContent     = `$${legacyFeesSaved.toLocaleString()}/mo`;
    if (resTurnsLift)    resTurnsLift.textContent    = `+${extraTurnPercentage}% turns`;
  }

  if (sliderTables && sliderSpend && sliderTurns) {
    sliderTables.addEventListener('input', calculateROI);
    sliderSpend.addEventListener('input', calculateROI);
    sliderTurns.addEventListener('input', calculateROI);
    calculateROI();
  }


  /* ── 4. Accordion FAQ ──────────────────────────────────── */
  document.querySelectorAll('.faq-item-h2, .faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-question-h2, .faq-question');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('active') || item.classList.contains('open');
        document.querySelectorAll('.faq-item-h2, .faq-item').forEach(i => {
          i.classList.remove('active');
          i.classList.remove('open');
        });
        if (!isOpen) {
          item.classList.add('active');
          item.classList.add('open');
        }
      });
    }
  });


  /* ── 5. Scroll Reveal ──────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  /* ── 6. Navbar Scroll & Hamburger ──────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    if (window.scrollY > 40) navbar.classList.add('scrolled');
  }

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
