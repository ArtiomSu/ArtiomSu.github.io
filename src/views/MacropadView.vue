<template>
  <div class="macropad-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Handwired · Open Source · QMK</span>
        <h1 class="hero-title">Macropad Pi Pico RGB</h1>
        <p class="hero-sub">
          A 27-key handwired macropad with 4 quad rotary encoders, a 128×32 OLED display, 54 WS2812B LEDs, and QMK firmware — all running on a Raspberry Pi Pico RP2040. A full remake of the original Pro Micro version with no firmware compromises.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/macropad_pi_pico_rgb_quad_encoders" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://github.com/ArtiomSu/qmk_firmware/tree/artiomsu_macropad_pico/keyboards/artiomsu_macropad_pico" target="_blank" rel="noopener" class="btn btn-secondary">
            QMK Firmware ↗
          </a>
        </div>
      </div>
      <div class="hero-images-wrap">
        <img
          src="https://github.com/ArtiomSu/qmk_firmware/raw/artiomsu_macropad_pico/keyboards/artiomsu_macropad_pico/public/images/header.jpg"
          alt="Macropad Pi Pico RGB - top view"
          loading="eager"
          class="hero-img"
        />
        <img
          src="https://github.com/ArtiomSu/qmk_firmware/raw/artiomsu_macropad_pico/keyboards/artiomsu_macropad_pico/public/images/header2.jpg"
          alt="Macropad Pi Pico RGB - side view"
          loading="eager"
          class="hero-img"
        />
      </div>
    </section>

    <!-- ─── WHY RP2040 ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Capabilities</p>
        <h2 class="section-title">Why RP2040?</h2>
        <p class="section-sub">The original version used a Pro Micro and had to compromise on firmware features due to running out of RAM and flash. The RP2040 ends that entirely.</p>
        <div class="spec-table-wrap reveal">
          <table class="spec-table">
            <thead>
              <tr>
                <th>Controller</th>
                <th>CPU Speed</th>
                <th>RAM</th>
                <th>Flash</th>
              </tr>
            </thead>
            <tbody>
              <tr class="highlight-row">
                <td><strong>RP2040</strong></td>
                <td>133 MHz</td>
                <td>264 KB</td>
                <td>2 MB</td>
              </tr>
              <tr>
                <td>Pro Micro</td>
                <td>16 MHz</td>
                <td>2.5 KB</td>
                <td>32 KB</td>
              </tr>
            </tbody>
          </table>
          <p class="spec-note">Over 100× more powerful in some aspects and often cheaper. Two hardware state machines handle LEDs and serial without stealing CPU cycles from your macros.</p>
        </div>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PARTS LIST ────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Bill of Materials</p>
        <h2 class="section-title">Parts list</h2>
        <p class="section-sub">Most of the cost is in the switches and keycaps — easy to reuse from an existing board.</p>
        <div class="parts-table-wrap reveal">
          <table class="parts-table">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Item</th>
                <th>~Price</th>
                <th>Optional</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in parts" :key="p.item">
                <td class="td-qty">{{ p.qty }}</td>
                <td>{{ p.item }}</td>
                <td class="td-price">{{ p.price }}</td>
                <td class="td-opt">
                  <span :class="p.optional === 'No' ? 'tag-required' : 'tag-optional'">{{ p.optional }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ─── BUILD GUIDE ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Build Guide</p>
        <h2 class="section-title">Step by step</h2>
        <p class="section-sub">The volume knobs are printed separately — use the 20 mm variant from the linked Thingiverse model.</p>
        <div class="steps-grid">
          <div v-for="step in buildSteps" :key="step.num" class="step-card reveal">
            <div class="step-img-wrap">
              <img :src="step.img" :alt="`Step ${step.num}`" loading="lazy" />
            </div>
            <div class="step-body">
              <span class="step-num-badge">{{ step.num }}</span>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── VIDEOS ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Videos</p>
        <h2 class="section-title">Demo & build</h2>
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
        <h2 class="section-title">QMK setup</h2>
        <div class="firmware-cards">
          <div class="firmware-card reveal">
            <h3>Build and flash</h3>
            <div class="code-block">
              <pre><code>make clean && qmk flash -kb artiomsu_macropad_pico -km test</code></pre>
            </div>
          </div>
          <div class="firmware-card reveal">
            <h3>Rotary encoder wiring</h3>
            <p>Each EC11 encoder has two sides. The <strong>2-pin side</strong> is the push switch. The <strong>3-pin side</strong> handles rotation — the centre pin is ground, the outer two connect to any GPIO pins you choose.</p>
          </div>
          <div class="firmware-card reveal">
            <h3>OLED</h3>
            <p>Connect the display to the 3 V output on the Pico (not 5 V — that's reserved for the LED strip). Setup borrowed from the <a href="https://learn.adafruit.com/using-qmk-on-rp2040-microcontrollers/kb2040-one-key-keyboard-with-oled-display" target="_blank" rel="noopener" class="link">Adafruit QMK OLED guide</a>.</p>
          </div>
        </div>
        <div class="qmk-links reveal">
          <p class="section-label" style="margin-bottom:16px">Useful QMK docs</p>
          <div class="qmk-links-grid">
            <a v-for="l in qmkLinks" :key="l.label" :href="l.url" target="_blank" rel="noopener" class="example-link">
              <span>{{ l.label }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PHOTOS ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Gallery</p>
        <h2 class="section-title">Finished build</h2>
        <div class="photos-grid">
          <div v-for="(photo, i) in photos" :key="i" class="photo-item reveal" @click="openLightbox(i)">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIGHTBOX ─────────────────────────────────────────────── -->
    <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox" aria-label="Close">✕</button>
      <button class="lightbox-prev" @click="lightboxPrev" aria-label="Previous">‹</button>
      <img :src="photos[lightboxIndex].src" :alt="photos[lightboxIndex].alt" class="lightbox-img" />
      <button class="lightbox-next" @click="lightboxNext" aria-label="Next">›</button>
    </div>

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">Part of a larger ecosystem</h2>
        <div class="related-grid">
          <router-link to="/dactyl-manuform-5x7" class="related-card">
            <h3>Dactyl Manuform 5×7</h3>
            <p>The full split ergonomic keyboard built with the same RP2040 approach — paired with this macropad for a complete desk setup.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/qmk-raw-hid-router" class="related-card">
            <h3>QMK Raw HID Router</h3>
            <p>Route raw HID packets between QMK devices to control trackball DPI and LED effects from any keyboard or macropad.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = 'https://github.com/ArtiomSu/qmk_firmware/raw/artiomsu_macropad_pico/keyboards/artiomsu_macropad_pico/public/images'

const lightboxIndex = ref(null)

const photos = [
  { src: `${BASE}/photo_0.jpg`, alt: 'Macropad - Photo 1' },
  { src: `${BASE}/photo_1.jpg`, alt: 'Macropad - Photo 2' },
  { src: `${BASE}/photo_2.jpg`, alt: 'Macropad - Photo 3' },
  { src: `${BASE}/photo_3.jpg`, alt: 'Macropad - Photo 4' },
  { src: `${BASE}/photo_4.jpg`, alt: 'Macropad - Photo 5' },
  { src: `${BASE}/photo_5.jpg`, alt: 'Macropad - Photo 6' },
  { src: `${BASE}/photo_6.jpg`, alt: 'Macropad - Photo 7' },
  { src: `${BASE}/photo_7.jpg`, alt: 'Macropad - Photo 8' },
  { src: `${BASE}/photo_8.jpg`, alt: 'Macropad - Photo 9' },
]

function openLightbox(i) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function lightboxPrev() { lightboxIndex.value = (lightboxIndex.value - 1 + photos.length) % photos.length }
function lightboxNext() { lightboxIndex.value = (lightboxIndex.value + 1) % photos.length }

function onKeydown(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

const features = [
  { icon: '🎛️', title: '4 Rotary Encoders', desc: 'Four EC11 quad encoders with push switches. Each knob is independently programmable for volume, scroll, zoom, or any macro.' },
  { icon: '🖥️', title: '128×32 OLED', desc: 'A small OLED display powered from the 3 V Pico output — shows layer indicators, WPM, or any custom graphic.' },
  { icon: '🔴', title: '54 RGB LEDs', desc: '30 WS2812B LEDs in a per-key grid (6 sections × 5 LEDs), 19 around the edges, and 5 at the bottom under the OLED — all one daisy-chained strip.' },
  { icon: '⚡', title: 'RP2040 Powered', desc: '133 MHz, 264 KB RAM, 2 MB flash. Zero firmware compromises — full RGB, OLED, encoders, macros, and more at once.' },
  { icon: '⌨️', title: '27 Keys', desc: 'Enough keys for a full macro layer. All switches are handwired with diodes for full n-key rollover.' },
  { icon: '🖨️', title: '3D Printed Case', desc: 'STL files included in the repo. Prints in about 150 g of filament on any standard 200×200 mm bed.' },
]

const parts = [
  { qty: '1',   item: 'Raspberry Pi Pico (RP2040)',              price: '~€5',  optional: 'No' },
  { qty: '21',  item: '1N4148 diodes (500-pack)',                price: '~€8',  optional: 'No' },
  { qty: '27',  item: 'Keyboard switches',                       price: 'varies', optional: 'No' },
  { qty: '27',  item: 'Keycaps',                                 price: 'varies', optional: 'No' },
  { qty: '4',   item: 'EC11 rotary encoders (5-pack)',           price: '~€2',  optional: 'No' },
  { qty: '1',   item: '128×32 OLED AVR display',                 price: '~€3',  optional: 'No' },
  { qty: '1',   item: 'Macropad case (3D printed, ~150 g PLA)',  price: '~€5 filament', optional: 'No' },
  { qty: '4',   item: '20 mm knobs (3D printed)',                price: 'minimal filament', optional: 'No' },
  { qty: '1',   item: 'WS2812B 60/m LED strip (1 m)',            price: '~€5',  optional: 'Yes' },
  { qty: '1',   item: '10-pin rainbow ribbon cable',             price: '~€7',  optional: 'Yes' },
  { qty: 'misc', item: 'Dupont/jumper wires (Arduino type)',     price: '~€11', optional: 'No' },
  { qty: 'misc', item: 'Soldering iron, solder, hot-glue gun',   price: 'varies', optional: 'No' },
]

const buildSteps = [
  { num: 1,  img: `${BASE}/step_1.jpg`,  desc: 'Connect the 3 pins to each rotary encoder and test them with a simple QMK firmware to confirm they work.' },
  { num: 2,  img: `${BASE}/step_2.jpg`,  desc: 'Plug in all 27 switches. Make sure they are all oriented in the same direction.' },
  { num: 3,  img: `${BASE}/step_3.jpg`,  desc: 'Secure the switches with hot glue so they cannot move during wiring.' },
  { num: 4,  img: `${BASE}/step_4.jpg`,  desc: 'Add the 1N4148 diodes. All must face downward — and don\'t forget the rotary encoder columns.' },
  { num: 5,  img: `${BASE}/step_5.jpg`,  desc: 'Wire up the rows as per the QMK info.json pin layout.' },
  { num: 6,  img: `${BASE}/step_6.jpg`,  desc: 'Wire up the columns.' },
  { num: 7,  img: `${BASE}/step_7.jpg`,  desc: 'Extend the row wires to reach the Pico. Test all switches in QMK before moving on.' },
  { num: 8,  img: `${BASE}/step_8.jpg`,  desc: 'Glue in the OLED and connect it to the 3 V output on the Pico (not 5 V — that is for the LEDs).' },
  { num: 9,  img: `${BASE}/step_9.jpg`,  desc: 'Prepare the LED strip — 6 sections of 5 LEDs each for the per-key grid (30 total).' },
  { num: 10, img: `${BASE}/step_10.jpg`, desc: 'Glue in the LED grid and connect it to the 5 V output on the Pico.' },
  { num: 11, img: `${BASE}/step_11.jpg`, desc: 'Run 19 LEDs around the edge perimeter and 5 more for the bottom row under the OLED.' },
  { num: 12, img: `${BASE}/step_12.jpg`, desc: 'Glue in the edge LEDs and chain the bottom LEDs from the end of the edge strip.' },
  { num: 13, img: `${BASE}/step_13.jpg`, desc: 'Final LED layout: grid → edges → bottom = 54 LEDs total on a single daisy-chained strip.' },
]

const videos = [
  { id: 'DFtIEDBoUzQ', url: 'https://www.youtube.com/watch?v=DFtIEDBoUzQ', title: 'Macropad Demo' },
  { id: 'P-ggW76Ui1A', url: 'https://www.youtube.com/watch?v=P-ggW76Ui1A', title: 'Full Build Video' },
]

const qmkLinks = [
  { label: 'RP2040 QMK docs',       url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/platformdev_rp2040.md' },
  { label: 'OLED driver',           url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/feature_oled_driver.md' },
  { label: 'Rotary encoder feature', url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/feature_encoders.md' },
  { label: 'Adafruit OLED + QMK',   url: 'https://learn.adafruit.com/using-qmk-on-rp2040-microcontrollers/kb2040-one-key-keyboard-with-oled-display' },
  { label: '20 mm knob STL',        url: 'https://www.thingiverse.com/thing:4206617' },
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
.macropad-page {
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
  max-width: 700px;
  line-height: 1.7;
  margin-bottom: 40px;
}

/* ── Reveal ────────────────────────────────────────────────────── */
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
  gap: 48px;
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
  max-width: 620px;
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.hero-images-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 900px;
  width: 100%;
  animation: fadeUp 0.7s 0.15s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-img {
  width: 100%;
  display: block;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

/* ── Spec table ────────────────────────────────────────────────── */
.spec-table-wrap {
  margin-bottom: 48px;
}

.spec-table {
  width: 100%;
  max-width: 540px;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin-bottom: 16px;
}

.spec-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.spec-table td {
  padding: 10px 16px;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.highlight-row td {
  color: var(--color-accent-text);
  background: var(--color-accent-dim);
}

.spec-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 540px;
}

/* ── Features grid ─────────────────────────────────────────────── */
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
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
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

/* ── Parts table ───────────────────────────────────────────────── */
.parts-table-wrap { overflow-x: auto; }

.parts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  min-width: 560px;
}

.parts-table th {
  text-align: left;
  padding: 10px 14px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.parts-table td {
  padding: 10px 14px;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  line-height: 1.5;
}

.td-qty  { font-weight: 600; color: var(--color-text); white-space: nowrap; }
.td-price { white-space: nowrap; }
.td-opt   { white-space: nowrap; }

.tag-required {
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: 4px;
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
  border: 1px solid var(--color-accent-border);
}

.tag-optional {
  display: inline-block;
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

/* ── Build steps ───────────────────────────────────────────────── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.step-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-card:hover { border-color: var(--color-hover-border); }

.step-img-wrap {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-border);
}

.step-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.step-card:hover .step-img-wrap img { transform: scale(1.04); }

.step-body {
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.step-num-badge {
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
  margin-top: 1px;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── Videos ──────────────────────────────────────────────────── */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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

/* ── Firmware ────────────────────────────────────────────────── */
.firmware-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.firmware-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
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
  border-radius: 8px;
  overflow: auto;
  border: 1px solid var(--color-border);
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
}

.code-block pre { margin: 0; padding: 16px; }

.code-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  white-space: pre;
}

.qmk-links {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.qmk-links-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.example-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent-text);
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 6px;
  text-decoration: none;
  transition: opacity var(--transition);
}

.example-link:hover { opacity: 0.75; }

/* ── Photos ──────────────────────────────────────────────────── */
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  margin-top: 40px;
}

.photo-item {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  aspect-ratio: 16 / 9;
  cursor: pointer;
  transition: border-color var(--transition), transform var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-item:hover {
  border-color: var(--color-hover-border);
  transform: translateY(-2px);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.photo-item:hover img { transform: scale(1.04); }

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
  max-width: min(90vw, 1100px);
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

/* ── Keyframe ────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section { padding: 64px 20px; }

  .hero-images-wrap { grid-template-columns: 1fr; }

  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
}
</style>
