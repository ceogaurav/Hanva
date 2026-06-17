export function renderServices() {
  return `
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Services Directory</span>
          <h2 class="section-title">End-to-End Digital Transformation</h2>
          <p class="section-desc">We combine modular engineering with artificial intelligence to deliver secure, scalable, and business-focused software solutions.</p>
        </div>

        <div class="cards-grid">
          <!-- AI Automation -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">🤖</div>
              <h3 class="card-title">AI Automation & Tools</h3>
              <p class="card-desc">Design and deployment of custom agentic workflows, LLM integration, intelligent document classification, and human-in-the-loop decision pipelines. We turn manual data handling into instant database records.</p>
            </div>
            <a href="#ai-sandbox" class="card-link" data-hover="expand">Launch Sandbox ➔</a>
          </div>

          <!-- CRM Software -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">💼</div>
              <h3 class="card-title">CRM & Billing Software</h3>
              <p class="card-desc">Custom enterprise solutions containing contacts directories, granular access logs, invoicing calculators, inventory trackers, and GST reconciliation engines. Tailored specifically to your business flow.</p>
            </div>
            <a href="#products" class="card-link" data-hover="expand">Interactive CRM Mock ➔</a>
          </div>

          <!-- Software Engineering -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">💻</div>
              <h3 class="card-title">Full-Stack Development</h3>
              <p class="card-desc">Modern web applications, custom SaaS structures, robust APIs, and interactive client portals built with page load speeds, screen responsiveness, and SEO indexing standards in mind.</p>
            </div>
            <span class="card-link" style="color: var(--text-muted);">Vite / React / Node.js</span>
          </div>

          <!-- IT & Cloud -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">☁️</div>
              <h3 class="card-title">Cloud Solutions & IT</h3>
              <p class="card-desc">Cloud migration, virtual server setup (AWS, GCP), secure backups, Docker container orchestration, and continuous integration/deployment (CI/CD) pipelines to guarantee 99.9% uptime.</p>
            </div>
            <span class="card-link" style="color: var(--text-muted);">Docker / AWS / GCP</span>
          </div>

          <!-- Cybersecurity -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">🛡️</div>
              <h3 class="card-title">Cybersecurity & Security</h3>
              <p class="card-desc">Data encryption protocols, role-based access control, SQL injection prevention, OAuth2/Single Sign-On (SSO) integrations, and security audit checklists to keep client records safe.</p>
            </div>
            <span class="card-link" style="color: var(--text-muted);">ISO 27001 Readiness</span>
          </div>

          <!-- Digital Marketing -->
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">📈</div>
              <h3 class="card-title">Digital Marketing & SEO</h3>
              <p class="card-desc">Conversion rate optimization (CRO), custom landing page builders, automated lead-capture routing, Google Analytics dashboards, and technical SEO structure optimization to expand reach.</p>
            </div>
            <a href="#contact" class="card-link" data-hover="expand">Request Blueprint ➔</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Blueprint Hub -->
    <section style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Technical Architecture</span>
          <h2 class="section-title">Interactive Service Blueprints</h2>
          <p class="section-desc">Click on different services below to reveal their underlying architecture pipelines and data flow structures.</p>
        </div>

        <div class="glass-card blueprint-hub" style="padding: 0; overflow: hidden; border-radius: 16px;">
          <div class="blueprint-nav" style="display: flex; flex-wrap: wrap; background: #070b13; border-bottom: 1px solid var(--glass-border);">
            <button class="blueprint-tab-btn active" data-tab="ai" style="flex: 1; min-width: 150px; background: transparent; border: none; border-bottom: 2px solid var(--accent-cyan); color: var(--text-primary); padding: 16px; font-weight: 600; font-family: var(--font-heading); font-size: 14px; text-align: center; cursor: none;">🤖 AI Pipeline</button>
            <button class="blueprint-tab-btn" data-tab="crm" style="flex: 1; min-width: 150px; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); padding: 16px; font-weight: 600; font-family: var(--font-heading); font-size: 14px; text-align: center; cursor: none;">📊 CRM/Billing Flow</button>
            <button class="blueprint-tab-btn" data-tab="web" style="flex: 1; min-width: 150px; background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-secondary); padding: 16px; font-weight: 600; font-family: var(--font-heading); font-size: 14px; text-align: center; cursor: none;">💻 Full-Stack Architecture</button>
          </div>

          <div class="blueprint-content" style="padding: 40px; min-height: 300px;">
            <!-- Tab: AI -->
            <div class="blueprint-pane active" id="pane-ai">
              <h3 style="margin-bottom: 12px; font-weight: 600;">Autonomous Data Extraction Pipeline</h3>
              <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 32px; max-width: 700px;">
                How we ingest unstructured formats (PDFs, Emails) and pipeline them safely into structured billing platforms using guardrailed Large Language Models.
              </p>
              
              <div class="flowchart-container" style="display: flex; flex-direction: column; gap: 20px; font-family: var(--font-mono); font-size: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    📥 Ingest Source<br><span style="color: var(--text-muted); font-size: 10px;">PDF/Email/Webhook</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--accent-cyan); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px; box-shadow: 0 4px 10px rgba(6,182,212,0.15);">
                    🔍 OCR Core<br><span style="color: var(--accent-cyan); font-size: 10px;">Extract Text Nodes</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    🧠 Hanva LLM<br><span style="color: var(--text-muted); font-size: 10px;">Entity Recognition</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid #10b981; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px; box-shadow: 0 4px 10px rgba(16,185,129,0.15);">
                    🛡️ Validation<br><span style="color: #10b981; font-size: 10px;">GST/Math Audits</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    💾 API Gateway<br><span style="color: var(--text-muted); font-size: 10px;">Push to CRM/Tally</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab: CRM (Hidden initially) -->
            <div class="blueprint-pane" id="pane-crm" style="display: none;">
              <h3 style="margin-bottom: 12px; font-weight: 600;">GST-Compliant Invoicing & Account Pipeline</h3>
              <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 32px; max-width: 700px;">
                Our billing structure enforces ledger transparency, synchronizes customer ledgers, and guarantees compliance with accounting rules automatically.
              </p>

              <div class="flowchart-container" style="display: flex; flex-direction: column; gap: 20px; font-family: var(--font-mono); font-size: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    🛒 Order Created<br><span style="color: var(--text-muted); font-size: 10px;">Cart / Direct Sale</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    ⚙️ Ledger Lock<br><span style="color: var(--text-muted); font-size: 10px;">Secure Transaction</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--accent-cyan); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    📝 GST Calculation<br><span style="color: var(--accent-cyan); font-size: 10px;">State SGST/CGST rules</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    ✉️ PDF Invoicing<br><span style="color: var(--text-muted); font-size: 10px;">Digital Signature Lock</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid #10b981; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    💳 Payment Sync<br><span style="color: #10b981; font-size: 10px;">Stripe / Bank Webhook</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab: Web (Hidden initially) -->
            <div class="blueprint-pane" id="pane-web" style="display: none;">
              <h3 style="margin-bottom: 12px; font-weight: 600;">High-Performance SaaS Platform Engine</h3>
              <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 32px; max-width: 700px;">
                Our default stack prioritizes server-side rendering capability (or hydration-efficient SPA), database connection pooling, and rigid security policies.
              </p>

              <div class="flowchart-container" style="display: flex; flex-direction: column; gap: 20px; font-family: var(--font-mono); font-size: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    📱 Client Viewport<br><span style="color: var(--text-muted); font-size: 10px;">Responsive HTML5</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    🌩️ CDN Edge cache<br><span style="color: var(--text-muted); font-size: 10px;">Sub-10ms assets</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--accent-cyan); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    🌐 API Gateway<br><span style="color: var(--accent-cyan); font-size: 10px;">JWT & OAuth Guard</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid var(--glass-border); padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    ⚙️ microservices<br><span style="color: var(--text-muted); font-size: 10px;">Node.js / Express</span>
                  </div>
                  <div style="color: var(--accent-cyan); font-weight: bold; font-size: 18px;">➔</div>
                  <div style="background: var(--bg-tertiary); border: 1px solid #10b981; padding: 12px 20px; border-radius: 8px; text-align: center; min-width: 130px;">
                    🗄️ Ledger Db<br><span style="color: #10b981; font-size: 10px;">PostgreSQL / Redis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Explorer Section -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Integration Systems</span>
          <h2 class="section-title">Verified Technology Stack</h2>
          <p class="section-desc">We build solutions on standardized modern technologies. Click any node below to inspect performance, security, and scalability metrics.</p>
        </div>

        <div class="tech-explorer-grid">
          <button class="tech-node-btn" data-tech="react" data-hover="expand">
            <span class="tech-node-icon">⚛️</span>
            <span class="tech-node-name">React / Vite</span>
          </button>
          <button class="tech-node-btn" data-tech="node" data-hover="expand">
            <span class="tech-node-icon">🟢</span>
            <span class="tech-node-name">Node.js</span>
          </button>
          <button class="tech-node-btn" data-tech="python" data-hover="expand">
            <span class="tech-node-icon">🐍</span>
            <span class="tech-node-name">Python / AI</span>
          </button>
          <button class="tech-node-btn" data-tech="postgres" data-hover="expand">
            <span class="tech-node-icon">🐘</span>
            <span class="tech-node-name">PostgreSQL</span>
          </button>
          <button class="tech-node-btn" data-tech="aws" data-hover="expand">
            <span class="tech-node-icon">☁️</span>
            <span class="tech-node-name">Amazon AWS</span>
          </button>
          <button class="tech-node-btn" data-tech="docker" data-hover="expand">
            <span class="tech-node-icon">🐳</span>
            <span class="tech-node-name">Docker</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Tech Drawer Overlays -->
    <div id="tech-drawer-overlay" class="tech-drawer-overlay"></div>
    <div id="tech-drawer" class="tech-drawer">
      <div class="tech-drawer-header">
        <h3 id="tech-drawer-title" style="font-family: var(--font-mono); font-size: 20px; font-weight: 700; color: var(--accent-cyan);">REACT / VITE</h3>
        <button id="tech-drawer-close" class="tech-drawer-close-btn" data-hover="expand" aria-label="Close details">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div id="tech-drawer-body" style="flex-grow: 1; overflow-y: auto;">
        <!-- Filled dynamically -->
      </div>
    </div>
  `;
}

