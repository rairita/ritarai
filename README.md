# Rita Rai — Luxury Spiritual Portfolio & Sanctuary Website

A luxury, aesthetic, responsive personal portfolio website for **Rita Rai**, Spiritual Counsellor and Meditation Guide.

The website communicates **Truth**, **Love**, **Bliss**, **Peace**, and **Spiritual Awakening**.

---

## 🌟 Visual Identity & Design Direction

- **Atmosphere**: A digital spiritual sanctuary inspired by Himalayan sunrise landscapes, ethereal light, sacred lotus blossoms, and quiet contemplation.
- **Palette**:
  - **Warm Ivory** (`#FAF7F2`) & **Soft Cream** (`#FDFBF7`)
  - **Champagne & Antique Gold** (`#C5A059`, `#E0CFA7`, gradient)
  - **Muted Sage Green** (`#6D7F67`, `#44543F`)
  - **Subtle Blush Pink** (`#E8C8C1`, `#FAF2F0`)
  - **Deep Earth Charcoal Brown** for typography (`#2C2621`, `#5C554E`)
- **Typography**:
  - Headings: `Cormorant Garamond` & `Playfair Display`
  - Body & UI: `Plus Jakarta Sans` / `Inter`
  - Accents: `Pinyon Script`
- **Sacred Symbolism**: Custom geometric lotus emblems, delicate gold ornamental dividers, and aura indicators.

---

## 🏛️ Website Sections & Architecture

1. **Header & Sticky Navigation**:
   - Sacred lotus emblem with wordmark "Rita Rai — Connecting With Love".
   - Links: Home, About, Spiritual Counselling, Meditation, Inspirations, Contact.
   - Built-in **Tibetan Singing Bowl Soundscape Toggle** (synthesized in real-time via Web Audio API, 0 external mp3 dependencies).
   - "Begin Your Journey" quick CTA.
   - Mobile responsive slide-in drawer menu.

2. **Hero Section ("The Digital Sanctuary")**:
   - Ultra-high resolution photograph of the realistic Nepali Himalayas at vivid golden dawn (Machapuchare / Fishtail, Annapurna massif, and deep rolling emerald-green mist-filled foothills).
   - Golden dust motes particle canvas simulating sacred sunlight.
   - **Living Sacred Aura & Brand Crest**: Gentle breathing golden halo, celestial orbital ring, and sacred lotus crown emblem.
   - Headline: *"Rita Rai"* styled with champagne-gold sunrise gradient typography, high-editorial tracking, and a tapered gold star divider.
   - Role badge directly below: *"Spiritual Counsellor & Meditation Guide"*.
   - Tagline: *"Awaken to the Beauty Within."*
   - Supporting text: *"A sacred journey devoted to Truth, Love, Bliss, Peace, and Spiritual Awakening."*
   - CTAs: *"Explore My Journey"* & *"Begin Your Inner Journey"*.
   - **Sanctuary Micro-Pills**: Ethereal frosted glass path indicators (*Inner Stillness · Heart Awakening · Conscious Living*).
   - Animated scroll indicator.

3. **Sacred Aura Bar**:
   - Subtle intention ticker: *Truth ✦ Love ✦ Bliss ✦ Peace ✦ Spiritual Awakening*.

4. **About Me ("A Journey Within")**:
   - Authentic portrait of Rita Rai framed with an editorial arch, gold trim, and floating sanctuary badge.
   - Personal philosophy and exact introductory narrative rooted in Truth, Love, Bliss, Peace, and Spiritual Awakening.
   - 4 Guiding Pillars: *Presence of Truth*, *Heart of Love*, *Bliss & Peace*, *Spiritual Awakening*.

5. **Spiritual Counselling ("Guidance for the Soul")**:
   - 5 beautifully designed offering cards:
     1. Inner Truth & Self-Discovery
     2. Emotional Clarity & Inner Peace
     3. Spiritual Awakening
     4. Self-Love & Acceptance
     5. Mindfulness & Conscious Living
   - Interactive modal viewer with core practice pillars and auto-filling inquiry button.
   - Ethical wellness disclaimer (non-medical, spiritual guidance disclosure).

