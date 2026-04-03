<template>
  <div class="rogrgb-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-badges">
          <span class="badge">Android App · Java · Root Required</span>
        </div>
        <h1 class="hero-title">Asus ROG Phone 2 RGB</h1>
        <p class="hero-sub">
          Full control over both the logo LED and the second LED on the Asus ROG Phone 2 and 3. 15 built-in animations, per-app notification colours, battery charge gradients, notification snooze, and Android 11 Smart Home device controls — none of which exist in the stock Asus app.
        </p>
        <div class="req-chips">
          <span class="chip">Asus ROG Phone 2 or 3</span>
          <span class="chip">Android 10 · 11 · 12</span>
          <span class="chip">Root required</span>
        </div>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://play.google.com/store/apps/details?id=terminal_heat_sink.asusrogphone2rgb" target="_blank" rel="noopener" class="btn btn-secondary">
            Play Store ↗
          </a>
          <a href="https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB/releases" target="_blank" rel="noopener" class="btn btn-secondary">
            Releases ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Feature highlights</p>
        <h2 class="section-title">More than the stock app</h2>
        <p class="section-sub">
          The built-in Asus app covers the basics. This app adds everything else — over six releases worth of capabilities built from scratch on top of the LED driver directly.
        </p>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── ANIMATIONS ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Built-in animations</p>
        <h2 class="section-title">15 animation modes</h2>
        <p class="section-sub">Select any animation from the Animations tab. Colour-wheel-compatible modes let you dial in an exact hue. Rainbow modes cycle through the full spectrum automatically.</p>
        <div class="animations-grid">
          <div v-for="a in animations" :key="a.id" class="anim-row reveal">
            <span class="anim-id">{{ a.id }}</span>
            <span class="anim-name">{{ a.name }}</span>
            <span v-if="a.colourWheel" class="anim-tag">Colour wheel</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SETUP ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Setup</p>
        <h2 class="section-title">Install in four steps</h2>
        <p class="section-sub">No special tools required beyond a rooted phone. If upgrading, use the Save/Restore feature first so your per-app settings are not lost.</p>
        <div class="steps-list">
          <div v-for="step in setupSteps" :key="step.num" class="step-row reveal">
            <div class="step-num-badge">{{ step.num }}</div>
            <div class="step-content">
              <p class="step-desc" v-html="step.desc"></p>
            </div>
          </div>
        </div>
        <div class="warning-box reveal">
          <strong>Stock ROM note:</strong> If you have the stock Asus LED app active, disable all its effects before using this app. Both apps write to the same LED driver simultaneously and produce unexpected results.
        </div>
      </div>
    </section>

    <!-- ─── VIDEOS ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Videos</p>
        <h2 class="section-title">Video guides</h2>
        <div class="videos-grid">
          <a v-for="v in videos" :key="v.id" :href="v.url" target="_blank" rel="noopener" class="video-card">
            <div class="video-thumb">
              <img :src="`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`" :alt="v.title" loading="lazy" />
              <div class="video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </div>
            </div>
            <p class="video-title">{{ v.title }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── SCREENSHOTS ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Screenshots</p>
        <h2 class="section-title">App in action</h2>
        <div class="screenshots-grid">
          <div v-for="(shot, i) in screenshots" :key="i" class="shot-item reveal" @click="openLightbox(i)">
            <img :src="shot.src" :alt="shot.alt" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIGHTBOX ─────────────────────────────────────────────── -->
    <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">✕</button>
      <button class="lightbox-prev" @click="lightboxPrev" aria-label="Previous">‹</button>
      <img :src="screenshots[lightboxIndex].src" :alt="screenshots[lightboxIndex].alt" class="lightbox-img" />
      <button class="lightbox-next" @click="lightboxNext" aria-label="Next">›</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = 'https://raw.githubusercontent.com/ArtiomSu/Asus-ROG-Phone-2-RGB/master/.screenshots'

const lightboxIndex = ref(null)

const screenshots = [
  { src: `${BASE}/0.png`,  alt: 'App screenshot 0' },
  { src: `${BASE}/1.png`,  alt: 'App screenshot 1' },
  { src: `${BASE}/2.png`,  alt: 'App screenshot 2' },
  { src: `${BASE}/4.png`,  alt: 'App screenshot 4' },
  { src: `${BASE}/5.png`,  alt: 'App screenshot 5' },
  { src: `${BASE}/6.png`,  alt: 'App screenshot 6' },
  { src: `${BASE}/7.png`,  alt: 'App screenshot 7' },
  { src: `${BASE}/8.png`,  alt: 'App screenshot 8' },
  { src: `${BASE}/10.png`, alt: 'App screenshot 10' },
  { src: `${BASE}/11.jpg`, alt: 'App screenshot 11' },
  { src: `${BASE}/12.jpg`, alt: 'App screenshot 12' },
  { src: `${BASE}/13.jpg`, alt: 'App screenshot 13' },
  { src: `${BASE}/14.jpg`, alt: 'App screenshot 14' },
  { src: `${BASE}/15.jpg`, alt: 'App screenshot 15' },
  { src: `${BASE}/16.jpg`, alt: 'App screenshot 16' },
  { src: `${BASE}/17.png`, alt: 'App screenshot 17' },
  { src: `${BASE}/18.png`, alt: 'App screenshot 18' },
  { src: `${BASE}/19.png`, alt: 'App screenshot 19' },
]

function openLightbox(i) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + screenshots.length) % screenshots.length }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % screenshots.length }