export function bindServices() {
  const tabs = document.querySelectorAll('.blueprint-tab-btn');
  const panes = document.querySelectorAll('.blueprint-pane');

  if (!tabs.length || !panes.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate other tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.borderBottomColor = 'transparent';
        t.style.color = 'var(--text-secondary)';
      });

      // Activate clicked tab
      tab.classList.add('active');
      tab.style.borderBottomColor = 'var(--accent-cyan)';
      tab.style.color = 'var(--text-primary)';

      const activeTabKey = tab.getAttribute('data-tab');

      // Animate panes transition
      panes.forEach(pane => {
        pane.style.opacity = 0;
        pane.style.transform = 'translateY(10px)';
        pane.style.transition = 'opacity 0.25s, transform 0.25s';
        
        setTimeout(() => {
          pane.style.display = 'none';
          if (pane.id === `pane-${activeTabKey}`) {
            pane.style.display = 'block';
            setTimeout(() => {
              pane.style.opacity = 1;
              pane.style.transform = 'translateY(0)';
            }, 50);
          }
        }, 250);
      });
    });
  });

  // Tech Stack Explorer drawer bindings
  const techBtns = document.querySelectorAll('.tech-node-btn');
  const techDrawer = document.getElementById('tech-drawer');
  const techOverlay = document.getElementById('tech-drawer-overlay');
  const techClose = document.getElementById('tech-drawer-close');
  const techTitle = document.getElementById('tech-drawer-title');
  const techBody = document.getElementById('tech-drawer-body');

  const techDetails = {
    react: {
      name: "REACT & VITE.JS",
      desc: "Our client-side framework of choice for fast, component-driven Single Page Applications (SPA). Prefiltered asset bundles, route splitting, and code trees minimize overhead.",
      metrics: [
        { label: "Core Web Vital (LCP)", value: "< 1.2 seconds" },
        { label: "Vite Bundler Latency", value: "Sub-300ms builds" },
        { label: "Bundle Overhead", value: "< 80kB base size" }
      ]
    },
    node: {
      name: "NODE.JS BACKEND",
      desc: "An event-driven asynchronous server architecture optimized for I/O heavy operations, RESTful API structures, and WebSocket communication.",
      metrics: [
        { label: "Server Response Latency", value: "Sub-45ms average" },
        { label: "Concurrent Handshakes", value: "10,000+ per sec" },
        { label: "JSON Ingestion Rate", value: "Sub-5ms parsing" }
      ]
    },
    python: {
      name: "PYTHON / AI AGENTS",
      desc: "Houses our core large language models orchestration pipelines, data schema validations, text extraction routines, and mathematical computation engines.",
      metrics: [
        { label: "LLM Pipeline Verification", value: "98.6% Accuracy" },
        { label: "OCR Extraction", value: "Sub-2.5s per PDF" },
        { label: "AI Routing Execution", value: "100ms latency" }
      ]
    },
    postgres: {
      name: "POSTGRESQL LEDGER",
      desc: "Relational database supporting rigorous transaction guarantees, connection pools, custom row constraints, and detailed audit trails.",
      metrics: [
        { label: "Ledger Transaction Safety", value: "100% ACID compliant" },
        { label: "Query Index Speed", value: "Sub-5ms execution" },
        { label: "Backup Synchronization", value: "Real-time WAL replication" }
      ]
    },
    aws: {
      name: "AMAZON WEBSERVICES",
      desc: "Scalable cloud cluster nodes hosting API services, database mirrors, asset storage buckets, and automated failover pipelines.",
      metrics: [
        { label: "System Uptime guarantee", value: "99.9% availability" },
        { label: "CDN asset edge latency", value: "Sub-10ms delivery" },
        { label: "Auto-Scale Trigger Delay", value: "< 90 seconds" }
      ]
    },
    docker: {
      name: "DOCKER SYSTEM",
      desc: "Container isolation pipelines packaging application servers, databases, and cron workers into immutable images for reliable staging.",
      metrics: [
        { label: "Staging deployment parity", value: "100% match" },
        { label: "Container Startup", value: "Sub-2.0s initialization" },
        { label: "Resource footprint limit", value: "Adjustable container memory" }
      ]
    }
  };

  if (techBtns.length && techDrawer && techOverlay && techClose && techTitle && techBody) {
    techBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tech');
        const info = techDetails[key];
        if (!info) return;

        techTitle.textContent = info.name;
        
        let metricsHtml = '';
        info.metrics.forEach(m => {
          metricsHtml += `
            <div class="tech-metric-card">
              <span class="form-label" style="margin-bottom: 2px;">${m.label}</span>
              <div class="tech-metric-val">${m.value}</div>
            </div>
          `;
        });

        techBody.innerHTML = `
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
            ${info.desc}
          </p>
          <h4 style="font-size: 13px; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px; letter-spacing: 1px;">Performance Benchmarks</h4>
          ${metricsHtml}
        `;

        techDrawer.classList.add('open');
        techOverlay.classList.add('open');
      });
    });

    const closeTechDrawer = () => {
      techDrawer.classList.remove('open');
      techOverlay.classList.remove('open');
    };

    techClose.addEventListener('click', closeTechDrawer);
    techOverlay.addEventListener('click', closeTechDrawer);
    
    // Auto clean-up resize/drawer listener
    window.addEventListener('hashchange', function clean() {
      closeTechDrawer();
      window.removeEventListener('hashchange', clean);
    });
  }
}
