import { playClick } from './audioSynthesizer.js';

export function initTrialPopup() {
  // Check if it already exists to prevent duplication
  if (document.getElementById('trial-popup-overlay')) return;

  const overlayHtml = `
    <div id="trial-popup-overlay" class="trial-popup-overlay" style="display: none;">
      <div class="trial-popup-card glass-card">
        <button class="trial-popup-close" id="trial-popup-close-btn">&times;</button>
        
        <div class="trial-popup-badge">FREE TRIAL ACCESS</div>
        
        <h3 class="trial-popup-title">Launch Your Sales & Calling Operations</h3>
        <p class="trial-popup-subtitle">Get instant access to the Hanva CRM & Automation suite. Built to eliminate lead leakage and double calling productivity.</p>
        
        <ul class="trial-popup-features">
          <li>
            <span class="feat-bullet">🔒</span>
            <div>
              <strong>Proxy-Free Attendance Check-In</strong>
              <span>Verify locations (GPS), active IPs, and real-time biometric selfies.</span>
            </div>
          </li>
          <li>
            <span class="feat-bullet">🚀</span>
            <div>
              <strong>Instant API Lead Allocation</strong>
              <span>Distribute webhook leads to available telecaller queues in under 1.2s.</span>
            </div>
          </li>
          <li>
            <span class="feat-bullet">💬</span>
            <div>
              <strong>Automated WhatsApp Outreach</strong>
              <span>Auto-dispatch templates based on deal movements and call dispo logs.</span>
            </div>
          </li>
        </ul>

        <div class="trial-popup-actions">
          <button class="btn btn-secondary" id="trial-popup-dismiss-btn" style="flex: 1; font-size: 11px; padding: 12px 0;">Dismiss</button>
          <a href="https://api.whatsapp.com/send?phone=918423711043&text=*Start%20CRM%20Trial*." target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="trial-popup-connect-btn" style="flex: 1.5; font-size: 11px; padding: 12px 0; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            🚀 Start Free Trial
          </a>
        </div>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = overlayHtml;
  document.body.appendChild(wrapper.firstElementChild);

  const overlay = document.getElementById('trial-popup-overlay');
  const closeBtn = document.getElementById('trial-popup-close-btn');
  const dismissBtn = document.getElementById('trial-popup-dismiss-btn');
  const connectBtn = document.getElementById('trial-popup-connect-btn');

  function showPopup() {
    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.classList.add('active');
    }, 100);
  }

  function hidePopup() {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);
  }

  // Trigger popup show 1.8 seconds after main load sequence finishes
  setTimeout(showPopup, 1800);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hidePopup();
      playClick();
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      hidePopup();
      playClick();
    });
  }

  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      hidePopup();
      playClick();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hidePopup();
        playClick();
      }
    });
  }
}
