<template>
  <div id="app">
    <header class="header">
      <nav class="nav">
        <router-link to="/" class="nav-brand">ArtiomSu</router-link>
        <ul class="nav-links">
          <li v-for="link in links" :key="link.to">
            <router-link :to="link.to" class="nav-link" :exact="link.exact">
              {{ link.label }}
            </router-link>
          </li>
          <li>
            <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>

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
import { ref, onMounted } from 'vue'

const links = [
  { to: '/', label: 'Home', exact: true },
  { to: '/bluetooth-to-kb-input', label: 'BtKBi' },
  { to: '/mana-ball-track-ball', label: 'Mana Ball' },
]

const isDark = ref(false)

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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      isDark.value = getSystemDark()
    }
  })
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
  transition: opacity var(--transition);
}

.nav-brand:hover {
  opacity: 0.6;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2px;
}

.nav-link {
  display: block;
  padding: 6px 12px;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  border-radius: 6px;
  transition: color var(--transition), background var(--transition);
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-nav-hover);
}

.nav-link.router-link-active {
  color: var(--color-text);
  background: var(--color-nav-active);
}

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

.main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
