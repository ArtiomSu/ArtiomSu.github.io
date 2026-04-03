<template>
  <div class="piap-page">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <span class="badge">Raspberry Pi · OpenVPN · Pi-Hole · hostapd</span>
        <h1 class="hero-title">Pi WiFi AP with VPN &amp; Pi-Hole</h1>
        <p class="hero-sub">
          Turn a Raspberry Pi and a USB WiFi adapter into a wireless access point where every connected client is automatically routed through a VPN and has network-level ad blocking via Pi-Hole — no client configuration required.
        </p>
        <div class="hero-ctas">
          <a href="https://github.com/ArtiomSu/Raspberry-Pi-Wifi-Access-Point-with-VPN-and-Pi-Hole" target="_blank" rel="noopener" class="btn btn-primary">
            GitHub ↗
          </a>
          <a href="https://www.youtube.com/watch?v=gQ6598jxWJM" target="_blank" rel="noopener" class="btn btn-secondary">
            Video guide ↗
          </a>
        </div>
      </div>
      <div class="hero-diagram reveal">
        <img
          src="https://raw.githubusercontent.com/ArtiomSu/Raspberry-Pi-Wifi-Access-Point-with-VPN-and-Pi-Hole/main/pi-custom-wifi-network.png"
          alt="Network diagram — Pi WiFi AP with VPN and Pi-Hole"
          loading="eager"
        />
      </div>
    </section>

    <!-- ─── WHY ──────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Use cases</p>
        <h2 class="section-title">Why build this?</h2>
        <p class="section-sub">Any device that connects to this hotspot gets both VPN protection and ad blocking with zero extra setup on the client side.</p>
        <div class="features-grid">
          <div v-for="f in features" :key="f.title" class="feature-card reveal">
            <span class="feature-icon">{{ f.icon }}</span>
            <h3 class="feature-title">{{ f.title }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── EQUIPMENT ────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Requirements</p>
        <h2 class="section-title">Equipment</h2>
        <p class="section-sub">Everything here is commodity hardware. The only critical choice is the WiFi adapter — it must support AP (master) mode and have Linux drivers.</p>
        <div class="equipment-list">
          <div v-for="e in equipment" :key="e.item" class="equip-row reveal">
            <span class="equip-icon">{{ e.icon }}</span>
            <div class="equip-content">
              <span class="equip-item">{{ e.item }}</span>
              <span class="equip-note">{{ e.note }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── GUIDE: STATIC IPS ─────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Phase 1</p>
        <h2 class="section-title">Static IP addresses</h2>
        <p class="section-sub">
          Plug in the USB WiFi adapter. Check device names with <code class="inline-code">ifconfig</code> or <code class="inline-code">ip link show</code> — they will likely be long hex strings like <code class="inline-code">enx111111111</code> (ethernet) and <code class="inline-code">wlx011111111</code> (wifi). Use those names throughout.
        </p>
        <div class="code-card reveal">
          <div class="code-header">
            <span class="code-lang">/etc/dhcpcd.conf</span>
          </div>
          <div class="code-block">
            <pre><code>{{ staticIpConf }}</code></pre>
          </div>
          <p class="code-note">Replace the interface names with your actual device names. The wifi subnet (<code class="inline-code">69.69.69.0/24</code>) can be any private range you like.</p>
        </div>
        <p class="step-hint">Reboot after saving so the Pi starts using the static IPs.</p>
      </div>
    </section>

    <!-- ─── GUIDE: VPN + AP ───────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Phase 2</p>
        <h2 class="section-title">VPN &amp; Access Point</h2>
        <p class="section-sub">Set up and test VPN + the AP together before adding Pi-Hole — it makes troubleshooting much easier.</p>
        <div class="phases-grid">

          <div class="phase-block reveal">
            <h3 class="phase-title">Install &amp; configure OpenVPN</h3>
            <div class="steps-list">
              <div v-for="s in vpnSteps" :key="s.num" class="step-row">
                <div class="step-num-badge">{{ s.num }}</div>
                <div class="step-content">
                  <p class="step-desc" v-html="s.desc"></p>
                  <div v-if="s.code" class="code-card step-code">
                    <div v-if="s.filename" class="code-header"><span class="code-lang">{{ s.filename }}</span></div>
                    <div class="code-block"><pre><code>{{ s.code }}</code></pre></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="phase-block reveal">
            <h3 class="phase-title">Configure the Access Point</h3>
            <div class="steps-list">
              <div v-for="s in apSteps" :key="s.num" class="step-row">
                <div class="step-num-badge">{{ s.num }}</div>
                <div class="step-content">
                  <p class="step-desc" v-html="s.desc"></p>
                  <div v-if="s.code" class="code-card step-code">
                    <div v-if="s.filename" class="code-header"><span class="code-lang">{{ s.filename }}</span></div>
                    <div class="code-block"><pre><code>{{ s.code }}</code></pre></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ─── GUIDE: PI-HOLE ───────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Phase 3</p>
        <h2 class="section-title">Pi-Hole</h2>
        <p class="section-sub">With VPN + AP confirmed working, layer on Pi-Hole for DNS-level ad blocking for every connected client.</p>
        <div class="steps-list">
          <div v-for="s in piholeSteps" :key="s.num" class="step-row reveal">
            <div class="step-num-badge">{{ s.num }}</div>
            <div class="step-content">
              <p class="step-desc" v-html="s.desc"></p>
              <div v-if="s.code" class="code-card step-code">
                <div v-if="s.filename" class="code-header"><span class="code-lang">{{ s.filename }}</span></div>
                <div class="code-block"><pre><code>{{ s.code }}</code></pre></div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-box reveal">
          <strong>Quick test:</strong> Visit <a href="https://d3ward.github.io/toolz/adblock.html" target="_blank" rel="noopener" class="inline-link">d3ward.github.io/toolz/adblock.html</a> from a connected client. Without Pi-Hole you'll see ~10% blocked. With Pi-Hole you should see 50–70%+.
        </div>
      </div>
    </section>

    <!-- ─── VIDEO ────────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Video</p>
        <h2 class="section-title">Demo &amp; full walkthrough</h2>
        <p class="section-sub">Skip to 05:18 for the live demo.</p>
        <div class="video-wrap">
          <a href="https://www.youtube.com/watch?v=gQ6598jxWJM" target="_blank" rel="noopener" class="video-card">
            <div class="video-thumb">
              <img src="https://img.youtube.com/vi/gQ6598jxWJM/hqdefault.jpg" alt="Raspberry Pi Wireless Router with VPN and Pi-Hole — Demo and Guide" loading="lazy" />
              <div class="video-play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </div>
            </div>
            <p class="video-title">Create a Raspberry Pi Wireless Router with VPN and Pi-Hole | Demo and Guide</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── REFERENCES ───────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">References</p>
        <h2 class="section-title">Further reading</h2>
        <div class="refs-grid">
          <a v-for="r in references" :key="r.label" :href="r.url" target="_blank" rel="noopener" class="ref-card reveal">
            <span class="ref-label">{{ r.label }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ─── RELATED ──────────────────────────────────────────────── -->
    <section class="section reveal">
      <div class="section-inner">
        <p class="section-label">Related projects</p>
        <h2 class="section-title">More homelab tooling</h2>
        <div class="related-grid">
          <router-link to="/ssupss" class="related-card">
            <h3>SSUPSS</h3>
            <p>Stupid Simple UPS Setup — a minimal NUT-based shutdown script for keeping your Raspberry Pi server safe during power outages.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
          <router-link to="/yubikey-ssh-manager" class="related-card">
            <h3>YubiKey SSH Manager</h3>
            <p>Script-driven SSH key management using a YubiKey — pairs well with a self-hosted VPN gateway that needs hardened access control.</p>
            <span class="related-arrow">View project →</span>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const staticIpConf = `interface enx111111111
static ip_address=10.0.0.12/24
static routers=10.0.0.1
static domain_name_servers=1.1.1.1

interface wlx011111111
static ip_address=69.69.69.1/24
nohook wpa_supplicant`

const features = [
  {
    icon: '📺',
    title: 'Smart devices, zero config',
    desc: 'Smart TVs, consoles, and IoT gadgets that cannot run a VPN or ad blocker benefit automatically just by connecting to the hotspot.',
  },
  {
    icon: '🔒',
    title: 'One VPN device',
    desc: 'If your VPN provider limits you to 5 simultaneous connections, all clients on this network count as a single device to the VPN server.',
  },
  {
    icon: '🚫',
    title: 'Network-wide ad blocking',
    desc: 'Pi-Hole filters DNS queries for every connected client. No browser extension or per-device setup required.',
  },
  {
    icon: '🔁',
    title: 'Survives reboots',
    desc: 'OpenVPN auto-connects on startup via systemd, iptables rules are persisted with netfilter-persistent, and hostapd is enabled as a service.',
  },
  {
    icon: '🌐',
    title: 'Isolated subnet',
    desc: 'The wireless clients live on their own subnet (e.g. 69.69.69.0/24) entirely separate from your main LAN, with DHCP and DNS served by Pi-Hole.',
  },
  {
    icon: '🍓',
    title: 'Runs on a Pi 2B',
    desc: 'This setup was built and tested on a Raspberry Pi 2B running Raspbian Bullseye — one of the cheapest SBCs around.',
  },
]

const equipment = [
  { icon: '🍓', item: 'Raspberry Pi 2B (or newer)',             note: 'Running Raspbian GNU/Linux 11 (Bullseye). Any Pi with an Ethernet port works.' },
  { icon: '📡', item: 'USB WiFi adapter with AP-mode support',  note: 'ALFA AWUS036NHA used here. Anything on the Kali Linux recommended adapter list should work.' },
  { icon: '🔌', item: 'Ethernet cable + internet-connected LAN', note: 'The Pi uplinks via Ethernet; the new subnet is served over the USB WiFi adapter.' },
  { icon: '🔑', item: 'OpenVPN .ovpn config files',             note: 'Any provider works. The guide uses IPVanish config files as an example.' },
]

const vpnSteps = [
  {
    num: 1,
    desc: 'Update the system and install OpenVPN.',
    code: 'sudo apt update -y && sudo apt upgrade -y && sudo apt-get install openvpn -y',
  },
  {
    num: 2,
    desc: 'Create the configs folder and copy your <code class="inline-code">.ovpn</code> files into it.',
    code: 'sudo mkdir /etc/openvpn/openvpn_files',
  },
  {
    num: 3,
    desc: 'Enable auto-connect on startup: edit <code class="inline-code">/etc/default/openvpn</code> and change <code class="inline-code">#AUTOSTART="all"</code> to <code class="inline-code">AUTOSTART="all"</code>.',
  },
  {
    num: 4,
    desc: 'Copy your chosen config to <code class="inline-code">/etc/openvpn/</code> and rename it <code class="inline-code">client.conf</code>.',
    code: 'sudo cp /etc/openvpn/openvpn_files/some_server.ovpn /etc/openvpn/\nsudo mv /etc/openvpn/some_server.ovpn /etc/openvpn/client.conf',
  },
  {
    num: 5,
    desc: 'Change the <code class="inline-code">auth-user-pass</code> line in the config to <code class="inline-code">auth-user-pass pass</code>, then create <code class="inline-code">/etc/openvpn/pass</code> with your VPN username on line 1 and password on line 2.',
    code: 'sudo chmod 400 /etc/openvpn/pass',
  },
  {
    num: 6,
    desc: 'Enable the VPN service and reboot. Confirm the VPN IP is active with <code class="inline-code">curl ifconfig.me</code>.',
    code: 'sudo systemctl enable openvpn@client.service && sudo reboot',
  },
]

const apSteps = [
  {
    num: 1,
    desc: 'Install iptables, hostapd, and dnsmasq.',
    code: 'sudo apt-get install iptables hostapd dnsmasq',
  },
  {
    num: 2,
    desc: 'Route WiFi clients through the VPN tunnel (<code class="inline-code">tun0</code>).',
    code: `sudo iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
sudo iptables -A FORWARD -i tun0 -o wlx011111111 \\
  -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlx011111111 -o tun0 -j ACCEPT`,
  },
  {
    num: 3,
    desc: 'Persist the iptables rules across reboots.',
    code: 'sudo apt-get install -y iptables-persistent\nsudo netfilter-persistent save',
  },
  {
    num: 4,
    desc: 'Enable IPv4 forwarding.',
    filename: '/etc/sysctl.d/routed-ap.conf',
    code: '# Enable IPv4 routing\nnet.ipv4.ip_forward=1',
  },
  {
    num: 5,
    desc: 'Add a temporary dnsmasq config for testing (will be replaced by Pi-Hole later).',
    filename: '/etc/dnsmasq.conf',
    code: `conf-dir=/etc/dnsmasq.d
interface=wlx011111111
dhcp-range=69.69.69.120,69.69.69.250,255.255.255.0,24h
domain=wlan
address=/gw.wlan/69.69.69.1`,
  },
  {
    num: 6,
    desc: 'Configure the access point. Change <code class="inline-code">interface</code>, <code class="inline-code">ssid</code>, and <code class="inline-code">wpa_passphrase</code>.',
    filename: '/etc/hostapd/hostapd.conf',
    code: `country_code=GB
interface=wlx011111111
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
ssid=FreeInternet
wpa_passphrase=secure_password_123`,
  },
  {
    num: 7,
    desc: 'Enable hostapd on startup and reboot. Confirm clients can connect and that the public IP matches your VPN server.',
    code: 'sudo systemctl unmask hostapd && sudo systemctl enable hostapd && sudo reboot',
  },
]

const piholeSteps = [
  {
    num: 1,
    desc: 'Comment out the dnsmasq lines added for testing — Pi-Hole will handle DHCP and DNS instead.',
    filename: '/etc/dnsmasq.conf',
    code: `conf-dir=/etc/dnsmasq.d
#interface=wlx011111111
#dhcp-range=69.69.69.120,69.69.69.250,255.255.255.0,24h
#domain=wlan
#address=/gw.wlan/69.69.69.1`,
  },
  {
    num: 2,
    desc: 'Reboot so the cleared dnsmasq config takes effect.',
    code: 'sudo reboot',
  },
  {
    num: 3,
    desc: 'Install Pi-Hole.',
    code: 'curl -sSL https://install.pi-hole.net | bash',
  },
  {
    num: 4,
    desc: 'During installation, select the <strong>WiFi interface</strong> as the listening interface, and choose the <strong>custom IP</strong> option: set <code class="inline-code">69.69.69.1/24</code> for the IP and <code class="inline-code">69.69.69.1</code> for the gateway. Enable the default blocklist and optionally enable query logging.',
  },
  {
    num: 5,
    desc: 'After the installer finishes, note the Web UI password. Enable DHCP via Pi-Hole.',
    code: 'sudo pihole -a enabledhcp "69.69.69.120" "69.69.69.250" "69.69.69.1" "24" "local"',
  },
  {
    num: 6,
    desc: 'Optionally change the Web UI password.',
    code: 'pihole -a -p',
  },
  {
    num: 7,
    desc: 'Reboot. You should be done — connected clients get VPN routing + DNS ad blocking automatically.',
    code: 'sudo reboot',
  },
]

const references = [
  { label: 'Setting up a VPN hotspot',          url: 'https://medium.com/swlh/make-a-hotspot-of-raspberry-pi-while-using-a-vpn-e8f6620c1ab9' },
  { label: 'Auto-connect to VPN on startup',    url: 'https://raspberrypi.stackexchange.com/questions/136051/connect-to-vpn-network-on-startup' },
  { label: 'Pi-Hole + Unbound setup guide',     url: 'https://www.crosstalksolutions.com/the-worlds-greatest-pi-hole-and-unbound-tutorial-2023/#Install_Pi-hole' },
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
/* ── Layout ─────────────────────────────────────────────────────── */
.piap-page {
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
  max-width: 720px;
  line-height: 1.7;
  margin-bottom: 40px;
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
  padding: 80px 24px 60px;
  text-align: center;
  gap: 48px;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
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
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.hero-diagram {
  max-width: 800px;
  width: 100%;
  animation: fadeUp 0.7s 0.15s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.hero-diagram img {
  width: 100%;
  display: block;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

/* ── Inline code ────────────────────────────────────────────────── */
.inline-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--color-accent-text);
}

:deep(.inline-code) {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.82em;
  background: var(--color-code-bg, rgba(0, 0, 0, 0.15));
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--color-accent-text);
}

:deep(.inline-link) {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Features ───────────────────────────────────────────────────── */
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
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
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

/* ── Equipment ──────────────────────────────────────────────────── */
.equipment-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equip-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition:
    border-color var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.equip-row:hover { border-color: var(--color-hover-border); }

.equip-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.equip-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equip-item {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
}

.equip-note {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

/* ── Code cards ─────────────────────────────────────────────────── */
.code-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
}

.code-lang {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.code-block { overflow-x: auto; }

.code-block pre {
  margin: 0;
  padding: 16px;
}

.code-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.76rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  white-space: pre;
}

.code-note {
  padding: 12px 16px;
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  border-top: 1px solid var(--color-border);
}

.step-hint {
  margin-top: 16px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  padding: 12px 16px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 8px;
}

/* ── Phase grid ─────────────────────────────────────────────────── */
.phases-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.phase-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.phase-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

/* ── Steps ──────────────────────────────────────────────────────── */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.step-num-badge {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  color: var(--color-accent-text);
  font-size: 0.72rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.step-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}

.step-code { margin: 0; }

/* ── Info box ───────────────────────────────────────────────────── */
.info-box {
  margin-top: 24px;
  padding: 16px 20px;
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 10px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  transition:
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.info-box strong { color: var(--color-accent-text); }

.inline-link {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ── Video ──────────────────────────────────────────────────────── */
.video-wrap {
  margin-top: 32px;
  max-width: 480px;
}

.video-card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  transition: border-color var(--transition), transform var(--transition);
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

/* ── References ─────────────────────────────────────────────────── */
.refs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}

.ref-card {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-accent-text);
  background: var(--color-accent-dim);
  border: 1px solid var(--color-accent-border);
  border-radius: 8px;
  text-decoration: none;
  transition:
    opacity var(--transition),
    opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.ref-card:hover { opacity: 0.75; }

.ref-label { line-height: 1.4; }

/* ── Related ────────────────────────────────────────────────────── */
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.related-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color var(--transition);
}

.related-card:hover { border-color: var(--color-hover-border); }

.related-card h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.related-card p {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  flex: 1;
}

.related-arrow {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-accent-text);
}

/* ── Keyframe ───────────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .section { padding: 64px 20px; }
  .phases-grid { grid-template-columns: 1fr; gap: 48px; }
}
</style>
