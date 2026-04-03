<template>
  <div class="qmkpb-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Rust · QMK · OBS · Linux &amp; Windows</span>
        <h1 class="hero-title">QMK Programmable Buttons</h1>
        <p class="hero-sub">
          A Rust daemon that reads QMK programmable button key codes — which live entirely outside the normal keyboard range — and maps them to actions: OBS scene switching, recording pause, smart home HTTP requests, IR blasters, and anything else you can POST to. No hotkey conflicts, ever.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/QMK-Programmable-Buttons-Control-OBS-and-other-programs-rs" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://docs.qmk.fm/#/feature_programmable_button" target="_blank" rel="noopener" class="btn btn-secondary">
            QMK Docs ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">How it works</p>
        <h2 class="section-title">Keys that nothing else can see</h2>
        <p class="section-sub">
          QMK's programmable button feature reserves up to 32 key codes that are entirely outside the OS keyboard range. No application, no compositor, no global hotkey daemon can intercept them — only this program reads them via libinput (Linux) or the HID API (Windows) and decides what to do.
        </p>
        <div class="flow-grid">
          <div v-for="(step, i) in flowSteps" :key="i" class="flow-card reveal">
            <span class="flow-num">{{ i + 1 }}</span>
            <h3 class="flow-title">{{ step.title }}</h3>
            <p class="flow-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Features</p>
        <h2 class="section-title">Built-in actions</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── BUILD ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Build</p>
        <h2 class="section-title">Compile &amp; run</h2>
        <p class="section-sub">Requires <a href="https://www.rust-lang.org/tools/install" target="_blank" rel="noopener" class="inline-link">Rust + Cargo</a>. The Linux build works out of the box via libinput; the Windows build needs a short one-time device ID lookup.</p>
        <div class="build-cols">
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">Build release binary</span></div>
            <div class="code-block"><pre><code>cargo build --release</code></pre></div>
          </div>
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">Optional — compress with UPX</span></div>
            <div class="code-block"><pre><code>upx --best --lzma target/release/qmk_programmable_button</code></pre></div>
          </div>
        </div>
        <div class="deps-wrap reveal">
          <p class="section-label" style="margin-bottom:14px">Key dependencies</p>
          <div class="deps-grid">
            <div v-for="d in deps" :key="d.name" class="dep-chip">
              <code class="dep-name">{{ d.name }}</code>
              <span class="dep-note">{{ d.note }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CUSTOMISING ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Customisation</p>
        <h2 class="section-title">Mapping your macros</h2>
        <p class="section-sub">Edit <code class="inline-code">src/programmable_keys.rs</code>. The <code class="inline-code">process_keys</code> function contains one match arm per macro key — add your logic there. Two built-in helpers are always available:</p>
        <div class="custom-grid">
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">OBS — switch scene</span></div>
            <div class="code-block"><pre><code>{{ exampleObsScene }}</code></pre></div>
          </div>
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">HTTP POST — smart home / IR</span></div>
            <div class="code-block"><pre><code>{{ examplePost }}</code></pre></div>
          </div>
          <div class="code-card reveal">
            <div class="code-header"><span class="code-lang">OBS — toggle recording pause</span></div>
            <div class="code-block"><pre><code>{{ exampleObsPause }}</code></pre></div>
          </div>
        </div>
        <div class="info-box reveal">
          The OBS WebSocket connection is set up in <code class="inline-code">src/main.rs</code>. By default it connects to <code class="inline-code">localhost:4455</code>. If the connection fails the program keeps running and simply skips OBS actions — all other actions (HTTP POST etc.) still work.
        </div>
      </div>
    </section>

    <!-- ─── WINDOWS ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Windows setup</p>
        <h2 class="section-title">Finding your device ID</h2>
        <p class="section-sub">Windows support is functional but requires a one-time device ID lookup. The program compiles and runs automatically — you only need to hardcode the correct <code class="inline-code">usagePage</code> and <code class="inline-code">usage</code> if they differ from the defaults.</p>
        <div class="steps-list">
          <div v-for="s in winSteps" :key="s.num" class="step-row reveal">
            <div class="step-num-badge">{{ s.num }}</div>
            <div class="step-content">
              <p class="step-desc" v-html="s.desc"></p>
              <div v-if="s.code" class="code-card step-code">
                <div class="code-block"><pre><code>{{ s.code }}</code></pre></div>
              </div>
            </div>
          </div>
        </div>
        <div class="output-card reveal">
          <div class="code-header"><span class="code-lang">Expected hidapitester output</span></div>
          <div class="code-block"><pre><code>{{ hidapitesterOutput }}</code></pre></div>
          <p class="code-note">The entry with <code class="inline-code">usagePage: 0x000C</code> and <code class="inline-code">usage: 0x0001</code> is the programmable button interface. If your values differ, update <code class="inline-code">src/window_listener.rs</code> accordingly.</p>
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

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">Part of the QMK ecosystem</h2>
        <div class="related-grid">
          <router-link to="/macropad-pico" class="related-card">
            <h3>Macropad Pi Pico RGB</h3>
            <p>The 27-key handwired macropad this daemon was originally written for — programmable button key codes assigned directly in the QMK keymap.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/qmk-raw-hid-router" class="related-card">
            <h3>QMK Raw HID Router</h3>
            <p>Route raw HID packets between QMK devices — the sibling project for controlling DPI and RGB effects across keyboards and macropads.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/dactyl-manuform-5x7" class="related-card">
            <h3>Dactyl Manuform 5×7</h3>
            <p>The full split ergonomic keyboard also running QMK — another device that can send programmable button codes to this daemon.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const flowSteps = [
  {
    title: 'Press a macro key',
    desc: 'A QMK programmable button key (MACRO1–MACRO32) is pressed on a keyboard or macropad running QMK firmware with the feature enabled.',
  },
  {
    title: 'OS ignores it',
    desc: 'The key code is outside the normal HID keyboard range. The OS, window manager, and every other application see nothing — zero conflicts.',
  },
  {
    title: 'Daemon intercepts it',
    desc: 'On Linux the daemon reads the event via libinput. On Windows it listens on the HID usage page. The key code is added to an async queue.',
  },
  {
    title: 'Action fires',
    desc: 'A tokio task pops the key from the queue and calls the matching handler: switch an OBS scene, pause recording, send a JSON POST, or anything custom.',
  },
]

const features = [
  {
    icon: '🎬',
    title: 'OBS scene switching',
    desc: 'Switch to any named OBS scene instantly via the OBS WebSocket API (obws). Connects to localhost:4455 on startup; gracefully skips OBS actions if OBS is not running.',
  },
  {
    icon: '⏸️',
    title: 'OBS recording pause',
    desc: 'Toggle recording pause/resume with a single button press — no need to reach for the mouse or remember an OBS-specific hotkey.',
  },
  {
    icon: '📡',
    title: 'JSON POST requests',
    desc: 'Send arbitrary JSON payloads to any HTTP endpoint. Used here for smart home light control and IR blaster commands on a local server.',
  },
  {
    icon: '🔑',
    title: '32 macro slots',
    desc: 'All 32 QMK programmable button codes (MACRO1–MACRO32) are mapped and handled. Assign a different action to every single one.',
  },
  {
    icon: '🐧',
    title: 'Linux — plug and play',
    desc: 'Uses libinput directly. Build with cargo and run — no additional configuration needed on a standard Linux desktop.',
  },
  {
    icon: '🪟',
    title: 'Windows — HID API',
    desc: 'Reads from the keyboard\'s programmable button HID usage page. Requires a one-time device ID lookup with hidapitester if the defaults don\'t match.',
  },
]

const deps = [
  { name: 'obws',     note: 'OBS WebSocket client' },
  { name: 'tokio',    note: 'Async runtime (multi-thread)' },
  { name: 'reqwest',  note: 'HTTP POST requests' },
  { name: 'input',    note: 'libinput bindings (Linux only)' },
  { name: 'winapi',   note: 'HID input (Windows only)' },
]

const exampleObsScene = `ProgrammableKeys::MACRO1 => {
    ProgrammableKeys::obs_change_scene(client, "Scene").await;
},`

const examplePost = `ProgrammableKeys::MACRO4 => {
    let body = String::from(
        r#"{"on":true,"button":"1","sleepduration":-1}"#
    );
    ProgrammableKeys::send_post_request(
        "http://10.0.0.12:9090/operate", &body
    ).await;
},`

const exampleObsPause = `ProgrammableKeys::MACRO9 => {
    ProgrammableKeys::obs_recording_toggle_pause(client).await;
},`

const winSteps = [
  {
    num: 1,
    desc: 'Download <a href="https://github.com/todbot/hidapitester" target="_blank" rel="noopener" class="inline-link">hidapitester</a> and run it to list HID devices.',
    code: '.\\hidapitester.exe --list-detail',
  },
  {
    num: 2,
    desc: 'Find your keyboard in the list — it will appear more than once. Look for the entry with <code class="inline-code">usagePage: 0x000C</code> and <code class="inline-code">usage: 0x0001</code>. That is the programmable button interface.',
  },
  {
    num: 3,
    desc: 'If your values differ from the defaults, open <code class="inline-code">src/window_listener.rs</code>, find the <code class="inline-code">attach</code> function at the bottom, and update <code class="inline-code">usagePage</code> and <code class="inline-code">usage</code> to match.',
  },
  {
    num: 4,
    desc: 'Build and run. Windows key mapping starts from MACRO1–MACRO11 with a different bit-field encoding; add more in <code class="inline-code">programmable_keys.rs</code> as needed.',
    code: 'cargo build --release\n.\\target\\release\\qmk_programmable_button.exe',
  },
]

const hidapitesterOutput = `FEED/6060: ArtiomSu - macropad_artiomsu
  vendorId:      0xFEED
  productId:     0x6060
  usagePage:     0x0001   ← standard keyboard, ignore
  usage:         0x0006

FEED/6060: ArtiomSu - macropad_artiomsu
  vendorId:      0xFEED
  productId:     0x6060
  usagePage:     0x000C   ← programmable button interface
  usage:         0x0001`

const videos = [
  { id: 'uFst1Hm4P9k', url: 'https://www.youtube.com/watch?v=uFst1Hm4P9k', title: 'Setup guide — Linux, OBS & smart home integration' },
  { id: '0pucPQXm3IE', url: 'https://www.youtube.com/watch?v=0pucPQXm3IE', title: 'Windows setup guide' },
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
.qmkpb-page {
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

/* ── Flow ───────────────────────────────────────────────────────── */
.flow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.flow-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.flow-card:hover { border-color: var(--color-hover-border); }

.flow-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.flow-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.flow-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
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

.inline-link {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

:deep(.inline-code) {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--color-accent-text);
}

:deep(.inline-link) {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
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

/* ── Build ──────────────────────────────────────────────────────── */
.build-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.deps-wrap {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.deps-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dep-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 8px;
}

.dep-name {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-accent-text);
}

.dep-note {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* ── Customisation ──────────────────────────────────────────────── */
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.info-box {
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

/* ── Steps ──────────────────────────────────────────────────────── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
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

.output-card {
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

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
  .build-cols { grid-template-columns: 1fr; }
}
</style>
