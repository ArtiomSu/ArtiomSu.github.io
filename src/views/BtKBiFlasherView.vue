<template>
  <section class="page">
    <div class="container">
      <h1 class="headline">BtKBi Flasher</h1>
      <p class="sub">flash the firmware directly from your chrome browser</p>
      <p class="sub">You may need to install USB drivers (CP210 / CH340)</p>
      <div style="margin-top: 36px;"></div>

      <p class="sub">If you are updating, you first need to put the controller into booloader mode</p>
      <p class="sub">You can do this by holding down the left button, then pressing the right button. And now let go of the left button</p>
      <div style="margin-top: 36px;"></div>

      <p class="sub">After flashing, you will need to unplug and plug the controller back in for it to work.</p>
      <div style="margin-top: 36px;"></div>

      <p class="sub">Choose factory reset option if you are flashing for the first time, or you lost your secret key</p>
      <div style="margin-top: 36px;"></div>

      <div class="buttons">
        <button @click="startInstall(false)">
          🔄 Install / Update
        </button>

        <button @click="startInstall(true)">
          🧹 Factory Reset + Install
        </button>
      </div>

      <!-- Hidden installers -->
      <esp-web-install-button ref="normalInstaller" :manifest="baseUrl + '/manifest.json'" style="display:none" />

      <esp-web-install-button ref="eraseInstaller" :manifest="baseUrl + '/manifest-clean.json'" style="display:none" />

      <div style="margin-top: 36px;"></div>
      <p class="sub">This uses esp-web-tools to flash the firmware</p>

    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";

const baseUrl = "/btkbi/firmware"; // todo: update this later to repo url

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

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #42b883;
  color: white;
  font-weight: bold;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
