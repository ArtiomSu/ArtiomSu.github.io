<template>
  <div class="dactyl-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Handwired · Open Source · QMK</span>
        <h1 class="hero-title">Dactyl Manuform 5×7</h1>
        <p class="hero-sub">
          A fully handwired, split ergonomic keyboard running on two Raspberry Pi Pico (RP2040) controllers. 74 keys, massive RGB, TPU wrist rests, and QMK firmware — built to never run out of RAM or flash storage again.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/dactyl_manuform_5x7_pi_pico_rgb" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://github.com/ArtiomSu/qmk_firmware/tree/artiom_dactyl/keyboards/artiomsu_dactyl" target="_blank" rel="noopener" class="btn btn-secondary">
            QMK Firmware ↗
          </a>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img
          src="https://github.com/ArtiomSu/qmk_firmware/raw/artiom_dactyl/keyboards/artiomsu_dactyl/public/images/header.jpg"
          alt="Dactyl Manuform 5x7 keyboard"
          loading="eager"
        />
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Capabilities</p>
        <h2 class="section-title">Why RP2040?</h2>
        <p class="section-sub">The Pro Micro has been the go-to for handwired QMK builds — but its RAM and flash are easily exhausted once you add LEDs, layers, and macros. The RP2040 makes all of that a non-issue.</p>
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
          <p class="spec-note">The RP2040 is over 100× more powerful in some aspects and is often cheaper than the Pro Micro. It also has two hardware state machines ideal for LEDs and serial split communication.</p>
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

    <!-- ─── WIRING ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Assembly</p>
        <h2 class="section-title">Wiring diagram</h2>
        <p class="section-sub">Note the differences in TRRS jack and column wiring between the two halves. The numbers and letters correspond to the physical labels on the KB2040 — map to GPIO pins for QMK config as per the <a href="https://learn.adafruit.com/adafruit-kb2040/pinouts" target="_blank" rel="noopener" class="link">Adafruit KB2040 pinout</a>.</p>
        <div class="wiring-wrap reveal">
          <img
            src="https://github.com/ArtiomSu/qmk_firmware/raw/artiom_dactyl/keyboards/artiomsu_dactyl/public/images/wiring.png"
            alt="Dactyl Manuform wiring diagram"
            loading="lazy"
            class="wiring-img"
          />
        </div>
      </div>
    </section>

    <!-- ─── PARTS LIST ────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Bill of Materials</p>
        <h2 class="section-title">Parts list</h2>
        <p class="section-sub">Most of the cost is in the switches and keycaps — if you are reusing from another board the build is surprisingly affordable.</p>
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
        <p class="section-sub">If you plan to use many LEDs (109 per half like this build), you will need to bypass the fuse at <strong>Step 14</strong> to draw enough current. You can tell you need it if the keyboard constantly reboots.</p>
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
        <p class="section-label">Build Videos</p>
        <h2 class="section-title">Full build series</h2>
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
        <p class="section-sub">Clone the ArtiomSu QMK fork and switch to the dactyl branch. Flash each half independently.</p>
        <div class="firmware-cards">
          <div class="firmware-card reveal">
            <h3>Clone and build</h3>
            <div class="code-block">
              <pre><code>git clone https://github.com/ArtiomSu/qmk_firmware.git
cd qmk_firmware
git checkout artiom_dactyl

# Build test firmware
make clean && qmk flash -kb artiomsu_dactyl -km test</code></pre>
            </div>
          </div>
          <div class="firmware-card reveal">
            <h3>Flash split sides</h3>
            <p>If you define <code>EE_HANDS</code> in <code>config.h</code>, save the side to EEPROM so either half can be the USB host:</p>
            <div class="code-block" style="margin-top:12px">
              <pre><code># Right half
qmk flash -kb artiomsu_dactyl -km test -bl uf2-split-right

# Left half
qmk flash -kb artiomsu_dactyl -km test -bl uf2-split-left</code></pre>
            </div>
          </div>
          <div class="firmware-card reveal">
            <h3>After QMK updates</h3>
            <p>If builds fail after pulling new QMK commits, re-initialise the submodules:</p>
            <div class="code-block" style="margin-top:12px">
              <pre><code>git submodule update --init --recursive
