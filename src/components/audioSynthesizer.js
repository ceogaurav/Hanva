let audioCtx = null;
let isMuted = true;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSFX() {
  isMuted = !isMuted;
  
  if (!isMuted) {
    try {
      getAudioContext();
    } catch (e) {
      console.warn("Failed to initialize AudioContext:", e);
    }
  }
  
  updateToggleUI();
  return isMuted;
}

function updateToggleUI() {
  const btn = document.getElementById('sfx-toggle');
  if (!btn) return;
  
  const dot = btn.querySelector('.sfx-status-dot');
  const text = btn.querySelector('.sfx-status-text');
  
  if (isMuted) {
    btn.classList.remove('active');
    btn.style.color = 'var(--text-muted)';
    btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    btn.style.background = 'rgba(255, 255, 255, 0.02)';
    if (dot) dot.style.backgroundColor = 'var(--text-muted)';
    if (text) text.textContent = 'SFX_MUTED';
  } else {
    btn.classList.add('active');
    btn.style.color = 'var(--accent-cyan)';
    btn.style.borderColor = 'rgba(6, 182, 212, 0.3)';
    btn.style.background = 'rgba(6, 182, 212, 0.05)';
    if (dot) {
      dot.style.backgroundColor = 'var(--accent-cyan)';
      dot.style.boxShadow = '0 0 6px var(--accent-cyan)';
    }
    if (text) text.textContent = 'SFX_ACTIVE';
  }
}

export function playClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
  
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.045);
}

export function playHum() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(100, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.22);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.23);
}

export function playChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const now = ctx.currentTime;
  
  // Play three ascending nodes representing a tech resolution chime
  playNote(523.25, now, 0.08);       // C5
  playNote(659.25, now + 0.06, 0.08);  // E5
  playNote(783.99, now + 0.12, 0.16);  // G5
}

function playNote(freq, startTime, duration) {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  
  gain.gain.setValueAtTime(0.03, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

export function initAudioSynthesizer() {
  const btn = document.getElementById('sfx-toggle');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const muted = toggleSFX();
      if (!muted) {
        setTimeout(playChime, 100);
      }
    });
  }
  
  updateToggleUI();

  // Bind tactile audio feedback to clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, select, input, .tech-node-btn, .blueprint-tab-btn, .chat-preset-btn, .flow-node');
    if (target && target.id !== 'sfx-toggle') {
      playClick();
    }
  });
}
