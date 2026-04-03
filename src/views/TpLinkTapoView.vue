<template>
  <div class="tapo-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">TypeScript · Node.js · Express · Raspberry Pi</span>
        <h1 class="hero-title">TP-Link Tapo Tools</h1>
        <p class="hero-sub">
          A self-hosted smart home controller running on a Raspberry Pi — controlling plugs, bulbs, and LED strips over a segregated guest Wi-Fi network with a REST API, a web UI, a terminal monitor, and a Python screen-colour sync script.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/TP-Link-Tapo-Pi" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://www.youtube.com/watch?v=wu_cVN6Noyg" target="_blank" rel="noopener" class="btn btn-secondary">
            Video demo ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── NETWORK CONCEPT ──────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Architecture</p>
        <h2 class="section-title">Network-isolated smart home</h2>
        <p class="section-sub">
          Tapo devices live on a guest Wi-Fi network — unreachable from the main LAN. The Raspberry Pi bridges both: its ethernet port faces the main network (where the API is exposed), and its Wi-Fi adapter faces the guest network (where it sends commands). No Tapo device ever has direct internet access.
        </p>
        <div class="arch-grid">
          <div v-for="n in networkNodes" :key="n.label" class="arch-card reveal">
            <span class="arch-icon">{{ n.icon }}</span>
            <div>
              <h3 class="arch-card-title">{{ n.label }}</h3>
              <p class="arch-card-desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Features</p>
        <h2 class="section-title">What it does</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SUPPORTED DEVICES ────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Hardware</p>
        <h2 class="section-title">Supported Tapo devices</h2>
        <div class="devices-grid">
          <div v-for="d in devices" :key="d.model" class="device-card reveal">
            <div class="device-model">{{ d.model }}</div>
            <div class="device-name">{{ d.name }}</div>
            <div class="device-caps">
              <span v-for="c in d.caps" :key="c" class="cap-chip">{{ c }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── REST API ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">REST API</p>
        <h2 class="section-title">API endpoints</h2>
        <p class="section-sub">All endpoints are served by Express on the bind address you set in <code class="inline-code">.env</code>. Requests from the guest network cannot reach it.</p>
        <div class="api-table reveal">
          <div class="api-row api-header">
            <span>Method</span><span>Path</span><span>Description</span>
          </div>
          <div v-for="e in apiEndpoints" :key="e.path" class="api-row">
            <span class="api-method" :class="e.method.toLowerCase()">{{ e.method }}</span>
            <code class="api-path">{{ e.path }}</code>
            <span class="api-desc">{{ e.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CONFIG ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Setup</p>
        <h2 class="section-title">Configuration</h2>
        <p class="section-sub">Two files are required before starting: a <code class="inline-code">.env</code> for credentials and a <code class="inline-code">config.json</code> listing every device.</p>
        <div class="config-cols">
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">.env</span></div>
            <div class="code-block"><pre><code>{{ envExample }}</code></pre></div>
          </div>
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">config.json (excerpt)</span></div>
            <div class="code-block"><pre><code>{{ configExample }}</code></pre></div>
          </div>
        </div>
        <div class="config-notes reveal">
          <div v-for="note in configNotes" :key="note.field" class="config-note">
            <code class="inline-code">{{ note.field }}</code>
            <span class="note-text">{{ note.note }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SETUP STEPS ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Installation</p>
        <h2 class="section-title">Getting started</h2>
        <div class="steps-list">
          <div v-for="s in setupSteps" :key="s.num" class="step-row reveal">
            <div class="step-num-badge">{{ s.num }}</div>
            <div class="step-content">
              <p class="step-desc" v-html="s.desc"></p>
              <div v-if="s.code" class="code-card step-code">
                <div class="code-block"><pre><code>{{ s.code }}</code></pre></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SCREEN TO BULBS ──────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Bonus feature</p>
        <h2 class="section-title">Screen to Bulbs</h2>
        <p class="section-sub">
          A Python script that samples the average colour of a configurable region of your screen every half-second and pushes the resulting hue to any number of bulbs or LED strips via the API. Great for ambient lighting that reacts to what's on screen.
        </p>
        <div class="screen-grid">
          <div v-for="s in screenSteps" :key="s.title" class="screen-card reveal">
            <span class="screen-icon">{{ s.icon }}</span>
            <h3 class="screen-title">{{ s.title }}</h3>
            <p class="screen-desc">{{ s.desc }}</p>
          </div>
        </div>
        <div class="code-card reveal" style="margin-top:24px">
          <div class="code-header"><span class="code-lang">Install &amp; run screenToBulbs.py</span></div>
          <div class="code-block"><pre><code>{{ screenInstall }}</code></pre></div>
        </div>
      </div>
    </section>

    <!-- ─── SYSTEMD ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Production</p>
        <h2 class="section-title">Run as a systemd service</h2>
        <p class="section-sub">
          The included <code class="inline-code">tapoSystemd.service</code> runs <code class="inline-code">getIps.sh</code> and <code class="inline-code">genRoutes.js</code> before starting the Express API — so IP mapping and network routes are always fresh on each boot.
        </p>
        <div class="code-card reveal">
          <div class="code-header"><span class="code-lang">Enable the service</span></div>
          <div class="code-block"><pre><code>{{ systemdCommands }}</code></pre></div>
        </div>
      </div>
    </section>

    <!-- ─── VIDEO ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Demo</p>
        <h2 class="section-title">Video guide &amp; demo</h2>
        <div class="video-wrap">
          <a href="https://www.youtube.com/watch?v=wu_cVN6Noyg" target="_blank" rel="noopener" class="video-card reveal">
            <div class="video-thumb">
              <img src="https://img.youtube.com/vi/wu_cVN6Noyg/hqdefault.jpg" alt="TP-Link Tapo Tools video guide and demo" loading="lazy" />
              <div class="video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </div>
            </div>
            <p class="video-title">Setup guide &amp; full demo — web UI, CLI monitor, screen-to-bulbs</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">Part of the home automation setup</h2>
        <div class="related-grid">
          <router-link to="/pi-access-point" class="related-card">
            <h3>Pi WiFi AP + VPN + Pi-Hole</h3>
            <p>The Raspberry Pi network setup this project runs on — dual-NIC routing, WireGuard VPN, and Pi-Hole DNS filtering on the same Pi.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/ssupss" class="related-card">
            <h3>SSUPSS</h3>
            <p>Smart server UPS shutdown script — another Pi-based script that listens for power events and gracefully shuts down services, including this one.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/qmk-prog-buttons" class="related-card">
            <h3>QMK Programmable Buttons</h3>
            <p>The Rust daemon that sends HTTP POST requests to this API from macro keys — toggling lights and IR blaster directly from the keyboard.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const networkNodes = [
  {
    icon: '🌐',
    label: 'Main LAN (Ethernet)',
    desc: 'Where your computers and phone live. The Express API is bound to this interface only — no Tapo device can reach it.',
  },
  {
    icon: '🍓',
    label: 'Raspberry Pi 2B',
    desc: 'Runs the Node.js server. One foot on each network: ethernet to the main LAN, Wi-Fi to the guest network.',
  },
  {
    icon: '📡',
    label: 'Guest Wi-Fi',
    desc: 'Isolated network where all Tapo smart devices live. The Pi generates iptables routes so only it can forward traffic in and out.',
  },
  {
    icon: '💡',
    label: 'Tapo Devices',
    desc: 'Plugs, bulbs, and LED strips that receive commands from the Pi. Completely cut off from the internet and the main LAN.',
  },
]

const features = [
  {
    icon: '🌐',
    title: 'REST API',
    desc: 'Express server exposes endpoints for power toggles, colour control, brightness, and colour temperature — callable from any device on the main network.',
  },
  {
    icon: '🖥️',
    title: 'Web UI',
    desc: 'A simple JS frontend served by the same Express instance. Toggle switches, colour wheels (via iro.js), and live device status cards in the browser.',
  },
  {
    icon: '📟',
    title: 'CLI monitor',
    desc: 'Run `npm run monitor` for a terminal table showing device name, type, power state, energy usage, and last-seen time — no browser needed.',
  },
  {
    icon: '🔗',
    title: 'API + CLI mode',
    desc: 'Start the server, then run `monitorClient.js` separately. The CLI queries the running API — giving you both the web UI and the terminal view at once.',
  },
  {
    icon: '🎨',
    title: 'Screen to Bulbs',
    desc: 'Python script that captures the average colour of a screen region and pushes it to bulbs every 500ms — instant ambient lighting sync.',
  },
  {
    icon: '📍',
    title: 'MAC-based IP tracking',
    desc: 'Run `getIps.sh` to scan the network and build an IP→MAC map. The API resolves device IPs from MAC addresses so they survive DHCP reassignments.',
  },
  {
    icon: '⚡',
    title: 'Energy monitoring',
    desc: 'P110 smart plugs report live watt draw, today\'s Wh usage, and monthly energy — surfaced in both the web UI and CLI monitor.',
  },
  {
    icon: '🔄',
    title: 'Auto-reinitialise',
    desc: 'Devices that fail to initialise on startup are tracked and retried via `/api/reinitialise` — useful when a bulb is temporarily unreachable.',
  },
  {
    icon: '🔒',
    title: 'Network isolation',
    desc: 'Binding the API to a specific interface IP and running Tapo devices on a guest network keeps your smart devices off the internet by default.',
  },
]

const devices = [
  { model: 'P100 / P105', name: 'Smart Plug (no energy monitoring)', caps: ['power'] },
  { model: 'P110', name: 'Smart Plug with Energy Monitoring', caps: ['power', 'energy'] },
  { model: 'L510E', name: 'Smart Bulb (dimmable white)', caps: ['power', 'brightness'] },
  { model: 'L530 / L530E', name: 'Smart Bulb (colour)', caps: ['power', 'brightness', 'colour', 'colour temp'] },
  { model: 'L900', name: 'Smart LED Strip', caps: ['power', 'brightness', 'colour', 'colour temp'] },
]

const apiEndpoints = [
  { method: 'GET',  path: '/api/initialise',          desc: 'Connect to all devices from config.json' },
  { method: 'GET',  path: '/api/status',              desc: 'Return current info for all devices' },
  { method: 'GET',  path: '/api/update',              desc: 'Poll all devices for fresh state' },
  { method: 'GET',  path: '/api/update/:id',          desc: 'Poll a single device by device_id' },
  { method: 'GET',  path: '/api/reinitialise',        desc: 'Retry initialisation for failed devices' },
  { method: 'GET',  path: '/api/toggle/:id',          desc: 'Toggle device power on/off' },
  { method: 'POST', path: '/api/setcolor/:id',        desc: 'Set hue + saturation (bulbs & strips)' },
  { method: 'POST', path: '/api/setcolortemperature/:id', desc: 'Set colour temperature in Kelvin' },
  { method: 'POST', path: '/api/setcolorbrightness/:id',  desc: 'Set brightness 1–100' },
  { method: 'GET',  path: '/api/restart-systemd',     desc: 'Restart the tapoSystemd service remotely' },
]

const envExample = `API_PASS="your-tapo-account-password"
API_EMAIL="your-tapo-account@email.com"
TIMEOUT="1500"
PORT="3000"
BIND_ADDRESS="10.0.0.2"`

const configExample = `[
  {
    "name": "Laptop",
    "ip": "192.168.189.15",
    "mac": "AB:CD:EF:FE:ED:EE",
    "type": "plug",
    "permissions": ["power"]
  },
  {
    "name": "Office",
    "ip": "192.168.189.13",
    "mac": "FF:AA:BB:11:22:33",
    "type": "bulb",
    "update_interval": 5000,
    "permissions": ["power", "color"]
  }
]`

const configNotes = [
  { field: 'type',             note: 'Required. One of: "plug", "bulb", "led_strip"' },
  { field: 'permissions',      note: '"power" to toggle on/off; "color" to change colour/brightness' },
  { field: 'mac',              note: 'Optional but recommended — immune to DHCP IP changes' },
  { field: 'timeout',          note: 'Per-device override in ms (useful for devices far from the AP)' },
  { field: 'update_interval',  note: 'How often (ms) the server polls this device for status' },
  { field: 'hidden',           note: 'Set true to exclude a device from the API entirely' },
  { field: 'pass / email',     note: 'Per-device credentials if different from .env values' },
]

const setupSteps = [
  {
    num: 1,
    desc: 'Install system dependencies on the Pi.',
    code: 'sudo apt install nodejs nmap jq arping\n\nVERSION=v4.40.3\nBINARY=yq_linux_arm\nwget https://github.com/mikefarah/yq/releases/download/${VERSION}/${BINARY}.tar.gz \\\n  -O - | tar xz && sudo mv ${BINARY} /usr/bin/yq',
  },
  {
    num: 2,
    desc: 'Clone the repo, then create <code class="inline-code">.env</code> and <code class="inline-code">config.json</code> in the project root (see configuration section above).',
  },
  {
    num: 3,
    desc: 'Scan the network to build the MAC→IP map. Run this again whenever device IPs change.',
    code: './getIps.sh',
  },
  {
    num: 4,
    desc: 'Generate iptables rules to forward traffic between the two network interfaces. Re-run after every reboot if not using systemd.',
    code: 'node genRoutes.js',
  },
  {
    num: 5,
    desc: 'Build and start the server. The web UI is available at <code class="inline-code">http://&lt;BIND_ADDRESS&gt;:&lt;PORT&gt;</code>.',
    code: 'npm install && npm run server',
  },
]

const screenSteps = [
  {
    icon: '📸',
    title: 'Captures screen region',
    desc: 'pyautogui samples a configurable (x, y) centre point every 500ms. Adjust the coordinates in the script to match your monitor setup.',
  },
  {
    icon: '🎨',
    title: 'Converts to HSV',
    desc: 'The average RGB of the sampled region is converted to hue/saturation via colorsys — smoothed slightly to avoid rapid flickering.',
  },
  {
    icon: '💡',
    title: 'Pushes to the API',
    desc: 'A POST request is sent to /api/setcolor/:id for each device ID you list in the script. Targets any mix of bulbs and LED strips.',
  },
]

const screenInstall = `python -m venv venv
./venv/bin/pip3 install pyautogui requests

# Edit the script to set your API URL and device IDs first
./venv/bin/python3 ./screenToBulbs.py`

const systemdCommands = `sudo cp tapoSystemd.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable tapoSystemd.service
sudo systemctl start tapoSystemd.service`

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
/* ── Layout ─────────────────────────────────────────────────────── */
.tapo-page {
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
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

/* ── Arch ───────────────────────────────────────────────────────── */
.arch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.arch-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 22px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.arch-card:hover { border-color: var(--color-hover-border); }

.arch-icon { font-size: 1.5rem; flex-shrink: 0; }

.arch-card-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 6px;
}
.arch-card-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
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

.feature-icon { font-size: 1.4rem; display: block; margin-bottom: 12px; }
.feature-title { font-size: 0.9rem; font-weight: 600; color: var(--color-text); margin-bottom: 8px; }
.feature-desc  { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.65; }

/* ── Devices ────────────────────────────────────────────────────── */
.devices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
}

.device-card {
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.device-card:hover { border-color: var(--color-hover-border); }

.device-model {
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-accent-text);
  margin-bottom: 4px;
}
.device-name {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-bottom: 12px;
  line-height: 1.4;
}
.device-caps {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cap-chip {
  padding: 2px 8px;
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: 100px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
}

/* ── API table ──────────────────────────────────────────────────── */
.api-table {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.api-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  gap: 16px;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.82rem;
}
.api-row:last-child { border-bottom: none; }
.api-header {
  background: var(--color-surface);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.api-method {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  text-transform: uppercase;
  width: fit-content;
}
.api-method.get  { background: rgba(34,197,94,0.12);  color: #22c55e; }
.api-method.post { background: rgba(59,130,246,0.12); color: #3b82f6; }

.api-path {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.77rem;
  color: var(--color-accent-text);
}

.api-desc { color: var(--color-text-muted); }

/* ── Code ───────────────────────────────────────────────────────── */
.inline-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0,0,0,0.15));
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--color-accent-text);
}

:deep(.inline-code) {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0,0,0,0.15));
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--color-accent-text);
}