make git-submodule</code></pre>
            </div>
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

    <!-- ─── 3D PRINTING ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">3D Printing</p>
        <h2 class="section-title">Printing the case</h2>
        <div class="print-cards">
          <div v-for="c in printCards" :key="c.title" class="print-card reveal">
            <h3 class="print-title">{{ c.title }}</h3>
            <p class="print-desc">{{ c.desc }}</p>
            <div v-if="c.imgs" class="print-imgs">
              <img v-for="img in c.imgs" :key="img.src" :src="img.src" :alt="img.alt" loading="lazy" />
            </div>
            <a v-if="c.link" :href="c.link" target="_blank" rel="noopener" class="btn btn-secondary" style="margin-top:16px; align-self:flex-start">
              Open Dactyl Generator ↗
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
          <router-link to="/qmk-raw-hid-router" class="related-card">
            <h3>QMK Raw HID Router</h3>
            <p>Control this keyboard's paired trackball in real time — change DPI, scroll speed, and LED effects via keyboard shortcuts.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/mana-ball-track-ball" class="related-card">
            <h3>Mana Ball Trackball</h3>
            <p>The RGB trackball designed to pair with this keyboard. Controlled via the HID Router for a seamless workflow.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BASE = 'https://github.com/ArtiomSu/qmk_firmware/raw/artiom_dactyl/keyboards/artiomsu_dactyl/public/images'

const lightboxIndex = ref(null)

const photos = [
  { src: `${BASE}/photos_1.jpg`, alt: 'Dactyl Manuform - Photo 1' },
  { src: `${BASE}/photos_2.jpg`, alt: 'Dactyl Manuform - Photo 2' },
  { src: `${BASE}/photos_3.jpg`, alt: 'Dactyl Manuform - Photo 3' },
  { src: `${BASE}/photos_4.jpg`, alt: 'Dactyl Manuform - Photo 4' },
  { src: `${BASE}/photos_5.jpg`, alt: 'Dactyl Manuform - Photo 5' },
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
  { icon: '⌨️', title: 'Ergonomic Split', desc: 'Dactyl Manuform 5×7 layout — sculpted columns and thumb clusters designed around natural hand position.' },
  { icon: '🔴', title: 'Massive RGB', desc: '109 WS2812B LEDs per half — per-key RGB on top and underglow strips around the case and a bottom grid.' },
  { icon: '⚡', title: 'RP2040 Powered', desc: '133 MHz, 264 KB RAM, 2 MB flash. Over 100× more headroom than the Pro Micro — never compromise on features again.' },
  { icon: '🔀', title: 'QMK Raw HID', desc: 'Configured to work with QMK Raw HID Router — lets your keyboard change trackball DPI and settings in real time.' },
  { icon: '🖨️', title: '3D Printed', desc: 'All case, chip holder, wrist rest, and bottom cover STL files included. Printable on any 200×200 mm bed.' },
  { icon: '🧤', title: 'TPU Wrist Rests', desc: 'Custom-sculpted soft TPU wrist rests — version 5, printed at 10% infill for a firm-but-yielding feel.' },
  { icon: '🔌', title: 'USB-C', desc: 'Both halves use the Adafruit KB2040 — the same RP2040 chip as the official Pico but smaller with USB-C.' },
  { icon: '🛡️', title: 'Indestructible Case', desc: 'PLA at 100% infill. Heavy, rigid, and silent thanks to the TPU bottom cover that stretches over the sides without screws.' },
]