function onKeydown(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

const features = [
  {
    icon: '🎨',
    title: 'Per-app colours & animations',
    desc: 'Assign a unique animation and colour to each app. Telegram blinks blue, YouTube breathes red — fine-grained control over every notification source.',
  },
  {
    icon: '🔔',
    title: 'Notification reactions',
    desc: 'The logo and/or second LED reacts when any selected app sends a notification. Clears automatically when you dismiss the notification from the status bar.',
  },
  {
    icon: '⏱️',
    title: 'Notification timeout',
    desc: 'Set a maximum time (20 seconds to 9+ hours) before the LEDs stop regardless of whether the notification was cleared — ideal for overnight peace.',
  },
  {
    icon: '🌙',
    title: 'Notification snooze',
    desc: 'Schedule a quiet window (e.g. 23:00–07:00) where the notification service is suspended entirely. Also releases the ROG 3 wakelock during the window.',
  },
  {
    icon: '🔋',
    title: 'Battery animations',
    desc: 'LED colour tracks battery percentage — 0% is red, 100% is green, everything in between is a smooth hue gradient. Updates every ~5 seconds.',
  },
  {
    icon: '🏠',
    title: 'Smart Home Device Controls',
    desc: 'Android 11 power-menu shortcuts (Android 12: quick settings) to toggle LED animations, notifications, and the second LED without opening the app.',
  },
  {
    icon: '💡',
    title: 'Second LED control',
    desc: 'The rear secondary LED (normally reserved for the AeroActive Cooler case) is fully controllable — independently or synced with the logo for notifications.',
  },
  {
    icon: '💾',
    title: 'Save & restore settings',
    desc: 'Export all per-app customisations to SD card and import them after a reinstall or ROM change. Uses root access to copy the shared preferences file directly.',
  },
  {
    icon: '🔲',
    title: 'Quick tiles',
    desc: 'Quick Settings tiles for the logo LED, second LED, and notification service so you can toggle everything from the notification shade.',
  },
]

const animations = [
  { id: 0,  name: 'Off',                    colourWheel: false },
  { id: 1,  name: 'Solid one colour',       colourWheel: true },
  { id: 2,  name: 'Breathing one colour',   colourWheel: true },
  { id: 3,  name: 'Blink',                  colourWheel: true },
  { id: 4,  name: 'Rainbow',                colourWheel: false },
  { id: 5,  name: 'Another rainbow',        colourWheel: false },
  { id: 6,  name: 'Rainbow breathe',        colourWheel: false },
  { id: 7,  name: 'Thunder',                colourWheel: true },
  { id: 8,  name: 'Thunder rainbow',        colourWheel: false },
  { id: 9,  name: 'Quick two flashes',      colourWheel: true },
  { id: 10, name: 'Quick two flashes rainbow', colourWheel: false },
  { id: 11, name: 'Breathe rainbow',        colourWheel: false },
  { id: 12, name: 'Strange breathe rainbow', colourWheel: false },
  { id: 13, name: 'Slow glitchy rainbow',   colourWheel: false },
  { id: 14, name: 'Yellow light',           colourWheel: true },
]

const setupSteps = [
  {
    num: 1,
    desc: 'Download the latest APK from the <a href="https://github.com/ArtiomSu/Asus-ROG-Phone-2-RGB/releases" target="_blank" rel="noopener" class="inline-link">Releases page</a> (or install directly from the Play Store).',
  },
  {
    num: 2,
    desc: 'Open the APK from your Downloads folder and install it. Grant the root request when prompted — the app needs root to write to the LED driver.',
  },
  {
    num: 3,
    desc: 'Tap the power button in the bottom-right of the app. When it turns green the LED driver is connected and you can explore the Animations tab.',
  },
  {
    num: 4,
    desc: 'Optional: use <strong>Export Settings</strong> in the About tab to back up any existing configuration before updating to a new release.',
  },
]

const videos = [
  { id: 'WONmNu35GFM', url: 'https://www.youtube.com/watch?v=WONmNu35GFM', title: 'Release 30 — Smart Home Controls & new app style' },
  { id: '8rNJtEDuV1I', url: 'https://www.youtube.com/watch?v=8rNJtEDuV1I', title: 'Release 9 — Overview & notification setup' },
]

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────────── */
.rogrgb-page {
  padding-top: var(--nav-height);
}

.section {
  padding: 96px 24px;
  border-top: 1px solid var(--color-border);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-text);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.section-sub {
  font-size: 1rem;
  color: var(--color-text-muted);
  max-width: 720px;
  line-height: 1.7;
  margin-bottom: 40px;
}

/* ── Reveal ─────────────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── Buttons ────────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: opacity var(--transition), background var(--transition), border-color var(--transition);
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.btn-primary:hover { opacity: 0.85; }

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-hover-border);
  background: var(--color-surface);
}

/* ── Hero ───────────────────────────────────────────────────────── */
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  text-align: center;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-badges {
  margin-bottom: 20px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 100px;
  border: 1px solid var(--color-accent-border);
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
}

.hero-title {
  font-size: clamp(2rem, 6vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--color-text);
}

.hero-sub {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 24px;
}

.req-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 28px;
}

