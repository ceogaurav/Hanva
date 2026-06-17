import { playClick, playChime } from './audioSynthesizer.js';

export function initAiDemo() {
  const nodes = document.querySelectorAll('.flow-node');
  const compileBtn = document.getElementById('sandbox-compile-btn');
  const runBtn = document.getElementById('sandbox-run-btn');
  const terminal = document.getElementById('sandbox-console');
  const statusBadge = document.getElementById('sandbox-status-badge');

  // Pipeline preview elements
  const pipeIngestVal = document.getElementById('pipe-ingest-val');
  const pipeProcessVal = document.getElementById('pipe-process-val');
  const pipeSyncVal = document.getElementById('pipe-sync-val');

  if (!compileBtn || !runBtn || !terminal || !statusBadge) return;

  // Active configurations
  let selectedIngest = 'email';
  let selectedProcess = 'ocr';
  let selectedSync = 'crm';
  let isCompiled = false;
  let isRunning = false;

  // Bind flowchart nodes click triggers
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (isRunning) return;

      const type = node.getAttribute('data-type');
      const val = node.getAttribute('data-val');
      const title = node.querySelector('.flow-node-title').textContent.trim();

      // Deactivate sibling buttons in the same column
      const column = node.parentElement;
      column.querySelectorAll('.flow-node').forEach(btn => {
        btn.classList.remove('active');
      });

      // Activate clicked node
      node.classList.add('active');

      // Update states and previews
      if (type === 'ingest') {
        selectedIngest = val;
        if (pipeIngestVal) pipeIngestVal.textContent = title;
      } else if (type === 'process') {
        selectedProcess = val;
        if (pipeProcessVal) pipeProcessVal.textContent = title;
      } else if (type === 'sync') {
        selectedSync = val;
        if (pipeSyncVal) pipeSyncVal.textContent = title;
      }

      // Reset compile state on configuration change
      isCompiled = false;
      runBtn.disabled = true;
      runBtn.style.opacity = '0.5';
      runBtn.style.pointerEvents = 'none';
      statusBadge.textContent = 'AWAITING COMPILING';
      statusBadge.style.color = 'var(--text-muted)';
      terminal.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">Blueprint configuration changed. Click "Compile & Deploy Agent" to reload system configurations...</div>`;
    });
  });

  const compileLogs = [
    { text: "[compiler] Initializing AST parsing check...", type: "info" },
    { text: "[compiler] Validating node parameters...", type: "info" },
    { text: "[compiler] Injecting deep LLM schema validators...", type: "info" },
    { text: "[compiler] Compiling serverless pipeline bundle...", type: "info" },
    { text: "[compiler] Successfully established target webhooks...", type: "success" },
    { text: "[compiler] Deployed agent code block to regional Edge locations.", type: "success" }
  ];

  const ingestLogs = {
    email: [
      { text: "[sys@ingest-mail] Initiating secure IMAP listener on port 993...", type: "info" },
      { text: "[sys@ingest-mail] Found 1 unread email matching pattern 'invoice-*.pdf'...", type: "info" },
      { text: "[sys@ingest-mail] Downloaded attachment 'invoice_retail.pdf' (892KB).", type: "success" }
    ],
    webhook: [
      { text: "[sys@webhook-api] Listening for POST requests on /api/v1/ingest...", type: "info" },
      { text: "[sys@webhook-api] Received secure payload from client ERP (203.0.113.48)...", type: "info" },
      { text: "[sys@webhook-api] Payload auth verified. Payload parsed: 488 bytes.", type: "success" }
    ],
    sftp: [
      { text: "[sys@sftp-poll] Connecting to sftp://sftp.hanva-secure.com...", type: "info" },
      { text: "[sys@sftp-poll] Polling directory /var/billing/incoming...", type: "info" },
      { text: "[sys@sftp-poll] Discovered and synced file 'batch_ledger_2026.csv'.", type: "success" }
    ]
  };

  const processLogs = {
    ocr: [
      { text: "[agent@ocr-core] Initializing layout-aware Vision Transformer...", type: "info" },
      { text: "[agent@ocr-core] Scanning tabular boundaries and key-value lines...", type: "info" },
      { text: "[agent@ocr-core] Outputting bounding boxes. Extraction accuracy: 99.7%", type: "success" }
    ],
    math: [
      { text: "[agent@math-audit] Cross-referencing subtotal sum calculation...", type: "info" },
      { text: "[agent@math-audit] Checking SGST (9%) and CGST (9%) math distributions...", type: "info" },
      { text: "[agent@math-audit] Validation check passed. Subtotal + Tax = Grand Total.", type: "success" }
    ],
    class: [
      { text: "[agent@classifier] Running semantic text search on extracted headers...", type: "info" },
      { text: "[agent@classifier] Detected tags: [enterprise_billing] [priority_high]...", type: "info" },
      { text: "[agent@classifier] Lead matches ICP. Pushing to prioritized sales lane.", type: "success" }
    ]
  };

  const syncLogs = {
    crm: [
      { text: "[sys@salesforce-api] Authenticating REST session token...", type: "info" },
      { text: "[sys@salesforce-api] Syncing Account: Gaurav Rajpoot (ID: acct_8892)...", type: "info" },
      { text: "[sys@salesforce-api] Successfully created opportunity record: ₹1,50,000.", type: "success" }
    ],
    ledger: [
      { text: "[sys@ledger-api] Establishing secure database handshake with Tally ERP...", type: "info" },
      { text: "[sys@ledger-api] Creating Double-Entry Ledger voucher record...", type: "info" },
      { text: "[sys@ledger-api] Voucher registered successfully. Voucher ID: HNV-99210-AP.", type: "success" }
    ],
    slack: [
      { text: "[sys@slack-dispatch] Connecting to incoming webhook slack.com/services/...", type: "info" },
      { text: "[sys@slack-dispatch] Posting markdown alert payload to channel #sales-alerts...", type: "info" },
      { text: "[sys@slack-dispatch] Slack post confirmed by server response: HTTP 200 OK.", type: "success" }
    ]
  };

  function generateCustomJson() {
    const json = {
      status: "PROCESSED",
      agent_id: "hanva_worker_v4",
      timestamp: new Date().toISOString(),
      blueprint: {
        source: selectedIngest,
        action: selectedProcess,
        sink: selectedSync
      },
      metrics: {
        latency_ms: Math.floor(Math.random() * 80 + 120),
        token_count: Math.floor(Math.random() * 120 + 240),
        confidence_score: (Math.random() * 0.05 + 0.94).toFixed(3)
      }
    };
    return JSON.stringify(json, null, 2);
  }

  // Compile button trigger
  compileBtn.addEventListener('click', () => {
    if (isRunning) return;

    isRunning = true;
    isCompiled = false;
    compileBtn.disabled = true;
    runBtn.disabled = true;
    runBtn.style.opacity = '0.5';
    runBtn.style.pointerEvents = 'none';

    statusBadge.textContent = 'COMPILING...';
    statusBadge.style.color = '#f59e0b';
    terminal.innerHTML = '';

    let index = 0;
    function typeCompileLine() {
      if (index < compileLogs.length) {
        const line = document.createElement('div');
        const log = compileLogs[index];
        line.style.color = log.type === 'success' ? '#10b981' : '#9ca3af';
        line.textContent = `> ${log.text}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        index++;
        setTimeout(typeCompileLine, 150);
      } else {
        // Complete compiling
        isRunning = false;
        isCompiled = true;
        compileBtn.disabled = false;
        
        // Unlock run button
        runBtn.disabled = false;
        runBtn.style.opacity = '1';
        runBtn.style.pointerEvents = 'auto';

        statusBadge.textContent = 'COMPILED & ACTIVE';
        statusBadge.style.color = '#10b981';

        const finalLine = document.createElement('div');
        finalLine.style.color = '#10b981';
        finalLine.style.marginTop = '10px';
        finalLine.style.fontWeight = 'bold';
        finalLine.textContent = '>>> AGENT DEPLOYED SUCCESSFULLY. CLICK "RUN SIMULATION"';
        terminal.appendChild(finalLine);
        terminal.scrollTop = terminal.scrollHeight;

        // Play synthesized audio notification
        playChime();
      }
    }

    typeCompileLine();
  });

  // Run button trigger
  runBtn.addEventListener('click', () => {
    if (!isCompiled || isRunning) return;

    isRunning = true;
    runBtn.disabled = true;
    runBtn.textContent = 'Processing...';
    compileBtn.disabled = true;
    terminal.innerHTML = '';

    // Create execution pipeline logs
    const activeWorkflowLogs = [
      { text: `[agent@hanva-mesh] RUNNING BluePrint [${selectedIngest} ➔ ${selectedProcess} ➔ ${selectedSync}]...`, type: 'info' },
      ...ingestLogs[selectedIngest],
      ...processLogs[selectedProcess],
      ...syncLogs[selectedSync],
      { text: 'JSON PAYLOAD RETURNED:', type: 'success' },
      { text: generateCustomJson(), type: 'json' }
    ];

    let index = 0;
    function typeRunLine() {
      if (index < activeWorkflowLogs.length) {
        const log = activeWorkflowLogs[index];
        const line = document.createElement('div');

        if (log.type === 'json') {
          line.className = 'terminal-line-code';
          line.style.color = '#818cf8';
          line.style.background = '#090d16';
          line.style.padding = '12px';
          line.style.borderRadius = '6px';
          line.style.marginTop = '8px';
          line.style.border = '1px solid rgba(255,255,255,0.05)';
          line.style.whiteSpace = 'pre';
          line.style.overflowX = 'auto';
          line.textContent = log.text;
        } else {
          line.style.color = log.type === 'success' ? '#10b981' : '#9ca3af';
          line.textContent = `> ${log.text}`;
        }

        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        index++;
        
        const delay = log.type === 'json' ? 400 : (Math.random() * 200 + 200);
        setTimeout(typeRunLine, delay);
      } else {
        // Complete execution
        isRunning = false;
        runBtn.disabled = false;
        runBtn.textContent = 'Run Simulation';
        compileBtn.disabled = false;

        const finalLine = document.createElement('div');
        finalLine.style.color = '#10b981';
        finalLine.style.marginTop = '12px';
        finalLine.style.fontWeight = 'bold';
        finalLine.textContent = '>>> SIMULATION RUN COMPLETED SUCCESSFULLY [EXIT 0]';
        terminal.appendChild(finalLine);
        terminal.scrollTop = terminal.scrollHeight;
      }
    }

    typeRunLine();
  });
}

