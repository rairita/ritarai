/**
 * RITA RAI — LUXURY SPIRITUAL PORTFOLIO & SANCTUARY
 * Interactive Engine & Experience Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initHeroParticles();
  initAudioSanctuary();
  initBreathworkExperience();
  initDailyInspirations();
  initWisdomTabs();
  initModalityModal();
  initContactForm();
  initNewsletterForm();
  initScrollAnimations();
  initBackToTop();

  // URL scroll helper for direct section viewing & headless captures
  const urlParams = new URLSearchParams(window.location.search);
  const targetSection = urlParams.get('scroll');
  if (targetSection) {
    const el = document.getElementById(targetSection);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'instant' });
        document.querySelectorAll('.fade-in-element').forEach(item => item.classList.add('is-visible'));
      }, 100);
    }
  }
});

/* ==========================================================================
   1. STICKY HEADER & ACTIVE NAVIGATION SPY
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  const toggle = () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navLinks.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggle);

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggle();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggle();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggle();
    }
  });
}

/* ==========================================================================
   3. ETHEREAL GOLDEN LIGHT PARTICLES (CANVAS)
   ========================================================================== */
function initHeroParticles() {
  const canvas = document.getElementById('heroParticlesCanvas');
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;

  const resize = () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.8 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.45 + 0.15;
      this.maxAlpha = this.alpha;
      this.decay = Math.random() * 0.003 + 0.001;
      this.goldHue = Math.random() > 0.3 ? '197, 160, 89' : '232, 200, 193'; // gold & soft blush
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.alpha -= this.decay;

      if (this.alpha <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.goldHue}, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${this.goldHue}, 0.8)`;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrame;
  let isVisible = true;

  const heroSection = document.getElementById('home');
  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrame) {
        animate();
      }
    }, { threshold: 0.1 });
    observer.observe(heroSection);
  }

  function animate() {
    if (!isVisible) {
      animationFrame = null;
      return;
    }
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. WEB AUDIO API SACRED SOUNDSCAPE & TIBETAN CHIME
   Pure mathematical synthesis — zero external mp3 files needed!
   ========================================================================== */
function initAudioSanctuary() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let droneGain = null;
  let droneOscillators = [];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play a resonant Himalayan Singing Bowl Chime (432Hz fundamental)
  window.playSingingBowlChime = function(fundamental = 432) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Harmonics for a Tibetan Singing Bowl
      const harmonics = [
        { freq: fundamental, gain: 0.35, decay: 6.0 },
        { freq: fundamental * 2.76, gain: 0.22, decay: 4.8 },
        { freq: fundamental * 5.4, gain: 0.12, decay: 3.5 },
        { freq: fundamental * 8.1, gain: 0.05, decay: 2.2 }
      ];

      harmonics.forEach(h => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(h.freq, now);

        // Gentle strike envelope with exponential decay
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.linearRampToValueAtTime(h.gain, now + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + h.decay);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + h.decay);
      });
    } catch (e) {
      console.warn('Audio note could not be played:', e);
    }
  };

  // Ambient Drone (Om meditation resonance)
  function startDrone() {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.0001, now);
    droneGain.gain.linearRampToValueAtTime(0.12, now + 3);

    // Warm low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);

    // 432 Hz Solfeggio / Root harmonic layers
    const pitches = [108, 216, 432, 648];

    pitches.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      osc.connect(droneGain);
      osc.start(now);
      droneOscillators.push(osc);
    });

    droneGain.connect(filter);
    filter.connect(ctx.destination);
  }

  function stopDrone() {
    if (droneGain && audioCtx) {
      const now = audioCtx.currentTime;
      droneGain.gain.linearRampToValueAtTime(0.00001, now + 2);
      setTimeout(() => {
        droneOscillators.forEach(osc => {
          try { osc.stop(); } catch(e){}
        });
        droneOscillators = [];
      }, 2100);
    }
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      getAudioContext();
      startDrone();
      window.playSingingBowlChime(432);
      isPlaying = true;
      toggleBtn.classList.add('playing');
      toggleBtn.querySelector('.sound-btn-text').textContent = 'Sanctuary Chime: On';
    } else {
      stopDrone();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      toggleBtn.querySelector('.sound-btn-text').textContent = 'Soundscape';
    }
  });
}

/* ==========================================================================
   5. GUIDED BREATHWORK EXPERIENCE (BOX BREATHING)
   ========================================================================== */
function initBreathworkExperience() {
  const breathCore = document.getElementById('breathCore');
  const actionText = document.getElementById('breathActionText');
  const timerCount = document.getElementById('breathTimerCount');
  const toggleBtn = document.getElementById('breathToggleBtn');
  const chimeToggle = document.getElementById('breathChimeCheck');
  const stepPills = document.querySelectorAll('.breath-step-pill');

  if (!breathCore || !actionText || !timerCount || !toggleBtn) return;

  const phases = [
    { name: 'Inhale', text: 'Breathe In', duration: 4, class: 'inhale', chimeFreq: 432 },
    { name: 'Hold', text: 'Hold Gently', duration: 4, class: 'hold', chimeFreq: 528 },
    { name: 'Exhale', text: 'Breathe Out', duration: 4, class: 'exhale', chimeFreq: 396 },
    { name: 'Rest', text: 'Rest in Stillness', duration: 4, class: 'rest', chimeFreq: 432 }
  ];

  let currentPhaseIndex = 0;
  let secondsRemaining = phases[0].duration;
  let intervalId = null;
  let isRunning = false;

  function updateVisuals() {
    const phase = phases[currentPhaseIndex];
    actionText.textContent = phase.text;
    timerCount.textContent = `${secondsRemaining}s`;

    // Classes
    breathCore.classList.remove('inhale', 'hold', 'exhale', 'rest');
    breathCore.classList.add(phase.class);

    // Step pill highlight
    stepPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentPhaseIndex);
    });
  }

  function tick() {
    secondsRemaining--;

    if (secondsRemaining <= 0) {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      secondsRemaining = phases[currentPhaseIndex].duration;

      // Play soft chime if checked
      if (chimeToggle && chimeToggle.checked && window.playSingingBowlChime) {
        window.playSingingBowlChime(phases[currentPhaseIndex].chimeFreq);
      }
    }

    updateVisuals();
  }

  function start() {
    isRunning = true;
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
      Pause Breathwork
    `;
    toggleBtn.classList.remove('btn-gold');
    toggleBtn.classList.add('btn-outline');

    if (chimeToggle && chimeToggle.checked && window.playSingingBowlChime) {
      window.playSingingBowlChime(432);
    }

    updateVisuals();
    intervalId = setInterval(tick, 1000);
  }

  function pause() {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      Begin Breathwork
    `;
    toggleBtn.classList.add('btn-gold');
    toggleBtn.classList.remove('btn-outline');
    actionText.textContent = 'Be Still';
    timerCount.textContent = '4s';
    breathCore.classList.remove('inhale', 'hold', 'exhale', 'rest');
  }

  toggleBtn.addEventListener('click', () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  });
}

/* ==========================================================================
   6. DAILY INSPIRATION ROTATOR (INTERACTIVE QUOTES)
   ========================================================================== */
const dailyInspirationsList = [
  {
    quote: "Peace begins when we return to ourselves.",
    author: "Rita Rai",
    category: "Inner Peace"
  },
  {
    quote: "Love is not something we seek outside; it is something we awaken within.",
    author: "Rita Rai",
    category: "Love"
  },
  {
    quote: "Be still, abide in truth, and allow life to unfold.",
    author: "Rita Rai",
    category: "Truth"
  },
  {
    quote: "Silence is not the absence of sound, but the presence of your deepest nature.",
    author: "Rita Rai",
    category: "Stillness"
  },
  {
    quote: "When you touch the present moment deeply, you touch eternity.",
    author: "Rita Rai",
    category: "Mindfulness"
  },
  {
    quote: "Your heart already knows the truth; meditation is simply listening to its song.",
    author: "Rita Rai",
    category: "Self-Discovery"
  },
  {
    quote: "The quietest lake reflects the clearest sky. Calm your mind, and you will see your own radiance.",
    author: "Rita Rai",
    category: "Inner Clarity"
  },
  {
    quote: "Bliss is not a destination to reach. It is the very fabric of your inner truth and peace.",
    author: "Rita Rai",
    category: "Bliss & Awakening"
  }
];

function initDailyInspirations() {
  const quoteEl = document.getElementById('dailyQuoteText');
  const authorEl = document.getElementById('dailyQuoteAuthor');
  const nextBtn = document.getElementById('nextInspirationBtn');
  const copyBtn = document.getElementById('copyInspirationBtn');
  const toast = document.getElementById('toastNotice');

  if (!quoteEl || !authorEl || !nextBtn) return;

  let currentIndex = 0;

  function renderQuote(index, animated = true) {
    const item = dailyInspirationsList[index];

    if (animated) {
      quoteEl.style.opacity = '0';
      quoteEl.style.transform = 'translateY(10px)';
      authorEl.style.opacity = '0';

      setTimeout(() => {
        quoteEl.textContent = `“${item.quote}”`;
        authorEl.textContent = `— ${item.author} · ${item.category}`;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
        authorEl.style.opacity = '1';
      }, 300);
    } else {
      quoteEl.textContent = `“${item.quote}”`;
      authorEl.textContent = `— ${item.author} · ${item.category}`;
    }
  }

  // Initial render
  renderQuote(0, false);

  nextBtn.addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * dailyInspirationsList.length);
    } while (nextIndex === currentIndex && dailyInspirationsList.length > 1);

    currentIndex = nextIndex;
    renderQuote(currentIndex, true);

    if (window.playSingingBowlChime) {
      window.playSingingBowlChime(528);
    }
  });

  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const current = dailyInspirationsList[currentIndex];
      const textToCopy = `“${current.quote}” — ${current.author}`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      }).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
    });
  }
}

/* ==========================================================================
   7. PHILOSOPHY & WISDOM TABS FILTER
   ========================================================================== */
function initWisdomTabs() {
  const tabBtns = document.querySelectorAll('.philosophy-tab-btn');
  const wisdomCards = document.querySelectorAll('.wisdom-card');

  if (!tabBtns.length || !wisdomCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      wisdomCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. SPIRITUAL MODALITY & COUNSELLING DETAIL MODAL
   ========================================================================== */
const modalityDetails = {
  'inner-truth': {
    title: 'Inner Truth & Self-Discovery',
    eyebrow: 'Spiritual Counselling Modality',
    quote: 'Beyond the surface identity lies the timeless truth of who you are.',
    description: 'Inner truth is the gentle turning of attention back toward the source of consciousness itself. Rather than being swept away by reactive thoughts and external demands, this guidance invites you to recognize the quiet truth within you.',
    pillars: [
      'Uncovering the patterns and conditionings that cloud your natural truth and clarity.',
      'Developing deep observational presence of truth without harsh self-judgment.',
      'Recognizing your true nature rooted in Truth, Love, Bliss, Peace, and Spiritual Awakening.'
    ],
    invitation: 'Step into a safe, compassionate sanctuary where you are heard completely and guided back to your innate truth.'
  },
  'emotional-clarity': {
    title: 'Emotional Clarity & Inner Peace',
    eyebrow: 'Heart-Centered Guidance',
    quote: 'Emotions are sacred visitors; we greet them with compassion, not resistance.',
    description: 'When emotions become heavy or overwhelming, our natural instinct is often to suppress, distract, or battle with them. In our sessions, we cultivate the courage to hold emotional turbulence in the warmth of spacious truth and loving peace.',
    pillars: [
      'Transforming anxiety, grief, and restlessness into grounded peace.',
      'Somatic release through conscious breath and heart-centered truth.',
      'Restoring a serene inner sanctuary that remains unshakable amidst life’s tides.'
    ],
    invitation: 'Experience the freedom that comes when you stop resisting life and allow stillness to gently heal the heart.'
  },
  'spiritual-awakening': {
    title: 'Spiritual Awakening & Conscious Living',
    eyebrow: 'The Path of Realization',
    quote: 'Awakening is not becoming something new; it is remembering who you have always been.',
    description: 'Spiritual awakening can feel deeply illuminating, yet at times disorienting. As old paradigms dissolve, you may seek a grounded guide who understands the subtle shifts in perception, values, and sense of self.',
    pillars: [
      'Navigating the shifts of identity with grace, patience, and stability.',
      'Integrating profound spiritual insights into your practical everyday life.',
      'Connecting with the universal source of divine love, bliss, and unity.'
    ],
    invitation: 'Walk this sacred threshold with loving companionship, grounded wisdom, and steady spiritual orientation.'
  },
  'self-love': {
    title: 'Self-Love & Radical Acceptance',
    eyebrow: 'Sacred Compassion',
    quote: 'Love begins at home, in the center of your own breathing chest.',
    description: 'Self-love is not egoic indulgence; it is the sacred recognition that your existence is inherently worthy of kindness, tenderness, and grace. We dissolve the inner critic and nourish your relationship with yourself.',
    pillars: [
      'Softening the harsh internal dialogue of perfectionism and unworthiness.',
      'Embracing both your shadows and your luminous gifts with equal tenderness.',
      'Cultivating boundaries born out of profound self-respect and peaceful strength.'
    ],
    invitation: 'Reclaim your birthright of warmth and discover the joy of being wholly at peace in your own skin.'
  },
  'mindfulness': {
    title: 'Mindfulness & Conscious Living',
    eyebrow: 'Daily Living as Meditation',
    quote: 'Every breath, every cup of tea, every step can become an act of reverence.',
    description: 'True mindfulness extends far beyond the meditation cushion into the rhythm of your workday, your relationships, and your solitary moments. Learn to transform everyday routines into portals of deep presence.',
    pillars: [
      'Practical micro-practices to reset and center yourself throughout the day.',
      'Mindful communication rooted in deep listening and authentic presence.',
      'Living with intentionality, gratitude, and effortless simplicity.'
    ],
    invitation: 'Infuse your everyday existence with radiant truth and the subtle bliss of being fully awake.'
  }
};
modalityDetails['inner-awareness'] = modalityDetails['inner-truth'];

function initModalityModal() {
  const modalOverlay = document.getElementById('modalityModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalTitle = document.getElementById('modalTitle');
  const modalQuote = document.getElementById('modalQuote');
  const modalDesc = document.getElementById('modalDesc');
  const modalPillars = document.getElementById('modalPillars');
  const modalInvitation = document.getElementById('modalInvitation');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  if (!modalOverlay || !modalCloseBtn) return;

  function openModal(key) {
    const data = modalityDetails[key];
    if (!data) return;

    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalQuote.textContent = `“${data.quote}”`;
    modalDesc.textContent = data.description;

    modalPillars.innerHTML = '';
    data.pillars.forEach(p => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.6rem';
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '0.6rem';
      li.innerHTML = `
        <span style="color: var(--color-gold); font-size: 1.1rem; line-height: 1.4;">✦</span>
        <span>${p}</span>
      `;
      modalPillars.appendChild(li);
    });

    modalInvitation.textContent = data.invitation;

    modalInquireBtn.onclick = () => {
      closeModal();
      const subjectSelect = document.getElementById('formSubject');
      if (subjectSelect) {
        subjectSelect.value = key;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.playSingingBowlChime) {
      window.playSingingBowlChime(432);
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind to cards and links
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-open-modal');
      openModal(key);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. CONTACT FORM WITH FUNCTIONAL VALIDATION & CONFIRMATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('sacredContactForm');
  const successBox = document.getElementById('formSuccessBox');
  const resetBtn = document.getElementById('formResetBtn');

  if (!form) return;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const setGroupError = (inputId, hasError) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    const group = input.closest('.form-group');
    if (group) {
      group.classList.toggle('has-error', hasError);
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    let isValid = true;

    if (!name) {
      setGroupError('formName', true);
      isValid = false;
    } else {
      setGroupError('formName', false);
    }

    if (!email || !validateEmail(email)) {
      setGroupError('formEmail', true);
      isValid = false;
    } else {
      setGroupError('formEmail', false);
    }

    if (!message || message.length < 10) {
      setGroupError('formMessage', true);
      isValid = false;
    } else {
      setGroupError('formMessage', false);
    }

    if (isValid) {
      // Simulate sacred submission
      form.style.display = 'none';
      if (successBox) {
        successBox.classList.add('show');
      }

      if (window.playSingingBowlChime) {
        window.playSingingBowlChime(528);
      }
    }
  });

  if (resetBtn && successBox) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      successBox.classList.remove('show');
    });
  }

  // Clear errors on input
  ['formName', 'formEmail', 'formMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => setGroupError(id, false));
    }
  });
}

/* ==========================================================================
   10. NEWSLETTER / REFLECTIONS FORM
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const toast = document.getElementById('toastNotice');

    if (input && input.value.includes('@')) {
      if (toast) {
        const originalText = toast.textContent;
        toast.textContent = 'Blessings. You are now subscribed to sacred reflections.';
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
          toast.textContent = originalText;
        }, 3600);
      }
      input.value = '';
      if (window.playSingingBowlChime) {
        window.playSingingBowlChime(432);
      }
    }
  });
}

/* ==========================================================================
   11. SCROLL FADE-IN ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  document.body.classList.add('js-enabled');
  const elements = document.querySelectorAll('.fade-in-element');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '120px 0px 50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

/* ==========================================================================
   12. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
