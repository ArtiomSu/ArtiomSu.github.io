<template>
  <div class="manaball-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Open Source · CC BY-NC-SA 4.0</span>
        <h1 class="hero-title">Mana Ball Trackball</h1>
        <p class="hero-sub">
          A fully modular, 3D-printable trackball with customizable RGB lighting and swappable button modules. A translucent 50mm ball illuminated by 6 RGB LEDs creates a glowing multicolor orb — like a mana orb from a video game.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/ManaBall-Trackball" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://makerworld.com/en/models/2009889-mana-ball-track-ball" target="_blank" rel="noopener" class="btn btn-secondary">
            MakerWorld ↗
          </a>
          <a href="https://github.com/ArtiomSu/ManaBall-Trackball/releases" target="_blank" rel="noopener" class="btn btn-secondary">
            Download Firmware ↗
          </a>
        </div>
      </div>
      <div class="hero-images">
        <div class="hero-image-wrap">
          <img src="/manaball/images/1.jpg" alt="Mana Ball Trackball with button module" loading="eager" />
        </div>
        <div class="hero-image-wrap hero-image-wrap--secondary">
          <img src="/manaball/images/2.jpg" alt="Mana Ball Trackball" loading="eager" />
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Capabilities</p>
        <h2 class="section-title">Everything you need</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── GALLERY ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Gallery</p>
        <h2 class="section-title">See the build</h2>
        <div class="gallery-grid">
          <div v-for="n in galleryImages" :key="n" class="gallery-item reveal" @click="openLightbox(n)">
            <img :src="`/manaball/images/${n}.jpg`" :alt="`Mana Ball - Photo ${n}`" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIGHTBOX ──────────────────────────────────────────────── -->
    <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">✕</button>
      <button class="lightbox-prev" @click="lightboxPrev" aria-label="Previous">‹</button>
      <img :src="`/manaball/images/${galleryImages[lightboxIndex]}.jpg`" :alt="`Mana Ball - Photo ${galleryImages[lightboxIndex]}`" class="lightbox-img" />
      <button class="lightbox-next" @click="lightboxNext" aria-label="Next">›</button>
    </div>

    <!-- ─── WIRING DIAGRAMS ───────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Assembly</p>
        <h2 class="section-title">Wiring diagrams</h2>
        <p class="section-sub">No diodes required — single-row, five-column matrix supports n-key rollover. 9 additional free GPIO pins available for up to 14 total switches.</p>
        <div class="wiring-grid">
          <figure class="wiring-figure reveal">
            <img src="/manaball/images/mana-track-ball-wiring-diagram.jpg" alt="Wiring diagram without switches" loading="lazy" />
            <figcaption>Without switches</figcaption>
          </figure>
          <figure class="wiring-figure reveal">
            <img src="/manaball/images/mana-track-ball-wiring-diagram-with-keys.jpg" alt="Wiring diagram with switches" loading="lazy" />
            <figcaption>With switches</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ─── VIDEOS ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Videos</p>
        <h2 class="section-title">See it in action</h2>
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

    <!-- ─── FIRMWARE ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Firmware</p>
        <h2 class="section-title">QMK-powered</h2>
        <p class="section-sub">The Mana Ball runs QMK firmware on an RP2040 microcontroller. Flash via drag-and-drop or build from source.</p>
        <div class="firmware-cards">
          <div class="firmware-card">
            <h3>Pre-compiled firmware</h3>
            <p>Download the latest <code>.uf2</code> from the Releases page. Hold BOOTSEL while plugging in your RP2040 to mount it as a USB drive, then drag and drop the file.</p>
            <a href="https://github.com/ArtiomSu/ManaBall-Trackball/releases" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:20px">
              Download .uf2 ↗
            </a>
          </div>
          <div class="firmware-card">
            <h3>Build from source</h3>
            <div class="code-block">
              <pre><code>git clone https://github.com/ArtiomSu/qmk_firmware.git
