import { playClick, playChime } from '../components/audioSynthesizer.js';

export function renderCrm() {
  return `
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Live Presentation Suite</span>
          <h2 class="section-title">Hanva CRM & Call Automation Loop</h2>
          <p class="section-desc">Test a fully integrated loop: dial the IVR from the customer's phone, press a digit to trigger instant CRM lead injection and WhatsApp template delivery, and trigger an outbound telecaller callback.</p>
          <div style="display: flex; justify-content: center; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
            <button id="explore-features-btn" class="btn btn-secondary" data-hover="magnetic" style="font-size: 11px; padding: 10px 20px;">
              ✨ Explore CRM Playbook Features
            </button>
            <a href="https://api.whatsapp.com/send?phone=918423711043&text=*Start%20CRM%20Trial*." target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-hover="magnetic" style="font-size: 11px; padding: 10px 20px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              🚀 Start Free Trial
            </a>
          </div>
        </div>

        <div class="crm-demo-split">
          <!-- Left Panel: Customer Device Mockup -->
          <div class="crm-mock-column">
            <h3 class="crm-column-heading">📱 Customer Mobile Device</h3>
            
            <div class="phone-mockup">
              <div class="phone-speaker"></div>
              
              <!-- Screen Viewport -->
              <div class="phone-screen" id="phone-screen-viewport">
                <!-- Wallpaper / Lock Screen (Initial View) -->
                <div class="phone-view active" id="view-idle">
                  <div class="phone-lock-time">16:15</div>
                  <div class="phone-lock-date">Wednesday, 17 June</div>
                  
                  <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px;">
                    <div style="font-size: 11px; color: rgba(255,255,255,0.7); text-align: center; max-width: 180px;">Press the button below to initiate an inbound call.</div>
                  </div>
                  
                  <button id="phone-dial-ivr-btn" class="phone-action-btn green-btn" data-hover="expand">
                    📞 Dial Hanva IVR
                  </button>
                </div>

                <!-- Active Inbound IVR Call Screen -->
                <div class="phone-view" id="view-ivr-call">
                  <div style="text-align: center; margin-top: 16px;">
                    <div style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 4px;">Hanva IVR Line</div>
                    <div id="phone-call-timer" style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan);">Calling...</div>
                  </div>

                  <div style="margin-top: 24px; text-align: center; font-size: 10px; color: var(--text-muted); max-width: 200px; margin-left: auto; margin-right: auto; line-height: 1.4;">
                    Please press a digit:
                  </div>

                  <!-- DTMF Dialer Keypad -->
                  <div class="phone-keypad">
                    <button class="keypad-btn" data-digit="1" data-hover="expand">
                      <span class="key-num">1</span>
                      <span class="key-sub">Sales</span>
                    </button>
                    <button class="keypad-btn" data-digit="2" data-hover="expand">
                      <span class="key-num">2</span>
                      <span class="key-sub">Support</span>
                    </button>
                    <button class="keypad-btn" data-digit="3" data-hover="expand">
                      <span class="key-num">3</span>
                      <span class="key-sub">Billing</span>
                    </button>
                  </div>

                  <button id="phone-hangup-ivr-btn" class="phone-action-btn red-btn" style="margin-top: auto;" data-hover="expand">
                    ✆ Hang Up
                  </button>
                </div>

                <!-- WhatsApp Messaging Portal -->
                <div class="phone-view" id="view-whatsapp" style="padding: 0; background: #0b141a; display: flex; flex-direction: column;">
                  <div class="wa-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span class="terminal-dot green" style="width: 8px; height: 8px; box-shadow: 0 0 6px #10b981;"></span>
                      <div>
                        <div style="font-size: 12px; font-weight: bold; color: #fff;">Hanva CRM</div>
                        <div style="font-size: 8px; color: #10b981;">Online</div>
                      </div>
                    </div>
                    <span style="font-size: 10px; color: var(--text-muted);">Verified</span>
                  </div>

                  <!-- Message thread -->
                  <div class="wa-messages" id="wa-chat-thread">
                    <!-- Appended dynamically -->
                  </div>
                  
                  <div class="wa-input-mock">
                    <span style="color: var(--text-muted);">Message...</span>
                    <span>➔</span>
                  </div>
                </div>

                <!-- Ringing Incoming Call (from Telecaller) -->
                <div class="phone-view" id="view-ringing" style="justify-content: space-between; padding-bottom: 32px;">
                  <div style="text-align: center; margin-top: 32px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 8px;">Incoming Call</div>
                    <div style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px;">Hanva CRM Agent</div>
                    <div style="font-size: 11px; color: var(--accent-cyan); animation: pulse-glow 1.5s infinite alternate;">+91 78990 10973</div>
                  </div>

                  <div style="display: flex; justify-content: center; gap: 32px; width: 100%;">
                    <button id="phone-decline-btn" class="phone-circle-btn decline" data-hover="expand">✆</button>
                    <button id="phone-answer-btn" class="phone-circle-btn answer" data-hover="expand">📞</button>
                  </div>
                </div>

                <!-- Active Talk Session (with Telecaller) -->
                <div class="phone-view" id="view-talking" style="justify-content: space-between; padding-bottom: 32px;">
                  <div style="text-align: center; margin-top: 32px;">
                    <div style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 4px;">Calling Agent...</div>
                    <div id="talking-call-timer" style="font-family: var(--font-mono); font-size: 11px; color: #10b981;">00:00</div>
                  </div>

                  <!-- Waveform Mock -->
                  <div class="voice-waveform">
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>

                  <button id="phone-disconnect-btn" class="phone-action-btn red-btn" data-hover="expand">
                    ✆ Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Panel: CRM Telecaller Workspace -->
          <div class="crm-console-column">
            <h3 class="crm-column-heading">🖥️ Hanva Agent CRM Console</h3>

            <!-- Leads Inbox Queue -->
            <div class="glass-card" style="margin-bottom: 24px; padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 12px;">
                <h4 style="font-size: 12px; font-family: var(--font-mono); text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; margin: 0;">📥 CRM Leads Inbox</h4>
                <span id="crm-inbox-status" style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">AWAITING LEAD INGESTION</span>
              </div>

              <!-- Leads items -->
              <div id="crm-inbox-container" style="min-height: 100px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 12px;">
                <div id="crm-inbox-placeholder" style="color: var(--text-muted); font-size: 11px; font-style: italic; text-align: center;">
                  Dial the IVR on the Customer Phone and press a digit to inject a lead in real-time.
                </div>
              </div>
            </div>

            <!-- Kanban Pipeline Board -->
            <h4 style="font-size: 12px; font-family: var(--font-mono); text-transform: uppercase; color: var(--text-primary); margin-bottom: 12px;">Pipeline Deal Board</h4>
            <div class="crm-kanban-board" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
              <!-- Col 1: Qualified -->
              <div class="crm-kanban-col" id="crm-col-qualified" style="min-height: 280px; padding: 12px;">
                <div class="crm-col-header" style="margin-bottom: 8px; padding-bottom: 6px;">
                  <span class="crm-col-title" style="font-size: 11px;">Qualified</span>
                  <span class="crm-col-badge" id="badge-qualified" style="font-size: 9px;">0 Deals</span>
                </div>
                <div class="crm-col-list" id="list-qualified" style="gap: 8px;"></div>
              </div>

              <!-- Col 2: Negotiation -->
              <div class="crm-kanban-col" id="crm-col-negotiation" style="min-height: 280px; padding: 12px;">
                <div class="crm-col-header" style="margin-bottom: 8px; padding-bottom: 6px;">
                  <span class="crm-col-title" style="font-size: 11px;">Negotiation</span>
                  <span class="crm-col-badge" id="badge-negotiation" style="font-size: 9px;">0 Deals</span>
                </div>
                <div class="crm-col-list" id="list-negotiation" style="gap: 8px;"></div>
              </div>

              <!-- Col 3: Closed Won -->
              <div class="crm-kanban-col" id="crm-col-won" style="min-height: 280px; padding: 12px;">
                <div class="crm-col-header" style="margin-bottom: 8px; padding-bottom: 6px;">
                  <span class="crm-col-title" style="font-size: 11px; color: #10b981;">Closed Won</span>
                  <span class="crm-col-badge" id="badge-won" style="font-size: 9px;">0 Deals</span>
                </div>
                <div class="crm-col-list" id="list-won" style="gap: 8px;"></div>
              </div>
            </div>

            <!-- Disposition Modal Mock (Hidden initially) -->
            <div id="disposition-modal" class="glass-card" style="display: none; padding: 16px; margin-bottom: 24px; border-color: #10b981;">
              <h4 style="font-size: 12px; font-weight: bold; margin-bottom: 8px; color: #10b981;">✓ Call Completed. Select Deal Disposition</h4>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-sm" id="disp-qualify-btn" style="flex: 1; font-size: 11px;" data-hover="expand">Qualify Deal</button>
                <button class="btn btn-secondary btn-sm" id="disp-negotiate-btn" style="flex: 1; font-size: 11px;" data-hover="expand">Negotiation</button>
                <button class="btn btn-primary btn-sm" id="disp-won-btn" style="flex: 1; font-size: 11px; background: #10b981; border-color: #10b981;" data-hover="expand">Closed Won</button>
              </div>
            </div>

            <!-- Security Audit Trail Console -->
            <div class="glass-card" style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="terminal-dot red" style="width: 7px; height: 7px;"></span>
                  <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--text-primary);">crm_sso_security_trail.log</span>
                </div>
                <span style="font-size: 9px; color: #10b981; font-family: var(--font-mono); font-weight: 600;">ISO 27001 SECURE</span>
              </div>
              <div id="crm-audit-logs" style="height: 120px; overflow-y: auto; font-family: var(--font-mono); font-size: 10px; line-height: 1.5; color: var(--text-secondary);">
                <!-- Log feed -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Playbook Modal Overlay -->
    <div id="features-modal" class="features-modal-overlay" style="display: none;">
      <div class="features-modal-content glass-card">
        <button class="features-modal-close" id="features-modal-close-btn">&times;</button>
        
        <!-- Grid View of all features -->
        <div id="features-modal-grid-view">
          <div class="features-modal-header">
            <span class="section-subtitle">Core Capabilities Catalog</span>
            <h3 class="features-modal-title">Hanva CRM Ecosystem Features</h3>
            <p class="features-modal-desc">Engineered to eliminate operational leakages, enforce agent accountability, and automate calling operations. Click a card to view its live workflow.</p>
          </div>
          <div class="features-grid">
            <div class="feature-item glass-card" data-feature="attendance" style="cursor: pointer;">
              <div class="feature-icon">🔒</div>
              <div class="feature-info">
                <h4>Proxy-Free Attendance</h4>
                <p>Enforce agent check-ins using device fingerprinting, IP verification, GPS coordinates, and real-time selfie captures.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="lead-dist" style="cursor: pointer;">
              <div class="feature-icon">🚀</div>
              <div class="feature-info">
                <h4>Auto Lead Distribution</h4>
                <p>Instantly allocate leads from website APIs, landing pages, or bulk CSV sheets directly to active agents.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="telecaller" style="cursor: pointer;">
              <div class="feature-icon">📞</div>
              <div class="feature-info">
                <h4>Telecaller Workstation</h4>
                <p>A single dashboard showing prioritized queues, click-to-call browser bridges, and automatic follow-up reminders.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="whatsapp" style="cursor: pointer;">
              <div class="feature-icon">💬</div>
              <div class="feature-info">
                <h4>WhatsApp Templates Automation</h4>
                <p>Broadcast personalized welcome templates and scheduled follow-ups automatically upon status updates.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="wallboard" style="cursor: pointer;">
              <div class="feature-icon">📊</div>
              <div class="feature-info">
                <h4>Real-time Wallboard</h4>
                <p>Track active calling status, breaks, and productivity metrics of your entire floor in a live virtual room.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="ivr" style="cursor: pointer;">
              <div class="feature-icon">🎙️</div>
              <div class="feature-info">
                <h4>IVR Campaigns & Autodialers</h4>
                <p>Deploy large-scale outbound call broadcasts with custom voice menus, routing interested parties to live agents.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="roi" style="cursor: pointer;">
              <div class="feature-icon">🏦</div>
              <div class="feature-info">
                <h4>Disbursement & ROI Reports</h4>
                <p>Map conversion loops directly to payout totals, monitoring bank approvals, login files, and conversion metrics.</p>
              </div>
            </div>
            <div class="feature-item glass-card" data-feature="security" style="cursor: pointer;">
              <div class="feature-icon">🛡️</div>
              <div class="feature-info">
                <h4>Enterprise Security SSO</h4>
                <p>Equipped with SAML 2.0 authentication, row-level data locking, and continuous ISO 27001 compliance logs.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Workflow Simulation View -->
        <div id="features-modal-workflow-view" style="display: none; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px; margin-bottom: 16px;">
            <button class="btn btn-secondary btn-sm" id="workflow-back-btn" data-hover="magnetic" style="font-size: 10px; padding: 4px 12px;">
              ⬅ Back to Features
            </button>
            <h3 id="workflow-title" style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: var(--accent-cyan); margin: 0;">Live Workflow Simulation</h3>
            <span class="terminal-dot green" style="width: 8px; height: 8px; box-shadow: 0 0 6px #10b981;"></span>
          </div>

          <p id="workflow-desc" style="font-size: 11px; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.5;"></p>

          <!-- Animated Workflow Steps -->
          <div class="workflow-steps-container" id="workflow-steps-list" style="margin-bottom: 20px;">
            <!-- Step cards injected dynamically -->
          </div>

          <!-- Simulation Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">SIMULATOR FEEDBACK</span>
            <button class="btn btn-primary btn-sm" id="run-workflow-sim-btn" data-hover="expand" style="font-size: 10px; padding: 5px 12px; background: var(--accent-cyan); border-color: var(--accent-cyan); color: #000; font-family: var(--font-mono); font-weight: bold;">
              ▶ Run Simulation
            </button>
          </div>

          <!-- Sandbox Live Console -->
          <div class="glass-card" style="padding: 12px; background: rgba(3,7,18,0.5); border-color: rgba(255,255,255,0.04);">
            <div style="font-family: var(--font-mono); font-size: 9px; color: #10b981; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>⚡ console_output.sh // status: <strong id="workflow-console-status">IDLE</strong></span>
              <span style="color: var(--text-muted);">ISO 27001 SECURE</span>
            </div>
            <div id="workflow-console-logs" style="height: 120px; overflow-y: auto; font-family: var(--font-mono); font-size: 10px; line-height: 1.5; color: var(--text-secondary);">
              <!-- Log messages will stream here -->
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Synthesize DTMF dual tones
function playDtmfTone(digit) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  const dtmfFreqs = {
    '1': [697, 1209],
    '2': [697, 1336],
    '3': [697, 1477]
  };

  const freqs = dtmfFreqs[digit] || [697, 1209];

  osc1.type = 'sine';
  osc2.type = 'sine';
  
  osc1.frequency.setValueAtTime(freqs[0], ctx.currentTime);
  osc2.frequency.setValueAtTime(freqs[1], ctx.currentTime);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc2.start();
  
  osc1.stop(ctx.currentTime + 0.3);
  osc2.stop(ctx.currentTime + 0.3);
}

// Play WhatsApp message notification chime
function playWaChime() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

export function bindCrm() {
  // Elements
  const dialIvrBtn = document.getElementById('phone-dial-ivr-btn');
  const hangupIvrBtn = document.getElementById('phone-hangup-ivr-btn');
  const keypadBtns = document.querySelectorAll('.keypad-btn');
  const phoneScreen = document.getElementById('phone-screen-viewport');
  const waChatThread = document.getElementById('wa-chat-thread');
  const crmInboxContainer = document.getElementById('crm-inbox-container');
  const crmInboxPlaceholder = document.getElementById('crm-inbox-placeholder');
  const crmInboxStatus = document.getElementById('crm-inbox-status');
  const auditLogs = document.getElementById('crm-audit-logs');

  // Features Modal Elements & Workflows Data
  const exploreBtn = document.getElementById('explore-features-btn');
  const featuresModal = document.getElementById('features-modal');
  const featuresCloseBtn = document.getElementById('features-modal-close-btn');
  const featureCards = document.querySelectorAll('.feature-item');
  const gridView = document.getElementById('features-modal-grid-view');
  const workflowView = document.getElementById('features-modal-workflow-view');
  const workflowBackBtn = document.getElementById('workflow-back-btn');
  const runWorkflowBtn = document.getElementById('run-workflow-sim-btn');

  let simulationInterval = null;
  let activeFeatureKey = null;

  const featureWorkflows = {
    'attendance': {
      title: "🔒 Proxy-Free Attendance Workflow",
      desc: "Simulate a bulletproof telecaller check-in verifying device tokens, geo-location coordinates, and biometric selfies.",
      steps: [
        { id: 1, title: "Device Handshake", icon: "📱", details: "Validate machine fingerprinting & tokens." },
        { id: 2, title: "Geo-Fence Lock", icon: "📍", details: "Verify location within workplace coordinates." },
        { id: 3, title: "Selfie Biometrics", icon: "📷", details: "Analyze selfie data against profile photos." },
        { id: 4, title: "Session Active", icon: "✓", details: "Issue SSO assertion ticket and load dialer." }
      ],
      logs: [
        "Analyzing local client browser machine fingerprints... Validated.",
        "Querying target device coordinates: Latitude 12.97159 / Longitude 77.59461. Geo-fence matched (Delta: 1.4m).",
        "Transferring real-time selfie payload block. Initiating structural outline compare...",
        "Biometric outline matching active telecaller record ID #9873 (Confidence: 99.42%).",
        "SSO Ticket Token dispatched. Caller profile active. Dialing queue initialized."
      ]
    },
    'lead-dist': {
      title: "🚀 Auto Lead Distribution Workflow",
      desc: "Watch leads ingest from landing page webhooks or bulk logs, validate scoring matrices, and allocate to active agents.",
      steps: [
        { id: 1, title: "Inbound Ingest", icon: "📥", details: "Webhook receives JSON or CSV rows." },
        { id: 2, title: "Data Enrichment", icon: "🔍", details: "Check firmographics & business profile info." },
        { id: 3, title: "ICP Scoring", icon: "🎯", details: "Evaluate conversion tier & potential ARR." },
        { id: 4, title: "Auto allocation", icon: "⚖", details: "Push lead to idle agent workstation queues." }
      ],
      logs: [
        "Webhook bridge captured inbound lead POST payload from landing form api.",
        "Querying firmographic details: Aventis Tech // Staff size: 75 // Registered ARR: $5.2M.",
        "Scoring lead eligibility parameters: Priority: High // Intent Score: 87/100 (Unsecured business credit).",
        "Polling available sales caller status counters... 1 idle agent detected.",
        "Allocated lead ID #2948 to Telecaller workspace 9873. Grid dashboard updated."
      ]
    },
    'telecaller': {
      title: "📞 Telecaller Workstation Workflow",
      desc: "Simulate an agent workflow loading prioritized tasks, dialing targets via click-to-call WebRTC, and tracking dispos.",
      steps: [
        { id: 1, title: "Queue Sync", icon: "📋", details: "Load daily tasks, hot deals, and follow-ups." },
        { id: 2, title: "WebRTC Dial", icon: "📞", details: "Initialize browser-based click-to-call dialing." },
        { id: 3, title: "Active Channel", icon: "🎙️", details: "Talk timer and voice audio equalizers active." },
        { id: 4, title: "Save Dispo", icon: "💾", details: "Log call results and schedule callback alerts." }
      ],
      logs: [
        "Fetching agent #9873 daily checklist... 8 qualified opportunities, 3 scheduled callbacks.",
        "Agent clicked Click-to-Call. Establishing WebRTC handshakes and SIP trunk channels.",
        "Dialing +91 98450 10973... Call answered. Outbound talking channel synchronous.",
        "Audio bridge active. Telecaller discussing terms (Duration: 01:24). Real-time recording active.",
        "Call disconnected. Agent marked disposition: 'Documents Sent'. Next follow-up alarm scheduled."
      ]
    },
    'whatsapp': {
      title: "💬 WhatsApp Templates Automation Workflow",
      desc: "Simulate outbound WhatsApp template broadcasts triggering instantly when leads are promoted on the Kanban board.",
      steps: [
        { id: 1, title: "Status Hook", icon: "⚓", details: "Status change triggers API webhook pipeline." },
        { id: 2, title: "Template Render", icon: "📝", details: "Inject client names & details into message templates." },
        { id: 3, title: "API Gateway", icon: "🚀", details: "Broadcast template package to WhatsApp API." },
        { id: 4, title: "Read receipt", icon: "✓✓", details: "Verify delivered and read blue ticks." }
      ],
      logs: [
        "Webhook alert captured: DEAL_STATUS_CHANGE (Opportunity: +91 98450 10973 ➔ Negotiation).",
        "Rendering WhatsApp template: 'welcome_deal' (Variables: name='+91 98450 10973', department='Sales').",
        "Transmitting JSON payload to Meta WhatsApp Cloud Gateway API...",
        "Meta API returned code 200: Message delivered to recipient node. Double grey checks active.",
        "Recipient device parsed message. Double blue read checks confirmed."
      ]
    },
    'wallboard': {
      title: "📊 Real-Time Wallboard Workflow",
      desc: "Check how WebSocket servers poll active caller endpoints to aggregate statistics and SLA KPIs for managers.",
      steps: [
        { id: 1, title: "WebSockets Connect", icon: "🔌", details: "Track live status pins from agent browsers." },
        { id: 2, title: "State Parsing", icon: "🧠", details: "Update states: Calling, Idle, Break, Offline." },
        { id: 3, title: "KPI Calculations", icon: "📈", details: "Recompute SLA, handling times, and win-rates." },
        { id: 4, title: "Wallboard Sync", icon: "📡", details: "Broadcast live telemetry to admin screens." }
      ],
      logs: [
        "WebSockets server active on port 8080. Monitoring 17 active endpoints.",
        "SSO State changed for Agent 9873: IDLE ➔ ACTIVE_CALL. Syncing layout indicator.",
        "Recalculating manager telemetry stats: Win Rate: 98.42% // AHT (Average Handing Time): 2m 14s.",
        "Alert flag triggered: Agent 9812 has exceeded lunch break thresholds by 4m 12s.",
        "Broadcasting fresh JSON statistics package to active administrator screens."
      ]
    },
    'ivr': {
      title: "🎙️ IVR Campaigns & Autodialers Workflow",
      desc: "Watch the dialer trigger calls, play custom menus, detect dual-tone DTMF, and route users to agents.",
      steps: [
        { id: 1, title: "Campaign Load", icon: "🔥", details: "Autodialer campaign loads target number sheet." },
        { id: 2, title: "SIP Trunk Blast", icon: "⚡", details: "Initiates concurrent dials on available lines." },
        { id: 3, title: "IVR Prompt Play", icon: "🔊", details: "Play audio: 'Press 1 for Sales, 2 for Support...'." },
        { id: 4, title: "Agent Transfer", icon: "👤", details: "Bridge call session to available caller console." }
      ],
      logs: [
        "Outbound campaign 'Sales Blast Q2' active. Dialer running at 1500 calls/hr limit.",
        "Allocating SIP trunk capacity... 42 channels active. Dialing +91 98450 10973.",
        "Recipient answered. Executing media playback loop: 'ivr_welcome_prompt.wav'.",
        "DTMF detector recognized dial frequency tone: [1] (Sales Interest Selected).",
        "Scanning active desks... Transferring session bridge to available telecaller 9873. Connected."
      ]
    },
    'roi': {
      title: "🏦 Disbursement & ROI Reports Workflow",
      desc: "Reconcile banking credit approvals, audit payout commissions, and sync savings dashboards.",
      steps: [
        { id: 1, title: "Deal Won Lock", icon: "🔒", details: "Promotes deal status ledger records to CLOSED_WON." },
        { id: 2, title: "Bank Link Check", icon: "🏦", details: "Transmits loan file indicators to banking API bridges." },
        { id: 3, title: "Net Commission", icon: "💰", details: "Calculates commission percent and payout scales." },
        { id: 4, title: "Dashboard Ledger", icon: "📑", details: "Updates net cash flow ledger entries and ROI ratios." }
      ],
      logs: [
        "Closed Won status detected. Initiating financial reconciliation modules.",
        "Transmitting credit file confirmation package to partner Bank API (Sync check status: Logged).",
        "Running commission payout scales: 1.8% of ₹2,50,000 = ₹4,500 approved.",
        "Updating team savings ledger... Cumulative net monthly client savings: ₹84,200/month.",
        "Payout ledger saved. Financial transaction logged and queued for audit verification."
      ]
    },
    'security': {
      title: "🛡️ Enterprise Security SSO Workflow",
      desc: "Ensure enterprise security controls, verifying SAML assertions, implementing row-level data access policies, and recording compliance audits.",
      steps: [
        { id: 1, title: "SSO Verification", icon: "🔑", details: "Validates active access cookies and authorization tokens." },
        { id: 2, title: "SAML Profile", icon: "👤", details: "Checks identity profile with Okta/AD directories." },
        { id: 3, title: "Row-Level Policy", icon: "👁️", details: "Filters visibility matching assigned caller fields." },
        { id: 4, title: "Audit Compliance", icon: "📜", details: "Streams security traces to compliance trails." }
      ],
      logs: [
        "Intercepted navigation request for URL: /crm. Running SSO token inspection.",
        "Token signature matches active SAML ticket assertions (IDP Okta: agent_9873@hanva.in).",
        "Applying row-level security policy checks. Access to unassigned lead rows restricted.",
        "Logged secure read access on client record +91 98450 10973 (Compliance: ISO 27001).",
        "Database encryption verification completed: data-at-rest cipher AES-256 active."
      ]
    }
  };

  // Open modal in Grid View
  if (exploreBtn && featuresModal) {
    exploreBtn.addEventListener('click', () => {
      featuresModal.style.display = 'flex';
      gridView.style.display = 'block';
      workflowView.style.display = 'none';
      setTimeout(() => {
        featuresModal.classList.add('active');
      }, 10);
      playClick();
    });
  }

  // Handle Feature Card Clicks
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      const featureKey = card.getAttribute('data-feature');
      if (!featureKey || !featureWorkflows[featureKey]) return;

      activeFeatureKey = featureKey;
      playClick();

      // Show workflow view, hide grid view
      gridView.style.display = 'none';
      workflowView.style.display = 'flex';

      // Load content
      const wf = featureWorkflows[featureKey];
      document.getElementById('workflow-title').textContent = wf.title;
      document.getElementById('workflow-desc').textContent = wf.desc;

      // Render step blocks
      const stepsList = document.getElementById('workflow-steps-list');
      stepsList.innerHTML = wf.steps.map(step => `
        <div class="workflow-step-card glass-card" id="step-node-${step.id}">
          <div style="font-size: 20px; margin-bottom: 6px;">${step.icon}</div>
          <div style="font-size: 11px; font-weight: 700; color: #fff; margin-bottom: 4px;">${step.title}</div>
          <div style="font-size: 9px; color: var(--text-secondary); line-height: 1.3;">${step.details}</div>
          <span class="step-status-badge pending" id="step-badge-${step.id}">PENDING</span>
        </div>
      `).join('');

      // Clear logs and status
      document.getElementById('workflow-console-status').textContent = 'READY';
      document.getElementById('workflow-console-status').style.color = 'var(--text-muted)';
      const consoleLogs = document.getElementById('workflow-console-logs');
      consoleLogs.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">Ready to simulate. Click "Run Simulation" above.</div>`;
    });
  });

  // Handle Back Button
  if (workflowBackBtn) {
    workflowBackBtn.addEventListener('click', () => {
      if (simulationInterval) clearInterval(simulationInterval);
      gridView.style.display = 'block';
      workflowView.style.display = 'none';
      playClick();
    });
  }

  // Handle Simulation Run Button
  if (runWorkflowBtn) {
    runWorkflowBtn.addEventListener('click', () => {
      if (!activeFeatureKey) return;
      runWorkflowSimulation(activeFeatureKey);
    });
  }

  function runWorkflowSimulation(featureKey) {
    const wf = featureWorkflows[featureKey];
    if (!wf) return;

    const statusText = document.getElementById('workflow-console-status');
    const consoleLogs = document.getElementById('workflow-console-logs');

    if (runWorkflowBtn) runWorkflowBtn.disabled = true;
    if (workflowBackBtn) workflowBackBtn.disabled = true;
    if (statusText) {
      statusText.textContent = "RUNNING";
      statusText.style.color = "#f59e0b";
    }

    consoleLogs.innerHTML = '';
    
    // Reset badges
    wf.steps.forEach(step => {
      const badge = document.getElementById(`step-badge-${step.id}`);
      const node = document.getElementById(`step-node-${step.id}`);
      if (badge && node) {
        badge.textContent = "PENDING";
        badge.className = "step-status-badge pending";
        node.classList.remove('active', 'success');
      }
    });

    let stepIndex = 0;
    
    if (simulationInterval) clearInterval(simulationInterval);

    addSimLog(consoleLogs, "system", `Initializing Live Simulation Loop for: ${wf.title}`);
    
    simulationInterval = setInterval(() => {
      if (stepIndex >= wf.steps.length) {
        clearInterval(simulationInterval);
        playChime();
        if (runWorkflowBtn) runWorkflowBtn.disabled = false;
        if (workflowBackBtn) workflowBackBtn.disabled = false;
        if (statusText) {
          statusText.textContent = "COMPLETED";
          statusText.style.color = "#10b981";
        }
        addSimLog(consoleLogs, "system", "✓ Workflow simulation run completed successfully. System stable.");
        return;
      }

      // Mark previous step as success
      if (stepIndex > 0) {
        const prevStepId = wf.steps[stepIndex - 1].id;
        const prevBadge = document.getElementById(`step-badge-${prevStepId}`);
        const prevNode = document.getElementById(`step-node-${prevStepId}`);
        if (prevBadge && prevNode) {
          prevBadge.textContent = "SUCCESS ✓";
          prevBadge.className = "step-status-badge success";
          prevNode.classList.remove('active');
          prevNode.classList.add('success');
        }
      }

      // Run current step
      const currentStep = wf.steps[stepIndex];
      const badge = document.getElementById(`step-badge-${currentStep.id}`);
      const node = document.getElementById(`step-node-${currentStep.id}`);
      if (badge && node) {
        badge.textContent = "RUNNING";
        badge.className = "step-status-badge running";
        node.classList.add('active');
      }

      playClick();
      
      const logLine = wf.logs[stepIndex];
      const category = currentStep.title.toLowerCase().replace(/[^a-z]/g, '').substring(0, 10);
      addSimLog(consoleLogs, category, logLine);

      stepIndex++;
      
      if (stepIndex === wf.steps.length) {
        setTimeout(() => {
          const lastStepId = wf.steps[stepIndex - 1].id;
          const lastBadge = document.getElementById(`step-badge-${lastStepId}`);
          const lastNode = document.getElementById(`step-node-${lastStepId}`);
          if (lastBadge && lastNode) {
            lastBadge.textContent = "SUCCESS ✓";
            lastBadge.className = "step-status-badge success";
            lastNode.classList.remove('active');
            lastNode.classList.add('success');
          }
        }, 800);
      }
    }, 1300);
  }

  function addSimLog(logsContainer, category, message) {
    if (!logsContainer) return;
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    
    let color = "var(--text-muted)";
    if (category.includes("handshake") || category.includes("ingest") || category.includes("hook") || category.includes("device") || category.includes("inbound")) {
      color = "var(--accent-cyan)";
    } else if (category.includes("lock") || category.includes("geo-fence") || category.includes("enrichment") || category.includes("dial") || category.includes("data") || category.includes("webrtc")) {
      color = "#f59e0b";
    } else if (category.includes("selfie") || category.includes("scoring") || category.includes("connected") || category.includes("parse") || category.includes("dispatch") || category.includes("active") || category.includes("status")) {
      color = "#3b82f6";
    } else if (category.includes("allocation") || category.includes("log") || category.includes("read") || category.includes("system") || category.includes("win") || category.includes("policy") || category.includes("save")) {
      color = "#10b981";
    }

    const row = document.createElement('div');
    row.style.marginBottom = '4px';
    row.style.wordBreak = 'break-all';
    row.innerHTML = `
      <span style="color: var(--text-muted);">[${timeStr}]</span>
      <span style="color: ${color}; font-weight: 600; text-transform: uppercase;">[${category}]</span>
      <span style="color: var(--text-secondary);">${message}</span>
    `;
    logsContainer.appendChild(row);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  function closeFeaturesModal() {
    if (featuresModal) {
      featuresModal.classList.remove('active');
      if (simulationInterval) clearInterval(simulationInterval);
      setTimeout(() => {
        featuresModal.style.display = 'none';
        gridView.style.display = 'block';
        workflowView.style.display = 'none';
      }, 300);
    }
  }

  if (featuresCloseBtn) {
    featuresCloseBtn.addEventListener('click', () => {
      closeFeaturesModal();
      playClick();
    });
  }

  if (featuresModal) {
    featuresModal.addEventListener('click', (e) => {
      if (e.target === featuresModal) {
        closeFeaturesModal();
        playClick();
      }
    });
  }
  
  // Call controls
  const declineBtn = document.getElementById('phone-decline-btn');
  const answerBtn = document.getElementById('phone-answer-btn');
  const disconnectBtn = document.getElementById('phone-disconnect-btn');
  
  // Disposition modal
  const dispModal = document.getElementById('disposition-modal');
  const dispQualifyBtn = document.getElementById('disp-qualify-btn');
  const dispNegotiateBtn = document.getElementById('disp-negotiate-btn');
  const dispWonBtn = document.getElementById('disp-won-btn');

  // Timers
  let ivrCallTimer = null;
  let talkingCallTimer = null;
  let callSeconds = 0;
  let activeLeadCard = null;

  // Kanban Lists
  const kanbanLists = {
    qualified: document.getElementById('list-qualified'),
    negotiation: document.getElementById('list-negotiation'),
    won: document.getElementById('list-won')
  };

  const badgeElements = {
    qualified: document.getElementById('badge-qualified'),
    negotiation: document.getElementById('badge-negotiation'),
    won: document.getElementById('badge-won')
  };

  // Helper to switch phone screen view
  function switchView(viewId) {
    const views = phoneScreen.querySelectorAll('.phone-view');
    views.forEach(v => v.classList.remove('active'));
    
    const activeView = document.getElementById(viewId);
    if (activeView) activeView.classList.add('active');
  }

  // 1. Dial Hanva IVR Trigger
  if (dialIvrBtn) {
    dialIvrBtn.addEventListener('click', () => {
      switchView('view-ivr-call');
      callSeconds = 0;
      
      const timerDisplay = document.getElementById('phone-call-timer');
      timerDisplay.textContent = 'Calling Hanva IVR...';

      // Simulate connection delay
      setTimeout(() => {
        timerDisplay.textContent = '00:00';
        ivrCallTimer = setInterval(() => {
          callSeconds++;
          const min = String(Math.floor(callSeconds / 60)).padStart(2, '0');
          const sec = String(callSeconds % 60).padStart(2, '0');
          timerDisplay.textContent = `${min}:${sec}`;
        }, 1000);
      }, 800);

      addSecurityLog('gateway', 'Inbound call handshake initiated from number: +91 98450 10973');
    });
  }

  // Hangup IVR Call
  if (hangupIvrBtn) {
    hangupIvrBtn.addEventListener('click', () => {
      clearInterval(ivrCallTimer);
      switchView('view-idle');
      addSecurityLog('gateway', 'Inbound call disconnected. [Client Hang Up]');
    });
  }

  // 2. Pressing a Keypad Digit (Core Live Sync Rework)
  keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const digit = btn.getAttribute('data-digit');
      const optionText = btn.querySelector('.key-sub').textContent;

      // Play DTMF beep
      playDtmfTone(digit);

      // Clean up IVR call
      clearInterval(ivrCallTimer);

      // 1. Log events inside database terminal
      addSecurityLog('ivr', `Customer pressed DTMF Digit [${digit}] // Selected department: [${optionText}]`);
      addSecurityLog('database', `Syncing webhook payload to leads inbox. IP authenticated.`);

      // 2. Switch phone screen view to WHATSAPP instantly
      switchView('view-whatsapp');

      // 3. Simultaneously deliver WhatsApp Welcome template
      waChatThread.innerHTML = '';
      setTimeout(() => {
        // Play notification sound
        playWaChime();

        const bubble = document.createElement('div');
        bubble.className = 'wa-bubble';
        bubble.innerHTML = `
          <span style="font-weight: 700; display: block; color: var(--accent-cyan); font-size: 11px; margin-bottom: 4px;">HANVA WELCOME AGENT</span>
          Thank you for contacting Hanva Technologies! We have captured your request for <strong>${optionText}</strong>. A calling agent will contact you shortly.
          <span class="wa-time">16:16</span>
        `;
        waChatThread.appendChild(bubble);
        waChatThread.scrollTop = waChatThread.scrollHeight;

        addSecurityLog('whatsapp', `Successfully dispatched Welcome Template via WhatsApp gateway to: +91 98450 10973`);
      }, 500);

      // 4. Simultaneously inject new lead card in CRM Console Leads Inbox
      crmInboxContainer.innerHTML = '';
      crmInboxStatus.textContent = 'LEAD ACTIVE';
      crmInboxStatus.style.color = 'var(--accent-cyan)';

      const val = digit === '1' ? 150000 : (digit === '2' ? 75000 : 250000);
      const formattedVal = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);

      const card = document.createElement('div');
      card.className = 'crm-deal-card glass-card';
      card.style.borderColor = 'var(--accent-cyan)';
      card.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.15)';
      card.style.width = '100%';
      card.setAttribute('data-val', val);

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
          <span style="font-size: 10px; font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 600; text-transform: uppercase;">Inbound Call Option ${digit}</span>
          <span style="font-size: 12px; font-weight: bold; color: #10b981;">${formattedVal}</span>
        </div>
        <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 2px; color: var(--text-primary);">+91 98450 10973</h4>
        <p style="font-size: 10px; color: var(--text-secondary); margin-bottom: 10px;">Interest: ${optionText} // Lead Source: Inbound IVR</p>
        <button class="crm-callback-btn" id="crm-outbound-dial-btn" data-hover="expand" style="width:100%; background: rgba(6,182,212,0.05); border: 1px solid rgba(6,182,212,0.3); color: var(--accent-cyan); border-radius: 4px; padding: 6px; font-family: var(--font-mono); font-size: 10px; cursor: pointer;">
          📞 Call Back (Click-to-Call)
        </button>
      `;
      crmInboxContainer.appendChild(card);
      activeLeadCard = card;

      // 5. Connect Outbound Dial Callback
      const callbackBtn = card.querySelector('#crm-outbound-dial-btn');
      if (callbackBtn) {
        callbackBtn.addEventListener('click', () => {
          triggerOutboundDial(callbackBtn);
        });
      }
    });
  });

  // 3. Outbound Click-to-Call Dialer loop
  function triggerOutboundDial(btn) {
    btn.disabled = true;
    btn.textContent = 'Calling Customer...';
    addSecurityLog('telephony', 'Initiated Click-to-Call browser bridge to: +91 98450 10973');

    // Ring Customer Device
    setTimeout(() => {
      switchView('view-ringing');
      addSecurityLog('telephony', 'Ringing target device: +91 98450 10973 [Outbound]');
    }, 800);
  }

  // Customer Decline Call
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      switchView('view-whatsapp');
      
      const callbackBtn = document.getElementById('crm-outbound-dial-btn');
      if (callbackBtn) {
        callbackBtn.disabled = false;
        callbackBtn.textContent = '📞 Call Back (Click-to-Call)';
      }
      
      addSecurityLog('telephony', 'Outbound call rejected by customer. [User Decline]');
    });
  }

  // Customer Answer Call
  if (answerBtn) {
    answerBtn.addEventListener('click', () => {
      switchView('view-talking');
      
      const callbackBtn = document.getElementById('crm-outbound-dial-btn');
      if (callbackBtn) {
        callbackBtn.textContent = '📞 Call Active';
      }

      callSeconds = 0;
      const talkingTimer = document.getElementById('talking-call-timer');
      talkingTimer.textContent = '00:00';

      talkingCallTimer = setInterval(() => {
        callSeconds++;
        const min = String(Math.floor(callSeconds / 60)).padStart(2, '0');
        const sec = String(callSeconds % 60).padStart(2, '0');
        talkingTimer.textContent = `${min}:${sec}`;
      }, 1000);

      addSecurityLog('telephony', 'Outbound call established. Channel synchronized.');
    });
  }

  // Disconnect call
  function disconnectCall() {
    clearInterval(talkingCallTimer);
    switchView('view-whatsapp');

    // Reset outbound dial button status
    const callbackBtn = document.getElementById('crm-outbound-dial-btn');
    if (callbackBtn) {
      callbackBtn.remove(); // Remove callback button, reveal save status
    }

    addSecurityLog('telephony', 'Call hung up. Session disconnected.');

    // Display disposition form
    if (dispModal) {
      dispModal.style.display = 'block';
      
      // Auto-scroll agent console to disposition block
      dispModal.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (disconnectBtn) disconnectBtn.addEventListener('click', disconnectCall);

  // 4. Disposition Actions & Kanban Shifting
  function promoteCardToStage(stageKey) {
    if (!activeLeadCard) return;

    const targetList = kanbanLists[stageKey];
    if (targetList && activeLeadCard) {
      // Hide Lead inbox container
      crmInboxContainer.innerHTML = '';
      
      // Reset inbox placeholder
      const placeholder = document.createElement('div');
      placeholder.id = 'crm-inbox-placeholder';
      placeholder.style.color = 'var(--text-muted)';
      placeholder.style.fontSize = '11px';
      placeholder.style.fontStyle = 'italic';
      placeholder.style.textAlign = 'center';
      placeholder.textContent = 'Dial the IVR on the Customer Phone and press a digit to inject a lead in real-time.';
      crmInboxContainer.appendChild(placeholder);

      crmInboxStatus.textContent = 'AWAITING LEAD INGESTION';
      crmInboxStatus.style.color = 'var(--text-muted)';

      // Append card to target stage
      activeLeadCard.style.borderColor = 'var(--glass-border)';
      activeLeadCard.style.boxShadow = 'none';
      
      // Remove any callbacks buttons, display clean metadata
      const btn = activeLeadCard.querySelector('button');
      if (btn) btn.remove();

      targetList.appendChild(activeLeadCard);
      
      // Play audio chime if Closed Won, else standard click tick
      if (stageKey === 'won') {
        playChime();
        addSecurityLog('db-audit', 'Closed opportunity deal logged in secondary backup replica. Database sync complete.');
      } else {
        playClick();
      }

      const stageLabel = stageKey.toUpperCase();
      addSecurityLog('db-audit', `Saved Opportunity status disposition: [+91 98450 10973] promoted to ${stageLabel}.`);

      // Hide disposition selector
      if (dispModal) dispModal.style.display = 'none';

      // Reset references
      activeLeadCard = null;
      updateBoardTotals();
    }
  }

  if (dispQualifyBtn) {
    dispQualifyBtn.addEventListener('click', () => {
      promoteCardToStage('qualified');
    });
  }

  if (dispNegotiateBtn) {
    dispNegotiateBtn.addEventListener('click', () => {
      promoteCardToStage('negotiation');
    });
  }

  if (dispWonBtn) {
    dispWonBtn.addEventListener('click', () => {
      promoteCardToStage('won');
    });
  }

  // 5. Board stats updates
  function updateBoardTotals() {
    const columnsArr = ['qualified', 'negotiation', 'won'];
    columnsArr.forEach(col => {
      const listEl = document.getElementById(`list-${col}`);
      const badgeEl = badgeElements[col];
      if (!listEl || !badgeEl) return;

      const cards = listEl.querySelectorAll('.crm-deal-card');
      const count = cards.length;
      badgeEl.textContent = `${count} ${count === 1 ? 'Deal' : 'Deals'}`;
    });
  }

  // 6. Security Log Ticker
  const logTemplates = [
    { cat: "security", msg: "Verified SAML 2.0 assertions token signature successfully." },
    { cat: "security", msg: "Client session IP check: User session matched from authorized gateway: 104.28.19.12" },
    { cat: "db-audit", msg: "Established Row lock level on deal_opportunities table." },
    { cat: "backup", msg: "WAL segment synchronization successful. Replication delay: 0.1ms." },
    { cat: "auth", msg: "OAuth2 authentication session token refreshed for salesforce_sync module." }
  ];

  function addSecurityLog(category, message) {
    if (!auditLogs) return;

    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    let color = "var(--text-muted)";
    if (category.includes("auth") || category.includes("security") || category.includes("whatsapp")) {
      color = "var(--accent-cyan)";
    } else if (category.includes("ivr") || category.includes("scoring") || category.includes("telephony")) {
      color = "#f59e0b";
    } else if (category.includes("backup") || category.includes("database") || category.includes("db")) {
      color = "#10b981";
    }

    const row = document.createElement('div');
    row.style.marginBottom = '4px';
    row.style.wordBreak = 'break-all';

    row.innerHTML = `
      <span style="color: var(--text-muted);">[${timeStr}]</span>
      <span style="color: ${color}; font-weight: 600; text-transform: uppercase;">[${category}]</span>
      <span style="color: var(--text-secondary);">${message}</span>
    `;

    auditLogs.appendChild(row);

    const rows = auditLogs.querySelectorAll('div');
    if (rows.length > 25) {
      rows[0].remove();
    }

    auditLogs.scrollTop = auditLogs.scrollHeight;
  }

  // Populate initial logs
  for (let i = 0; i < 4; i++) {
    const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    addSecurityLog(template.cat, template.msg);
  }

  const crmTelemetryInterval = setInterval(() => {
    const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    addSecurityLog(template.cat, template.msg);
  }, 4000);

  // Auto clean-up
  window.addEventListener('hashchange', function clean() {
    clearInterval(crmTelemetryInterval);
    clearInterval(ivrCallTimer);
    clearInterval(talkingCallTimer);
    window.removeEventListener('hashchange', clean);
  });
}