const parts = [
  { qty: '2', item: 'Adafruit KB2040 microcontroller (RP2040, USB-C)', price: '~€25', optional: 'No' },
  { qty: '2', item: 'JST-SH / STEMMA QT cable', price: '~€3', optional: 'Yes' },
  { qty: '74', item: '1N4148 diodes (500-pack)', price: '~€8', optional: 'No' },
  { qty: '2', item: 'TRRS Jack breakout board', price: '~€6', optional: 'No' },
  { qty: '74', item: 'Keyboard switches', price: 'varies', optional: 'No' },
  { qty: '74', item: 'Keycaps', price: 'varies', optional: 'No' },
  { qty: '2', item: 'Dactyl cases (3D printed, ~500g PLA each)', price: '~€35 filament', optional: 'No' },
  { qty: '2', item: 'Wrist rests (3D printed, ~400g TPU each)', price: '~€25 filament', optional: 'Recommended' },
  { qty: '10', item: 'Self-adhesive rubber feet 6 mm', price: '~€2', optional: 'Recommended' },
  { qty: '1', item: '10-pin rainbow ribbon cable', price: '~€7', optional: 'Recommended' },
  { qty: '1', item: 'WS2812B 144/m LED strip (1 m)', price: '~€12', optional: 'Yes' },
  { qty: '1', item: 'WS2812B 60/m LED strip (3 m)', price: '~€12', optional: 'Yes' },
  { qty: 'misc', item: 'Dupont/jumper wires (Arduino breadboard type)', price: '~€11', optional: 'No' },
  { qty: 'misc', item: 'Soldering iron and solder', price: 'varies', optional: 'No' },
  { qty: 'misc', item: 'Hot glue gun and sticks', price: 'varies', optional: 'Recommended' },
]

const buildSteps = [
  { num: 1,  img: `${BASE}/step_1.jpg`,  desc: 'Wire up the diodes. Take note of the polarity direction — make sure it matches the wiring diagram.' },
  { num: 2,  img: `${BASE}/step_2.jpg`,  desc: 'Wire up the columns as per the diagram.' },
  { num: 3,  img: `${BASE}/step_3.jpg`,  desc: 'Wire up the rows as per the diagram.' },
  { num: 4,  img: `${BASE}/step_4.jpg`,  desc: 'Extend the connectors so they can reach the controller pins easily.' },
  { num: 5,  img: `${BASE}/step_5.jpg`,  desc: 'With connectors soldered onto the KB2040 and TRRS breakout, wire them up as shown in the diagram.' },
  { num: 6,  img: `${BASE}/step_6.jpg`,  desc: 'Prepare the first LED strip, powered from the STEMMA QT port. Add connectors for the second strip.' },
  { num: 7,  img: `${BASE}/step_7.jpg`,  desc: 'Secure all connections with hot glue to prevent shorts during use.' },
  { num: 8,  img: `${BASE}/step_8.jpg`,  desc: 'Connect the column and row wires to the controller per the diagram.' },
  { num: 9,  img: `${BASE}/step_9.jpg`,  desc: 'Leave the LED strip loose for now. Flash the QMK firmware and test all keys and LEDs before final assembly.' },
  { num: 10, img: `${BASE}/step_10.jpg`, desc: 'Hot glue the first LED strip and route the row wires neatly.' },
  { num: 11, img: `${BASE}/step_11.jpg`, desc: 'Using 30 LEDs from the 60/m strip — wire them around the bottom perimeter of the case.' },
  { num: 12, img: `${BASE}/step_12.jpg`, desc: 'Using 43 LEDs from the 60/m strip — wire them in a grid pattern for the bottom underglow.' },
  { num: 13, img: `${BASE}/step_13.jpg`, desc: 'Attach the LED grid to the inside of the case.' },
  { num: 14, img: `${BASE}/step_14.jpg`, desc: 'Solder the USB → RAW bypass pad under the USB-C port. Required when using many LEDs to draw enough current.' },
  { num: 15, img: `${BASE}/step_15.jpg`, desc: 'Create jumpers to split the RAW pin between the LED strips and TRRS jack.' },
  { num: 16, img: `${BASE}/step_16.jpg`, desc: 'RAW pin now powers both the LED strips and the TRRS jack from a single 5V source.' },
]

