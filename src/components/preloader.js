export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const logsContainer = document.getElementById('preloader-logs');
  const progressBar = document.getElementById('preloader-progress');
  const percentageText = document.getElementById('preloader-percentage');
  const statusText = document.getElementById('preloader-status');

  if (!preloader || !logsContainer) {
    if (onComplete) onComplete();
    return;
  }

  // Set preloader class on body to disable scroll
  document.body.classList.add('preloader-active');

  const logs = [
    { text: "INITIALIZING HANVA SYSTEM v3.4.0...", type: "info" },
    { text: "LOADING VIRTUAL SHADERS & GLOW MAPS...", type: "info" },
    { text: "CONNECTING TO NEURAL DATA GRIDS...", type: "info" },
    { text: "SUCCESS: SECURE WEBSOCKET ESTABLISHED.", type: "success" },
    { text: "BOOTSTRAPPING DIGITAL CONSTELLATION MESH...", type: "info" },
    { text: "COMPILING CRM & INVOICING PIPELINES...", type: "info" },
    { text: "WARNING: MEMORY CACHE MISS, FETCHING REMOTE SCHEMAS...", type: "warn" },
    { text: "SUCCESS: SCHEMAS RECONCILED.", type: "success" },
    { text: "SPAWNING CLIENT-SIDE AGENT SIMULATOR...", type: "info" },
    { text: "SYNCHRONIZING SECURE TRANSACTIONS...", type: "info" },
    { text: "SYSTEM HEALTH CHECK: 100% SECURE.", type: "success" },
    { text: "PREPARATION COMPLETE. BOOTING UI MESH...", type: "success" }
  ];

  let currentLogIndex = 0;
  let progress = 0;

  function addLogLine(text, type) {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = `&gt; ${text}`;
    logsContainer.appendChild(line);
    
    // Auto scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  // Dynamic log writing loop
  function processLogs() {
    if (currentLogIndex < logs.length) {
      const log = logs[currentLogIndex];
      addLogLine(log.text, log.type);
      currentLogIndex++;
      
      // Calculate target progress based on log index
      const targetProgress = Math.round((currentLogIndex / logs.length) * 100);
      
      // Animate progress to target
      animateProgress(targetProgress, () => {
        // Staggered log delay
        const delay = log.type === 'warn' ? 350 : (Math.random() * 150 + 100);
        setTimeout(processLogs, delay);
      });
    } else {
      // Finished all logs
      statusText.textContent = "LAUNCHING HANVA OS...";
      setTimeout(dismissPreloader, 400);
    }
  }

  function animateProgress(target, callback) {
    const interval = setInterval(() => {
      if (progress < target) {
        progress += 1;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;
        
        // Update status text based on progress
        if (progress < 30) {
          statusText.textContent = "BOOTSTRAP CORE SYS...";
        } else if (progress < 60) {
          statusText.textContent = "COMPILING WEBPACK CHUNKS...";
        } else if (progress < 90) {
          statusText.textContent = "RESOLVING SECURE PORTALS...";
        } else {
          statusText.textContent = "SYNC COMPLETE.";
        }
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 12);
  }

  function dismissPreloader() {
    // Reveal app content first (so it's rendered underneath the slide animation)
    const appShell = document.getElementById('app');
    if (appShell) appShell.classList.remove('hidden');

    preloader.classList.add('dismiss');
    document.body.classList.remove('preloader-active');

    // Trigger complete callback once preloader is fully gone
    setTimeout(() => {
      preloader.style.display = 'none';
      if (onComplete) onComplete();
    }, 800); // Matches CSS transition duration
  }

  // Start preloader process after a small init delay
  setTimeout(processLogs, 300);
}