cd qmk_firmware
git checkout artiomsu_manaball
qmk git-submodule
make clean
qmk flash -kb artiomsu_manaball -km default</code></pre>
            </div>
          </div>
          <div class="firmware-card">
            <h3>Configuration</h3>
            <p>Adjust pointer speed, scroll behaviour, LED effects and more using the <router-link to="/qmk-raw-hid-router" class="link">QMK RAW HID Router</router-link>. Works on Windows, Linux, and macOS.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── DESIGN PHILOSOPHY ─────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Background</p>
        <h2 class="section-title">Why Mana Ball?</h2>
        <blockquote class="quote">
          <p>After years of testing various trackballs, none perfectly suited my needs. While the Ploopy Adept came close after modifications, its button layout still wasn't ideal. The Mana Ball is my solution — a trackball designed specifically for my workflow, with modularity built in so others can adapt it to theirs.</p>
          <p>Best used with a QMK-enabled keyboard or macro pad configured with <router-link to="/qmk-raw-hid-router" class="link">QMK RAW HID Router Software</router-link> for full customization capabilities.</p>
        </blockquote>
        <div class="spec-grid">
          <div v-for="s in specs" :key="s.label" class="spec-card">
            <span class="spec-value">{{ s.value }}</span>
            <span class="spec-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">Part of a larger ecosystem</h2>
        <div class="related-grid">
          <router-link to="/qmk-raw-hid-router" class="related-card">
            <h3>QMK Raw HID Router</h3>
            <p>The bridge that lets your keyboard control this trackball in real time — change DPI, scroll speed, and LED effects via keyboard shortcuts.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/dactyl-manuform-5x7" class="related-card">
            <h3>Dactyl Manuform 5×7</h3>
            <p>The handwired split keyboard designed to pair with this trackball. Both controlled through the QMK Raw HID Router.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const galleryImages = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const lightboxIndex = ref(null)

function openLightbox(n) {
  lightboxIndex.value = galleryImages.indexOf(n)
}

function closeLightbox() {
  lightboxIndex.value = null
}

function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
}

function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
}

function onKeydown(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

const features = [
  {
    icon: '🧩',
    title: 'Modular Design',
    desc: 'Hot-swappable button modules and body configurations. Mix and match to suit your workflow.',
  },
  {
    icon: '🎯',
    title: 'High Precision',
    desc: 'PMW3360 optical sensor for accurate, consistent tracking across all surfaces.',
  },
  {
    icon: '🫧',
    title: 'Smooth Movement',
    desc: 'Rexroth Ball Transfer Units (BTUs) provide a premium, buttery-smooth rolling feel.',
  },
  {
    icon: '🌈',
    title: 'Customizable RGB',
    desc: '6 RGB LEDs with configurable lighting effects illuminate the translucent 50mm ball.',
  },
  {
    icon: '⌨️',
    title: 'Low-profile Switches',
    desc: 'Ergonomic design using low-profile keyboard switches for comfortable long-session use.',
  },
  {
    icon: '📜',
    title: 'Drag Scrolling',
    desc: 'Configurable drag scroll feature — lock the ball into scroll mode with a button press.',
  },
  {
    icon: '🖥️',
    title: 'Universal Compatibility',
    desc: 'Works with all operating systems via USB-C. No drivers required.',
  },
  {
    icon: '🔓',
    title: 'Fully Open Source',
    desc: 'No custom PCBs required. Every STL, wiring diagram, and firmware file is freely available.',
  },
  {
    icon: '⚙️',
    title: 'QMK Powered',
    desc: 'RP2040 microcontroller running QMK firmware. Full keymap customization out of the box.',
  },
  {
    icon: '🎛️',
    title: 'Adjustable Settings',
    desc: 'Tune pointer speed, scroll speed, scroll direction, and LED effects at runtime.',
  },
  {
    icon: '⚽',
    title: 'Standard Ball',
    desc: 'Compatible with any 50mm ball — use whatever colour or material you prefer.',
  },
  {
    icon: '🖨️',
    title: '3D Printable',
    desc: 'All body, button module, and wrist rest files are included. Available on MakerWorld too.',
  },
]

const videos = [
  {
    id: 'vn09xzBtV5k',
    url: 'https://www.youtube.com/watch?v=vn09xzBtV5k',
    title: 'Mana Ball Trailer',
  },
  {
    id: 'WPnU__LLYNc',
    url: 'https://www.youtube.com/watch?v=WPnU__LLYNc',
    title: 'Mana Ball Overview and Features',
  },
  {
    id: 'o33xUQOpQcM',
    url: 'https://youtu.be/o33xUQOpQcM',
    title: 'Head Assembly Guide',
  },
  {
    id: 'YjRsaHhR8Q8',
    url: 'https://youtu.be/YjRsaHhR8Q8',
    title: 'Body Assembly Guide',
  },
  {
    id: '52Slw13G3vc',
    url: 'https://www.youtube.com/watch?v=52Slw13G3vc',
    title: 'Better Button Module Assembly',
  },
]

const specs = [
  { value: 'PMW3360', label: 'Optical Sensor' },
  { value: 'RP2040', label: 'Microcontroller' },
  { value: '50 mm', label: 'Ball Diameter' },
  { value: '6× RGB', label: 'LED Count' },
  { value: 'USB-C', label: 'Connection' },
  { value: 'QMK', label: 'Firmware' },
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
/* ── Layout ────────────────────────────────────────────────────── */
.manaball-page {
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
  max-width: 680px;
  line-height: 1.7;
  margin-bottom: 48px;
}

/* ── Scroll reveal ─────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── Buttons ───────────────────────────────────────────────────── */
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

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-hover-border);
  background: var(--color-surface);
}

