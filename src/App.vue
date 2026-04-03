<template>
  <div id="app">
    <header class="header">
      <nav class="nav">
        <router-link to="/" class="nav-brand">ArtiomSu</router-link>
        <div class="nav-actions">
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
          <button
            class="hamburger"
            @click="toggleMenu"
            :class="{ 'is-open': menuOpen }"
            :aria-expanded="String(menuOpen)"
            aria-label="Toggle navigation"
          >
            <span class="bar" />
            <span class="bar" />
            <span class="bar" />
          </button>
        </div>
      </nav>
    </header>

    <Transition name="panel">
      <div v-if="menuOpen" class="nav-panel">
        <div class="panel-inner">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="panel-link"
          >
            {{ link.label }}
          </router-link>
          <button class="panel-chevron" @click="toggleMenu" aria-label="Hide navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
        </div>
      </div>
    </Transition>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { to: '/', label: 'Home', exact: true },
  { to: '/bluetooth-to-kb-input', label: 'BtKBi' },
  { to: '/mana-ball-track-ball', label: 'Mana Ball' },
  { to: '/qmk-raw-hid-router', label: 'QMK HID Router' },
  { to: '/dactyl-manuform-5x7', label: 'Dactyl 5×7' },
  { to: '/macropad-pico', label: 'MacroPad' },
  { to: '/ssupss', label: 'SSUPSS' },
  { to: '/asus-rog-rgb', label: 'ROG RGB' },
  { to: '/pi-access-point', label: 'Pi AP+VPN' },
  { to: '/qmk-prog-buttons', label: 'QMK Prog' },
  { to: '/tp-link-tapo', label: 'Tapo Tools' },
  { to: '/yubikey-ssh-manager', label: 'YubiKey SSH' },
  { to: '/dynamicrypt', label: 'DynamiCrypt' },
]

const isDark = ref(false)
const menuOpen = ref(false)
let autoOpenTimer = null
let userToggled = false

function toggleMenu() {
  userToggled = true
  if (autoOpenTimer) {
    clearTimeout(autoOpenTimer)
    autoOpenTimer = null
  }
  menuOpen.value = !menuOpen.value
}

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveIsDark() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') return true
  if (saved === 'light') return false
  return getSystemDark()
}

function applyTheme(theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
  isDark.value = resolveIsDark()
}

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark'
  localStorage.setItem('theme', next)
  applyTheme(next)
}

onMounted(() => {
  isDark.value = resolveIsDark()
  autoOpenTimer = setTimeout(() => {
    if (!userToggled) menuOpen.value = true
  }, 3000)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      isDark.value = getSystemDark()
    }
  })
})

onUnmounted(() => {
  if (autoOpenTimer) clearTimeout(autoOpenTimer)
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ── Header ─────────────────────────────────────────────────── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.nav {
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-decoration: none;
  transition: opacity var(--transition);
}

.nav-brand:hover {
  opacity: 0.6;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Theme toggle ────────────────────────────────────────────── */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color var(--transition), background var(--transition);
}

.theme-toggle:hover {
  color: var(--color-text);
  background: var(--color-nav-hover);
}

/* ── Hamburger ───────────────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background var(--transition);
}

.hamburger:hover {
  background: var(--color-nav-hover);
}

.bar {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--color-text-muted);
  border-radius: 2px;
  transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
  transform-origin: center;
}

.hamburger.is-open .bar:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger.is-open .bar:nth-child(2) {
  opacity: 0;
  width: 0;
}

.hamburger.is-open .bar:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ── Transitions ─────────────────────────────────────────────── */
.panel-enter-active,
.panel-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.panel-enter-from,
.panel-leave-to { opacity: 0; transform: translateY(-8px); }
.nav-panel {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  z-index: 99;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.panel-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.panel-link {
  display: block;
  padding: 7px 14px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  border-radius: 6px;
  border: 1px solid transparent;
  text-decoration: none;
  transition: color var(--transition), background var(--transition), border-color var(--transition);
}

.panel-link:hover {
  color: var(--color-text);
  background: var(--color-nav-hover);
  border-color: var(--color-border);
}

.panel-link.router-link-active {
  color: var(--color-text);
  background: var(--color-nav-active);
  border-color: var(--color-border);
}

.panel-chevron {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: color var(--transition), background var(--transition), border-color var(--transition);
}

.panel-chevron:hover {
  color: var(--color-text);
  background: var(--color-nav-hover);
  border-color: var(--color-hover-border);
}

/* ── Transitions ─────────────────────────────────────────────── */
.panel-enter-active,
.panel-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.panel-enter-from,
.panel-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Main ────────────────────────────────────────────────────── */
.main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
