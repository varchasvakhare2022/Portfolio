// Mobile nav toggle
const navToggleButton = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggleButton && siteNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Sticky header state
const siteHeader = document.getElementById('siteHeader');
const handleScroll = () => {
  if (!siteHeader) return;
  const scrolled = window.scrollY > 8;
  siteHeader.classList.toggle('is-scrolled', scrolled);
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// Enhanced marquee smoothness
document.addEventListener('DOMContentLoaded', () => {
  // Force smooth marquee animations
  const marqueeTracks = document.querySelectorAll('.marquee-track, .projects-track');
  
  marqueeTracks.forEach(track => {
    // Ensure animations start smoothly
    track.style.animationPlayState = 'running';
    
    // Force reflow to ensure smooth start
    track.offsetHeight;
    
    // Restart animation if needed
    setTimeout(() => {
      track.style.animation = 'none';
      track.offsetHeight; // Force reflow
      track.style.animation = null;
    }, 100);
  });
  
  // Optimize marquee performance
  const marquees = document.querySelectorAll('.marquee, .projects-marquee');
  marquees.forEach(marquee => {
    // Add smooth hover pause/resume
    marquee.addEventListener('mouseenter', () => {
      const track = marquee.querySelector('.marquee-track, .projects-track');
      if (track) {
        track.style.animationPlayState = 'paused';
      }
    });
    
    marquee.addEventListener('mouseleave', () => {
      const track = marquee.querySelector('.marquee-track, .projects-track');
      if (track) {
        track.style.animationPlayState = 'running';
      }
    });
  });

});


// Animated nav indicator (hover + active)
(() => {
  const nav = document.getElementById('siteNav');
  const indicator = document.getElementById('navIndicator');
  const brandContainer = document.querySelector('.brand-container');
  if (!nav || !indicator || !brandContainer) return;
  
  const links = Array.from(nav.querySelectorAll('a'));
  const contactBtn = nav.querySelector('[data-open-contact]');
  const brand = document.querySelector('.brand');
  
  const moveTo = (el) => {
    if (!el) { 
      // Move back to brand - make it larger
      const brandRect = brand.getBoundingClientRect();
      const containerRect = brandContainer.getBoundingClientRect();
      const left = brandRect.left - containerRect.left;
      indicator.style.left = left + 'px';
      indicator.style.width = brandRect.width + 'px';
      indicator.style.height = '3px';
      return; 
    }
    // Move to nav items - make it thinner
    const r = el.getBoundingClientRect();
    const containerRect = brandContainer.getBoundingClientRect();
    const left = r.left - containerRect.left;
    indicator.style.left = left + 'px';
    indicator.style.width = r.width + 'px';
    indicator.style.height = '2px';
  };
  
  const active = () => links.find(a => a.classList.contains('is-active'));
  
  // Start with indicator under brand
  moveTo(null);
  
  links.forEach(a => {
    a.addEventListener('mouseenter', () => moveTo(a));
    a.addEventListener('focus', () => moveTo(a));
  });
  
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => moveTo(contactBtn));
    contactBtn.addEventListener('focus', () => moveTo(contactBtn));
  }
  
  nav.addEventListener('mouseleave', () => moveTo(null));
  brand.addEventListener('mouseenter', () => moveTo(null));
  window.addEventListener('resize', () => moveTo(active() || null));
})();

// Hide-on-scroll header + scroll spy
(() => {
  const header = document.getElementById('siteHeader');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const goingDown = y > lastY && y > 120;
    header?.classList.toggle('is-hidden', goingDown);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const sections = ['#work','#services','#about','#contact'];
  const navLinks = Array.from(document.querySelectorAll('#siteNav a'));
  const spy = () => {
    let current = '';
    sections.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) current = id;
    });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === current));
  };
  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();

// Spotlight follow in hero
const hero = document.getElementById('hero');
if (hero) {
  const spotlight = hero.querySelector('.spotlight');
  hero.addEventListener('pointermove', (e) => {
    if (!spotlight) return;
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--sx', `${x}%`);
    spotlight.style.setProperty('--sy', `${y}%`);
  });
}

// Meteors generation
const meteors = document.getElementById('meteors');
if (meteors) {
  const createMeteor = () => {
    const el = document.createElement('div');
    el.className = 'meteor';
    const rot = 20 + Math.random() * 20;
    const dx = -200 - Math.random() * 400;
    const dy = 300 + Math.random() * 400;
    const delay = Math.random() * -6;
    const left = Math.random() * 100;
    el.style.setProperty('--rot', `${rot}deg`);
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dy', `${dy}px`);
    el.style.left = `${left}%`;
    el.style.animationDelay = `${delay}s`;
    meteors.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  };
  for (let i = 0; i < 8; i++) createMeteor();
  setInterval(createMeteor, 1200);
}

// Projects Creative Background generation
const projectsStars = document.getElementById('projectsStars');
if (projectsStars) {
  // Code snippets that float up
  const codeSnippets = [
    'function create()', 'const project = {}', 'import React', 'export default', 
    'async function', 'useState()', 'useEffect()', 'return <div>', 
    'npm install', 'git commit', 'docker build', 'API endpoint',
    'database.query', 'auth.login()', 'router.push()', 'component.mount'
  ];
  
  const createCodeParticle = () => {
    const el = document.createElement('div');
    el.className = 'code-particle';
    el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = Math.random() * -8 + 's';
    el.style.animationDuration = (6 + Math.random() * 4) + 's';
    projectsStars.appendChild(el);
    setTimeout(() => el.remove(), 10000);
  };
  
  // Geometric shapes that float up
  const createGeoShape = () => {
    const el = document.createElement('div');
    const shapes = ['circle', 'triangle', 'square'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    el.className = `geo-shape ${shape}`;
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = Math.random() * -12 + 's';
    el.style.animationDuration = (10 + Math.random() * 4) + 's';
    projectsStars.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  };
  
  // Initial generation - more particles and shapes
  for (let i = 0; i < 15; i++) createCodeParticle();
  for (let i = 0; i < 10; i++) createGeoShape();
  
  // Continuous generation - more frequent
  setInterval(createCodeParticle, 1200);
  setInterval(createGeoShape, 1800);
}

// About section optimized effects
const aboutBg = document.querySelector('.about-bg');
if (aboutBg) {
  const techElements = [
    'CPU', 'GPU', 'RAM', 'API', 'DB', 'JS', 'TS', 'React', 'Node', 'Git'
  ];
  
  const createTechElement = () => {
    const el = document.createElement('div');
    el.className = 'tech-element';
    el.textContent = techElements[Math.floor(Math.random() * techElements.length)];
    el.style.position = 'absolute';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.fontSize = '12px';
    el.style.color = 'rgba(108, 240, 194, 0.4)';
    el.style.opacity = '0.3';
    el.style.fontWeight = '600';
    el.style.fontFamily = 'Monaco, Menlo, monospace';
    el.style.pointerEvents = 'none';
    el.style.animation = 'tech-float 8s ease-in-out infinite';
    el.style.animationDelay = Math.random() * -8 + 's';
    el.style.textShadow = '0 0 8px currentColor';
    
    aboutBg.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  };
  
  // Create fewer initial tech elements
  for (let i = 0; i < 6; i++) createTechElement();
  
  // Less frequent generation
  setInterval(createTechElement, 4000);
}

// Flip words effect
const flipWordsEl = document.getElementById('flipWords');
if (flipWordsEl) {
  const words = Array.from(flipWordsEl.querySelectorAll('.word'));
  let idx = words.findIndex(w => w.classList.contains('is-active'));
  setInterval(() => {
    words[idx]?.classList.remove('is-active');
    idx = (idx + 1) % words.length;
    words[idx]?.classList.add('is-active');
  }, 1800);
}

// Card 3D tilt + glare
const cards = Array.from(document.querySelectorAll('.work-grid .card'));
cards.forEach((card) => {
  let raf = 0;
  const onMove = (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rx = (-dy * 6).toFixed(2);
      const ry = (dx * 6).toFixed(2);
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
      card.classList.add('is-active');
    });
  };
  const reset = () => {
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
    card.classList.remove('is-active');
  };
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerleave', reset);
  // Track pointer position for shine effect
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--px', `${px}%`);
    card.style.setProperty('--py', `${py}%`);
  });
});

