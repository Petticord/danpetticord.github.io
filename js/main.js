/* ═══════════════════════════════════════════════════════════════════
   DAN PETTICORD — SHARED JS
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV SCROLL ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ─── SCROLL FADE-IN ─── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── ACTIVE NAV LINK ─── */
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ─── HERO TEXT ROTATION (homepage only) ─── */
  const heroPrefix = document.getElementById('hero-prefix');
  const heroHighlight = document.getElementById('hero-highlight');
  const heroIndicators = document.querySelectorAll('.hero-indicator');

  if (heroPrefix && heroHighlight) {
    const GEM_COLORS = ['#B5332E', '#2E6B6B', '#C67D3B', '#4A7C3F'];
    const lines = [
      { prefix: 'Engineering sustainable solutions for', highlight: 'phosphorus pollution.' },
      { prefix: 'Uncovering the hidden dynamics of', highlight: 'microbial community assembly.' },
      { prefix: 'Tracing nutrients through', highlight: 'natural and working landscapes.' },
      { prefix: 'Bridging biogeochemistry and', highlight: 'conservation.' },
    ];
    const heroImages = [
      'images/DanPushingGPR.jpeg',
      'images/Climbing.jpg',
      'images/sortingGrass.jpg',
      'images/ongoingWorkCanopy.jpeg',
    ];

    // Preload all hero images for smooth transitions
    heroImages.forEach(src => { const img = new Image(); img.src = src; });

    const heroImg = document.getElementById('hero-photo');
    let current = 0;
    const FADE_MS = 500;

    function rotateLine() {
      // Fade out
      heroPrefix.style.opacity = '0';
      heroHighlight.style.opacity = '0';
      heroHighlight.style.transform = 'translateY(10px)';
      if (heroImg) heroImg.style.opacity = '0';

      setTimeout(() => {
        current = (current + 1) % lines.length;
        heroPrefix.textContent = lines[current].prefix;
        heroHighlight.textContent = lines[current].highlight;
        heroHighlight.style.color = GEM_COLORS[current];

        // Swap hero image
        if (heroImg) {
          heroImg.src = heroImages[current];
          // Force a reflow before fading in to avoid flicker
          heroImg.offsetHeight;
          heroImg.style.opacity = '1';
        }

        // Update indicators
        heroIndicators.forEach((ind, i) => {
          ind.style.width = i === current ? '36px' : '12px';
          ind.style.background = i === current ? GEM_COLORS[i] : 'var(--grid)';
        });

        // Fade in
        heroPrefix.style.opacity = '1';
        heroHighlight.style.opacity = '1';
        heroHighlight.style.transform = 'translateY(0)';
      }, FADE_MS);
    }

    setInterval(rotateLine, 4200);
  }

  /* ─── ABOUT PAGE PHOTO ROTATION ─── */
  const aboutPhoto = document.getElementById('about-photo');
  if (aboutPhoto) {
    const aboutImages = [
      'images/DJ.jpg',
      'images/Sudan.jpg',
      'images/turt.jpg',
      'images/DanRatSnake.jpeg',
      'images/big_caiman.jpg',
      'images/esa_gopher_headshot.jpg',
      'images/dan-huacachina.jpg',
    ];

    // Preload about images
    aboutImages.forEach(src => { const img = new Image(); img.src = src; });

    let aboutIdx = 0;
    const ABOUT_FADE_MS = 500;

    setInterval(() => {
      aboutPhoto.style.opacity = '0';
      setTimeout(() => {
        aboutIdx = (aboutIdx + 1) % aboutImages.length;
        aboutPhoto.src = aboutImages[aboutIdx];
        aboutPhoto.offsetHeight;
        aboutPhoto.style.opacity = '1';
      }, ABOUT_FADE_MS);
    }, 4200);
  }

  /* ─── THEME TOGGLE ─── */
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  /* ─── MOBILE NAV ─── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

});
