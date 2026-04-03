<template>
  <div class="dynamicrypt-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">C++ · Neural Networks · AES Encryption</span>
        <h1 class="hero-title">DynamiCrypt</h1>
        <p class="hero-sub">
          A dynamic key exchange and encryption system built on Tree Parity Machines — neural networks that synchronise over a network to independently arrive at the same key, which is then used for AES encryption. No key is ever transmitted.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/DynamiCrypt" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://www.youtube.com/watch?v=LsR4XsGrDCY" target="_blank" rel="noopener" class="btn btn-secondary">
            Watch Demo ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Concept</p>
        <h2 class="section-title">How it works</h2>
        <p class="section-sub">Two Tree Parity Machines are trained on shared public inputs. Through many synchronisation rounds they converge to identical internal weights — which become the encryption key — without the key ever being sent over the wire.</p>
        <div class="flow-row">
          <div v-for="(step, i) in flowSteps" :key="step.label" class="flow-step reveal">
            <span class="flow-num">{{ i + 1 }}</span>
            <h3 class="flow-label">{{ step.label }}</h3>
            <p class="flow-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Capabilities</p>
        <h2 class="section-title">What DynamiCrypt does</h2>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── ARCHITECTURE ─────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Architecture</p>
        <h2 class="section-title">Components</h2>
        <p class="section-sub">Three separate layers work together — a compiled C++ core, a REST API, and a Node.js front-end — so the heavy crypto stays native while the UI stays simple.</p>
        <div class="arch-cards">
          <div v-for="c in components" :key="c.title" class="arch-card reveal">
            <div class="arch-card-header">
              <span class="arch-badge">{{ c.lang }}</span>
              <h3>{{ c.title }}</h3>
            </div>
            <p>{{ c.desc }}</p>
            <ul class="arch-list">
              <li v-for="item in c.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SETUP ─────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Quick Start</p>
        <h2 class="section-title">Getting it running</h2>
        <p class="section-sub">You need Boost, Pistache, and Crypto++ installed. Then compile the C++ core, start the Node.js apps, and register them via the setup script.</p>
        <div class="setup-steps">
          <div v-for="step in setupSteps" :key="step.title" class="setup-step reveal">
            <h3 class="setup-title">{{ step.title }}</h3>
            <p v-if="step.note" class="setup-note">{{ step.note }}</p>
            <div class="code-block">
              <pre><code>{{ step.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CLI FLAGS ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">CLI Reference</p>
        <h2 class="section-title">Runtime options</h2>
        <p class="section-sub">Run <code>./DynamiCrypt --help</code> or just <code>./DynamiCrypt</code> without arguments to see all flags.</p>
        <div class="flags-grid">
          <div v-for="flag in flags" :key="flag.name" class="flag-card reveal">
            <code class="flag-name">{{ flag.name }}</code>
            <p class="flag-desc">{{ flag.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── DEPS ──────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Dependencies</p>
        <h2 class="section-title">What you need</h2>
        <div class="deps-grid">
          <a v-for="dep in deps" :key="dep.label" :href="dep.url" target="_blank" rel="noopener" class="dep-card reveal">
            <h3>{{ dep.label }}</h3>
            <p>{{ dep.desc }}</p>
            <span class="dep-arrow">View ↗</span>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const flowSteps = [
  { label: 'Public inputs', desc: 'Both nodes receive the same random input vector X, which is public and can be observed by anyone.' },
  { label: 'Compute outputs', desc: 'Each Tree Parity Machine independently computes its output from its current internal weights and the shared input.' },
  { label: 'Exchange outputs', desc: 'The scalar outputs (±1) are exchanged over the network. Only the output is shared — never the weights.' },
  { label: 'Synchronise weights', desc: 'When outputs match, both machines update their weights using the Hebbian learning rule, drifting closer to each other.' },
  { label: 'Key derived', desc: 'After enough rounds the weights fully synchronise. Those weights become the AES encryption key — identical on both sides, never transmitted.' },
]

const features = [
  { icon: '🔑', title: 'No Key Transmission', desc: 'The encryption key is never sent over the network. Both sides arrive at it independently through neural synchronisation.' },
  { icon: '🧠', title: 'Tree Parity Machines', desc: 'A custom C++ implementation of TPMs — three-layer neural networks (K hidden neurons, N inputs each, weight range ±L) that synchronise through Hebbian learning.' },
  { icon: '🔒', title: 'AES Encryption', desc: 'Once synchronised, messages are encrypted and decrypted with AES using the derived key. Two modes available: fast and secure.' },
  { icon: '🌐', title: 'REST API', desc: 'The C++ core exposes an HTTP API via Pistache, allowing any language to consume encryption/decryption operations and trigger sync.' },
  { icon: '💬', title: 'Messaging Demo App', desc: 'A Node.js + Express app provides a browser UI showing messages in plaintext and encrypted form simultaneously across two peers.' },
  { icon: '🔄', title: 'Dynamic Rekeying', desc: 'Keys are regenerated dynamically each sync cycle. Even if a past key is compromised, future messages remain secure.' },
  { icon: '⚙️', title: 'Multi-instance', desc: 'Run multiple DynamiCrypt instances on different ports. Each pair of peers maintains its own independent synchronisation state.' },
  { icon: '📊', title: 'Key Logging', desc: 'Optional gnome-terminal spawning to display real-time key output and sync timing, or redirect everything to a single terminal with a flag.' },
]

const components = [
  {
    lang: 'C++',
    title: 'DynamiCrypt Core',
    desc: 'The engine. Handles TPM synchronisation over TCP and exposes an AES encrypt/decrypt API over HTTP.',
    items: [
      'TreeParityMachine — TPM implementation with K, N, L parameters',
      'TpmNetworkHandler — manages peer-to-peer TPM sync over Boost.Asio sockets',
      'TpmHandler — orchestrates sync rounds and weight convergence',
      'APIServer — Pistache HTTP server exposing the REST API',
      'API_service — encrypt / decrypt / register / sync endpoints',
    ],
  },
  {
    lang: 'Node.js',
    title: 'NodeApp Front-End',
    desc: 'Express web app consumed by a browser. Registers with the C++ API, triggers sync, and sends/receives encrypted messages.',
    items: [
      'Simple EJS-templated messaging UI',
      'jQuery form handler posts to local Express routes',
      'Express routes proxy to the C++ API',
      'Two instances run on different ports to simulate two peers',
    ],
  },
  {
    lang: 'Python',
    title: 'Utility Scripts',
    desc: 'Convenience scripts to automate setup and stress-test message sending without filling in browser forms.',
    items: [
      'quick_setup.py — registers both Node apps with their respective APIs automatically',
      'send_messages.py — sends messages in bulk for testing different encryption modes',
      'performance_calc.py — analyses thesis log output for sync timing statistics',
    ],
  },
]

const setupSteps = [
  {
    title: '1 — Compile the C++ core',
    note: 'Must be run from inside DynamiCrypt/DynamiCrypt/ where all .cpp files are visible.',
    code: 'g++ *.cpp -lboost_system -lpthread -lboost_thread -lboost_program_options -lcryptopp -lpistache -o DynamiCrypt',
  },
  {
    title: '2 — Start two instances (two terminals)',
    note: null,
    code: '# Terminal 1\n./DynamiCrypt --listen-port 8001 --api-port 9081\n\n# Terminal 2\n./DynamiCrypt --listen-port 8002 --api-port 9082',
  },
  {
    title: '3 — Start the Node.js apps (two terminals)',
    note: 'cd into DynamiCrypt/NodeApp/ first and run npm install if this is the first time.',
    code: '# Terminal 3\n./run 3000\n\n# Terminal 4\n./run 4000',
  },
  {
    title: '4 — Register and connect',
    note: 'Either run the setup script (recommended) or fill the browser forms manually at http://127.0.0.1:3000 and http://127.0.0.1:4000.',
    code: 'python3 quick_setup.py',
  },
  {
    title: '5 — Start syncing',
    note: 'Press the green Start Sync button in one browser. Watch the terminals display keys and sync timing. Then send messages.',
    code: '# Optional: send messages automatically\npython3 send_messages.py',
  },
]

const flags = [
  { name: '--listen-port', desc: 'Port the TPM sync server listens on for peer connections.' },
  { name: '--api-port', desc: 'Port the REST API HTTP server listens on.' },
  { name: '--PRINT_KEYS_TO_EXTERNAL_GNOME_TERMINAL', desc: 'Set to 0 to print key output to the current terminal instead of spawning a gnome-terminal window.' },
  { name: '--help', desc: 'Print all available flags and usage information.' },
]

const deps = [
  { label: 'Boost', desc: 'Provides Asio networking, threading, program options, and string utilities used throughout the core.', url: 'https://www.boost.org/' },
  { label: 'Pistache', desc: 'Lightweight C++ REST framework used to expose the API server over HTTP.', url: 'https://github.com/oktal/pistache' },
  { label: 'Crypto++', desc: 'C++ cryptography library providing AES, SHA, and Base64 used for encryption and key derivation.', url: 'https://cryptopp.com/' },
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
.dynamicrypt-page {
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

/* ── Hero ──────────────────────────────────────────────────────── */
.hero {
  min-height: calc(60vh - var(--nav-height));
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
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
  max-width: 700px;
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

/* ── Flow ──────────────────────────────────────────────────────── */
.flow-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 40px;
  counter-reset: flow;
}

.flow-step {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.flow-step:hover { border-color: var(--color-hover-border); }

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
  font-size: 0.72rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.flow-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.flow-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Features ──────────────────────────────────────────────────── */
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

/* ── Architecture ──────────────────────────────────────────────── */
.arch-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.arch-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.arch-card:hover { border-color: var(--color-hover-border); }

.arch-card-header {
  margin-bottom: 12px;
}

.arch-card-header h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 8px;
}

.arch-card > p {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 14px;
}

.arch-badge {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 100px;
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
  border: 1px solid var(--color-accent-border);
}

.arch-list {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.arch-list li {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* ── Setup ─────────────────────────────────────────────────────── */
.setup-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
}

.setup-step {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.setup-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.setup-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 12px;
}

/* ── Code blocks ───────────────────────────────────────────────── */
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

.section-sub code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
}

/* ── CLI flags ─────────────────────────────────────────────────── */
.flags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.flag-card {
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.flag-card:hover { border-color: var(--color-hover-border); }

.flag-name {
  display: block;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  color: var(--color-accent-text);
  margin-bottom: 8px;
}

.flag-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ── Video ─────────────────────────────────────────────────────── */
.video-card {
  display: block;
  max-width: 480px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  transition: border-color var(--transition), transform var(--transition);
  margin-top: 40px;
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

/* ── Deps ──────────────────────────────────────────────────────── */
.deps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.dep-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.dep-card:hover { border-color: var(--color-hover-border); }

.dep-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.dep-card p {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}

.dep-arrow {
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
  .flow-row { grid-template-columns: 1fr; }
}
</style>