6. **Meditation & Mindfulness ("Return to Stillness")**:
   - **Interactive Guided Breathwork Sphere**: Real-time 4-4-4-4 Box Breathing visualizer (Inhale, Hold, Exhale, Rest) with Tibetan singing bowl chime sound effect.
   - 5 visual practice cards with curated serene photography:
     1. Guided Meditation
     2. Mindfulness Practices
     3. Breath & Inner Truth (Pranayama)
     4. Inner Stillness
     5. Daily Meditation Inspiration

7. **Philosophy & Inspirations ("Wisdom for the Soul")**:
   - Curated timeless teachings on Truth, Love, Bliss, Peace, and Spiritual Awakening.
   - Verified quotations with attributions: Sri Ramana Maharshi, Jalāl al-Dīn Rūmī, Lao Tzu, Sri Nisargadatta Maharaj, Sri Anandamayi Ma, and Rita Rai.
   - Interactive theme filter tabs (All, Love, Peace Within, Truth & Awakening, Sages).

8. **Daily Inspiration (Interactive Rotator)**:
   - Dynamic quote rotator with reflections on Truth, Love, Bliss, Peace, and Spiritual Awakening.
   - *"Discover Another Inspiration"* rotator with soft ethereal fade.
   - *"Copy Sacred Reflection"* with instant toast notification.

9. **Sacred Reflections Journal**:
   - Weekly newsletter contemplation signup with email validation and serene feedback.

10. **Contact Section ("Let's Connect")**:
    - Contact channels: Email (`mysticrita3@gmail.com`), WhatsApp (`9841945133`), YouTube (`@RitaPosts`), Facebook (`@RitaPosts`), and Google Blogger (`ritaposts.blogspot.com`).
    - Functional contact form with client-side validation and confirmation view.
    - Path of Interest selector mapped to counselling modalities.

11. **Footer**:
    - Complete luxury footer with brand statement, navigation anchors, session hours, and copyright.

---

## 💻 Tech Stack & Performance

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3**: Pure custom design system using CSS custom properties (tokens), responsive Flexbox & Grid, frosted glassmorphism (`backdrop-filter`), keyframes, and reduced-motion media query support.
- **Vanilla JavaScript**: Pure zero-dependency script handling active scrollspy, interactive breathwork sphere, Web Audio API soundscape, daily quote rotator, filter tabs, modal dialogs, and form validation.
- **Audio**: Web Audio API pure mathematical synthesis (432 Hz Solfeggio frequency + Tibetan bowl harmonic overtones) — no audio files to buffer or fail to load.
- **SEO & Accessibility**: Complete Open Graph metadata, Twitter card, Schema.org Person JSON-LD, ARIA roles, and high contrast text ratios.

---

## 🚀 How to Run Locally

Open a terminal in this directory and start any local static server:

```bash
# Using Python 3 (built-in on macOS)
python3 -m http.server 8000
```

Then visit:
```
http://localhost:8000/
```

Or simply open `index.html` directly in any web browser!

---

## 📁 Directory Structure

```
rita-rai-website/
├── index.html                  # Master sanctuary HTML document
├── README.md                   # Documentation & setup guide
├── assets/
│   ├── css/
│   │   └── styles.css          # Master luxury stylesheet & tokens
│   ├── js/
│   │   └── main.js             # Interactive engine & soundscape
│   └── images/                 # Optimized photographic & portrait assets
│       ├── rita-portrait-main.jpg
│       ├── rita-portrait-serene.png
│       ├── rita-portrait-seated.png
│       ├── hero-sunrise.jpg
│       ├── meditation-lake.jpg
│       ├── forest-sunbeams.jpg
│       ├── still-water.jpg
│       ├── zen-stones.jpg
│       └── candle-peace.jpg
```

---

*“Awaken to the Beauty Within.”* — Rita Rai
