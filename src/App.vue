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
const links = [
  { to: '/', label: 'Home', exact: true },
  { to: '/bluetooth-to-kb-input', label: 'BtKBi' },
]
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
  background: rgba(8, 8, 8, 0.75);
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
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.router-link-active {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.07);
}

.main {
  flex: 1;
  padding-top: var(--nav-height);
}
</style>
