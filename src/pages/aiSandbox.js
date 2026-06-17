import { initAiDemo } from '../components/aiDemo.js';

export function renderAiSandbox() {
  return `
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Developer Playground</span>
          <h2 class="section-title">AI Agent Builder & Simulator</h2>
          <p class="section-desc">Design your own autonomous background agent. Choose an ingestion trigger, an AI process step, and a synchronization target. Compile your blueprint and execute the simulation in real time.</p>
        </div>

        <!-- Pipeline Preview Bar -->
        <div class="flow-pipeline-bar">
          <span style="color: var(--text-muted); font-size: 10px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; margin-right: 8px;">Active Pipeline:</span>
          <div class="flow-pipeline-step active" id="pipe-ingest-val">Email Listener</div>
          <div class="flow-pipeline-arrow">➔</div>
          <div class="flow-pipeline-step active" id="pipe-process-val">Deep OCR Extract</div>
          <div class="flow-pipeline-arrow">➔</div>
          <div class="flow-pipeline-step active" id="pipe-sync-val">Salesforce CRM</div>
        </div>

        <!-- 3-Column Flowchart Selector -->
        <div class="agent-builder-container">
          <!-- Column 1: Ingest Source -->
          <div class="flow-column">
            <div class="flow-column-title">1. Ingest Source</div>
            <button class="flow-node active" data-type="ingest" data-val="email" data-hover="expand">
              <span class="flow-node-title">📧 Email Listener</span>
              <span class="flow-node-desc">Monitors a dedicated inbox, scans attachment lists, and triggers OCR on incoming PDFs.</span>
            </button>
            <button class="flow-node" data-type="ingest" data-val="webhook" data-hover="expand">
              <span class="flow-node-title">⚡ HTTP Webhook</span>
              <span class="flow-node-desc">Exposes a secure REST endpoint for client ERP software to push unstructured receipts.</span>
            </button>
            <button class="flow-node" data-type="ingest" data-val="sftp" data-hover="expand">
              <span class="flow-node-title">📂 SFTP Cron</span>
              <span class="flow-node-desc">Polls a secure remote server folder every 10 minutes to ingest batch billing files.</span>
            </button>
          </div>

          <!-- Column 2: AI Processor -->
          <div class="flow-column">
            <div class="flow-column-title">2. AI Processing</div>
            <button class="flow-node active" data-type="process" data-val="ocr" data-hover="expand">
              <span class="flow-node-title">🔍 Deep OCR Extract</span>
              <span class="flow-node-desc">Uses layout-aware transformers to extract tabular ledger rows and key-value fields.</span>
            </button>
            <button class="flow-node" data-type="process" data-val="math" data-hover="expand">
              <span class="flow-node-title">📊 Math Validator</span>
              <span class="flow-node-desc">Cross-checks items base cost totals and SGST/CGST margins with mathematical formulas.</span>
            </button>
            <button class="flow-node" data-type="process" data-val="class" data-hover="expand">
              <span class="flow-node-title">🏷️ Segmenter / Router</span>
              <span class="flow-node-desc">Classifies transactions based on value brackets or customer segments for priority routing.</span>
            </button>
          </div>

          <!-- Column 3: Sync Target -->
          <div class="flow-column">
            <div class="flow-column-title">3. Destination Sync</div>
            <button class="flow-node active" data-type="sync" data-val="crm" data-hover="expand">
              <span class="flow-node-title">💼 Salesforce CRM</span>
              <span class="flow-node-desc">Syncs client contact data, updates opportunity value, and appends PDF records.</span>
            </button>
            <button class="flow-node" data-type="sync" data-val="ledger" data-hover="expand">
              <span class="flow-node-title">🗄️ Tally/QuickBooks</span>
              <span class="flow-node-desc">Authenticates token context and posts a double-entry ledger invoice voucher.</span>
            </button>
            <button class="flow-node" data-type="sync" data-val="slack" data-hover="expand">
              <span class="flow-node-title">💬 Slack Notifications</span>
              <span class="flow-node-desc">Dispatches an interactive markdown confirmation block into #accounting-alerts.</span>
            </button>
          </div>
        </div>

        <!-- Compile Button & Sandbox Console -->
        <div style="text-align: center; margin-bottom: 24px; display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <button id="sandbox-compile-btn" class="btn btn-secondary" data-hover="expand">Compile & Deploy Agent</button>
          <button id="sandbox-run-btn" class="btn btn-primary" style="opacity: 0.5; pointer-events: none;" data-hover="expand" disabled>Run Simulation</button>
        </div>

        <div class="glass-card sandbox-card">
          <div class="sandbox-header" style="padding: 16px 24px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; margin-left: 6px;">hanva_sandbox_console.sh</span>
            </div>
            <div id="sandbox-status-badge" style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">AWAITING COMPILING</div>
          </div>
          
          <div class="sandbox-body">
            <div id="sandbox-console" class="terminal-cyber" style="min-height: 220px; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: var(--text-secondary); padding: 20px; background: rgba(3, 7, 18, 0.6); overflow-y: auto; max-height: 350px;">
              <div style="color: var(--text-muted); font-style: italic;">Select nodes in the builder columns above and click "Compile & Deploy Agent" to load system configurations...</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Architecture Details -->
    <section style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Integration Details</span>
          <h2 class="section-title">Standard Agent Blueprint</h2>
          <p class="section-desc">Our background automation jobs run on modern microservices designed for performance and compliance audits.</p>
        </div>

        <div class="cards-grid">
          <div class="glass-card">
            <h3 class="card-title" style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 18px;">01 // Ingestion</h3>
            <p class="card-desc" style="font-size: 14px;">Webhooks, scheduled email cron checks, or manual file uploads capture raw input streams (PDFs, images, unstructured text logs) securely.</p>
          </div>

          <div class="glass-card">
            <h3 class="card-title" style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 18px;">02 // Processing</h3>
            <p class="card-desc" style="font-size: 14px;">LLM parsing passes extract relevant fields (dates, amounts, customer names). Math equations and tax percentages are validated through offline python checkers.</p>
          </div>

          <div class="glass-card">
            <h3 class="card-title" style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 18px;">03 // Execution</h3>
            <p class="card-desc" style="font-size: 14px;">Structured JSON results are synced to active accounting books (Tally, QuickBooks) or customer directories (Salesforce, CRM) with Slack/email status alerts.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindAiSandbox() {
  initAiDemo();
}

