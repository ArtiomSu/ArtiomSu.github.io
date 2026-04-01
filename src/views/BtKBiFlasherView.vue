<template>
  <section class="page">
    <div class="container">
      <span class="badge">BtKBi Flasher</span>
      <h1 class="headline">Flash firmware from your browser</h1>
      <p class="sub">No software required — uses Chrome's WebSerial API</p>

      <div class="steps">
        <div class="step">
          <span class="step-num">1</span>
          <div class="step-body">
            <p class="step-title">Install USB drivers</p>
            <p class="step-desc">You may need to install <strong>CP210</strong> or <strong>CH340</strong> drivers for your OS before the device is recognised.</p>
          </div>
        </div>

        <div class="step">
          <span class="step-num">2</span>
          <div class="step-body">
            <p class="step-title">Enter bootloader mode <span class="hint">(updates only)</span></p>
            <p class="step-desc">Hold the <strong>left button</strong>, press the <strong>right button</strong>, then release the left button.</p>
          </div>
        </div>

        <div class="step">
          <span class="step-num">3</span>
          <div class="step-body">
            <p class="step-title">Choose an install option</p>
            <p class="step-desc">Use <strong>Factory Reset</strong> if this is your first flash or you have lost your secret key. After flashing, replug the controller.</p>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button class="btn btn-primary" @click="startInstall(false)">
          <span class="material-icons" style="font-size:1.2em;vertical-align:middle;margin-right:6px;">autorenew</span>
          Install / Update
        </button>
        <button class="btn btn-danger" @click="startInstall(true)">
          <span class="material-icons" style="font-size:1.2em;vertical-align:middle;margin-right:6px;">cleaning_services</span>
          Factory Reset + Install
        </button>
      </div>

      <!-- Hidden installers -->
      <esp-web-install-button ref="normalInstaller" :manifest="baseUrl + '/manifest.json'" style="display:none" />
      <esp-web-install-button ref="eraseInstaller" :manifest="baseUrl + '/manifest-clean.json'" style="display:none" />

      <p class="footer-note">Powered by <a href="https://esphome.github.io/esp-web-tools/" target="_blank" rel="noopener">esp-web-tools</a></p>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const baseUrl = "https://raw.githubusercontent.com/ArtiomSu/bluetooth-to-keyboard-input-esp32-s3-zero/main/.raw-firmware";

const normalInstaller = ref(null);
const eraseInstaller = ref(null);


const startInstall = (erase) => {
  const installer = erase ? eraseInstaller.value : normalInstaller.value;

  // trigger internal button click
  installer.shadowRoot.querySelector("button").click();
};

</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height));
  padding: 48px 24px;
}

.container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.badge {
  display: inline-block;
  margin-bottom: 20px;
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

.headline {
  font-size: clamp(1.75rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 12px;
  color: var(--color-text);
}

.sub {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 36px;
}

/* Steps */
.steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 36px 0;
  text-align: left;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

.step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 1px;
}

.step-body {
  flex: 1;
}

.step-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.step-desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.step-desc strong {
  color: var(--color-text);
  font-weight: 600;
}

.hint {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

/* Buttons */
.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: var(--font-sans);
  transition: opacity var(--transition), transform var(--transition);
}

.btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.btn-danger {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

.btn-danger:hover {
  border-color: #c0392b;
  color: #e74c3c;
  opacity: 1;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* Footer note */
.footer-note {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.footer-note a {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
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