const videos = [
  { id: 'SH30g5IgDSc', url: 'https://www.youtube.com/watch?v=SH30g5IgDSc', title: 'Part 1 — Soldering Microcontrollers and Jacks' },
  { id: 'pt-6UTvO6-A',  url: 'https://www.youtube.com/watch?v=pt-6UTvO6-A',  title: 'Part 2 — LED Strips' },
  { id: 'Vyib0i9I5N0',  url: 'https://www.youtube.com/watch?v=Vyib0i9I5N0',  title: 'Part 3 — Diodes' },
  { id: 'efsJ9erwwJ0',  url: 'https://www.youtube.com/watch?v=efsJ9erwwJ0',  title: 'Part 4 — Switches and Diodes' },
  { id: 'QlJTeLKdx9E',  url: 'https://www.youtube.com/watch?v=QlJTeLKdx9E',  title: 'Part 5 — Rows' },
  { id: 'Ufe2N9i5dcQ',  url: 'https://www.youtube.com/watch?v=Ufe2N9i5dcQ',  title: 'Part 6 — Columns' },
  { id: '5NNjv0asuOE',  url: 'https://www.youtube.com/watch?v=5NNjv0asuOE',  title: 'Part 7 — QMK Flashing and Testing' },
  { id: 'q52N-qa9q9w',  url: 'https://www.youtube.com/watch?v=q52N-qa9q9w',  title: 'Part 8 — Final Assembly and LED Strips' },
]

const qmkLinks = [
  { label: 'RP2040 QMK docs', url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/platformdev_rp2040.md' },
  { label: 'Split keyboard feature', url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/feature_split_keyboard.md' },
  { label: 'RGB lighting layers', url: 'https://github.com/qmk/qmk_firmware/blob/master/docs/feature_rgblight.md#lighting-layers' },
  { label: 'KB2040 pinout', url: 'https://learn.adafruit.com/adafruit-kb2040/pinouts' },
]

const printCards = [
  {
    title: 'Case',
    desc: 'Generated with the Dactyl Generator tool. This is version 3 — tweaked through multiple iterations. Uses translucent multicolour PLA at 100% infill. Each half takes over 3 days to print and uses just under 500 g including supports. Printable on any 200×200 mm bed.',
    imgs: null,
    link: 'https://ryanis.cool/dactyl/#manuform',
  },
  {
    title: 'Chip Holder',
    desc: 'Based on the Pro Micro USB-C holder from the Dactyl Configurator repo, modified in Blender to fit the KB2040 footprint. Same PLA at 100% infill. Takes about 2 hours to print.',
    imgs: null,
    link: null,
  },
  {
    title: 'Wrist Rests',
    desc: 'Printed in TPU at 10% infill so they are firm but slightly flexible and comfortable. Created from scratch in Blender by importing the case model. This is version 5. Add rubber feet if they slide.',
    imgs: [
      { src: `${BASE}/wrist_rest_1.jpg`, alt: 'Wrist rest photo 1' },
      { src: `${BASE}/wrist_rest_3.jpg`, alt: 'Wrist rest flexibility' },
    ],
    link: null,
  },
  {
    title: 'Bottom Cover',
    desc: 'Also printed in TPU — it stretches over the sides like a sleeve so no screws are needed. Adds sound dampening. Available in full or cutout variants (cutout exposes the reset button, though QMK lets you reset without it).',
    imgs: [
      { src: `${BASE}/bottom_cover_full_1.jpg`, alt: 'Bottom cover full' },
      { src: `${BASE}/bottom_cover_cutout_1.jpg`, alt: 'Bottom cover with cutout' },
    ],
    link: null,
  },
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
.dactyl-page {
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

.hero-image-wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  max-width: 900px;
  width: 100%;
  animation: fadeUp 0.7s 0.15s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-image-wrap img {
  width: 100%;
  display: block;
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

/* ── Wiring ────────────────────────────────────────────────────── */
.wiring-wrap {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  max-width: 820px;
}

.wiring-img {
  width: 100%;
  display: block;
}

/* ── Parts table ───────────────────────────────────────────────── */
.parts-table-wrap {
  overflow-x: auto;
}

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

.td-qty {
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.td-price {
  white-space: nowrap;
}

.td-opt {
  white-space: nowrap;
}

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

.step-card:hover .step-img-wrap img {
  transform: scale(1.04);
}

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

.firmware-card code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
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

/* ── 3D Printing ─────────────────────────────────────────────── */
.print-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
}

.print-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.print-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.print-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

.print-imgs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.print-imgs img {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  display: block;
}

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

  .print-cards { grid-template-columns: 1fr; }

  .lightbox-prev { left: 8px; }
  .lightbox-next { right: 8px; }
}
</style>
