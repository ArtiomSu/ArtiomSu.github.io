<template>
  <div class="router-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Open Source · Written in C</span>
        <h1 class="hero-title">QMK Raw HID Router</h1>
        <p class="hero-sub">
          A lightweight router that forwards raw HID packets between QMK devices — letting your keyboard control your trackball's DPI, LEDs, scroll speed, and more. Runs at <strong>0% CPU</strong> with just <strong>0.5 MB RAM</strong>.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/QMK-Raw-HID-Router" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://github.com/ArtiomSu/QMK-Raw-HID-Router/releases" target="_blank" rel="noopener" class="btn btn-secondary">
            Releases ↗
          </a>
        </div>
        <div class="stat-row">
          <div v-for="s in stats" :key="s.label" class="stat-item">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Architecture</p>
        <h2 class="section-title">How it works</h2>
        <p class="section-sub">
          The router sits on your PC, listening for raw HID packets from any connected QMK device and forwarding them to the correct target — all based on the VID/PID fields in each packet.
        </p>
        <div class="flow-diagram">
          <div class="flow-node">
            <span class="flow-node-icon">⌨️</span>
            <span class="flow-node-label">QMK Keyboard</span>
            <span class="flow-node-sub">Sends packet with target VID/PID</span>
          </div>
          <div class="flow-arrow-wrap">
            <svg class="flow-arrow-svg" viewBox="0 0 60 20" fill="none"><path d="M2 10h52M46 4l8 6-8 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="flow-arrow-label">Raw HID</span>
          </div>
          <div class="flow-node flow-node-accent">
            <span class="flow-node-icon">🔀</span>
            <span class="flow-node-label">QMK Raw HID Router</span>
            <span class="flow-node-sub">Runs on PC, routes packets</span>
          </div>
          <div class="flow-arrow-wrap">
            <svg class="flow-arrow-svg" viewBox="0 0 60 20" fill="none"><path d="M2 10h52M46 4l8 6-8 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="flow-arrow-label">Forwarded HID</span>
          </div>
          <div class="flow-node">
            <span class="flow-node-icon">🖱️</span>
            <span class="flow-node-label">QMK Trackball</span>
            <span class="flow-node-sub">Receives and acts on packet</span>
          </div>
        </div>
        <p class="flow-note">
          The router also supports sending info strings back to the PC (e.g. current DPI readout) and broadcasting packets to all connected devices at once.
        </p>
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

    <!-- ─── INSTALLATION ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Installation</p>
        <h2 class="section-title">Get up and running</h2>
        <div class="install-grid">
          <div v-for="p in platforms" :key="p.name" class="install-card reveal">
            <div class="install-header">
              <span class="install-icon">{{ p.icon }}</span>
              <h3 class="install-name">{{ p.name }}</h3>
            </div>
            <p v-if="p.dep" class="install-dep">Install dependency first:</p>
            <div v-if="p.dep" class="code-block">
              <pre><code>{{ p.dep }}</code></pre>
            </div>
            <p class="install-dep">Compile:</p>
            <div class="code-block">
              <pre><code>{{ p.compile }}</code></pre>
            </div>
            <p v-if="p.note" class="install-note">{{ p.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CLI USAGE ────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">CLI Reference</p>
        <h2 class="section-title">Running the router</h2>
        <p class="section-sub">After compiling, a few flags cover most use cases.</p>
        <div class="cli-grid">
          <div v-for="c in cliFlags" :key="c.flag" class="cli-card reveal">
            <div class="code-block cli-code-block">
              <pre><code>{{ c.flag }}</code></pre>
            </div>
            <p class="cli-desc">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── QMK DEVICE SETUP ─────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">QMK Integration</p>
        <h2 class="section-title">Setting up your QMK device</h2>
        <p class="section-sub">
          The router uses QMK's <a href="https://docs.qmk.fm/features/rawhid" target="_blank" rel="noopener" class="link">Raw HID feature</a>. An example implementation is included in the repo under <code>qmk_keyboard_example/</code>.
        </p>
        <div class="setup-steps">
          <div v-for="(step, i) in setupSteps" :key="i" class="setup-step reveal">
            <span class="step-num">{{ i + 1 }}</span>
            <div class="step-body">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc" v-html="step.desc"></p>
            </div>
          </div>
        </div>
        <div class="examples-note reveal">
          <p class="section-label" style="margin-bottom:16px">Reference implementations</p>
          <div class="examples-grid">
            <a v-for="ex in refExamples" :key="ex.label" :href="ex.url" target="_blank" rel="noopener" class="example-link">
              <span>{{ ex.label }}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LINUX UDEV FIX ───────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Linux</p>
        <h2 class="section-title">Cannot open HID device fix</h2>
        <p class="section-sub">
          On Linux, raw HID devices may require a udev rule before the router can access them.
        </p>
        <div class="code-block">
          <pre><code># Create the udev rules file
sudo tee /usr/lib/udev/rules.d/99-usb-qmk-raw-hid.rules &lt;&lt;'EOF'
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", MODE="0666", TAG+="uaccess", TAG+="udev-acl"
EOF

sudo chmod 644 /usr/lib/udev/rules.d/99-usb-qmk-raw-hid.rules
sudo udevadm control --reload-rules
sudo udevadm trigger</code></pre>
        </div>
      </div>
    </section>

    <!-- ─── PROTOCOL ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Protocol</p>
        <h2 class="section-title">Routing protocol</h2>
        <p class="section-sub">
          The router forwards packets largely untouched, swapping <code>to_vid</code>/<code>to_pid</code> with the sender's identity so the receiving device knows who sent the packet.
        </p>
        <div class="protocol-cards">
          <div v-for="p in protocolNotes" :key="p.title" class="protocol-card reveal">
            <h3 class="protocol-title">{{ p.title }}</h3>
            <p class="protocol-desc">{{ p.desc }}</p>
            <div v-if="p.code" class="code-block" style="margin-top:12px">
              <pre><code>{{ p.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── VIDEO ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Video</p>
        <h2 class="section-title">Installation and configuration</h2>
        <div class="video-wrap">
          <a href="https://www.youtube.com/watch?v=Ub4ZDhWJpAE" target="_blank" rel="noopener" class="video-card">
            <div class="video-thumb">
              <img src="https://img.youtube.com/vi/Ub4ZDhWJpAE/hqdefault.jpg" alt="QMK Raw HID Router — Installation and Configuration" loading="lazy" />
              <div class="video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </div>
            </div>
            <p class="video-title">Installation and Configuration — adding this to the Ploopy Adept trackball</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">Built to work together</h2>
        <div class="related-grid">
          <router-link to="/mana-ball-track-ball" class="related-card">
            <h3>Mana Ball Trackball</h3>
            <p>The open-source 3D-printable RGB trackball that uses this router for real-time DPI, scroll speed, and LED configuration.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/dactyl-manuform-5x7" class="related-card">
            <h3>Dactyl Manuform 5×7</h3>
            <p>The handwired split ergonomic keyboard that pairs with the Mana Ball — uses this router to send control packets to the trackball.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const stats = [
  { value: '0%', label: 'CPU Usage' },
  { value: '0.5 MB', label: 'RAM Usage' },
  { value: 'C', label: 'Language' },
  { value: '3', label: 'Platforms' },
]

const features = [
  {
    icon: '🔀',
    title: 'Packet Routing',
    desc: 'Forwards raw HID packets between QMK devices based on target VID/PID — no special hardware required.',
  },
  {
    icon: '⚡',
    title: 'Near-zero Overhead',
    desc: '0% CPU usage and just 0.5 MB RAM. Runs silently in the background without impacting your system.',
  },
  {
    icon: '🔌',
    title: 'Hot-swap Support',
    desc: 'Automatically detects devices being plugged in or unplugged and refreshes the device list every 10 seconds.',
  },
  {
    icon: '📢',
    title: 'Broadcast Messages',
    desc: 'Send a single packet from one device to all connected QMK devices simultaneously using the broadcast VID/PID (0xFFFF).',
  },
  {
    icon: '🖥️',
    title: 'PC Info Packets',
    desc: 'QMK devices can send informational strings (e.g. current DPI) directly to the PC for display, using the reserved PC VID/PID (0x0000).',
  },
  {
    icon: '🪟',
    title: 'Cross-platform',
    desc: 'Runs on Linux, macOS, and Windows. Pre-compiled Windows binary available in GitHub Releases.',
  },
  {
    icon: '🔧',
    title: 'Configurable Latency',
    desc: 'Default 10 ms polling — drop to 1 ms for faster response with still zero CPU impact.',
  },
  {
    icon: '🐛',
    title: 'Verbose Logging',
    desc: 'Use -vv to dump raw packets for debugging. Quickly identify dropped packets or misconfigured VID/PID pairs.',
  },
]

const platforms = [
  {
    name: 'Linux',
    icon: '🐧',
    dep: 'pacman -Sy hidapi',
    compile: 'gcc qmk_hid_router.c qmk_hid_router_utilities.c qmk_hid_router_protocol.c \\\n  -o qmk_hid_router \\\n  -I/usr/include/hidapi -lhidapi-hidraw',
    note: null,
  },
  {
    name: 'macOS',
    icon: '🍎',
    dep: 'brew install hidapi',
    compile: 'gcc qmk_hid_router.c qmk_hid_router_utilities.c qmk_hid_router_protocol.c \\\n  -o qmk_hid_router \\\n  -I/opt/homebrew/include/hidapi \\\n  -L/opt/homebrew/lib -lhidapi',
    note: null,
  },
  {
    name: 'Windows',
    icon: '🪟',
    dep: null,
    compile: 'gcc qmk_hid_router.c qmk_hid_router_utilities.c qmk_hid_router_protocol.c \\\n  -o qmk_hid_router \\\n  -I./hidapi-win/include \\\n  -L./hidapi-win/x64 -lhidapi',
    note: 'Download hidapi zip from github.com/libusb/hidapi/releases and extract to hidapi-win/. Install MinGW via Chocolatey (choco install mingw). Place hidapi.dll next to the compiled .exe. Pre-compiled binary available in GitHub Releases.',
  },
]

const cliFlags = [
  { flag: './qmk_hid_router --show', desc: 'List all detected QMK HID devices.' },
  { flag: './qmk_hid_router -vv', desc: 'Enable verbose logging — dumps raw packets for debugging.' },
  { flag: './qmk_hid_router -r 1', desc: 'Set polling latency to 1 ms (default: 10 ms). Still 0% CPU impact.' },
  { flag: './qmk_hid_router --no-refresh', desc: 'Disable automatic device-list refresh. Recommended on Windows to avoid memory leaks.' },
  { flag: './qmk_hid_router --help', desc: 'Print the full help menu.' },
  { flag: './qmk_hid_router -vv -r 1 --no-refresh', desc: 'Combine multiple flags freely.' },
]

const setupSteps = [
  {
    title: 'Enable Raw HID in your keymap',
    desc: 'Add <code>RAW_ENABLE = yes</code> to your <code>rules.mk</code> and set a custom usage page in <code>config.h</code> so the router can identify your device.',
  },
  {
    title: 'Copy the example client files',
    desc: 'Copy <code>raw_hid_client.h</code> and <code>raw_hid_client.c</code> from <code>qmk_keyboard_example/</code> into your own keymap folder.',
  },
  {
    title: 'Set a unique VID/PID',
    desc: 'Configure a unique <code>vid</code> and <code>pid</code> in your <code>keyboard.json</code>. Each device must differ — this acts like a network address in the routing protocol.',
  },
  {
    title: 'Send packets in macros',
    desc: 'Use the provided client API to send <code>qmk_hid_packet</code> structs. Set the <code>to_vid</code>/<code>to_pid</code> to the target device, or use <code>0xFFFF</code> to broadcast to all.',
  },
]

const refExamples = [
  { label: 'TrackBall firmware', url: 'https://github.com/ArtiomSu/qmk_firmware/tree/artiomsu_trackball/keyboards/artiomsu_trackball' },
  { label: 'Dactyl Manuform firmware', url: 'https://github.com/ArtiomSu/qmk_firmware/tree/artiom_dactyl/keyboards/artiomsu_dactyl' },
  { label: 'Ploopy Adept firmware', url: 'https://github.com/ArtiomSu/qmk_firmware/tree/artiomsu_ploopy_adept/keyboards/ploopy_adept' },
]

const protocolNotes = [
  {
    title: 'Packet structure',
    desc: 'Packets follow the qmk_hid_packet struct defined in qmk_hid_router.h. The payload and operation fields are yours to define — the router only inspects operation when it is HID_RAW_OP_INFO (display string on PC). Pico-based devices use 32-byte packets; other MCUs can use 64.',
    code: null,
  },
  {
    title: 'Sender identity',
    desc: 'When the router forwards a packet, it rewrites to_vid and to_pid with the sending device\'s identity. The receiving device therefore always knows the source without needing a separate field, freeing up 4 bytes for payload.',
    code: null,
  },
  {
    title: 'PC target (0x0000)',
    desc: 'Addressed to the PC itself — the router displays the payload as a text string rather than forwarding it. Use this for status readouts.',
    code: 'struct raw_hid_client pc = {0x0000, 0x0000};',
  },
  {
    title: 'Broadcast (0xFFFF)',
    desc: 'Delivered to every connected QMK device. The to_vid/to_pid remains 0xFFFF so receiving devices can distinguish a broadcast from a direct packet and opt out if needed.',
    code: 'struct raw_hid_client broadcast = {0xffff, 0xffff};',
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
.router-page {
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

.section-sub code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
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
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
  max-width: 720px;
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

.hero-sub strong {
  color: var(--color-text);
  font-weight: 600;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 48px;
}

/* ── Stats ─────────────────────────────────────────────────────── */
.stat-row {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.03em;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

/* ── Flow diagram ──────────────────────────────────────────────── */
.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  margin-bottom: 32px;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: center;
  min-width: 160px;
}

.flow-node-accent {
  border-color: var(--color-accent-border);
  background: var(--color-accent-dim);
}

.flow-node-icon {
  font-size: 1.8rem;
}

.flow-node-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
}

.flow-node-sub {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.flow-arrow-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  color: var(--color-text-muted);
}

.flow-arrow-svg {
  width: 60px;
  height: 20px;
}

.flow-arrow-label {
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.flow-note {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 640px;
  padding: 16px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
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

/* ── Code blocks ───────────────────────────────────────────────── */
.code-block {
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

/* ── Installation ──────────────────────────────────────────────── */
.install-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.install-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.install-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.install-icon {
  font-size: 1.4rem;
}

.install-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.install-dep {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: -4px;
}

.install-note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── CLI ───────────────────────────────────────────────────────── */
.cli-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.cli-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.cli-code-block {
  flex-shrink: 0;
}

.cli-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── Setup steps ───────────────────────────────────────────────── */
.setup-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.setup-step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}

.step-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

.step-desc code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
}

.examples-note {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.examples-grid {
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

/* ── Protocol ──────────────────────────────────────────────────── */
.protocol-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.protocol-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.protocol-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.protocol-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Video ───────────────────────────────────────────────────── */
.video-wrap {
  margin-top: 40px;
  max-width: 580px;
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

.related-card:hover {
  border-color: var(--color-hover-border);
}

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
  .section {
    padding: 64px 20px;
  }

  .flow-diagram {
    flex-direction: column;
    gap: 8px;
  }

  .flow-arrow-wrap {
    transform: rotate(90deg);
    padding: 4px 0;
  }

  .stat-row {
    gap: 20px;
  }
}
</style>
