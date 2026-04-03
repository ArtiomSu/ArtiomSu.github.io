<template>
  <div class="home-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="name">ArtiomSu</h1>
        <p class="tagline">I build things — from soldering irons to systemd services.</p>
        <div class="pills-row">
          <span v-for="t in techStack" :key="t" class="tech-pill">{{ t }}</span>
        </div>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <button class="btn btn-secondary" @click="scrollToProjects">View projects ↓</button>
        </div>
      </div>
      <div class="scroll-hint" aria-hidden="true">
        <span class="scroll-line"></span>
      </div>
    </section>

    <!-- ─── ABOUT ───────────────────────────────────────────────── -->
    <section class="about-section">
      <div class="section-inner">
        <p class="section-label">About</p>
        <div class="about-layout">
          <div class="about-text reveal">
            <h2 class="about-heading">Full-stack engineer with a hardware habit</h2>
            <p class="about-para">
              {{ currentYear - 2018 }}+ years of commercial software development spanning payment platforms, cloud infrastructure, containerised microservices and embedded firmware. I work across the full stack — from NestJS APIs and Vue.js dashboards to QMK keyboard firmware and Rust system daemons — and I particularly enjoy the intersection of software and hardware.
            </p>
            <p class="about-para">
              Outside of work I design and build custom keyboards, run a self-hosted home lab, and write tools that scratch whatever itch I have that week.
            </p>
            <a href="https://linkedin.com/in/artiom-sumigora" target="_blank" rel="noopener" class="linkedin-link">
              LinkedIn ↗
            </a>
          </div>
          <div class="stats-grid reveal">
            <div v-for="s in stats" :key="s.label" class="stat-card">
              <span class="stat-value">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── SKILLS ───────────────────────────────────────────────── -->
    <section class="skills-section">
      <div class="section-inner">
        <p class="section-label">Skills</p>
        <h2 class="section-title">Professional expertise</h2>
        <div class="skills-grid">
          <div v-for="area in skillAreas" :key="area.title" class="skill-area reveal">
            <div class="skill-area-header">
              <span class="skill-area-icon">{{ area.icon }}</span>
              <h3 class="skill-area-title">{{ area.title }}</h3>
            </div>
            <ul class="skill-area-bullets">
              <li v-for="b in area.bullets" :key="b">{{ b }}</li>
            </ul>
            <div class="tag-row">
              <span v-for="t in area.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── DOMAINS ──────────────────────────────────────────────── -->
    <section class="domains-section">
      <div class="section-inner">
        <p class="section-label">What I build</p>
        <div class="domains-grid">
          <div v-for="d in domains" :key="d.title" class="domain-card reveal">
            <span class="domain-icon">{{ d.icon }}</span>
            <h3 class="domain-title">{{ d.title }}</h3>
            <p class="domain-desc">{{ d.desc }}</p>
            <div class="tag-row">
              <span v-for="t in d.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PROJECTS ─────────────────────────────────────────────── -->
    <section id="projects" class="projects-section">
      <div class="section-inner">
        <p class="section-label">Projects</p>
        <h2 class="section-title">Everything I've built</h2>
        <div class="projects-grid">
          <router-link
            v-for="p in projects"
            :key="p.to"
            :to="p.to"
            class="project-card reveal"
          >
            <div class="project-top">
              <span class="project-icon">{{ p.icon }}</span>
              <span class="project-arrow-icon">→</span>
            </div>
            <h3 class="project-title">{{ p.title }}</h3>
            <p class="project-desc">{{ p.desc }}</p>
            <div class="tag-row project-tags">
              <span v-for="t in p.tech" :key="t" class="tag">{{ t }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

const techStack = [
  'Rust', 'TypeScript', 'C', 'Python', 'Java', 'Vue.js',
  'QMK', 'Linux', 'Android', 'Bash', 'Node.js', 'Raspberry Pi',
]

const currentYear = new Date().getFullYear()
const stats = [
  { value: `${currentYear - 2018}+`, label: 'Years commercial' },
  { value: `${currentYear - 2015}+`, label: 'Years programming' },
  { value: '12',  label: 'Portfolio projects' },
  { value: '15+', label: 'Technologies' },
]

const skillAreas = [
  {
    icon: '💳',
    title: 'Payment Platforms & Financial Systems',
    bullets: [
      'Architected and extended a unified payment gateway integrating Worldpay, Stripe, Adyen and Telr.',
      'Built transaction analytics dashboards, reconciliation tools and financial reporting pipelines.',
      'Implemented Google Pay and Apple Pay — including a captive-network Google Pay R&D integration.',
      'Validated 99.99% SLA compliance by processing outage data and presenting session analytics to stakeholders.',
    ],
    tags: ['NestJS', 'TypeScript', 'Payments', 'MySQL', 'PostgreSQL'],
  },
  {
    icon: '☁️',
    title: 'Cloud, DevOps & Infrastructure',
    bullets: [
      'Designed and maintained production deployments on AWS (ECS, EC2, S3, CDK, CodePipeline).',
      'Implemented CI/CD pipelines, Docker containerisation and Kubernetes orchestration.',
      'Provisioned and scaled OpenShift clusters, migrated images to Red Hat UBI bases.',
      'DB migration scripts (MySQL → PostgreSQL) and infrastructure-as-code workflows.',
    ],
    tags: ['AWS', 'Docker', 'Kubernetes', 'OpenShift', 'CI/CD', 'IaC'],
  },
  {
    icon: '🖥️',
    title: 'Backend & API Development',
    bullets: [
      'Designed microservices with Node.js (NestJS, LoopBack) and REST API design patterns.',
      'Optimised Nginx/OpenResty configurations and backend performance profiling.',
      'Observability tooling with Prometheus and Grafana; structured application logging.',
    ],
    tags: ['Node.js', 'NestJS', 'LoopBack', 'REST', 'Prometheus', 'Grafana'],
  },
  {
    icon: '🎨',
    title: 'Frontend & UX',
    bullets: [
      'Delivered dashboards and portals in Vue.js 3 and AngularJS for transactions, analytics and gateway configuration.',
      'Led UX improvements for payment gateway UIs and unified multiple portals into a single configuration-driven system.',
      'SSR implementation for improved SEO and web analytics integration.',
    ],
    tags: ['Vue.js 3', 'AngularJS', 'TypeScript', 'SSR', 'SEO'],
  },
  {
    icon: '🔐',
    title: 'Security & Compliance',
    bullets: [
      'Performed vulnerability assessments, dependency audits and secure coding reviews.',
      'GDPR and OWASP compliance across production services.',
      'Load testing, performance profiling and structured incident response.',
    ],
    tags: ['OWASP', 'GDPR', 'Security', 'Load Testing'],
  },
  {
    icon: '⌨️',
    title: 'Embedded & Firmware',
    bullets: [
      'Designed and built custom hands-on input devices — split keyboards, trackballs, macropads.',
      'QMK firmware authoring: RGB, encoders, programmable buttons, HID protocol extensions.',
      'USB RAW HID routing tools and multi-OS daemon development in Rust and C.',
    ],
    tags: ['QMK', 'C', 'Rust', 'HID', 'Embedded'],
  },
]

const domains = [
  {
    icon: '⌨️',
    title: 'Keyboards & Input',
    desc: 'Custom handwired splits, optical trackballs, QMK firmware, HID routing and programmable macro layers — built from scratch, not from kits.',
    tags: ['QMK', 'C', '3D Printing', 'HID', 'Rust'],
  },
  {
    icon: '🌐',
    title: 'Networks & Linux',
    desc: 'Raspberry Pi as Wi-Fi AP, WireGuard VPN gateway and Pi-Hole DNS filter. Network-isolated smart home architecture. Systemd service management.',
    tags: ['Linux', 'WireGuard', 'Pi-Hole', 'iptables', 'Bash'],
  },
  {
    icon: '💡',
    title: 'IoT & Smart Home',
    desc: 'Self-hosted TP-Link Tapo control server, Asus ROG Phone LED animations, IR blaster integration and screen-colour ambient sync — no cloud required.',
    tags: ['TypeScript', 'Python', 'Android', 'REST', 'Express'],
  },
  {
    icon: '🔐',
    title: 'Security & Crypto',
    desc: 'YubiKey-backed SSH key management and dynamic symmetric encryption. Writing tools that make security easier to use without compromising on it.',
    tags: ['YubiKey', 'SSH', 'Encryption', 'TypeScript'],
  },
]

const projects = [
  {
    to: '/dactyl-manuform-5x7',
    icon: '⌨️',
    title: 'Dactyl Manuform 5×7',
    desc: 'Handwired split ergonomic keyboard — custom sculpted shell, QMK firmware with RGB underglow and full layout customisation.',
    tech: ['QMK', 'C', '3D Printing'],
  },
  {
    to: '/macropad-pico',
    icon: '🎛️',
    title: 'MacroPad Pi Pico',
    desc: '27-key handwired macropad on a Raspberry Pi Pico with per-key RGB and QMK programmable button codes.',
    tech: ['QMK', 'C', 'Pi Pico'],
  },
  {
    to: '/mana-ball-track-ball',
    icon: '🖱️',
    title: 'Mana Ball Trackball',
    desc: 'Optical trackball built around a GBJ-ROLLER-BALL-CPI sensor module and a QMK macropad PCB.',
    tech: ['QMK', 'C'],
  },
  {
    to: '/qmk-raw-hid-router',
    icon: '🔀',
    title: 'QMK Raw HID Router',
    desc: 'Routes raw HID packets between QMK devices — synchronises DPI and RGB settings across keyboards and macropads.',
    tech: ['TypeScript', 'HID', 'Node.js'],
  },
  {
    to: '/qmk-prog-buttons',
    icon: '🦀',
    title: 'QMK Programmable Buttons',
    desc: 'Rust daemon that reads QMK programmable button codes — invisible to the OS — and maps them to OBS scenes, recording toggles and smart home requests.',
    tech: ['Rust', 'OBS', 'Linux'],
  },
  {
    to: '/bluetooth-to-kb-input',
    icon: '📶',
    title: 'BtKBi',
    desc: 'Bridges BLE HOGP keyboards to any device over USB HID — relay Bluetooth keyboard input over a wired connection.',
    tech: ['C', 'Android', 'BLE'],
  },
  {
    to: '/pi-access-point',
    icon: '🌐',
    title: 'Pi WiFi AP + VPN + Pi-Hole',
    desc: 'Raspberry Pi acting as a Wi-Fi access point, WireGuard VPN gateway and Pi-Hole DNS filter — full home network stack on one device.',
    tech: ['Linux', 'WireGuard', 'Pi-Hole'],
  },
  {
    to: '/tp-link-tapo',
    icon: '💡',
    title: 'TP-Link Tapo Tools',
    desc: 'Self-hosted controller for Tapo smart plugs, bulbs and LED strips — REST API, web UI, CLI monitor and screen-colour ambient sync.',
    tech: ['TypeScript', 'Express', 'Python'],
  },
  {
    to: '/asus-rog-rgb',
    icon: '📱',
    title: 'Asus ROG Phone LED',
    desc: 'Android system app for ROG Phone 2 and 3 — 15 LED animation modes accessible from a background service and notification controls.',
    tech: ['Java', 'Android'],
  },
  {
    to: '/ssupss',
    icon: '⚡',
    title: 'SSUPSS',
    desc: 'Monitors a UPS over USB and triggers a graceful shutdown of servers when power goes out — configurable thresholds and systemd integration.',
    tech: ['Bash', 'Systemd', 'Linux'],
  },
  {
    to: '/yubikey-ssh-manager',
    icon: '🔑',
    title: 'YubiKey SSH Manager',
    desc: 'Manages SSH keys stored on YubiKeys — add, remove and switch active keys without touching config files manually.',
    tech: ['TypeScript', 'YubiKey', 'SSH'],
  },
  {
    to: '/dynamicrypt',
    icon: '🔐',
    title: 'DynamiCrypt',
    desc: 'Symmetric file encryption with dynamic key derivation — keys evolve on each use so replayed ciphertexts cannot be decrypted.',
    tech: ['TypeScript', 'Crypto'],
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.08 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
/* ── Page ───────────────────────────────────────────────────────── */
.home-page {
  padding-top: var(--nav-height);
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

/* ── Shared section ─────────────────────────────────────────────── */
.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-text);
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 40px;
}

/* ── Shared tags ────────────────────────────────────────────────── */
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  padding: 3px 9px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 100px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  white-space: nowrap;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px 60px;
  position: relative;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
}

.name {
  font-size: clamp(4rem, 14vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  background: var(--color-name-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0s;
  margin-bottom: 24px;
}

.tagline {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 32px;
  animation: fadeUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0.1s;
}

.pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 36px;
  animation: fadeUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0.2s;
}

.tech-pill {
  padding: 4px 12px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  background: var(--color-surface);
  transition: border-color var(--transition), color var(--transition);
}
.tech-pill:hover {
  border-color: var(--color-accent-border);
  color: var(--color-accent-text);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  animation: fadeUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0.3s;
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  animation: fadeUp 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: 0.5s;
}
.scroll-line {
  display: block;
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-accent-border), transparent);
  margin: 0 auto;
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 1;   transform: scaleY(1.15); }
}

