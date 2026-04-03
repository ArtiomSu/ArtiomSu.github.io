<template>
  <div class="ssupss-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Bash · NUT · Debian</span>
        <h1 class="hero-title">Stupid Simple UPS Setup</h1>
        <p class="hero-sub">
          A minimal NUT-based script that monitors your UPS and gracefully shuts down your server when battery charge drops below a configurable threshold — with logging, log rotation, and optional notifications. No surprises, no unexplained shutdowns.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/ssupss" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://www.youtube.com/watch?v=j-guBGFqv5Q" target="_blank" rel="noopener" class="btn btn-secondary">
            Video guide ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── WHY ──────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Background</p>
        <h2 class="section-title">Why this exists</h2>
        <p class="section-sub">The standard NUT monitor setup worked — until it didn't. After about a month the server started randomly shutting down for no apparent reason. Disabling the NUT server stopped it, but the root cause was never found. The solution was to strip out every variable and own the shutdown logic entirely.</p>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SCRIPT ───────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Script overview</p>
        <h2 class="section-title">Key configuration variables</h2>
        <p class="section-sub">Edit the top of <code class="inline-code">checkUps.sh</code> to match your setup. Everything important is in the first few lines.</p>
        <div class="code-card reveal">
          <div class="code-header">
            <span class="code-lang">checkUps.sh</span>
          </div>
          <div class="code-block">
            <pre><code>{{ scriptVars }}</code></pre>
          </div>
        </div>
        <div class="vars-grid">
          <div v-for="v in scriptVarDocs" :key="v.name" class="var-card reveal">
            <code class="var-name">{{ v.name }}</code>
            <p class="var-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SETUP ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Setup guide</p>
        <h2 class="section-title">Step by step</h2>
        <p class="section-sub">Assumes a Debian-based OS and a CyberPower UPS. Other UPS models should work with <code class="inline-code">usbhid-ups</code> as the driver; adjust <code class="inline-code">vendorid</code> and <code class="inline-code">productid</code> accordingly.</p>
        <div class="steps-list">
          <div v-for="step in setupSteps" :key="step.num" class="step-row reveal">
            <div class="step-num-badge">{{ step.num }}</div>
            <div class="step-content">
              <p class="step-desc" v-html="step.desc"></p>
              <div v-if="step.code" class="code-card step-code">
                <div v-if="step.filename" class="code-header">
                  <span class="code-lang">{{ step.filename }}</span>
                </div>
                <div class="code-block">
                  <pre><code>{{ step.code }}</code></pre>
                </div>
              </div>
              <div v-if="step.note" class="step-note">{{ step.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LOG ROTATION ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Log management</p>
        <h2 class="section-title">Log rotation</h2>
        <p class="section-sub">The cron job appends to <code class="inline-code">/var/log/check_ups.log</code> every minute. Without rotation that file grows indefinitely. Create a logrotate config to keep only 3 days worth of compressed logs.</p>
        <div class="two-col">
          <div class="code-card reveal">
            <div class="code-header">
              <span class="code-lang">/etc/logrotate.d/check_ups</span>
            </div>
            <div class="code-block">
              <pre><code>{{ logrotateConfig }}</code></pre>
            </div>
          </div>
          <div class="code-card reveal">
            <div class="code-header">
              <span class="code-lang">Verify the config</span>
            </div>
            <div class="code-block">
              <pre><code>logrotate -d /etc/logrotate.conf</code></pre>
            </div>
            <p class="code-note">The <code class="inline-code">-d</code> flag runs a dry-run and prints what would happen. Check the output to confirm your log file is picked up.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── VIDEO ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Video</p>
        <h2 class="section-title">Setup on a Raspberry Pi</h2>
        <div class="video-wrap">
          <a href="https://www.youtube.com/watch?v=j-guBGFqv5Q" target="_blank" rel="noopener" class="video-card">
            <div class="video-thumb">
              <img src="https://img.youtube.com/vi/j-guBGFqv5Q/hqdefault.jpg" alt="SSUPSS setup on Raspberry Pi" loading="lazy" />
              <div class="video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </div>
            </div>
            <p class="video-title">Setting this up on the Raspberry Pi</p>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const scriptVars = `UPS_NAME="cyberpower"
LOG_PREFIX="NAS UPS"
MIN_PERCENT=30
TEST_MODE=0
SEND_NOTIFICATION=0
USE_FAKE_UPSC_OUTPUT=0`

const logrotateConfig = `/var/log/check_ups.log {
    daily
    rotate 3
    compress
    delaycompress
    missingok
    notifempty
    create 640 root root
}`

const features = [
  {
    icon: '🔋',
    title: 'Threshold shutdown',
    desc: 'Shuts down the server when battery charge drops below MIN_PERCENT while on battery (OB status). Prevents data loss on ZFS and flushes RAM before power is gone.',
  },
  {
    icon: '🛡️',
    title: 'Shutdown guard',
    desc: 'A flag file at /tmp/ups_is_shutting_down prevents duplicate shutdown commands if the cron fires again while a shutdown is already in progress.',
  },
  {
    icon: '📋',
    title: 'Per-minute logging',
    desc: 'Every cron run logs timestamp, UPS status, and battery percentage to /var/log/check_ups.log. Automatic logrotate config keeps it to 3 days.',
  },
  {
    icon: '🔔',
    title: 'Optional notifications',
    desc: 'Set SEND_NOTIFICATION=1 and point SEND_NOTIFICATION at your own script. The author uses a simple Telegram curl — any webhook works.',
  },
  {
    icon: '🧪',
    title: 'Test mode',
    desc: 'TEST_MODE=1 runs the full logic without actually calling shutdown. USE_FAKE_UPSC_OUTPUT=1 feeds data from output_of_ups.txt so you can simulate any charge level offline.',
  },
  {
    icon: '⚙️',
    title: 'Minimal dependencies',
    desc: 'One bash script, nut installed via apt, and a cron entry. No daemons, no monitors, no extra packages. Fewer moving parts means fewer surprise restarts.',
  },
]

const scriptVarDocs = [
  { name: 'UPS_NAME', desc: 'The NUT name you gave your UPS in ups.conf — used in every upsc query.' },
  { name: 'LOG_PREFIX', desc: 'A string prepended to every log line so you can grep for it across mixed logs.' },
  { name: 'MIN_PERCENT', desc: 'Charge percentage at which the shutdown is triggered while on battery. 30 is a safe default for ZFS servers.' },
  { name: 'TEST_MODE', desc: 'Set to 1 to skip the actual shutdown call. Use this first to confirm the script runs correctly end-to-end.' },
  { name: 'SEND_NOTIFICATION', desc: 'Set to 1 to call your notification script on power loss and shutdown events.' },
  { name: 'USE_FAKE_UPSC_OUTPUT', desc: 'Set to 1 to replace upsc with a cat of output_of_ups.txt. Useful for testing different charge levels without a real UPS discharge.' },
]

const setupSteps = [
  {
    num: 1,
    desc: 'Install NUT.',
    code: 'apt install nut',
  },
  {
    num: 2,
    desc: 'Set the NUT mode to standalone.',
    filename: '/etc/nut/nut.conf',
    code: 'MODE=standalone',
  },
  {
    num: 3,
    desc: 'Configure your UPS. Get <code class="inline-code">vendorid</code> and <code class="inline-code">productid</code> from <code class="inline-code">lsusb</code> output — the two 4-character hex groups separated by <code class="inline-code">:</code> after the <code class="inline-code">ID</code> field.',
    filename: '/etc/nut/ups.conf',
    code: `pollinterval = 15
maxretry = 3

offdelay = 120
ondelay = 240

[cyberpower]
    driver = usbhid-ups
    port = auto
    desc = "CyberPower 1600"
    vendorid = 0764
    productid = 0501`,
    note: 'Example lsusb line: Bus 001 Device 002: ID 0764:0501 Cyber Power System, Inc. CP1500 AVR UPS',
  },
  {
    num: 4,
    desc: 'Restrict the NUT daemon to localhost.',
    filename: '/etc/nut/upsd.conf',
    code: 'LISTEN 127.0.0.1 3493',
  },
  {
    num: 5,
    desc: 'Make sure all other files in <code class="inline-code">/etc/nut/</code> are fully commented out — no active config lines.',
  },
  {
    num: 6,
    desc: 'Start the NUT server and optionally enable it on boot.',
    code: `sudo systemctl start nut-server
sudo systemctl enable nut-server`,
  },
  {
    num: 7,
    desc: 'Test that NUT can query your UPS. You should see a full status dump including <code class="inline-code">battery.charge</code> and <code class="inline-code">ups.status</code>.',
    code: 'upsc cyberpower@localhost',
  },
  {
    num: 8,
    desc: 'Download <code class="inline-code">checkUps.sh</code> and save it to <code class="inline-code">/root/scripts/</code>. Edit <code class="inline-code">UPS_NAME</code>, <code class="inline-code">MIN_PERCENT</code>, and set <code class="inline-code">TEST_MODE=1</code> before your first real run.',
    code: 'chmod +x /root/scripts/checkUps.sh',
  },
  {
    num: 9,
    desc: 'Add a cron job to run the script every minute and append output to the log file.',
    code: `crontab -e

# Add this line:
* * * * * /root/scripts/checkUps.sh >> /var/log/check_ups.log 2>&1`,
  },
  {
    num: 10,
    desc: 'Create a logrotate config to keep logs from growing unbounded. Three days of compressed logs is plenty for debugging.',
    filename: '/etc/logrotate.d/check_ups',
    code: `/var/log/check_ups.log {
    daily
    rotate 3
    compress
    delaycompress
    missingok
    notifempty
    create 640 root root
}`,
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
/* ── Layout ─────────────────────────────────────────────────────── */
.ssupss-page {
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
  max-width: 700px;
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

/* ── Features grid ──────────────────────────────────────────────── */
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

/* ── Code ───────────────────────────────────────────────────────── */
.inline-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
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

.code-block {
  overflow-x: auto;
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

.code-note {
  padding: 12px 16px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  border-top: 1px solid var(--color-border);
}

/* ── Script vars ────────────────────────────────────────────────── */
.vars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.var-card {
  padding: 16px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.var-card:hover { border-color: var(--color-hover-border); }

.var-name {
  display: block;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-accent-text);
  margin-bottom: 6px;
}

.var-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── Steps ──────────────────────────────────────────────────────── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  margin-top: 2px;
}

.step-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}

.step-code {
  margin: 0;
}

.step-note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 8px;
  padding: 10px 14px;
  line-height: 1.6;
}

/* ── Two-column ─────────────────────────────────────────────────── */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

/* ── Video ──────────────────────────────────────────────────────── */
.video-wrap {
  margin-top: 40px;
  max-width: 480px;
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
  .two-col { grid-template-columns: 1fr; }
}
</style>
