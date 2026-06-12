// ===========================
// NAVBAR — scroll + hamburger
// ===========================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// ACTIVE NAV LINK on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height)
        ? 'var(--accent2)' : '';
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll(
  '.project-card, .skill-category, .cert-card, .info-card, .about-stats, .contact-item, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger effect
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
// TIMELINE REVEAL
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ===========================
// SECTION TITLE REVEAL
// ===========================
const sectionTitles = document.querySelectorAll('.section-title, .section-label, .contact-sub');
sectionTitles.forEach(el => el.classList.add('reveal'));
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
sectionTitles.forEach(el => titleObserver.observe(el));

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('nameInput').value.trim();
  const email   = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  if (!name || !email || !message) {
    showMsg('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showMsg('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send (replace with your backend/EmailJS call)
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    showMsg('Message sent! I\'ll get back to you soon. 🚀', 'success');
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
  }, 1400);
});

function showMsg(text, type) {
  formMsg.textContent  = text;
  formMsg.className    = `form-msg ${type}`;
  formMsg.style.display = 'block';
  setTimeout(() => { formMsg.style.display = 'none'; }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// SMOOTH SCROLL for all anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// SKILL TAG hover ripple
// ===========================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => tag.style.transform = '', 150);
  });
});

// ===========================
// TYPING EFFECT on hero tagline
// ===========================
const taglines = [
  'Data Science & Software Engineer',
  'Machine Learning Enthusiast',
  'Cyber Security Explorer',
  'Full Stack Developer'
];

let taglineIdx = 0;
let charIdx    = 0;
let isDeleting = false;
const taglineEl = document.querySelector('.hero-tagline');

function typeTagline() {
  if (!taglineEl) return;
  const current = taglines[taglineIdx];

  if (!isDeleting) {
    taglineEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeTagline, 2000);
      return;
    }
  } else {
    taglineEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting  = false;
      taglineIdx  = (taglineIdx + 1) % taglines.length;
    }
  }

  setTimeout(typeTagline, isDeleting ? 50 : 80);
}

// Start after hero animations settle
setTimeout(typeTagline, 1500);

// ===========================
// CURSOR GLOW (desktop only)
// ===========================
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    z-index: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}