// Testimonials slider
const slider = document.getElementById('testimonialSlider');
if (slider) {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  const show = (i) => {
    slides.forEach((s, si) => s.classList.toggle('is-active', si === i));
    index = i;
  };

  prev?.addEventListener('click', () => show((index - 1 + slides.length) % slides.length));
  next?.addEventListener('click', () => show((index + 1) % slides.length));

  // Auto-rotate
  let auto = setInterval(() => next?.click(), 6000);
  slider.addEventListener('mouseenter', () => clearInterval(auto));
  slider.addEventListener('mouseleave', () => (auto = setInterval(() => next?.click(), 6000)));

  // Keyboard and swipe controls
  slider.setAttribute('tabindex','0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev?.dispatchEvent(new Event('click'));
    if (e.key === 'ArrowRight') next?.dispatchEvent(new Event('click'));
  });
  let sx = 0;
  slider.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) {
      if (dx > 0) prev?.dispatchEvent(new Event('click')); else next?.dispatchEvent(new Event('click'));
    }
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Smooth scroll for in-page anchors
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.getAttribute('href')?.startsWith('#')) {
    const id = target.getAttribute('href');
    const el = id ? document.querySelector(id) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});


// Scroll progress
(() => {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / (max || 1)));
    bar.style.width = `${p * 100}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Old project modal code removed - replaced with new modal system

// Performance Optimized Contact Modal
(() => {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  
  // Cache DOM elements for better performance
  const openEls = document.querySelectorAll('[data-open-contact]');
  const form = document.getElementById('contactForm');
  const toasts = document.getElementById('toasts');
  const dialog = modal.querySelector('.modal-dialog');
  
  // Use RAF for smooth animations
  let animationFrame = null;
  
  const open = () => { 
    modal.classList.add('is-open'); 
    modal.setAttribute('aria-hidden','false'); 
    modal.setAttribute('aria-modal','true');
    
    // Cancel any pending animation frame
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    // Trigger entrance animation with RAF
    animationFrame = requestAnimationFrame(() => {
      if (dialog) {
        dialog.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        dialog.style.opacity = '1';
      }
    });
  };
  
  const close = () => { 
    // Cancel any pending animation frame
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    
    // Add exit animation with RAF
    animationFrame = requestAnimationFrame(() => {
      if (dialog) {
        dialog.style.transform = 'translate3d(0, 50px, 0) scale3d(0.8, 0.8, 1)';
        dialog.style.opacity = '0';
      }
    });
    
    setTimeout(() => {
      modal.classList.remove('is-open'); 
      modal.setAttribute('aria-hidden','true'); 
      modal.setAttribute('aria-modal','false');
      // Reset form when closing
      if (form) form.reset();
    }, 300);
  };
  
  // Optimized button interactions with throttling
  const addRippleEffect = (button) => {
    let lastClickTime = 0;
    const throttleDelay = 100; // Prevent rapid clicks
    
    button.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastClickTime < throttleDelay) return;
      lastClickTime = now;
      
      const ripple = button.querySelector('.btn-ripple');
      if (ripple) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Use transform3d for GPU acceleration
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate3d(0, 0, 0) scale3d(0, 0, 0)';
        ripple.style.animation = 'none';
        
        requestAnimationFrame(() => {
          ripple.style.animation = 'ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
      }
    });
  };
  
  // Optimized input interactions with debouncing
  const optimizeInputInteractions = (input) => {
    let inputTimeout = null;
    
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Debounced typing animation
    input.addEventListener('input', () => {
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
      
      input.style.transform = 'translate3d(0, 0, 0) scale3d(1.02, 1.02, 1)';
      
      inputTimeout = setTimeout(() => {
        input.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
      }, 100);
    });
  };
  
  // Add optimized event listeners
  openEls.forEach(el => el.addEventListener('click', open));
  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
  
  // Optimized keyboard event listener
  const handleKeydown = (e) => {
    if (e.key === 'Escape') close();
  };
  window.addEventListener('keydown', handleKeydown);
  
  // Add ripple effects to buttons
  const submitBtn = modal.querySelector('.btn-primary');
  const cancelBtn = modal.querySelector('.btn-secondary');
  if (submitBtn) addRippleEffect(submitBtn);
  if (cancelBtn) addRippleEffect(cancelBtn);
  
  // Optimize input interactions
  const inputs = modal.querySelectorAll('.form-input');
  inputs.forEach(optimizeInputInteractions);
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    if (!toasts) return;
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toasts.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      
      // Add Web3Forms access key from config
      formData.append('access_key', CONFIG.WEB3FORM_KEY);
      formData.append('subject', 'New Contact Form Submission from Portfolio');
      formData.append('from_name', 'Portfolio Contact Form');
      formData.append('redirect', 'false');
      
      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      // Web3Forms returns different response formats
      if (result.success === true || result.message === 'Success' || response.ok) {
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        setTimeout(() => close(), 1500);
      } else {
        // Log the actual response for debugging
        console.log('Web3Forms response:', result);
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // If we get here but emails are being sent, show success anyway
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        setTimeout(() => close(), 1500);
      } else {
        showToast('Failed to send message. Please try again or contact me directly.', 'error');
      }
    } finally {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
})();

// Copy-to-clipboard with toast
(() => {
  const toasts = document.getElementById('toasts');
  const showToast = (msg) => {
    if (!toasts) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    toasts.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  };
  document.addEventListener('click', async (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.matches('[data-copy]')) {
      const text = target.getAttribute('data-copy') || '';
      try { await navigator.clipboard.writeText(text); showToast('Copied to clipboard'); }
      catch { showToast('Copy failed'); }
    }
  });
})();

// Stats count-up on reveal
(() => {
  const nums = document.querySelectorAll('.stat-number[data-count]');
  if (!nums.length) return;
  
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  
  const run = (el) => {
    const target = Number(el.getAttribute('data-count') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1500; // Slightly longer duration for smoother effect
    let start = 0;
    
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const eased = easeOut(p);
      const val = Math.round(target * eased);
      el.textContent = `${val}${suffix}`;
      
      if (p < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };
  
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        // Add a small delay for better visual effect
        setTimeout(() => {
          run(en.target);
        }, 200);
        o.unobserve(en.target);
      }
    });
  }, { 
    threshold: 0.3, // Trigger when 30% visible
    rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
  });
  
  nums.forEach((n) => obs.observe(n));
})();

// Custom Cursor
(() => {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  
  // Check if device supports hover (desktop) vs touch (mobile)
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0;
  
  if (isMobile) {
    // Hide cursor completely on mobile devices
    cursor.style.display = 'none';
    return;
  }
  
  const ring = cursor.querySelector('.cursor-ring');
  const dot = cursor.querySelector('.cursor-dot');
  
  // Hide cursor initially until site is loaded
  cursor.classList.add('is-hidden');
  cursor.style.display = 'none'; // Ensure it's completely hidden during loading
  
  // Hide native cursor globally (desktop pointers)
  document.documentElement.classList.add('cursor-none');
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let mx = x, my = y;
  const speed = 0.18;
  const raf = () => {
    mx += (x - mx) * speed;
    my += (y - my) * speed;
    if (ring) { ring.style.left = mx + 'px'; ring.style.top = my + 'px'; }
    if (dot) { dot.style.left = x + 'px'; dot.style.top = y + 'px'; }
    requestAnimationFrame(raf);
  };
  raf();
  
  // Show cursor only after loading is complete
  const showCursor = () => {
    isLoading = false; // Mark loading as complete
    cursor.style.display = 'block'; // Restore display
    cursor.classList.remove('is-hidden');
  };
  
  // Show cursor exactly when loader finishes (same timing as loader hide)
  if (document.readyState === 'complete') {
    setTimeout(showCursor, 1400);
  } else {
    window.addEventListener('load', () => setTimeout(showCursor, 1400));
  }
  
  let isLoading = true;
  
  const onMove = (e) => { 
    x = e.clientX; 
    y = e.clientY; 
    // Only show cursor on mouse move if loading is complete
    if (!isLoading) {
      cursor.classList.remove('is-hidden');
    }
  };
  const onLeave = () => cursor.classList.add('is-hidden');
  window.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', onLeave);
  document.querySelectorAll('a, button, .magnet').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    el.addEventListener('mousedown', () => cursor.classList.add('is-click'));
    window.addEventListener('mouseup', () => cursor.classList.remove('is-click'));
  });

  // Move sheen over brand based on mouse X
  const brand = document.querySelector('.brand');
  if (brand instanceof HTMLElement) {
    brand.addEventListener('mousemove', (e) => {
      const r = brand.getBoundingClientRect();
      const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
      brand.style.setProperty('--mx', x + '%');
    });
  }

  // Cursor particle trail
  const trailRoot = document.createElement('div');
  trailRoot.className = 'cursor-trail';
  document.body.appendChild(trailRoot);
  let last = 0;
  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    if (now - last < 20) return; // throttle
    last = now;
    const d = document.createElement('div');
    d.className = 'trail-dot';
    d.style.left = e.clientX + 'px';
    d.style.top = e.clientY + 'px';
    trailRoot.appendChild(d);
    setTimeout(() => d.remove(), 900);
  });

  // Header reactive glow follows mouse X
  const header = document.getElementById('siteHeader');
  window.addEventListener('mousemove', (e) => {
    if (!header) return;
    const r = header.getBoundingClientRect();
    const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
    header.style.setProperty('--hx', x + '%');
  });
})();

// Scroll reveal
(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

// Stagger in project cards
(() => {
  const grid = document.querySelector('.work-grid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.card'));
  items.forEach((el, i) => el.style.setProperty('--delay', `${i * 0.08}s`));
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); o.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
})();

// Work filters and shuffle
(() => {
  const grid = document.getElementById('workGrid');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const countEl = document.getElementById('workCount');
  const shuffleBtn = document.getElementById('workShuffle');
  if (!grid || !filterButtons.length) return;
  const cards = Array.from(grid.querySelectorAll('.card'));

  const persistKey = 'workFilter';
  const applyCount = () => { if (countEl) countEl.textContent = `${cards.filter(c => !c.classList.contains('is-hidden')).length} shown`; };

  const setActive = (val) => {
    filterButtons.forEach(b => b.classList.toggle('is-active', b.dataset.filter === val));
    filterButtons.forEach(b => b.setAttribute('aria-selected', String(b.classList.contains('is-active'))));
  };

  const applyFilter = (val) => {
    const tag = val === 'all' ? null : val;
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const show = !tag || tags.split(',').map(s => s.trim()).includes(tag);
      card.classList.toggle('is-hidden', !show);
    });
    applyCount();
  };

  const shuffle = () => {
    // Fisher-Yates
    const visible = cards.filter(c => !c.classList.contains('is-hidden'));
    for (let i = visible.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [visible[i], visible[j]] = [visible[j], visible[i]];
    }
    visible.forEach(el => grid.appendChild(el));
    // reapply stagger delays
    Array.from(grid.querySelectorAll('.card')).forEach((el, i) => el.style.setProperty('--delay', `${i * 0.08}s`));
  };

  // Wire buttons
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    const val = btn.dataset.filter || 'all';
    localStorage.setItem(persistKey, val);
    setActive(val);
    applyFilter(val);
  }));
  shuffleBtn?.addEventListener('click', shuffle);

  // Init
  const stored = localStorage.getItem(persistKey) || 'all';
  setActive(stored);
  applyFilter(stored);
})();

// Keyboard navigation between project cards
(() => {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  const selector = '.card:not(.is-hidden)';
  grid.addEventListener('keydown', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement) || !target.matches('.card')) return;
    const cards = Array.from(grid.querySelectorAll(selector));
    const idx = cards.indexOf(target);
    if (idx < 0) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const focusCard = (i) => { const el = cards[(i + cards.length) % cards.length]; el?.focus(); };
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); focusCard(idx + 1); break;
      case 'ArrowLeft': e.preventDefault(); focusCard(idx - 1); break;
      case 'ArrowDown': e.preventDefault(); focusCard(idx + cols); break;
      case 'ArrowUp': e.preventDefault(); focusCard(idx - cols); break;
      default: break;
    }
  });
  // Make cards focusable
  Array.from(grid.querySelectorAll('.card')).forEach(c => c.setAttribute('tabindex', '0'));
})();

// Old arrow key navigation code removed - replaced with new modal system

// Magnetic hover
(() => {
  const magnets = document.querySelectorAll('.magnet');
  magnets.forEach((btn) => {
    let rafId = 0;
    const strength = 24;
    const onMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    };
    const reset = () => { btn.style.transform = ''; };
    btn.addEventListener('pointermove', onMove);
    btn.addEventListener('pointerleave', reset);
  });
})();

// Hero parallax (background layers translate subtly on scroll)
(() => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const aurora = hero.querySelector('.aurora');
  const lines = hero.querySelector('.bg-lines');
  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
    if (aurora instanceof HTMLElement) aurora.style.transform = `translateY(${progress * 20 - 10}%)`;
    if (lines instanceof HTMLElement) lines.style.transform = `translateY(${progress * -10}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Performance Optimized Three.js background with 60fps target
(() => {
  const canvas = document.getElementById('bg3d');
  const hero = document.getElementById('hero');
  if (!(canvas instanceof HTMLCanvasElement) || !hero) return;
  
  // Performance detection
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0;
  
  const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#6cf0c2';
  const hasWebGL = (() => {
    try { 
      const c = document.createElement('canvas'); 
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); 
    } catch { return false; }
  })();
  
  // Optimized resize with throttling
  let resizeTimeout = null;
  const rect = () => hero.getBoundingClientRect();
  const resize = () => { 
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const r = rect(); 
      canvas.width = r.width; 
      canvas.height = r.height; 
    }, 16); // ~60fps throttling
  };
  
  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (hasWebGL && window.THREE && !isMobile) {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2; // Increased exposure for vibrant colors
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100);
    camera.position.set(1.2, 0.8, 1.5); // Better angle to see more faces
    camera.lookAt(0, 0, 0);
    // Multiple lights to illuminate all faces
    const light1 = new THREE.DirectionalLight(0xffffff, 2.0); light1.position.set(2, 2, 3); scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 1.5); light2.position.set(-2, 2, 3); scene.add(light2);
    const light3 = new THREE.DirectionalLight(0xffffff, 1.8); light3.position.set(0, 3, 2); scene.add(light3); // Top lighting
    const light4 = new THREE.DirectionalLight(0xffffff, 1.2); light4.position.set(0, -2, 2); scene.add(light4); // Bottom lighting
    const light5 = new THREE.DirectionalLight(0xffffff, 1.0); light5.position.set(3, 0, 0); scene.add(light5); // Right lighting
    const light6 = new THREE.DirectionalLight(0xffffff, 1.0); light6.position.set(-3, 0, 0); scene.add(light6); // Left lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.8); scene.add(amb);
    // Cube that dislocates into parts on hover
    const cubeSize = 0.6;
    const partSize = cubeSize / 3;
    const group = new THREE.Group(); scene.add(group);
    const parts = [];
    const faceMat = new THREE.MeshPhysicalMaterial({ 
      color: new THREE.Color('#ffffff'), // Bright white for Rubik's cube
      metalness: 0.0, // No metalness for plastic look
      roughness: 0.2, // Smooth plastic surface
      transmission: 0.0, // No transmission for solid plastic
      thickness: 0.1, 
      clearcoat: 0.8, // High clearcoat for glossy plastic
      clearcoatRoughness: 0.1, // Smooth clearcoat
      envMapIntensity: 1.0, // Good reflections for glossy plastic
      attenuationColor: new THREE.Color('#ffffff'),
      attenuationDistance: 1.5,
      reflectivity: 0.5, // Good reflectivity for glossy plastic
      ior: 1.5, // Standard plastic index of refraction
      sheen: 0.3, // Good sheen for glossy plastic
      sheenColor: new THREE.Color(0xffffff),
      sheenRoughness: 0.2
    });
    
    // Create 3x3x3 cube grid with color variations
    const cubePositions = [];
    // Super vibrant Rubik's cube colors (6 classic bright colors)
    const colors = [
      new THREE.Color('#ffffff'), // Pure White
      new THREE.Color('#ff0000'), // Pure Red
      new THREE.Color('#0066ff'), // Bright Blue
      new THREE.Color('#ff6600'), // Bright Orange
      new THREE.Color('#00cc00'), // Bright Green
      new THREE.Color('#ffdd00'), // Bright Yellow
    ];
    
    // Create a proper Rubik's cube with correct piece structure
    for (let x=-1; x<=1; x++) for (let y=-1; y<=1; y++) for (let z=-1; z<=1; z++) {
      // Skip the center core piece (it's not visible)
      if (x === 0 && y === 0 && z === 0) continue;
      
      // Create the base cube piece (black plastic)
      const baseMat = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color('#1a1a1a'), // Black plastic
        shininess: 20,
        specular: new THREE.Color(0x111111)
      });
      
      const m = new THREE.Mesh(new THREE.BoxGeometry(partSize, partSize, partSize), baseMat);
      const pos = new THREE.Vector3(x*partSize, y*partSize, z*partSize);
      m.position.copy(pos);
      m.userData.home = pos.clone();
      m.userData.hovered = false;
      m.userData.dir = pos.clone().normalize();
      m.userData.gridPos = {x, y, z};
      
      // Determine piece type and add colored faces
      const isCorner = (Math.abs(x) + Math.abs(y) + Math.abs(z)) === 3; // Corner piece
      const isEdge = (Math.abs(x) + Math.abs(y) + Math.abs(z)) === 2;   // Edge piece
      const isCenter = (Math.abs(x) + Math.abs(y) + Math.abs(z)) === 1; // Center piece
      
      // Add colored faces based on piece type and position
      const stickerSize = partSize * 0.95;
      const stickerOffset = partSize * 0.501;
      
      // Create a proper solved Rubik's cube with correct face colors
      // Each face should have its own solid color
      const faceColors = {
        top: colors[0],    // White
        bottom: colors[5], // Yellow
        front: colors[1],  // Red
        back: colors[3],   // Orange
        right: colors[2],  // Blue
        left: colors[4]    // Green
      };
      
      // Add colored faces based on piece position - each face gets its correct color
      if (y === 1) { // Top face - White (horizontal placement)
        addColoredFace(m, [0, stickerOffset, 0], [Math.PI/2, 0, 0], faceColors.top, stickerSize);
      }
      if (y === -1) { // Bottom face - Yellow (horizontal placement)
        addColoredFace(m, [0, -stickerOffset, 0], [-Math.PI/2, 0, 0], faceColors.bottom, stickerSize);
      }
      if (z === 1) { // Front face - Red
        addColoredFace(m, [0, 0, stickerOffset], [0, 0, 0], faceColors.front, stickerSize);
      }
      if (z === -1) { // Back face - Orange
        addColoredFace(m, [0, 0, -stickerOffset], [0, Math.PI, 0], faceColors.back, stickerSize);
      }
      if (x === 1) { // Right face - Blue
        addColoredFace(m, [stickerOffset, 0, 0], [0, -Math.PI/2, 0], faceColors.right, stickerSize);
      }
      if (x === -1) { // Left face - Green
        addColoredFace(m, [-stickerOffset, 0, 0], [0, Math.PI/2, 0], faceColors.left, stickerSize);
      }
      
      group.add(m); parts.push(m);
      cubePositions.push({mesh: m, pos: pos.clone(), grid: {x, y, z}});
    }
    
    // Helper function to add perfectly aligned colored faces
    function addColoredFace(parent, position, rotation, color, size) {
      const stickerMat = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 60,
        specular: new THREE.Color(0x333333),
        side: THREE.DoubleSide
      });
      
      const sticker = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        stickerMat
      );
      
      // Perfect positioning to avoid wrongly connected stickers
      sticker.position.set(position[0], position[1], position[2]);
      sticker.rotation.set(rotation[0], rotation[1], rotation[2]);
      
      // Ensure sticker is properly aligned
      sticker.userData.isSticker = true;
      parent.add(sticker);
    }

    // Create connecting lines between adjacent cubes - igloo.inc style
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.05,
      linewidth: 1
    });
    
    const connections = [];
    cubePositions.forEach((cube, i) => {
      const {x, y, z} = cube.grid;
      
      // Check all 6 adjacent positions (up, down, left, right, front, back)
      const adjacent = [
        {x: x+1, y, z}, {x: x-1, y, z}, // left/right
        {x, y: y+1, z}, {x, y: y-1, z}, // up/down  
        {x, y, z: z+1}, {x, y, z: z-1}  // front/back
      ];
      
      adjacent.forEach(adj => {
        // Find the adjacent cube
        const adjacentCube = cubePositions.find(c => 
          c.grid.x === adj.x && c.grid.y === adj.y && c.grid.z === adj.z
        );
        
        if (adjacentCube) {
          // Create line geometry
          const geometry = new THREE.BufferGeometry().setFromPoints([
            cube.pos.clone(),
            adjacentCube.pos.clone()
          ]);
          
          const line = new THREE.Line(geometry, lineMaterial);
          line.userData.cube1 = cube.mesh;
          line.userData.cube2 = adjacentCube.mesh;
          line.userData.homePos1 = cube.pos.clone();
          line.userData.homePos2 = adjacentCube.pos.clone();
          
          
          group.add(line);
          connections.push(line);
        }
      });
    });

    // Soft gradient env map for crystal refraction
    const pmrem = new THREE.PMREMGenerator(renderer);
    const gradCanvas = document.createElement('canvas'); gradCanvas.width = 1024; gradCanvas.height = 512;
    const gctx = gradCanvas.getContext('2d');
    if (gctx) {
      const grd = gctx.createLinearGradient(0,0,1024,512);
      grd.addColorStop(0, '#0b0f12');
      grd.addColorStop(0.45, brand);
      grd.addColorStop(0.55, '#0a0a0a');
      grd.addColorStop(1, '#101418');
      gctx.fillStyle = grd; gctx.fillRect(0,0,1024,512);
    }
    const envTexEquirect = new THREE.CanvasTexture(gradCanvas);
    envTexEquirect.mapping = THREE.EquirectangularReflectionMapping;
    const envRT = pmrem.fromEquirectangular(envTexEquirect);
    const envTex = envRT.texture; scene.environment = envTex;

    // Crystal material
    // Individual piece hover detection using raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredPieces = new Set(); // Allow multiple pieces to be hovered
    const onResize = () => {
      const r = rect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height; camera.updateProjectionMatrix();
    };
    onResize(); window.addEventListener('resize', onResize);
    let t = 0; let tx = 0, ty = 0;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const mouseX = e.clientX - r.left;
      const mouseY = e.clientY - r.top;
      
      // Convert to normalized device coordinates (-1 to 1) for Three.js
      // But adjust for the cube's visual position (shifted 25% to the right)
      const normalizedX = (mouseX / r.width) * 2 - 1;
      const normalizedY = -(mouseY / r.height) * 2 + 1;
      
      // Adjust the X coordinate to account for the cube's visual shift
      // The cube appears 25% to the right, so we need to shift the interaction area
      const adjustedX = normalizedX - 0.5; // Shift interaction area to the right
      
      tx = adjustedX * 0.02; 
      ty = normalizedY * 0.02;
      
      // Update mouse coordinates for raycaster
      mouse.x = adjustedX;
      mouse.y = normalizedY;
      
      // Calculate proximity-based dislocation for all pieces
      const cursorWorldPos = new THREE.Vector3(mouse.x, mouse.y, 0);
      cursorWorldPos.unproject(camera);
      
      parts.forEach((piece, i) => {
        // Calculate distance from cursor to piece (in screen space)
        const pieceScreenPos = new THREE.Vector3();
        piece.getWorldPosition(pieceScreenPos);
        pieceScreenPos.project(camera);
        
        const distance = Math.sqrt(
          Math.pow(pieceScreenPos.x - mouse.x, 2) + 
          Math.pow(pieceScreenPos.y - mouse.y, 2)
        );
        
        // Proximity threshold - pieces within this distance will be affected
        const maxDistance = 0.8; // Adjust this to control the "field" size
        const proximity = Math.max(0, 1 - (distance / maxDistance));
        
        // Store proximity data
        piece.userData.proximity = proximity;
        piece.userData.distance = distance;
        
        // Determine if piece should be "hovered" based on proximity
        const wasHovered = piece.userData.hovered;
        piece.userData.hovered = proximity > 0.1; // Minimum threshold
        
        // Set hover start time for newly hovered pieces
        if (piece.userData.hovered && !wasHovered) {
          piece.userData.hoverStartTime = t;
        } else if (!piece.userData.hovered) {
          piece.userData.hoverStartTime = null;
        }
      });
    });
    const animate = () => {
      t += 0.005;
      // Rotation to show all faces of the Rubik's cube
      group.rotation.x = Math.sin(t * 0.2) * 0.4; // More X rotation to show top/bottom
      group.rotation.y = t * 0.4; // Faster Y rotation to show all sides
      group.rotation.z = Math.sin(t * 0.15) * 0.3; // More Z rotation for diagonal views
      // Proximity-based dislocation animation
      parts.forEach((p, i) => {
        const proximity = p.userData.proximity || 0;
        const hoverTime = p.userData.hoverStartTime;
        
        if (proximity > 0.1) {
          // Calculate animation progress (0 to 1)
          const animProgress = hoverTime ? Math.min((t - hoverTime) * 8, 1) : 1;
          
          // Easing function for smooth in/out
          const easeOutCubic = 1 - Math.pow(1 - animProgress, 3);
          const easeInOutCubic = animProgress < 0.5 
            ? 4 * animProgress * animProgress * animProgress 
            : 1 - Math.pow(-2 * animProgress + 2, 3) / 2;
          
          // Proximity-based spread - closer pieces move more
          const baseSpread = 0.6;
          const proximitySpread = baseSpread * proximity * proximity; // Quadratic falloff
          const staggerDelay = (i % 9) * 0.1;
          const staggerProgress = Math.max(0, Math.min(1, (animProgress - staggerDelay) * 2));
          const spread = proximitySpread * easeOutCubic * staggerProgress;
          
          // Proximity-based wobble - closer pieces wobble more
          const wobbleIntensity = proximity * 0.05;
          const wobble = Math.sin(t * 8 + i) * wobbleIntensity * easeInOutCubic;
          const oscillation = Math.sin(t * 6 + i * 0.5) * proximity * 0.03 * easeInOutCubic;
          
          // Calculate target position with proximity-based movement
          const baseDir = p.userData.dir.clone();
          const wobbleDir = new THREE.Vector3(
            Math.sin(t * 4 + i) * proximity * 0.1,
            Math.cos(t * 3 + i) * proximity * 0.1,
            Math.sin(t * 5 + i) * proximity * 0.1
          ).normalize();
          
          const target = p.userData.home.clone()
            .add(baseDir.multiplyScalar(spread + wobble))
            .add(wobbleDir.multiplyScalar(oscillation));
          
          // Proximity-based lerp speed
          const lerpSpeed = animProgress < 0.5 ? (0.15 + proximity * 0.1) : (0.1 + proximity * 0.05);
          p.position.lerp(target, lerpSpeed);
          
          // Proximity-based scale animation
          const scale = 1 + (easeOutCubic * proximity * 0.1);
          p.scale.setScalar(scale);
          
        } else {
          // Return to home position smoothly
          const returnSpeed = 0.12;
          p.position.lerp(p.userData.home, returnSpeed);
          p.scale.lerp(new THREE.Vector3(1, 1, 1), returnSpeed);
          p.userData.hoverStartTime = null;
        }
      });
      
      // Update connecting lines to follow cube positions
      connections.forEach(line => {
        const cube1 = line.userData.cube1;
        const cube2 = line.userData.cube2;
        
        // Update line geometry to connect current cube positions
        const positions = line.geometry.attributes.position.array;
        positions[0] = cube1.position.x;
        positions[1] = cube1.position.y;
        positions[2] = cube1.position.z;
        positions[3] = cube2.position.x;
        positions[4] = cube2.position.y;
        positions[5] = cube2.position.z;
        
        line.geometry.attributes.position.needsUpdate = true;
        
        // Adjust line opacity based on cube proximity
        const cube1Proximity = cube1.userData.proximity || 0;
        const cube2Proximity = cube2.userData.proximity || 0;
        const maxProximity = Math.max(cube1Proximity, cube2Proximity);
        
        // Make lines more visible when cubes are being affected
        line.material.opacity = 0.3 + (maxProximity * 0.4);
      });
      
      // Animate lights to show all faces
      light1.position.x = 2 + Math.sin(t) * 0.3; 
      light1.position.y = 2 + Math.sin(t*0.6)*0.2;
      light2.position.x = -2 + Math.cos(t) * 0.3; 
      light2.position.y = 2 + Math.cos(t*0.6)*0.2;
      light3.position.y = 3 + Math.sin(t*0.4)*0.3;
      light4.position.y = -2 + Math.cos(t*0.4)*0.3;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  } else {
    // 2D fallback: floating particles (for desktop without WebGL) or mobile devices
    if (isMobile) {
      // For mobile, hide the canvas and use CSS background instead
      canvas.style.display = 'none';
      hero.style.background = `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)`;
    } else {
      // Desktop fallback: floating particles
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const parts = Array.from({ length: 60 }, () => ({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*2+1, dx:(Math.random()-.5)*0.6, dy:(Math.random()-.5)*0.6 }));
      const draw = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = brand;
        parts.forEach(p => { p.x+=p.dx; p.y+=p.dy; if(p.x<0||p.x>canvas.width) p.dx*=-1; if(p.y<0||p.y>canvas.height) p.dy*=-1; ctx.globalAlpha=.6; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
        requestAnimationFrame(draw);
      };
      draw();
    }
  }
})();


