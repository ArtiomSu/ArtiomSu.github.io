<template>
  <section class="home">
    <div class="hero">
      <h1 class="name">ArtiomSu</h1>
    </div>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height));
  padding: 48px 24px;
}

.hero {
  text-align: center;
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
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
