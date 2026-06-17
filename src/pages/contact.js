export function renderContact() {
  return `
    <section>
      <div class="container" style="max-width: 800px;">
        <div class="section-header">
          <span class="section-subtitle">Connect</span>
          <h2 class="section-title">Initiate Your Project</h2>
          <p class="section-desc">Fill out our interactive project architect form, and receive a customized implementation proposal within 12 hours.</p>
        </div>

        <div class="glass-card contact-form-container" style="position: relative;">
          <!-- Step indicator dots -->
          <div class="step-indicator">
            <span class="step-dot active" id="dot-1"></span>
            <span class="step-dot" id="dot-2"></span>
            <span class="step-dot" id="dot-3"></span>
          </div>

          <!-- Form body -->
          <form id="project-architect-form">
            <!-- Step 1: Product Selection -->
            <div class="form-step active" id="step-1-content">
              <h3 style="margin-bottom: 24px; font-weight: 600; font-size: 18px;">What solutions are you looking to build?</h3>
              <div class="option-grid">
                <div class="cyber-option selected" data-value="AI Automation Workflow" data-hover="expand">
                  <div style="font-size: 24px; margin-bottom: 8px;">🤖</div>
                  <div style="font-weight: 600; font-size: 14px;">AI Automation</div>
                  <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Agentic logs & workflows</div>
                </div>

                <div class="cyber-option" data-value="Custom CRM & Billing" data-hover="expand">
                  <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                  <div style="font-weight: 600; font-size: 14px;">CRM & Billing</div>
                  <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Invoices, Ledgers, Contacts</div>
                </div>

                <div class="cyber-option" data-value="Full-Stack Web App" data-hover="expand">
                  <div style="font-size: 24px; margin-bottom: 8px;">💻</div>
                  <div style="font-weight: 600; font-size: 14px;">Web Engineering</div>
                  <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Fast responsive SaaS code</div>
                </div>

                <div class="cyber-option" data-value="Cloud & Security Audit" data-hover="expand">
                  <div style="font-size: 24px; margin-bottom: 8px;">🛡️</div>
                  <div style="font-weight: 600; font-size: 14px;">Cloud & Security</div>
                  <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Audits, backups, integrations</div>
                </div>
              </div>
            </div>

            <!-- Step 2: Contact Details -->
            <div class="form-step" id="step-2-content">
              <h3 style="margin-bottom: 24px; font-weight: 600; font-size: 18px;">Introduce yourself</h3>
              
              <div class="form-group">
                <label class="form-label" for="client-name">Full Name</label>
                <input type="text" id="client-name" class="form-input" placeholder="Gaurav Rajpoot" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="client-email">Email Address</label>
                <input type="email" id="client-email" class="form-input" placeholder="gaurav@hanva.in" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="client-company">Company / Enterprise</label>
                <input type="text" id="client-company" class="form-input" placeholder="Hanva Technologies" required>
              </div>
            </div>

            <!-- Step 3: Timeline & Budget -->
            <div class="form-step" id="step-3-content">
              <h3 style="margin-bottom: 24px; font-weight: 600; font-size: 18px;">Select Timeline & Budget</h3>
              
              <div class="form-group">
                <label class="form-label">Target Launch Timeline</label>
                <div class="option-grid" style="grid-template-columns: repeat(3, 1fr);">
                  <div class="cyber-option selected timeline-opt" data-value="Quick Prototype (1-2w)" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">Quick (1-2 weeks)</span>
                  </div>
                  <div class="cyber-option timeline-opt" data-value="Full Deployment (1-2mo)" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">Medium (1-2 months)</span>
                  </div>
                  <div class="cyber-option timeline-opt" data-value="Unscheduled Consult" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">Just Consulting</span>
                  </div>
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Project Budget (Amortized Scale)</label>
                <div class="option-grid" style="grid-template-columns: repeat(3, 1fr);">
                  <div class="cyber-option selected budget-opt" data-value="₹50k - ₹2L" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">₹50k - ₹2L</span>
                  </div>
                  <div class="cyber-option budget-opt" data-value="₹2L - ₹5L" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">₹2L - ₹5L</span>
                  </div>
                  <div class="cyber-option budget-opt" data-value="₹5L+" data-hover="expand">
                    <span style="font-size: 13px; font-weight: 500;">₹5L+</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Navigation -->
            <div class="form-nav-row">
              <button type="button" id="form-back-btn" class="btn btn-secondary btn-sm hidden" data-hover="expand">Back</button>
              <button type="button" id="form-next-btn" class="btn btn-primary btn-sm" style="margin-left: auto;" data-hover="expand">Next</button>
              <button type="submit" id="form-submit-btn" class="btn btn-primary btn-sm hidden" style="margin-left: auto;" data-hover="expand">Submit Architecture Request</button>
            </div>
          </form>

          <!-- Success Screen Overlay -->
          <div id="form-success-overlay" class="hidden" style="position: absolute; inset: 0; background: var(--bg-secondary); border-radius: inherit; padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <div id="success-terminal" class="terminal-cyber" style="width: 100%; min-height: 220px; text-align: left; margin-bottom: 24px; box-shadow: none;">
              <!-- Dynamically output transmission log -->
            </div>
            <h3 style="color: #10b981; font-weight: 700; font-size: 20px; margin-bottom: 8px;">🚀 TRANSMISSION COMPLETE</h3>
            <p style="color: var(--text-secondary); font-size: 14px; max-width: 480px; line-height: 1.5;">
              Thank you! Our sales engineers will review your architecture parameters and coordinate a calendar invite.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindContact() {
  const form = document.getElementById('project-architect-form');
  const backBtn = document.getElementById('form-back-btn');
  const nextBtn = document.getElementById('form-next-btn');
  const submitBtn = document.getElementById('form-submit-btn');

  // Steps contents
  const step1 = document.getElementById('step-1-content');
  const step2 = document.getElementById('step-2-content');
  const step3 = document.getElementById('step-3-content');
  const stepDots = [
    document.getElementById('dot-1'),
    document.getElementById('dot-2'),
    document.getElementById('dot-3')
  ];

  if (!form || !backBtn || !nextBtn || !submitBtn) return;

  let currentStep = 1;
  let selectedProduct = "AI Automation Workflow";
  let selectedTimeline = "Quick Prototype (1-2w)";
  let selectedBudget = "₹50k - ₹2L";

  // Step 1 Choice Selection listeners
  const productOptions = document.querySelectorAll('#step-1-content .cyber-option');
  productOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      productOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedProduct = opt.getAttribute('data-value');
    });
  });

  // Step 3 Timelines selection listeners
  const timelineOptions = document.querySelectorAll('.timeline-opt');
  timelineOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      timelineOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedTimeline = opt.getAttribute('data-value');
    });
  });

  // Step 3 Budget selection listeners
  const budgetOptions = document.querySelectorAll('.budget-opt');
  budgetOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      budgetOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedBudget = opt.getAttribute('data-value');
    });
  });

  function updateStepsUI() {
    // Hide all contents
    step1.classList.remove('active');
    step2.classList.remove('active');
    step3.classList.remove('active');

    // Show current content
    if (currentStep === 1) {
      step1.classList.add('active');
      backBtn.classList.add('hidden');
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    } else if (currentStep === 2) {
      step2.classList.add('active');
      backBtn.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    } else if (currentStep === 3) {
      step3.classList.add('active');
      backBtn.classList.remove('hidden');
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    }

    // Sync dots status
    stepDots.forEach((dot, index) => {
      const stepNum = index + 1;
      dot.className = 'step-dot';
      if (stepNum === currentStep) {
        dot.classList.add('active');
      } else if (stepNum < currentStep) {
        dot.classList.add('completed');
      }
    });
  }

  // Next triggers
  nextBtn.addEventListener('click', () => {
    if (currentStep === 2) {
      // Validate step 2 inputs
      const name = document.getElementById('client-name');
      const email = document.getElementById('client-email');
      const company = document.getElementById('client-company');
      
      if (!name.value || !email.value || !company.value) {
        alert("Please fill in all details before proceeding.");
        return;
      }
    }
    
    if (currentStep < 3) {
      currentStep++;
      updateStepsUI();
    }
  });

  // Back triggers
  backBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepsUI();
    }
  });

  // Form Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const company = document.getElementById('client-company').value;

    const overlay = document.getElementById('form-success-overlay');
    const successTerminal = document.getElementById('success-terminal');

    if (!overlay || !successTerminal) return;

    // Show success screen overlay
    overlay.classList.remove('hidden');
    successTerminal.innerHTML = "";

    const logs = [
      { text: "ESTABLISHING HANDSHAKE WITH DISPATCH...", color: "#9ca3af" },
      { text: "CONNECTING TO SECURE GATEWAY (api.hanva.in)... OK", color: "#10b981" },
      { text: "COMPILING FORM PAYLOAD...", color: "#9ca3af" },
      { text: `ENCRYPTING SENDER: ${name.toUpperCase()} (${company.toUpperCase()})...`, color: "#9ca3af" },
      { text: `SCHEDULING ROUTE: Product = [${selectedProduct}], Budget = [${selectedBudget}]`, color: "#f59e0b" },
      { text: "TRANSMITTING DATA STRAP OVER HTTPS...", color: "#9ca3af" },
      { text: "SUCCESS: STATUS 201 CREATED.", color: "#10b981" },
      { text: `TICKET REGISTERED: #HNV-${Math.floor(Math.random()*9000 + 1000)}`, color: "#10b981" }
    ];

    let logIndex = 0;
    function printLog() {
      if (logIndex < logs.length) {
        const item = logs[logIndex];
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.style.color = item.color;
        line.style.fontFamily = 'var(--font-mono)';
        line.style.fontSize = '12px';
        line.style.lineHeight = '1.6';
        line.innerHTML = `&gt; ${item.text}`;
        successTerminal.appendChild(line);
        successTerminal.scrollTop = successTerminal.scrollHeight;
        
        logIndex++;
        setTimeout(printLog, Math.random() * 200 + 200);
      }
    }

    printLog();
  });
}
