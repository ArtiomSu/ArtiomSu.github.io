<template>
  <div class="btkbi-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <img src="/btkbi/images/logo.svg" alt="BtKBi logo" class="hero-logo" />
        <span class="badge">Open Source</span>
        <h1 class="hero-title">Bluetooth to Keyboard Input</h1>
        <p class="hero-sub">
          Type from your phone or desktop onto any computer via USB HID — over BLE, fully encrypted. The open-source <a href="https://www.inputstick.com/" target="_blank" rel="noopener" class="link">InputStick</a> alternative built on a $5 ESP32.
        </p>
        <div class="hero-ctas">
          <router-link to="/bluetooth-to-kb-input-flasher" class="btn btn-primary">
            Flash Firmware
          </router-link>
          <a href="https://github.com/ArtiomSu/bluetooth-to-keyboard-input-esp32-s3-zero" target="_blank" rel="noopener" class="btn btn-secondary">
            GitHub
          </a>
          <a href="https://github.com/ArtiomSu/bluetooth-to-keyboard-input-esp32-s3-zero/releases" target="_blank" rel="noopener" class="btn btn-secondary">
            Download APK
          </a>
        </div>
      </div>
      <div class="hero-flow">
        <div class="flow-node">Phone / Desktop</div>
        <div class="flow-arrow">
          <span class="flow-label">BLE (encrypted)</span>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="flow-node flow-node-accent">ESP32-S3 Zero</div>
        <div class="flow-arrow">
          <span class="flow-label">USB HID</span>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="flow-node">Any Computer</div>
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

    <!-- ─── APP SCREENSHOTS ───────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Android App</p>
        <h2 class="section-title">Full-featured mobile client</h2>
        <p class="section-sub">Connect, script, control the mouse, manage devices and provision firmware — all from your phone.</p>
        <div class="screenshots-scroll">
          <figure v-for="s in screenshots" :key="s.src" class="screenshot-card">
            <img :src="s.src" :alt="s.caption" loading="lazy" />
            <figcaption>{{ s.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ─── HARDWARE ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner hardware-inner">
        <div class="hardware-text">
          <p class="section-label">Hardware</p>
          <h2 class="section-title">ESP32-S3 Zero</h2>
          <p class="hardware-desc">
            An extremely common, widely available microcontroller that costs less than $5 on AliExpress. Because the chip is ubiquitous, you can always source a replacement and flash via Chrome — no special tools required.
          </p>
          <ul class="hardware-list">
            <li>Under $5 from AliExpress</li>
            <li>Flash directly from Chrome browser</li>
            <li>RGB LED status indicator (red idle / blue connected / green typing)</li>
            <li>Optional 3D-printed case — available in several colours</li>
            <li>3D print files available free in the <a href="https://github.com/ArtiomSu/bluetooth-to-keyboard-input-esp32-s3-zero/tree/main/3d-printing" target="_blank" rel="noopener" class="link">repo's <code>3d-printing</code> folder</a></li>
          </ul>
          <div class="hardware-ctas">
            <a href="https://s.click.aliexpress.com/e/_c3AQoZNX" target="_blank" rel="noopener sponsored" class="btn btn-primary">
              Buy on AliExpress ↗
            </a>
            <router-link to="/bluetooth-to-kb-input-flasher" class="btn btn-secondary">
              Flash Firmware
            </router-link>
          </div>
          <p class="affiliate-note">* AliExpress affiliate link</p>
        </div>
        <div class="hardware-image-wrap">
          <img src="/btkbi/images/colour-options.jpg" alt="3D-printed case colour options" class="hardware-image" />
        </div>
      </div>
    </section>

    <!-- ─── VIDEOS ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Videos</p>
        <h2 class="section-title">See it in action</h2>
        <div class="videos-grid">
          <a v-for="v in videos" :key="v.url" :href="v.url" target="_blank" rel="noopener" class="video-card">
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

    <!-- ─── SECURITY ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Security</p>
        <h2 class="section-title">Secure by design</h2>
        <div class="security-cards">
          <div class="security-card">
            <span class="security-icon">🔐</span>
            <h3>App-Layer Encryption</h3>
            <p>Uses X25519 key exchange + AES-256-GCM + HMAC-PSK — not the weak Bluetooth pairing layer. Each device gets a unique random 32-byte PSK on provisioning.</p>
          </div>
          <div class="security-card">
            <span class="security-icon">👁️</span>
            <h3>Fully Open Source</h3>
            <p>Every line of firmware, Android app, and desktop script is public. Anyone can audit the code, find issues, and propose fixes — the project lives on independently of any single developer.</p>
          </div>
          <div class="security-card">
            <span class="security-icon">🔑</span>
            <h3>Custom USB Identity</h3>
            <p>Configure VID, PID, manufacturer string, and serial number to match a known device — useful in environments that restrict unknown USB peripherals.</p>
          </div>
        </div>
        <blockquote class="oss-quote">
          <p>Having a fully open-source alternative means the project can live on without the initial developer — if something happens to them. Many people have incorporated this workflow into their daily lives, and it's great to have a backup option that nobody can take away.</p>
          <p>The fact that this runs on an extremely common microcontroller means you can always source a replacement if a device breaks. It also means you can do cool things like flashing firmware straight from your Chrome browser — there are simply too many ESP32 resources in the wild for this ever to become a dead end.</p>
        </blockquote>
      </div>
    </section>

    <!-- ─── SUPPORT ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner support-inner">
        <p class="section-label">Support the project</p>
        <h2 class="section-title">Get a device or donate</h2>
        <p class="section-sub">
          Want a device with firmware pre-flashed and a 3D-printed case? Get in touch. Or just grab an ESP32-S3 Zero yourself for under $5 and flash it in minutes.
        </p>
        <div class="support-cards">
          <div class="support-card">
            <h3>Ready-made device</h3>
            <div class="support-price">€20 <span>within EU</span></div>
            <div class="support-price">€25 <span>outside EU</span></div>
            <p class="support-note">Firmware pre-flashed, 3D-printed case included. Contact me to discuss colour availability.</p>
            <div class="support-contacts">
              <a href="https://t.me/Terminal_Heat_Sink" target="_blank" rel="noopener" class="support-contact">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
                @Terminal_Heat_Sink
              </a>
              <a href="mailto:anthonyjones1a5@gmail.com" class="support-contact">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                anthonyjones1a5@gmail.com
              </a>
            </div>
          </div>
          <div class="support-card support-card-donate">
            <h3>Donate</h3>
            <p>If BtKBi has saved you time or money, a small donation helps keep the project alive.</p>
            <a href="https://paypal.me/artiomSudo" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:20px">
              Donate via PayPal ↗
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const features = [
  {
    icon: '⌨️',
    title: 'Ducky Script Scripting',
    desc: 'Write scripts in a simple language inspired by Ducky Script — automate shutdowns, AFK loops, credential typing and more.',
  },
  {
    icon: '🖱️',
    title: 'Mouse Input',
    desc: 'Control mouse movement, clicks, and scroll — not just keyboard. Full HID support for both pointer and keyboard.',
  },
  {
    icon: '🔐',
    title: 'App-Layer Encryption',
    desc: 'X25519 + AES-256-GCM + HMAC-PSK. Each device gets a unique PSK on provisioning — far stronger than Bluetooth pairing.',
  },
  {
    icon: '🪪',
    title: 'Custom USB Identity',
    desc: 'Set custom VID, PID, manufacturer, and serial number. Blend in with known USB devices on locked-down corporate machines.',
  },
  {
    icon: '🌍',
    title: 'Multi-layout Support',
    desc: 'en-GB and en-US keyboard layouts, with proper macOS vs. other OS handling. Fixes the InputStick macOS layout problem.',
  },
  {
    icon: '⏱️',
    title: 'Human-like Delays',
    desc: 'Configure random hold and gap delays per keystroke to mimic human typing. Set to 0ms for maximum speed.',
  },
  {
    icon: '📱',
    title: 'Multiple Profiles',
    desc: 'Switch between device profiles with a special BLE command. Use one profile for Windows and another for macOS.',
  },
  {
    icon: '🌐',
    title: 'Browser Flasher',
    desc: 'Flash firmware directly from Chrome with no special tools. Uses esp-web-tools for a seamless update experience.',
  },
  {
    icon: '🖥️',
    title: 'Desktop Pipe Support',
    desc: 'Pipe any command output to a device. `cat file.txt | python send_ble.py --device home` types the whole file.',
  },
  {
    icon: '🔒',
    title: 'Device Provisioning',
    desc: 'Secure devices with a secret PSK on first use. Re-provision or factory reset wirelessly or via the browser flasher.',
  },
]

const screenshots = [
  { src: '/btkbi/images/app-devices.jpg', caption: 'Devices — connected devices & firmware versions' },
  { src: '/btkbi/images/app-scripts.jpg', caption: 'Scripts — saved Ducky-style scripts' },
  { src: '/btkbi/images/app-trackpad.jpg', caption: 'Trackpad — mouse movement & clicks' },
  { src: '/btkbi/images/app-keyboard.jpg', caption: 'Keyboard — full-sized keyboard input' },
  { src: '/btkbi/images/app-settings.jpg', caption: 'Settings — layout, OS, delays, mouse' },
  { src: '/btkbi/images/app-provison-settings.jpg', caption: 'Provisioning — alias, BLE name, VID/PID' },
]

const videos = [
  {
    id: '0352EBYf0WQ',
    url: 'https://youtu.be/0352EBYf0WQ',
    title: 'Demo & overview — using the Android app with 3 devices',
  },
  {
    id: 'rXeKqmdbbFM',
    url: 'https://youtu.be/rXeKqmdbbFM',
    title: 'How to update firmware & factory reset via Chrome browser',
  },
]

onMounted(() => {
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
</script>

<style scoped>
/* ── Layout ────────────────────────────────────────────────────── */
.btkbi-page {
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
  max-width: 600px;
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

/* ── Hero ──────────────────────────────────────────────────────── */
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  text-align: center;
  gap: 64px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-logo {
  width: 72px;
  height: 72px;
  margin-bottom: 28px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08);
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
  max-width: 580px;
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.link {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Flow diagram ──────────────────────────────────────────────── */
.hero-flow {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeUp 0.7s 0.15s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.flow-node {
  padding: 10px 20px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
}

.flow-node-accent {
  border-color: var(--color-accent-border);
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  color: var(--color-text-muted);
}

.flow-label {
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  white-space: nowrap;
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

/* ── Screenshots ─────────────────────────────────────────────── */
.screenshots-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  margin-top: 40px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.screenshots-scroll::-webkit-scrollbar {
  height: 4px;
}

.screenshots-scroll::-webkit-scrollbar-track {
  background: var(--color-border);
  border-radius: 2px;
}

.screenshots-scroll::-webkit-scrollbar-thumb {
  background: var(--color-hover-border);
  border-radius: 2px;
}

.screenshot-card {
  flex: 0 0 auto;
  width: 220px;
  scroll-snap-align: start;
}

.screenshot-card img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  display: block;
  transition: border-color var(--transition);
}

.screenshot-card:hover img {
  border-color: var(--color-hover-border);
}

.screenshot-card figcaption {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 10px;
  text-align: center;
  line-height: 1.4;
}

/* ── Hardware ────────────────────────────────────────────────── */
.hardware-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hardware-desc {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.hardware-list {
  list-style: none;
  padding: 0;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hardware-list li {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  padding-left: 16px;
  position: relative;
}

.hardware-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-accent-text);
}

.hardware-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.hardware-list code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
}

.affiliate-note {
  font-size: 0.7rem;
  color: var(--color-text-faint);
}

.hardware-image-wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.hardware-image {
  width: 100%;
  display: block;
}

/* ── Videos ──────────────────────────────────────────────────── */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
}

.video-title {
  padding: 14px 16px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* ── Security ────────────────────────────────────────────────── */
.security-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.security-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.security-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 14px;
}

.security-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.security-card p {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── OSS quote ───────────────────────────────────────────────── */
.oss-quote {
  margin-top: 40px;
  padding: 28px 32px;
  border-left: 3px solid var(--color-accent-border);
  background: var(--color-accent-dim);
  border-radius: 0 12px 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.oss-quote p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.75;
  margin: 0;
}

/* ── Support ─────────────────────────────────────────────────── */
.support-inner {
  text-align: center;
}

.support-inner .section-title,
.support-inner .section-sub {
  margin-left: auto;
  margin-right: auto;
}

.support-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
  text-align: left;
}

.support-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.support-card-donate {
  border-color: var(--color-accent-border);
  background: var(--color-accent-dim);
}

.support-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 16px;
}

.support-price {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 4px;
}

.support-price span {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

.support-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-top: 16px;
}

.support-contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.support-contact {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  color: var(--color-accent-text);
  text-decoration: none;
  transition: opacity var(--transition);
}

.support-contact:hover {
  opacity: 0.75;
}

.support-card-donate p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.65;
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

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero-flow {
    gap: 4px;
  }

  .flow-label {
    display: none;
  }

  .hardware-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hardware-image-wrap {
    order: -1;
  }

  .section {
    padding: 64px 20px;
  }
}
</style>