.chip {
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.72rem;
  font-weight: 500;
  border-radius: 100px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

/* ── Features ───────────────────────────────────────────────────── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.feature-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover { border-color: var(--color-hover-border); }

.feature-icon {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 12px;
}

.feature-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Animations ─────────────────────────────────────────────────── */
.animations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
}

.anim-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.anim-row:hover { border-color: var(--color-hover-border); }

.anim-id {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anim-name {
  flex: 1;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.anim-tag {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  white-space: nowrap;
}

/* ── Steps ──────────────────────────────────────────────────────── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.step-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-num-badge {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.78rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.step-content { flex: 1; min-width: 0; }

.step-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}

:deep(.inline-link) {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.warning-box {
  padding: 16px 20px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 10px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.warning-box strong { color: var(--color-accent-text); }

/* ── Videos ─────────────────────────────────────────────────────── */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.video-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  transition: border-color var(--transition), transform var(--transition);
}

.video-card:hover {
  border-color: var(--color-hover-border);
  transform: translateY(-2px);
}

.video-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.video-card:hover .video-thumb img { transform: scale(1.03); }

.video-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  transition: background var(--transition);
}

.video-card:hover .video-play { background: rgba(0, 0, 0, 0.5); }

.video-play svg {
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5));
}

.video-title {
  padding: 14px 16px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* ── Screenshots ────────────────────────────────────────────────── */
.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  margin-top: 40px;
}

.shot-item {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  aspect-ratio: 9 / 16;
  cursor: pointer;
  transition:
    border-color var(--transition),
    transform var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--color-surface);
}

.shot-item:hover {
  border-color: var(--color-hover-border);
  transform: translateY(-2px);
}

.shot-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.shot-item:hover img { transform: scale(1.04); }

/* ── Lightbox ───────────────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.lightbox-img {
  max-width: min(85vw, 600px);
  max-height: 85vh;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 8px;
}

.lightbox-close:hover { opacity: 1; }

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  padding: 8px 16px;
  transition: background 0.2s;
  line-height: 1;
}

.lightbox-prev { left: 16px; }
.lightbox-next { right: 16px; }
.lightbox-prev:hover,
.lightbox-next:hover { background: rgba(255, 255, 255, 0.2); }

/* ── Related ────────────────────────────────────────────────────── */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.related-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color var(--transition);
}

.related-card:hover { border-color: var(--color-hover-border); }

.related-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.related-card p {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  flex: 1;
}

.related-arrow {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-accent-text);
}

/* ── Keyframe ───────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section { padding: 64px 20px; }

  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
}
</style>