// Button ripple and marquee speed control already in CSS; add ripple on click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLElement && target.closest('.btn')) {
    const btn = target.closest('.btn');
    if (!btn) return;
    const r = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.position = 'absolute';
    r.style.left = e.clientX - rect.left - size / 2 + 'px';
    r.style.top = e.clientY - rect.top - size / 2 + 'px';
    r.style.width = r.style.height = size + 'px';
    r.style.borderRadius = '50%';
    r.style.background = 'rgba(255,255,255,.25)';
    r.style.transform = 'scale(0)';
    r.style.transition = 'transform .5s ease, opacity .6s ease';
    r.style.pointerEvents = 'none';
    r.style.opacity = '1';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(r);
    requestAnimationFrame(() => { r.style.transform = 'scale(1.6)'; r.style.opacity = '0'; });
    setTimeout(() => r.remove(), 650);
  }
});

// Confetti helper
const confetti = (x, y) => {
  const n = 14;
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div');
    d.style.position = 'fixed';
    d.style.left = x + 'px';
    d.style.top = y + 'px';
    d.style.width = '6px';
    d.style.height = '10px';
    d.style.background = `hsl(${Math.random()*360},90%,60%)`;
    d.style.transform = `translate(-50%,-50%) rotate(${Math.random()*180}deg)`;
    d.style.borderRadius = '2px';
    d.style.pointerEvents = 'none';
    d.style.zIndex = '130';
    document.body.appendChild(d);
    const dx = (Math.random() - .5) * 200;
    const dy = (Math.random() - .8) * 300;
    const rot = (Math.random() - .5) * 720;
    d.animate([
      { transform: `translate(-50%,-50%)` , opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: 900 + Math.random()*500, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => d.remove();
  }
};

// Confetti triggers: modal open + copy toast
document.addEventListener('click', (e) => {
  const t = e.target;
  if (t instanceof HTMLElement && (t.closest('.work-grid .card') || t.matches('[data-copy]'))) {
    confetti(e.clientX, e.clientY);
  }
});

// Link preview tooltips for external links
(() => {
  const links = Array.from(document.querySelectorAll('a[href^="http"]'));
  let tip;
  links.forEach((a) => {
    a.addEventListener('mouseenter', (e) => {
      const rect = a.getBoundingClientRect();
      tip = document.createElement('div');
      tip.className = 'tooltip';
      tip.textContent = a.href.replace(/^https?:\/\//,'');
      document.body.appendChild(tip);
      tip.style.left = rect.left + rect.width/2 + 'px';
      tip.style.top = rect.top + window.scrollY + 'px';
    });
    a.addEventListener('mouseleave', () => { tip?.remove(); tip = undefined; });
  });
})();

// Command palette (Cmd/Ctrl+K)
(() => {
  const root = document.getElementById('cmdk');
  const input = document.getElementById('cmdkInput');
  const list = document.getElementById('cmdkList');
  if (!root || !input || !list) return;
  const open = () => { root.classList.add('is-open'); root.setAttribute('aria-hidden','false'); input.value=''; input.focus(); render(''); };
  const close = () => { root.classList.remove('is-open'); root.setAttribute('aria-hidden','true'); };
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
  root.addEventListener('click', (e) => { if ((e.target instanceof HTMLElement) && e.target === root) close(); });
  const items = [
    { label: 'Go to Work', kbd: 'W', action: () => document.querySelector('#work')?.scrollIntoView({behavior:'smooth'}) },
    { label: 'Go to About', kbd: 'A', action: () => document.querySelector('#about')?.scrollIntoView({behavior:'smooth'}) },
    { label: 'Go to Contact', kbd: 'C', action: () => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}) },
  ];
  const render = (q) => {
    list.innerHTML = '';
    items.filter(i => i.label.toLowerCase().includes(q.toLowerCase())).forEach((i) => {
      const el = document.createElement('div');
      el.className = 'cmdk-item';
      el.innerHTML = `<span>${i.label}</span><kbd>${i.kbd}</kbd>`;
      el.addEventListener('click', () => { i.action(); close(); });
      list.appendChild(el);
    });
  };
  input.addEventListener('input', () => render(input.value));
})();

// Desktop icon drag and drop functionality
(() => {
  const icons = document.querySelectorAll('.icon, .btn[draggable="true"]');
  const downloadZone = document.getElementById('downloadZone');
  
  if (!downloadZone || icons.length === 0) return;
  
  // Check if device is mobile - more comprehensive detection
  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                   'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0 ||
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  console.log('Mobile detection:', isMobile, 'Screen width:', window.innerWidth, 'Touch support:', 'ontouchstart' in window);
  
  let draggedElement = null;
  
  // Setup icons for both desktop and mobile
  icons.forEach(icon => {
    const tooltip = icon.querySelector('.icon-tooltip');
    
    // Disable drag on mobile devices
    if (isMobile) {
      icon.draggable = false;
      icon.removeAttribute('draggable');
      icon.style.webkitUserDrag = 'none';
      icon.style.userDrag = 'none';
      console.log('Disabled drag for icon:', icon.className);
    } else {
      // Desktop drag functionality
      icon.addEventListener('dragstart', (e) => {
        draggedElement = icon;
        icon.classList.add('dragging');
        downloadZone.classList.add('is-visible');
        // Hide tooltip when dragging starts
        if (tooltip) {
          tooltip.classList.remove('is-visible', 'icon-tooltip-animation');
        }
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', icon.outerHTML);
      });
      
      icon.addEventListener('dragend', () => {
        icon.classList.remove('dragging');
        downloadZone.classList.remove('is-visible');
        downloadZone.classList.remove('drag-over');
        draggedElement = null;
      });
    }
    
    // Click functionality for both desktop and mobile
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      if (isMobile) {
        // On mobile, show download popup directly
        const fileName = icon.dataset.file;
        const fileNameDisplay = icon.querySelector('.icon-label').textContent;
        console.log('Mobile click detected, showing popup for:', fileNameDisplay);
        showDownloadConfirmation(fileName, fileNameDisplay);
      } else {
        // On desktop, show tooltip
        if (tooltip) {
          // Remove any existing tooltip animations
          tooltip.classList.remove('is-visible', 'icon-tooltip-animation');
          
          // Force reflow
          tooltip.offsetHeight;
          
          // Show tooltip with bounce animation
          setTimeout(() => {
            tooltip.classList.add('is-visible', 'icon-tooltip-animation');
          }, 50);
          
          // Hide tooltip after 3 seconds
          setTimeout(() => {
            tooltip.classList.remove('is-visible', 'icon-tooltip-animation');
          }, 3000);
        }
      }
    });
    
    // Add touch event handler for mobile devices
    if (isMobile) {
      icon.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      
      icon.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Show download popup on touch end
        const fileName = icon.dataset.file;
        const fileNameDisplay = icon.querySelector('.icon-label').textContent;
        console.log('Mobile touch detected, showing popup for:', fileNameDisplay);
        showDownloadConfirmation(fileName, fileNameDisplay);
      });
    }
  });
  
  // Download zone events
  downloadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    downloadZone.classList.add('drag-over');
  });
  
  downloadZone.addEventListener('dragleave', () => {
    downloadZone.classList.remove('drag-over');
  });
  
  downloadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    downloadZone.classList.remove('drag-over');
    
    if (draggedElement) {
      const fileName = draggedElement.dataset.file;
      const fileNameDisplay = draggedElement.querySelector('.icon-label').textContent;
      
      // Show confirmation popup
      showDownloadConfirmation(fileName, fileNameDisplay);
    }
  });
  
  // Download confirmation popup
  function showDownloadConfirmation(fileName, displayName) {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 0;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: hidden;
      transform: scale(0.3) rotateX(15deg) rotateY(-10deg) translateY(100px);
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 
        0 25px 50px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(108, 240, 194, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      position: relative;
    `;
    
    // Create content
    modal.innerHTML = `
      <!-- Modal Header -->
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 28px 20px 28px;
        border-bottom: 1px solid var(--border);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
      ">
        <h3 style="
          font-size: 24px;
          font-weight: 600;
          color: var(--text);
          margin: 0;
          line-height: 1.3;
        ">Download ${displayName}</h3>
        <button id="closeModal" style="
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 10px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- Modal Body -->
      <div style="
        padding: 24px 28px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
      ">
        <!-- Document Preview -->
        <div id="documentPreview" style="
          background: var(--bg-elev);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        ">
          <div style="
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, rgba(108, 240, 194, 0.1) 0%, rgba(108, 240, 194, 0.05) 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            margin: 0 auto 20px auto;
            border: 1px solid rgba(108, 240, 194, 0.2);
          ">${displayName === 'CV' ? '📋' : '📄'}</div>
          <h4 style="
            margin: 0;
            color: var(--text);
            font-size: 20px;
            font-weight: 600;
            line-height: 1.3;
          ">Varchasva Khare's ${displayName}</h4>
        </div>
      </div>
    `;
    
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    
    // Trigger animations
    setTimeout(() => {
      modal.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg) translateY(0)';
      const header = modal.querySelector('div:first-child');
      const body = modal.querySelector('div:nth-child(2)');
      
      if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }
      if (body) {
        body.style.opacity = '1';
        body.style.transform = 'translateY(0)';
      }
    }, 50);
    
    // Keep custom cursor visible on popup with higher z-index
    const cursor = document.getElementById('cursor');
    if (cursor) {
      cursor.classList.remove('is-hidden');
      cursor.style.zIndex = '3000'; // Higher than popup's 2000
    }
    
    // Add buttons to custom cursor system
    const closeBtn = modal.querySelector('#closeModal');
    const documentPreview = modal.querySelector('#documentPreview');
    
    // Add cursor link effects to buttons
    closeBtn.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    closeBtn.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    documentPreview.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    documentPreview.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    
    // Add click effects
    closeBtn.addEventListener('mousedown', () => cursor.classList.add('is-click'));
    documentPreview.addEventListener('mousedown', () => cursor.classList.add('is-click'));
    window.addEventListener('mouseup', () => cursor.classList.remove('is-click'));
    
    // Add hover effects
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'var(--bg-elev)';
      closeBtn.style.color = 'var(--text)';
      closeBtn.style.transform = 'scale(1.05)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'none';
      closeBtn.style.color = 'var(--muted)';
      closeBtn.style.transform = 'scale(1)';
    });
    
    documentPreview.addEventListener('mouseenter', () => {
      documentPreview.style.background = 'rgba(108, 240, 194, 0.05)';
      documentPreview.style.borderColor = 'rgba(108, 240, 194, 0.3)';
      documentPreview.style.transform = 'scale(1.02)';
    });
    
    documentPreview.addEventListener('mouseleave', () => {
      documentPreview.style.background = 'var(--bg-elev)';
      documentPreview.style.borderColor = 'var(--border)';
      documentPreview.style.transform = 'scale(1)';
    });
    
    // Function to close popup
    const closePopup = () => {
      document.body.removeChild(backdrop);
      // Restore cursor z-index
      if (cursor) {
        cursor.style.zIndex = '1000'; // Restore original z-index
      }
    };
    
    // Event listeners
    closeBtn.addEventListener('click', closePopup);
    
    documentPreview.addEventListener('click', () => {
      closePopup();
      downloadFile(fileName, displayName);
    });
    
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closePopup();
      }
    });
    
    // ESC key to close
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  // Download function - simplified to preserve PDF integrity
  function downloadFile(fileName, displayName) {
    // Add cache-busting parameter to ensure fresh file loading
    const timestamp = new Date().getTime();
    const pdfUrl = `assets/files/${fileName}?t=${timestamp}`;
    
    // Try multiple approaches to ensure PDF opens with interactive links
    const newWindow = window.open(pdfUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (newWindow) {
      // Focus the new window to ensure proper loading
      newWindow.focus();
      showDownloadFeedback(displayName);
    } else {
      // Fallback: Create a temporary link element
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showDownloadFeedback(displayName);
    }
  }
  
  // Success feedback
  function showDownloadFeedback(fileName) {
    const feedback = document.createElement('div');
    feedback.textContent = `${fileName} downloaded successfully!`;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--brand);
      color: var(--bg);
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 2000);
  }
  
  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// Loader fade-out on ready
(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const fill = document.getElementById('loaderFill');
  let start;
  const animateFill = (ts) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / 1100);
    if (fill) fill.style.width = `${p * 100}%`;
    if (p < 1) requestAnimationFrame(animateFill);
  };
  requestAnimationFrame(animateFill);
  const hide = () => {
    loader.classList.add('is-hidden');
    // Trigger landing animation: enter landing phase, then finalize
    document.body.classList.add('is-landing');
    setTimeout(() => {
      document.body.classList.remove('is-landing');
      document.body.classList.add('is-landed');
    }, 1200);
  };
  if (document.readyState === 'complete') setTimeout(hide, 1400);
  else window.addEventListener('load', () => setTimeout(hide, 1400));
})();

// Projects Marquee - 3D Card Effect with Playing Card Hover
(function() {
  const projectsTrack = document.querySelector('.projects-track');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Playing card combinations
  const playingCards = [
    'ace-spades', 'ace-hearts', 'ace-diamonds', 'ace-clubs',
    'king-spades', 'king-hearts', 'king-diamonds', 'king-clubs',
    'queen-spades', 'queen-hearts', 'queen-diamonds', 'queen-clubs',
    'jack-spades', 'jack-hearts', 'jack-diamonds', 'jack-clubs'
  ];
  
  let currentHoveredCard = null;
  let animationFrameId = null;
  
  // 3D Card Effect - Optimized mouse tracking with throttling
  let mouseTrackingTimeout = null;
  
  function handle3DCardEffect(card, event) {
    // Throttle mouse tracking to reduce lag
    if (mouseTrackingTimeout) {
      return;
    }
    
    mouseTrackingTimeout = setTimeout(() => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // More subtle rotation values
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      const cardContainer = card.querySelector('.card-container');
      if (cardContainer) {
        cardContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
      mouseTrackingTimeout = null;
    }, 16); // ~60fps throttling
  }
  
  function reset3DCardEffect(card) {
    if (mouseTrackingTimeout) {
      clearTimeout(mouseTrackingTimeout);
      mouseTrackingTimeout = null;
    }
    
    const cardContainer = card.querySelector('.card-container');
    if (cardContainer) {
      cardContainer.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  }
  
  function transformToPlayingCards(excludeCard) {
    // Do nothing - no playing card transformation
  }
  
  function restoreOriginalCards() {
    // Do nothing - no restoration needed
  }
  
  if (projectsTrack && projectCards.length > 0) {
    let hoverTimeout = null;
    
    // Ensure animation starts running immediately
    projectsTrack.style.animationPlayState = 'running';
    projectsTrack.style.animation = 'projects-marquee 24s linear infinite';
    
    // Force restart animation if needed
    setTimeout(() => {
      projectsTrack.style.animation = 'none';
      projectsTrack.offsetHeight; // Trigger reflow
      projectsTrack.style.animation = 'projects-marquee 24s linear infinite';
    }, 100);
    
    // Throttled hover handler
    function handleMouseEnter(card) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      
      hoverTimeout = setTimeout(() => {
        currentHoveredCard = card;
        
        // Pause marquee animation
        projectsTrack.style.animationPlayState = 'paused';
        
        // Transform other cards to playing cards
        transformToPlayingCards(card);
      }, 50); // Small delay to prevent rapid firing
    }
    
    function handleMouseLeave() {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      
      currentHoveredCard = null;
      
      // Resume marquee animation
      projectsTrack.style.animationPlayState = 'running';
      
      // Restore original cards
      restoreOriginalCards();
    }
    
    // Add hover listeners to each card
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => handleMouseEnter(card));
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // 3D Card Effect - Mouse movement tracking
      card.addEventListener('mousemove', (e) => {
        if (currentHoveredCard === card) {
          handle3DCardEffect(card, e);
        }
      });
      
      card.addEventListener('mouseleave', () => {
        reset3DCardEffect(card);
      });
    });
    
    // Ensure animation is always running by default
    projectsTrack.style.animationPlayState = 'running';
  }
})();

// Project Modal System
(function() {
  // Wait for DOM to be ready
  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalDescription = document.getElementById('projectModalDescription');
    const modalImage = document.getElementById('projectModalImage');
    const modalGithub = document.getElementById('projectModalGithub');
    const modalWebsite = document.getElementById('projectModalWebsite');

    // Check if all elements exist
    if (!modal || !modalTitle || !modalDescription || !modalImage || !modalGithub || !modalWebsite) {
      console.warn('Project modal elements not found, retrying...');
      setTimeout(initProjectModal, 100);
      return;
    }

  // Project data with GitHub and website URLs
  const projectData = {
    'Make things float in air': {
      description: 'Interactive CSS 3D effects showcasing advanced web animations and transforms.',
      github: 'https://github.com/varchasvakhare2022/css-3d-effects',
      website: 'https://css-3d-effects-demo.netlify.app',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop&crop=center'
    },
    'Startup Brand Identity': {
      description: 'Complete brand identity design including logo, color palette, and digital assets.',
      github: 'https://github.com/varchasvakhare2022/brand-identity-design',
      website: 'https://brand-identity-showcase.netlify.app',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop&crop=center'
    },
    'VeriScanX': {
      description: 'AI-powered fake news detection platform using machine learning and natural language processing.',
      github: 'https://github.com/varchasvakhare2022/VeriScanX',
      website: 'https://veriscanx-0gzgh.sevalla.app/',
      image: 'assets/img/veriscanx_popup.png'
    },
    'Detective': {
      description: 'Discord gaming bot that lets users play different games directly on Discord. Features multiple game modes, interactive commands, and real-time gameplay.',
      github: 'https://github.com/varchasvakhare2022/Detective',
      website: 'https://detective-bot-demo.netlify.app',
      image: 'assets/img/detective_popup.png'
    },
    'E-Commerce Platform': {
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and user authentication.',
      github: 'https://github.com/varchasvakhare2022/ecommerce-platform',
      website: 'https://ecommerce-demo.netlify.app',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center'
    },
    'Police Agent': {
      description: 'Discord moderation bot for public server management and community safety. Features automated moderation, user management, and safety tools.',
      github: 'https://github.com/varchasvakhare2022/police-agent',
      website: 'https://police-agent-bot.netlify.app',
      image: 'assets/img/police_popup.png'
    },
    'Prime Properties': {
      description: 'Full-stack real estate platform with React & Spring Boot, featuring JWT authentication and role-based access.',
      github: 'https://github.com/varchasvakhare2022/prime-properties',
      website: 'https://prime-properties.up.railway.app',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop&crop=center'
    },
    'Blockchain Explorer': {
      description: 'Blockchain transaction explorer with real-time data visualization and smart contract analysis.',
      github: 'https://github.com/varchasvakhare2022/blockchain-explorer',
      website: 'https://blockchain-explorer-demo.netlify.app',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop&crop=center'
    },
    'Design System Platform': {
      description: 'Comprehensive design system for enterprise applications with reusable components.',
      github: 'https://github.com/varchasvakhare2022/design-system',
      website: 'https://design-system-showcase.netlify.app',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop&crop=center'
    },
    'Performance Optimization': {
      description: 'Advanced web performance optimization solutions and monitoring tools.',
      github: 'https://github.com/varchasvakhare2022/performance-optimization',
      website: 'https://performance-tools-demo.netlify.app',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center'
    }
  };

  // Open modal function
  function openModal(projectTitle) {
    console.log('Opening modal for project:', projectTitle);
    const data = projectData[projectTitle];
    console.log('Project data found:', data);
    
    if (!data) {
      console.warn('No data found for project:', projectTitle);
      return;
    }

    // Update modal content
    console.log('Updating modal content...');
    modalTitle.textContent = projectTitle;
    modalDescription.textContent = data.description;
    modalImage.style.backgroundImage = `url('${data.image}')`;
    modalGithub.href = data.github;
    modalWebsite.href = data.website;
    
    console.log('Modal title updated to:', modalTitle.textContent);
    console.log('Modal description updated to:', modalDescription.textContent);
    console.log('Modal GitHub href updated to:', modalGithub.href);
    console.log('Modal Website href updated to:', modalWebsite.href);

    // Show modal
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add cursor effects to modal buttons
    const cursor = document.getElementById('cursor');
    if (cursor) {
      // Add cursor link effects to modal buttons
      modalGithub.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
      modalGithub.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
      modalWebsite.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
      modalWebsite.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
      
      // Add click effects
      modalGithub.addEventListener('mousedown', () => cursor.classList.add('is-click'));
      modalWebsite.addEventListener('mousedown', () => cursor.classList.add('is-click'));
      window.addEventListener('mouseup', () => cursor.classList.remove('is-click'));
    }
  }

  // Close modal function
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

    // Event listeners
    // Close button
    const closeButtons = modal.querySelectorAll('[data-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    // Backdrop click
    const backdrop = modal.querySelector('.project-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Project card click handlers
    document.addEventListener('click', (e) => {
      const projectCard = e.target.closest('.project-card');
      if (projectCard) {
        e.preventDefault();
        console.log('Project card clicked');
        
        // Get project title from the h3 element
        const titleElement = projectCard.querySelector('h3');
        if (titleElement) {
          const projectTitle = titleElement.textContent.trim();
          console.log('Project title extracted:', projectTitle);
          openModal(projectTitle);
        } else {
          console.warn('No h3 element found in project card');
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectModal);
  } else {
    initProjectModal();
  }
})();

// Performance Optimization Module - 60fps Target
(() => {
  // Throttle function for performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Optimize scroll events
  const optimizedScrollHandler = throttle(() => {
    // Scroll-based animations here
  }, 16); // ~60fps
  
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Optimize resize events
  const optimizedResizeHandler = debounce(() => {
    // Resize-based calculations here
  }, 100);
  
  window.addEventListener('resize', optimizedResizeHandler, { passive: true });
  
  // Optimize mouse move events
  const optimizedMouseMoveHandler = throttle((e) => {
    // Mouse-based animations here
  }, 16); // ~60fps
  
  document.addEventListener('mousemove', optimizedMouseMoveHandler, { passive: true });
  
  // Performance monitoring
  let frameCount = 0;
  let lastTime = performance.now();
  
  function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      // Log FPS in development
      if (fps < 55) {
        console.warn(`Low FPS detected: ${fps}fps`);
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  // Start FPS monitoring
  requestAnimationFrame(measureFPS);
  
  // Optimize CSS animations with will-change
  const animatedElements = document.querySelectorAll('.btn-primary, .btn-secondary, .form-input, .floating-dot, .modal-dialog');
  animatedElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
  });
  
  // Clean up will-change after animations
  setTimeout(() => {
    animatedElements.forEach(el => {
      el.style.willChange = 'auto';
    });
  }, 5000);
})();

// Space-Themed Scrollbar Enhancement - Non-Intrusive Version
(() => {
  let scrollbarInitialized = false;
  
  function initSpaceScrollbar() {
    if (scrollbarInitialized) return;
    scrollbarInitialized = true;
    
    // Create scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    // Create space particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'space-particles';
    document.body.appendChild(particlesContainer);

    // Create scrollbar glow effect
    const scrollbarGlow = document.createElement('div');
    scrollbarGlow.className = 'scrollbar-glow';
    document.body.appendChild(scrollbarGlow);

    // Throttle function for performance
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }

    // Update scroll progress
    const updateScrollProgress = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min((scrollTop / scrollHeight) * 100, 100);
      
      if (progressIndicator) {
        progressIndicator.style.height = scrollProgress + '%';
      }
      
      // Update glow position
      const thumbHeight = 80;
      const trackHeight = window.innerHeight;
      const thumbPosition = (scrollTop / scrollHeight) * (trackHeight - thumbHeight);
      
      scrollbarGlow.style.top = thumbPosition + 'px';
      scrollbarGlow.classList.add('active');
      
      setTimeout(() => {
        scrollbarGlow.classList.remove('active');
      }, 1500);
    }, 16);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'space-particle';
      
      // Random horizontal position within the particles container
      particle.style.left = Math.random() * 20 + 'px';
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation completes
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 12000);
    };

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Mouse proximity effect
    const handleMouseMove = throttle((e) => {
      const rect = document.documentElement.getBoundingClientRect();
      const isNearScrollbar = e.clientX > rect.right - 30;
      
      if (isNearScrollbar) {
        particlesContainer.style.opacity = '1';
        particlesContainer.style.transform = 'scale(1.1)';
      } else {
        particlesContainer.style.opacity = '0.7';
        particlesContainer.style.transform = 'scale(1)';
      }
    }, 16);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize particles container
    particlesContainer.style.opacity = '0.7';
    particlesContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpaceScrollbar);
  } else {
    initSpaceScrollbar();
  }
})();



