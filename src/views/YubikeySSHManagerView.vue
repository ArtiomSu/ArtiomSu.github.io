<template>
  <div class="yubikey-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Open Source · Bash Scripts · Hardware Security</span>
        <h1 class="hero-title">YubiKey SSH Manager</h1>
        <p class="hero-sub">
          A collection of scripts and documentation for managing SSH keys stored directly on a YubiKey — using either the PIV (RSA4096) or FIDO2 (ED25519-SK) method. Private keys never leave the hardware.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/Yubikey-SSH-manager" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Capabilities</p>
        <h2 class="section-title">Why hardware SSH keys?</h2>
        <p class="section-sub">Software SSH keys can be copied, leaked, or stolen. With a YubiKey the private key is generated inside the hardware and can never be exported — even if your computer is compromised.</p>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── METHOD COMPARISON ─────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Methods</p>
        <h2 class="section-title">PIV vs FIDO2</h2>
        <p class="section-sub">Both methods store keys on the hardware and require physical touch to use. Choose based on your platform needs and key capacity requirements.</p>
        <div class="table-wrap reveal">
          <table class="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>PIV</th>
                <th>FIDO2</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.feature">
                <td class="td-feature">{{ row.feature }}</td>
                <td v-html="row.piv"></td>
                <td v-html="row.fido2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="table-note">OpenPGP support is a third method but is not yet included — it may be added in future once a reliable workflow is figured out. It is useful for git commit signing.</p>
      </div>
    </section>

    <!-- ─── INSTALLATION ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Quick Start</p>
        <h2 class="section-title">Installation</h2>
        <p class="section-sub">Make sure to change the default PIN, PUK, and management key on your YubiKey before running the scripts — easiest to do via the Yubico Authenticator app.</p>
        <div class="install-cards">
          <div class="install-card reveal">
            <h3>macOS</h3>
            <div class="code-block">
              <pre><code>brew install openssh ykman yubico-piv-tool

# Optional GUI tool
brew install yubico-authenticator</code></pre>
            </div>
          </div>
          <div class="install-card reveal">
            <h3>Linux (Arch)</h3>
            <div class="code-block">
              <pre><code>paru -S yubikey-manager yubico-piv-tool libfido2

# Optional GUI tool
paru -S yubico-authenticator-bin

# Enable the PC/SC daemon
sudo systemctl start pcscd
sudo systemctl enable pcscd</code></pre>
            </div>
          </div>
        </div>
        <div class="run-block reveal">
          <h3>Running the scripts</h3>
          <p>Make sure your YubiKey is plugged in, then run the script for whichever method you prefer:</p>
          <div class="code-block" style="margin-top:16px">
            <pre><code># PIV method (RSA4096 keys, up to 20 slots)
./yubikey_ssh_manager_piv.sh

