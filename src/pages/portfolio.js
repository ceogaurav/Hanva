export function renderPortfolio() {
  return `
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Case Studies</span>
          <h2 class="section-title">Delivered Solutions</h2>
          <p class="section-desc">Explore some of the high-performance applications, custom CRMs, and AI automation systems built and deployed by Hanva Technologies.</p>
        </div>

        <div class="portfolio-slider-container">
          <div class="portfolio-slider" id="portfolio-slider">
            <!-- Project 1 -->
            <div class="portfolio-slide glass-card">
              <img src="/ap_system.png" alt="Acme Accounts AP System Mockup" class="portfolio-img"/>
              <div class="portfolio-tags">
                <span class="portfolio-tag">AI Agent</span>
                <span class="portfolio-tag">OCR Extraction</span>
                <span class="portfolio-tag">Tally API</span>
              </div>
              <h3 class="card-title" style="font-size: 20px;">Acme Accounts AP System</h3>
              <p class="card-desc" style="font-size: 14px;">Automated invoice extraction and GST bookkeeping for a major retail brand, reducing manual accounting entry hours by 60%.</p>
            </div>

            <!-- Project 2 -->
            <div class="portfolio-slide glass-card">
              <img src="/crm_pipeline.png" alt="Skyline Deal Pipeline Mockup" class="portfolio-img"/>
              <div class="portfolio-tags">
                <span class="portfolio-tag">Custom CRM</span>
                <span class="portfolio-tag">Node.js</span>
                <span class="portfolio-tag">Postgres Ledger</span>
              </div>
              <h3 class="card-title" style="font-size: 20px;">Skyline Deal Pipeline</h3>
              <p class="card-desc" style="font-size: 14px;">Tailor-made contact manager and pipeline tracker with single-sign-on access logs, auditing, and real-time deal stats dashboards.</p>
            </div>

            <!-- Project 3 -->
            <div class="portfolio-slide glass-card">
              <img src="/billing_gateway.png" alt="HealthCart Billing Gateway Mockup" class="portfolio-img"/>
              <div class="portfolio-tags">
                <span class="portfolio-tag">SaaS Engineering</span>
                <span class="portfolio-tag">REST API</span>
                <span class="portfolio-tag">OAuth2</span>
              </div>
              <h3 class="card-title" style="font-size: 20px;">HealthCart Billing Gateway</h3>
              <p class="card-desc" style="font-size: 14px;">A GST-compliant billing system supporting inventory checks, automated customer ledger sync, and Stripe webhook reconciliation.</p>
            </div>

            <!-- Project 4 -->
            <div class="portfolio-slide glass-card">
              <img src="/lms_analytics.png" alt="EduFlow Course Director Mockup" class="portfolio-img"/>
              <div class="portfolio-tags">
                <span class="portfolio-tag">LMS Suite</span>
                <span class="portfolio-tag">Next.js SPA</span>
                <span class="portfolio-tag">Redis cache</span>
              </div>
              <h3 class="card-title" style="font-size: 20px;">EduFlow Course Director</h3>
              <p class="card-desc" style="font-size: 14px;">Interactive learning management dashboard with serverless database syncing, responsive layouts, and user session monitoring.</p>
            </div>
          </div>

          <div class="slider-controls">
            <button id="slider-prev" class="slider-ctrl-btn" aria-label="Previous Project" data-hover="expand">◂</button>
            <button id="slider-next" class="slider-ctrl-btn" aria-label="Next Project" data-hover="expand">▸</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindPortfolio() {
  const slider = document.getElementById('portfolio-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (!slider || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getSlideScrollAmount() {
    const slide = slider.querySelector('.portfolio-slide');
    if (!slide) return 0;
    
    const slideWidth = slide.getBoundingClientRect().width;
    const gap = 24; // Corresponds to CSS gap in portfolio-slider
    return slideWidth + gap;
  }

  function updateSliderPosition() {
    const scrollAmount = getSlideScrollAmount();
    slider.style.transform = `translateX(-${currentIndex * scrollAmount}px)`;
  }

  nextBtn.addEventListener('click', () => {
    const slidesCount = slider.querySelectorAll('.portfolio-slide').length;
    // Determine visible slides count based on screen width
    let visibleSlides = 3;
    if (window.innerWidth <= 600) visibleSlides = 1;
    else if (window.innerWidth <= 992) visibleSlides = 2;

    const maxIndex = slidesCount - visibleSlides;

    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Loop back
    }
    updateSliderPosition();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // Loop to end
      const slidesCount = slider.querySelectorAll('.portfolio-slide').length;
      let visibleSlides = 3;
      if (window.innerWidth <= 600) visibleSlides = 1;
      else if (window.innerWidth <= 992) visibleSlides = 2;
      
      currentIndex = Math.max(0, slidesCount - visibleSlides);
    }
    updateSliderPosition();
  });

  // Handle window resizing
  window.addEventListener('resize', updateSliderPosition);

  // Auto clean-up resize listener
  window.addEventListener('hashchange', function clean() {
    window.removeEventListener('resize', updateSliderPosition);
    window.removeEventListener('hashchange', clean);
  });
}
