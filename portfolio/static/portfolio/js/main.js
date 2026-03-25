// ── Navbar scroll effect ──────────────────────────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(13, 17, 23, 0.98)';
  } else {
    nav.style.background = 'rgba(13, 17, 23, 0.85)';
  }
});

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('[data-aos]');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-animate');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Trigger for elements already in view
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
});

// ── aos-animate helper ────────────────────────────────────────────────────────
document.addEventListener('scroll', () => {
  document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('aos-animate');
    }
  });
}, { passive: true });