# FIDO2 method (ED25519-SK keys, up to 100 slots)
./yubikey_ssh_manager_fido2.sh</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SCRIPT MENUS ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Script Reference</p>
        <h2 class="section-title">Interactive menus</h2>
        <p class="section-sub">Both scripts present an interactive menu. Run the relevant script and select an action by number.</p>
        <div class="menu-cards">
          <div class="menu-card reveal">
            <div class="menu-card-header">
              <span class="menu-badge piv-badge">PIV</span>
              <h3>yubikey_ssh_manager_piv.sh</h3>
              <p>RSA4096 · Up to 20 SSH keys · Uses retired certificate slots 82–95</p>
            </div>
            <ol class="menu-list">
              <li v-for="item in pivMenu" :key="item">{{ item }}</li>
            </ol>
          </div>
          <div class="menu-card reveal">
            <div class="menu-card-header">
              <span class="menu-badge fido2-badge">FIDO2</span>
              <h3>yubikey_ssh_manager_fido2.sh</h3>
              <p>ED25519-SK · Up to 100 keys · Shared with web authentication credentials</p>
            </div>
            <ol class="menu-list">
              <li v-for="item in fido2Menu" :key="item">{{ item }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SSH CONFIG ────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Configuration</p>
        <h2 class="section-title">SSH config</h2>
        <p class="section-sub">PIV keys require a PKCS#11 provider entry in your <code>~/.ssh/config</code>. FIDO2 keys work like regular SSH keys and need no special configuration.</p>
        <div class="config-cards">
          <div class="config-card reveal">
            <h3>macOS — PIV</h3>
            <div class="code-block">
              <pre><code>Host example.com
    PKCS11Provider /opt/homebrew/lib/libykcs11.dylib</code></pre>
            </div>
          </div>
          <div class="config-card reveal">
            <h3>Linux — PIV</h3>
            <div class="code-block">
              <pre><code>Host example.com
    PKCS11Provider /usr/lib/libykcs11.so</code></pre>
            </div>
          </div>
        </div>
        <div class="config-note reveal">
          <p>If you see <strong>Too many authentication failures</strong> from the server, see the <code>manual_method_piv.md</code> in the repo for the fix.</p>
          <p style="margin-top:10px">PIV is also compatible with <strong>macOS login and sudo authentication</strong> when configured alongside the system. See the <a href="https://support.yubico.com/hc/en-us/articles/360016649059-YubiKey-for-macOS-login" target="_blank" rel="noopener" class="link">Yubico macOS login guide</a>.</p>
        </div>
      </div>
    </section>

    <!-- ─── AFTER REBOOT ──────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Troubleshooting</p>
        <h2 class="section-title">Common issues</h2>
        <div class="issues-grid">
          <div v-for="issue in issues" :key="issue.title" class="issue-card reveal">
            <h3 class="issue-title">{{ issue.title }}</h3>
            <p class="issue-desc">{{ issue.desc }}</p>
            <div v-if="issue.code" class="code-block" style="margin-top:12px">
              <pre><code>{{ issue.code }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIMITATIONS ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Known Limitations</p>
        <h2 class="section-title">What doesn't work</h2>
        <div class="limits-grid">
          <div v-for="l in limitations" :key="l.title" class="limit-card reveal">
            <span class="limit-icon">{{ l.icon }}</span>
            <h3 class="limit-title">{{ l.title }}</h3>
            <p class="limit-desc">{{ l.desc }}</p>
            <p v-if="l.workaround" class="limit-workaround"><strong>Workaround:</strong> {{ l.workaround }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const features = [
  { icon: '🔐', title: 'Hardware-Stored Keys', desc: 'Private keys are generated inside the YubiKey and can never be exported. Your computer is just a conduit.' },
  { icon: '🖥️', title: 'No Server Changes', desc: 'Works with any existing SSH server. No special server-side configuration or modules needed.' },
  { icon: '🗝️', title: 'Multiple Keys', desc: 'PIV supports up to 20 SSH keys in retired certificate slots. FIDO2 supports up to 100 keys shared with web credentials.' },
  { icon: '🌍', title: 'Cross-Platform', desc: 'Both methods work on macOS and Linux x86_64. PIV also works on Linux ARM (tested on PinePhone 64).' },
  { icon: '👆', title: 'Touch-Required', desc: 'Physical touch confirmation is required for key generation and every SSH authentication. No remote exploitation.' },
  { icon: '🍎', title: 'macOS Login Compatible', desc: 'The PIV method works alongside macOS login and sudo authentication when configured using the provided script.' },
]

const comparisonRows = [
  { feature: 'Key Capacity',             piv: '20 keys',                    fido2: '100 keys (shared with web logins)' },
  { feature: 'Key Type',                 piv: 'RSA4096',                    fido2: 'ED25519-SK' },
  { feature: 'Generation Speed',         piv: 'Slow (~1 minute)',           fido2: 'Instant' },
  { feature: 'macOS Support',            piv: '✓',                         fido2: '✓' },
  { feature: 'Linux x86_64 Support',     piv: '✓',                         fido2: '✓' },
  { feature: 'Linux ARM (PinePhone 64)', piv: '✓',                         fido2: '✓' },
  { feature: 'Android Support',          piv: '✗',                         fido2: 'Termius only' },
  { feature: 'Setup Complexity',         piv: 'Medium',                     fido2: 'Easy' },
  { feature: 'Server Configuration',     piv: 'None required',              fido2: 'None required' },
]

const pivMenu = [
  'Create new SSH key',
  'List all SSH keys',
  'Get public key for specific slot',
  'Get all public keys',
  'Delete SSH key',
  'Show YubiKey PIV info',
  'Export all public keys to files',
  'Populate SSH config',
]

const fido2Menu = [
  'Create new SSH key',
  'List all SSH keys on YubiKey',
  'Export keys to current directory',
  'Delete SSH key',
  'Show YubiKey info',
]

const issues = [
  {
    title: 'YubiKey not detected after reboot (macOS)',
    desc: 'On macOS the PIV interface occasionally needs re-initialising after a reboot. Run this once to restore functionality:',
    code: 'ykman piv info',
  },
  {
    title: 'YubiKey not detected (Linux)',
    desc: 'Make sure the pcscd service is running:',
    code: 'sudo systemctl start pcscd\nsudo systemctl enable pcscd\n\n# Verify detection\nykman piv info',
  },
  {
    title: 'Automate the reboot fix',
    desc: 'Run the included piv_startup.sh script — it re-initialises the PIV interface and prints all public keys so you can verify everything is working.',
    code: './piv_startup.sh',
  },
]

const limitations = [
  {
    icon: '🔁',
    title: 'No PIN Caching',
    desc: "PIN caching via SSH ControlMaster or yubikey-agent doesn't work with the retired slots (82–95) used for SSH keys.",
    workaround: 'Enter your PIN for each SSH connection.',
  },
  {
    icon: '🪟',
    title: 'No Windows Support',
    desc: 'Neither script supports Windows. Manual configuration may be possible but is not documented.',
    workaround: 'Submit a PR if you figure it out.',
  },
  {
    icon: '🤖',
    title: 'Limited Android Support',
    desc: 'PIV is not supported at all on Android. FIDO2 works only with specific apps like Termius, but keys cannot be shared between devices.',
    workaround: null,
  },
  {
    icon: '🔑',
    title: 'No ED25519 via PIV',
    desc: "The Yubico PKCS#11 module (libykcs11) doesn't recognise ED25519 keys. Only RSA keys work for SSH authentication via PKCS#11.",
    workaround: 'Use the FIDO2 method if you need ED25519 keys.',
  },
  {
    icon: '📦',
    title: 'No Key Backup',
    desc: 'Private keys cannot be backed up from either method — by design. If you lose the YubiKey, you must generate new keys and update servers.',
    workaround: null,
  },
  {
    icon: '🔏',
    title: 'OpenPGP Not Included',
    desc: 'OpenPGP is a third YubiKey SSH method useful for git commit signing, but is not yet supported due to compatibility complexities.',
    workaround: 'May be added in a future release.',
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
.yubikey-page {
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

.link {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
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

/* ── Comparison table ──────────────────────────────────────────── */
.table-wrap {
  overflow-x: auto;
  margin-bottom: 20px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  min-width: 480px;
}

.compare-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.compare-table th:not(:first-child) {
  color: var(--color-accent-text);
}

.compare-table td {
  padding: 10px 16px;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.td-feature {
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
}

.table-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Installation ──────────────────────────────────────────────── */
.install-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.install-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.install-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 14px;
}

.run-block {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.run-block h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
}

.run-block p {
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

.code-block pre { margin: 0; padding: 16px; }

.code-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  white-space: pre;
}

/* ── Script menus ──────────────────────────────────────────────── */
.menu-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
}

.menu-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-card-header {
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--color-border);
}

.menu-card-header h3 {
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'SF Mono', 'Fira Code', monospace;
  color: var(--color-text);
  margin: 8px 0 6px;
}

.menu-card-header p {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.menu-badge {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 100px;
}

.piv-badge {
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
  border: 1px solid var(--color-accent-border);
}

.fido2-badge {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.menu-list {
  margin: 0;
  padding: 16px 24px 20px 44px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-list li {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* ── SSH Config ────────────────────────────────────────────────── */
.config-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.config-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.config-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 14px;
}

.config-note {
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.config-note code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  padding: 1px 5px;
  background: var(--color-code-bg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-accent-text);
}

/* ── Issues ────────────────────────────────────────────────────── */
.issues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.issue-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.issue-card:hover { border-color: var(--color-hover-border); }

.issue-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.issue-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Limitations ───────────────────────────────────────────────── */
.limits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.limit-card {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: border-color var(--transition), opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.limit-card:hover { border-color: var(--color-hover-border); }

.limit-icon {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 12px;
}

.limit-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.limit-desc {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

.limit-workaround {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border);
}

/* ── Keyframe ────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section { padding: 64px 20px; }

  .install-cards,
  .menu-cards,
  .config-cards { grid-template-columns: 1fr; }
}
</style>
