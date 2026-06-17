export function initSystemConsole() {
  const toggleBtn = document.getElementById('sys-status-toggle');
  const panel = document.getElementById('sys-console-panel');
  const latencyDisplay = document.getElementById('sys-stat-latency');
  const agentsDisplay = document.getElementById('sys-stat-agents');
  const tokensDisplay = document.getElementById('sys-stat-tokenload');
  const logsList = document.getElementById('sys-console-logs-list');

  if (!toggleBtn || !panel) return;

  // Toggle console panel view state
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });

  // Close when clicking close button inside or outside
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Log message presets
  const logMessages = [
    "Processed and indexed invoice GST voucher",
    "Qualified lead routing verified in Salesforce CRM",
    "API Gateway handshake authenticated token context",
    "Postgres connection pool optimized: 8 threads active",
    "Autonomous agent completed RAG text scan cycle",
    "Stripe webhook payment reconciliation finalized",
    "Slack notification dispatch succeeded on #sales-alerts",
    "Amortized ledger backup mirrored to AWS S3 bucket",
    "OCR OCR scanned text dump successfully",
    "Auto-response email queued under customer service queue"
  ];

  function getFormattedTime() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function addLogMessage() {
    if (!logsList) return;
    
    const timeStr = getFormattedTime();
    const rawMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
    
    // Determine category styling
    let category = "sys";
    let color = "var(--text-muted)";
    if (rawMsg.includes("API") || rawMsg.includes("Stripe")) {
      category = "api";
      color = "var(--accent-cyan)";
    } else if (rawMsg.includes("Postgres") || rawMsg.includes("backup")) {
      category = "db";
      color = "#f59e0b";
    } else if (rawMsg.includes("agent") || rawMsg.includes("OCR")) {
      category = "ai";
      color = "#818cf8";
    }

    const logRow = document.createElement('div');
    logRow.style.fontSize = '11px';
    logRow.style.lineHeight = '1.5';
    logRow.style.marginBottom = '6px';
    logRow.style.fontFamily = 'var(--font-mono)';
    logRow.style.wordBreak = 'break-all';
    
    logRow.innerHTML = `
      <span style="color: var(--text-muted);">[${timeStr}]</span>
      <span style="color: ${color}; font-weight: 600;">[${category}]</span>
      <span style="color: var(--text-secondary);">${rawMsg}</span>
    `;

    logsList.appendChild(logRow);

    // Keep log history under 20 elements to save memory
    const rows = logsList.querySelectorAll('div');
    if (rows.length > 20) {
      rows[0].remove();
    }

    // Scroll to bottom
    logsList.scrollTop = logsList.scrollHeight;
  }

  // Populate initial logs
  for (let i = 0; i < 5; i++) {
    addLogMessage();
  }

  // Set intervals for fluctuating statistics telemetry
  const telemetryInterval = setInterval(() => {
    // Latency fluctuation: 21ms - 29ms
    if (latencyDisplay) {
      const latency = Math.floor(Math.random() * 8 + 21);
      latencyDisplay.textContent = `${latency}ms`;
    }

    // Active Agents fluctuation: 12 - 15
    if (agentsDisplay) {
      const agents = Math.floor(Math.random() * 4 + 12);
      agentsDisplay.textContent = `${agents} agents`;
    }

    // Token load fluctuation: 1.2k - 1.8k
    if (tokensDisplay) {
      const tokens = (Math.random() * 0.6 + 1.2).toFixed(1);
      tokensDisplay.textContent = `${tokens}k/s`;
    }

    // Staggered log outputs
    if (Math.random() > 0.4) {
      addLogMessage();
    }
  }, 2000);

  // Clean-up logic on view changes
  window.addEventListener('hashchange', function clean() {
    clearInterval(telemetryInterval);
    window.removeEventListener('hashchange', clean);
  });
}
