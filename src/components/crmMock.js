export function initCrmMock() {
  const filterBtns = document.querySelectorAll('.crm-filters .filter-btn');
  const statDeals = document.getElementById('crm-stat-deals');
  const statRevenue = document.getElementById('crm-stat-revenue');
  const statWinrate = document.getElementById('crm-stat-winrate');
  const chartLine = document.getElementById('crm-chart-line');
  const chartArea = document.getElementById('crm-chart-area');

  // ROI Sliders
  const hoursSlider = document.getElementById('calc-hours');
  const hoursVal = document.getElementById('calc-hours-val');
  const budgetSlider = document.getElementById('calc-budget');
  const budgetVal = document.getElementById('calc-budget-val');
  const roiOutput = document.getElementById('calc-roi-output');

  if (!filterBtns.length || !hoursSlider || !budgetSlider || !roiOutput) return;

  // Mock data sets
  const dataSets = {
    weekly: {
      deals: "14",
      revenue: "₹4,25,000",
      winrate: "32.4%",
      // SVG path coordinates relative to a 600x180 viewbox
      linePath: "M 0 140 C 80 160, 120 70, 200 90 C 280 110, 320 30, 400 60 C 480 90, 520 20, 600 40",
      areaPath: "M 0 140 C 80 160, 120 70, 200 90 C 280 110, 320 30, 400 60 C 480 90, 520 20, 600 40 L 600 180 L 0 180 Z"
    },
    monthly: {
      deals: "58",
      revenue: "₹18,40,000",
      winrate: "34.8%",
      linePath: "M 0 150 C 100 120, 150 90, 250 50 C 350 10, 400 110, 500 70 C 550 50, 580 20, 600 10",
      areaPath: "M 0 150 C 100 120, 150 90, 250 50 C 350 10, 400 110, 500 70 C 550 50, 580 20, 600 10 L 600 180 L 0 180 Z"
    },
    yearly: {
      deals: "680",
      revenue: "₹2,14,50,000",
      winrate: "37.5%",
      linePath: "M 0 160 C 100 160, 200 140, 300 90 C 400 40, 500 30, 600 5",
      areaPath: "M 0 160 C 100 160, 200 140, 300 90 C 400 40, 500 30, 600 5 L 600 180 L 0 180 Z"
    }
  };

  // Switch chart period
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-period');
      const data = dataSets[period];

      if (!data) return;

      // Animate statistics text
      animateTextValue(statDeals, data.deals);
      animateTextValue(statRevenue, data.revenue);
      animateTextValue(statWinrate, data.winrate);

      // Animate SVG path morphing
      if (chartLine && chartArea) {
        chartLine.setAttribute('d', data.linePath);
        chartArea.setAttribute('d', data.areaPath);
      }
    });
  });

  function animateTextValue(element, finalVal) {
    if (!element) return;
    
    // Quick fade effect for numbers
    element.style.opacity = 0;
    element.style.transform = 'translateY(5px)';
    
    setTimeout(() => {
      element.textContent = finalVal;
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 0.2s, transform 0.2s';
    }, 150);
  }

  // Interactive ROI Calculator Logic
  // Formula:
  // Operational Cost Saved = (Hours Saved * ₹2,000 per hour * 4.3 weeks) - (Implementation Budget)
  function calculateRoi() {
    const hours = parseInt(hoursSlider.value);
    const budget = parseInt(budgetSlider.value);

    // Update slider values in display
    hoursVal.textContent = hours;
    
    // Format Indian Rupees in standard shorthand
    if (budget >= 100000) {
      budgetVal.textContent = `₹${(budget / 100000).toFixed(1)}L`;
    } else {
      budgetVal.textContent = `₹${budget.toLocaleString('en-IN')}`;
    }

    const grossSavings = hours * 2000 * 4.3; // Hourly resource cost averaged
    const netSavings = Math.round(grossSavings - (budget / 12)); // Monthly amortized implementation cost

    if (netSavings <= 0) {
      roiOutput.textContent = "₹0 / mo";
      roiOutput.style.color = '#ef4444';
    } else {
      roiOutput.textContent = `₹${netSavings.toLocaleString('en-IN')} / mo`;
      roiOutput.style.color = '#10b981';
    }
  }

  // Bind slider listeners
  hoursSlider.addEventListener('input', calculateRoi);
  budgetSlider.addEventListener('input', calculateRoi);

  // Initialize calculations
  calculateRoi();
}