.link {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Hero ──────────────────────────────────────────────────────── */
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  text-align: center;
  gap: 56px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.badge {
  display: inline-block;
  margin-bottom: 24px;
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
  max-width: 600px;
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.hero-images {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  animation: fadeUp 0.7s 0.15s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-image-wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  max-width: 440px;
  width: 100%;
  flex: 1 1 300px;
}

.hero-image-wrap--secondary {
  max-width: 340px;
  flex: 1 1 240px;
}

.hero-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Features ──────────────────────────────────────────────────── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 48px;
}

.feature-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  border-color: var(--color-hover-border);
}

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

/* ── Gallery ─────────────────────────────────────────────────── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 40px;
}

.gallery-item {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  aspect-ratio: 4 / 3;
  cursor: pointer;
  transition: border-color var(--transition), transform var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover {
  border-color: var(--color-hover-border);
  transform: translateY(-2px);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.04);
}

/* ── Lightbox ────────────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.lightbox-img {
  max-width: min(90vw, 1000px);
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

.lightbox-close:hover {
  opacity: 1;
}

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

.lightbox-prev {
  left: 16px;
}

.lightbox-next {
  right: 16px;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ── Wiring ──────────────────────────────────────────────────── */
.wiring-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.wiring-figure {
  margin: 0;
}

.wiring-figure img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  display: block;
  transition: border-color var(--transition);
}

.wiring-figure:hover img {
  border-color: var(--color-hover-border);
}

.wiring-figure figcaption {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 10px;
  text-align: center;
}

/* ── Videos ──────────────────────────────────────────────────── */
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

.video-card:hover .video-thumb img {
  transform: scale(1.03);
}

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

.video-card:hover .video-play {
  background: rgba(0, 0, 0, 0.5);
}

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

/* ── Firmware ────────────────────────────────────────────────── */
.firmware-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.firmware-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.firmware-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.firmware-card p {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

.code-block {
  margin-top: 12px;
  border-radius: 8px;
  overflow: auto;
  border: 1px solid var(--color-border);
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
}

.code-block pre {
  margin: 0;
  padding: 16px;
}

.code-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  white-space: pre;
}

/* ── Quote / Background ──────────────────────────────────────── */
.quote {
  margin: 0 0 48px;
  padding: 28px 32px;
  border-left: 3px solid var(--color-accent-border);
  background: var(--color-accent-dim);
  border-radius: 0 12px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.75;
  margin: 0;
}

/* ── Specs ───────────────────────────────────────────────────── */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.spec-card {
  padding: 20px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
}

.spec-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.spec-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── Keyframe ────────────────────────────────────────────────── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Related ─────────────────────────────────────────────────── */
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

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section {
    padding: 64px 20px;
  }

  .hero-images {
    gap: 10px;
  }

  .hero-image-wrap--secondary {
    display: none;
  }

  .wiring-grid {
    grid-template-columns: 1fr;
  }

  .lightbox-prev {
    left: 8px;
  }

  .lightbox-next {
    right: 8px;
  }
}
</style>