/* ── About ──────────────────────────────────────────────────────── */
.about-section {
  padding: 96px 0;
  border-top: 1px solid var(--color-border);
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: start;
}

.about-heading {
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 16px;
  line-height: 1.2;
}

.about-para {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.75;
  margin-bottom: 14px;
  max-width: 600px;
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-accent-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-accent-border);
  padding-bottom: 1px;
  transition: border-color var(--transition), color var(--transition);
  margin-top: 4px;
}
.linkedin-link:hover {
  border-color: var(--color-accent-text);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex-shrink: 0;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: center;
  min-width: 110px;
  transition: border-color var(--transition);
}
.stat-card:hover { border-color: var(--color-hover-border); }

.stat-value {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--color-text);
  line-height: 1;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ── Skills ─────────────────────────────────────────────────────── */
.skills-section {
  padding: 96px 0;
  border-top: 1px solid var(--color-border);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.skill-area {
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.skill-area:hover { border-color: var(--color-hover-border); }

.skill-area-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.skill-area-icon { font-size: 1.3rem; flex-shrink: 0; }
.skill-area-title {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.skill-area-bullets {
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.skill-area-bullets li {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

/* ── Domains ────────────────────────────────────────────────────── */
.domains-section {
  padding: 96px 0;
  border-top: 1px solid var(--color-border);
}

.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.domain-card {
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.domain-card:hover { border-color: var(--color-hover-border); }

.domain-icon { font-size: 1.75rem; }
.domain-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.domain-desc {
  font-size: 0.83rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  flex: 1;
}

/* ── Projects ───────────────────────────────────────────────────── */
.projects-section {
  padding: 96px 0;
  border-top: 1px solid var(--color-border);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition:
    border-color var(--transition),
    background var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.project-card:hover {
  border-color: var(--color-hover-border);
  background: color-mix(in srgb, var(--color-surface) 70%, var(--color-accent-dim));
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.project-icon { font-size: 1.4rem; }
.project-arrow-icon {
  font-size: 1rem;
  color: var(--color-text-faint);
  transition: color var(--transition), transform var(--transition);
}
.project-card:hover .project-arrow-icon {
  color: var(--color-accent-text);
  transform: translateX(3px);
}

.project-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.project-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}
.project-tags { margin-top: 4px; }

/* ── Keyframe ───────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .about-layout {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  .hero { padding: 60px 20px 52px; }
  .about-section,
  .skills-section,
  .domains-section,
  .projects-section { padding: 64px 0; }
  .projects-grid { grid-template-columns: 1fr; }
  .skills-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