.code-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
}
.code-lang {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.code-block { overflow-x: auto; }
.code-block pre { margin: 0; padding: 16px; }
.code-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  white-space: pre;
}

/* ── Config ─────────────────────────────────────────────────────── */
.config-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.config-notes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.config-note {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 0.82rem;
}
.note-text { color: var(--color-text-muted); line-height: 1.5; }

/* ── Steps ──────────────────────────────────────────────────────── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-num-badge {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
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

.step-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-desc {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}
.step-code { margin: 0; }

/* ── Screen to Bulbs ────────────────────────────────────────────── */
.screen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.screen-card {
  padding: 22px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.screen-card:hover { border-color: var(--color-hover-border); }

.screen-icon { font-size: 1.4rem; display: block; margin-bottom: 12px; }
.screen-title { font-size: 0.9rem; font-weight: 600; color: var(--color-text); margin-bottom: 8px; }
.screen-desc  { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.65; }

/* ── Video ──────────────────────────────────────────────────────── */
.video-wrap {
  margin-top: 40px;
  max-width: 520px;
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
  background: rgba(0,0,0,0.35);
  color: #fff;
  transition: background var(--transition);
}
.video-card:hover .video-play { background: rgba(0,0,0,0.5); }
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
.related-card h3 { font-size: 0.95rem; font-weight: 600; color: var(--color-text); }
.related-card p  { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.65; flex: 1; }
.related-arrow   { font-size: 0.8rem; font-weight: 600; color: var(--color-accent-text); }

/* ── Keyframe ───────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section   { padding: 64px 20px; }
  .config-cols { grid-template-columns: 1fr; }
  .api-row   { grid-template-columns: 55px 1fr; }
  .api-desc  { display: none; }
}
</style>
