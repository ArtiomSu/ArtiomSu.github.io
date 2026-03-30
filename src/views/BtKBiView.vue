<template>
  <section class="page">
    <div class="container">
      <span class="badge">coming soon</span>
      <h1 class="headline">bluetooth to keyboard input</h1>
      <p class="sub">fully open source input stick alternative</p>
      <span class="badge badge-good" style="margin-top: 36px">
        <router-link to="/bluetooth-to-kb-input-flasher" class="nav-link">
          Flash BtKBi firmware to your esp32 S3 Zero 
        </router-link>
      </span>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height));
  padding: 48px 24px;
}

.container {
  max-width: 640px;
  text-align: center;
  animation: fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.badge {
  display: inline-block;
  margin-bottom: 36px;
  padding: 5px 14px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 100px;
  border: 1px solid var(--color-accent-border);
  background: var(--color-accent-dim);
  color: var(--color-accent-text);
}

.badge-good {
  border-color: var(--color-good-text);
  background: var(--color-good-dim);
  color: var(--color-good-text);
  font-size: 1em;
  text-transform: none;
}

.headline {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 20px;
  color: var(--color-text);
}

.sub {
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  color: var(--color-text-muted);
  line-height: 1.65;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
