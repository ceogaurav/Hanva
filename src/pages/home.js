import { initCanvasBackground } from '../components/canvasBackground.js';

export function renderHome() {
  return `
    <!-- Hero Banner Section -->
    <section class="hero-sec">
      <canvas id="hero-canvas" class="hero-particle-canvas"></canvas>
      <div class="container hero-grid">
        <div class="hero-text-content">
          <div class="hero-subtitle-badge">
            <span class="badge-dot"></span>
            <span>Welcome to the future of automation</span>
          </div>
          <h1 class="hero-title">
            AI-Powered Software, <span>Automation</span>, and Growth
          </h1>
          <p class="hero-desc">
            Hanva Technologies delivers next-generation AI automation, custom CRM development, billing systems, and premium software engineering to scale your business operations.
          </p>
          <div class="hero-ctas">
            <a href="#contact" class="btn btn-primary" data-hover="expand">Get Started</a>
            <a href="#services" class="btn btn-secondary" data-hover="expand">Explore Services</a>
            <a href="#ai-sandbox" class="btn btn-secondary" data-hover="expand">Try AI Sandbox</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="glow-sphere"></div>
          <div class="hero-mock-frame glass-card">
            <div class="terminal-header">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span class="terminal-title">hanva_agent.js</span>
            </div>
            <div class="terminal-body" style="height: 100%; color: var(--accent-cyan);">
              <div class="terminal-line" style="color: var(--text-secondary);">&gt; node hanva_agent.js</div>
              <div class="terminal-line" style="color: #10b981;">&gt; Connecting to Hanva Automation Grid...</div>
              <div class="terminal-line" style="color: #10b981;">&gt; Agent initialized. Listening for tasks...</div>
              <div class="terminal-line" style="margin-top: 10px;">&gt; Running Invoice Pipeline:</div>
              <div class="terminal-line" style="color: var(--text-muted); font-size: 11px;">[14:58:23] OCR: Reading file... OK</div>
              <div class="terminal-line" style="color: var(--text-muted); font-size: 11px;">[14:58:24] LLM: Schema Validation... 100%</div>
              <div class="terminal-line" style="color: #10b981; font-weight: bold; margin-top: 5px;">&gt; Data extracted successfully. Invoice pushed to CRM.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Statistics -->
    <section style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card glass-card">
            <div class="stat-num" data-val="50">50+</div>
            <div class="stat-label">Projects Delivered</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-num" data-val="98">98%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-num">24/7</div>
            <div class="stat-label">System Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Features / Offerings Summary -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">What we offer</span>
          <h2 class="section-title">Engineered to Drive Growth</h2>
          <p class="section-desc">We combine artificial intelligence with robust software architecture to automate business bottlenecks and build scalable digital solutions.</p>
        </div>
        
        <div class="cards-grid">
          <div class="service-card glass-card">
            <div>
              <div class="service-icon">🤖</div>
              <h3 class="card-title">AI Automation</h3>
              <p class="card-desc">We build autonomous agentic workflows, custom LLM solutions, and automated process structures that shrink cycle times and minimize operational errors.</p>
            </div>
            <a href="#ai-sandbox" class="card-link" data-hover="expand">Test Simulator ➔</a>
          </div>

          <div class="service-card glass-card">
            <div>
              <div class="service-icon">📊</div>
              <h3 class="card-title">CRM & Billing</h3>
              <p class="card-desc">Tailor-made contact managers, sales pipelines, inventory hubs, and GST-compliant invoicing packages built on modular, enterprise-safe foundations.</p>
            </div>
            <a href="#products" class="card-link" data-hover="expand">View Dashboard ➔</a>
          </div>

          <div class="service-card glass-card">
            <div>
              <div class="service-icon">⚡</div>
              <h3 class="card-title">Web Engineering</h3>
              <p class="card-desc">Custom full-stack SaaS development, API integrations, and fast responsive web platforms built with search engine optimization and speed budgets.</p>
            </div>
            <a href="#services" class="card-link" data-hover="expand">Explore Tech Stack ➔</a>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Work / Methodology Timeline -->
    <section style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Our Methodology</span>
          <h2 class="section-title">Discover, Design, Deliver</h2>
          <p class="section-desc">We follow a transparent, metric-driven process to ensure successful integration and visible return on investment.</p>
        </div>

        <div class="timeline-container">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h3 class="timeline-title">
              <span>Discover</span>
              <span class="timeline-step">Step 1</span>
            </h3>
            <p class="timeline-desc">We deep dive into your operational workflows, identify bottlenecks, study active databases, map data flow requirements, and define precise KPIs for success.</p>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h3 class="timeline-title">
              <span>Design</span>
              <span class="timeline-step">Step 2</span>
            </h3>
            <p class="timeline-desc">We draft detailed software architecture blueprints, mock up user flows, build database relational schemas, and present a clear technical plan before writing production code.</p>
          </div>

          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h3 class="timeline-title">
              <span>Deliver</span>
              <span class="timeline-step">Step 3</span>
            </h3>
            <p class="timeline-desc">We develop iteratively in agile sprints, conduct security compliance audits, ship with full unit test coverage, and deploy scalable solutions with live metrics dashboards.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials / Social Proof -->
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Testimonials</span>
          <h2 class="section-title">What Clients Say</h2>
          <p class="section-desc">Hear how businesses scaled and saved hours of manual operations using Hanva Technologies solutions.</p>
        </div>

        <div class="cards-grid">
          <div class="glass-card">
            <p class="card-desc" style="font-style: italic;">"Hanva's AI automation system reduced our invoice processing workload by 60% within six weeks. The automated pipeline catches tax errors instantly and uploads directly into our books."</p>
            <h4 style="font-weight: 600; margin-top: 16px;">— COO, Direct-to-Consumer Brand</h4>
          </div>

          <div class="glass-card">
            <p class="card-desc" style="font-style: italic;">"Building our custom CRM with Hanva was a game-changer. Our deal visibility increased tenfold, and they integrated single-sign-on and robust audit logs natively."</p>
            <h4 style="font-weight: 600; margin-top: 16px;">— CTO, HealthTech Enterprise</h4>
          </div>

          <div class="glass-card">
            <p class="card-desc" style="font-style: italic;">"The engineering team moves incredibly fast without compromising on code quality. We launched our SaaS platform three weeks ahead of schedule and passed security audits easily."</p>
            <h4 style="font-weight: 600; margin-top: 16px;">— Founder, SaaS Startup</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Call-To-Action (CTA) -->
    <section style="background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(13, 82, 143, 0.15) 100%);">
      <div class="container" style="text-align: center; max-width: 800px;">
        <h2 class="section-title" style="font-size: 44px; margin-bottom: 20px;">Accelerate Operations with Hanva</h2>
        <p class="section-desc" style="margin-bottom: 36px; max-width: 600px; margin-left: auto; margin-right: auto;">
          Ready to scale your business with custom AI tools, CRM dashboards, and robust web applications? Connect with our engineers for a free architecture consult.
        </p>
        <div class="hero-ctas" style="justify-content: center;">
          <a href="#contact" class="btn btn-primary" data-hover="expand">Book Discovery Call</a>
          <a href="#ai-sandbox" class="btn btn-secondary" data-hover="expand">Try AI Playground</a>
        </div>
      </div>
    </section>
  `;
}

export function bindHome() {
  // Initialize canvas particle constellation on hero section
  const cleanUpCanvas = initCanvasBackground('hero-canvas');

  // Simple number count-up animation for stats
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-val'));
    if (!target) return;

    let count = 0;
    const duration = 1500; // 1.5s
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      count += 1;
      stat.textContent = count + (stat.textContent.includes('%') ? '%' : '+');
      if (count >= target) {
        clearInterval(timer);
        stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
      }
    }, stepTime);
  });

  // Keep window unload or navigate cleanups in mind
  window.addEventListener('hashchange', function clean() {
    if (cleanUpCanvas) cleanUpCanvas();
    window.removeEventListener('hashchange', clean);
  });
}
