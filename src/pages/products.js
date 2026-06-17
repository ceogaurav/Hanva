import { initCrmMock } from '../components/crmMock.js';
import { initBillingSimulator } from '../components/billingSimulator.js';

export function renderProducts() {
  return `
    <section>
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Our Software Suite</span>
          <h2 class="section-title">Hanva CRM & Billing Platform</h2>
          <p class="section-desc">We build bespoke operational hubs that consolidate contact tracking, pipeline management, GST-compliant invoicing, and financial analytics.</p>
        </div>

        <div class="glass-card sandbox-card">
          <div class="sandbox-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="terminal-dot green"></span>
              <span style="font-family: var(--font-mono); font-size: 13px; font-weight: 600;">CRM_DASHBOARD_v1.02_LIVE</span>
            </div>
            <div class="crm-filters">
              <button class="filter-btn active" data-period="weekly" data-hover="expand">Weekly</button>
              <button class="filter-btn" data-period="monthly" data-hover="expand">Monthly</button>
              <button class="filter-btn" data-period="yearly" data-hover="expand">Yearly</button>
            </div>
          </div>
          
          <div class="sandbox-body crm-dashboard-preview">
            <!-- Stats row -->
            <div class="crm-stats-row">
              <div class="crm-stat-box">
                <span class="form-label" style="margin-bottom: 0;">Deals Won</span>
                <div class="crm-stat-val" id="crm-stat-deals" style="color: var(--accent-cyan);">14</div>
              </div>
              <div class="crm-stat-box">
                <span class="form-label" style="margin-bottom: 0;">Total Revenue</span>
                <div class="crm-stat-val" id="crm-stat-revenue" style="color: #10b981;">₹4,25,000</div>
              </div>
              <div class="crm-stat-box">
                <span class="form-label" style="margin-bottom: 0;">Win Rate</span>
                <div class="crm-stat-val" id="crm-stat-winrate" style="color: #f59e0b;">32.4%</div>
              </div>
            </div>

            <!-- SVG Chart Box -->
            <div class="crm-chart-box">
              <svg class="crm-chart-svg" viewBox="0 0 600 180">
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.25"/>
                    <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <!-- Grid Horizontal Lines -->
                <line x1="0" y1="45" x2="600" y2="45" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                
                <!-- Chart Shapes -->
                <path id="crm-chart-area" class="chart-area" d="M 0 140 C 80 160, 120 70, 200 90 C 280 110, 320 30, 400 60 C 480 90, 520 20, 600 40 L 600 180 L 0 180 Z"/>
                <path id="crm-chart-line" class="chart-line" d="M 0 140 C 80 160, 120 70, 200 90 C 280 110, 320 30, 400 60 C 480 90, 520 20, 600 40"/>
              </svg>
            </div>

            <!-- Interactive ROI calculator -->
            <div class="roi-calculator">
              <h3 class="roi-title">💼 ROI Savings Estimator</h3>
              
              <div class="slider-group">
                <div class="slider-header">
                  <span>Manual operations saved per week</span>
                  <span><span class="slider-val" id="calc-hours-val">20</span> hours</span>
                </div>
                <input type="range" id="calc-hours" class="input-slider" min="5" max="80" value="20" step="5" data-hover="expand">
              </div>

              <div class="slider-group" style="margin-bottom: 24px;">
                <div class="slider-header">
                  <span>Monthly system budget allocated</span>
                  <span><span class="slider-val" id="calc-budget-val">₹25,000</span></span>
                </div>
                <input type="range" id="calc-budget" class="input-slider" min="5000" max="150000" value="25000" step="5000" data-hover="expand">
              </div>

              <div class="roi-result">
                <div>
                  <span class="form-label" style="margin-bottom: 2px;">Estimated Monthly Savings</span>
                  <span style="font-size: 11px; color: var(--text-muted);">Averaged Resource Hourly Rate: ₹2,000/hr</span>
                </div>
                <div class="roi-result-num" id="calc-roi-output">₹1,47,000 / mo</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoicing Simulator Section -->
        <div class="invoice-box">
          <div class="invoice-doc-header">
            <div>
              <h3 style="font-family: var(--font-mono); font-size: 18px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 4px;">GST INVOICING CORE</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 0;">INV NO: <span id="invoice-number" style="font-family: var(--font-mono); color: var(--text-primary);">HNV-2026-XXXX</span></p>
            </div>
            <div style="text-align: right;">
              <span class="logo-text" style="font-size: 18px;">HANVA</span>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px; margin-bottom: 0;">DATE: <span id="invoice-date" style="color: var(--text-primary);">17 June 2026</span></p>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th style="width: 50px;">#</th>
                <th>Item / Service</th>
                <th style="width: 130px; text-align: right;">Base Fee</th>
                <th style="width: 80px; text-align: center;">GST</th>
                <th style="width: 130px; text-align: right;">Total</th>
                <th style="width: 60px; text-align: center;"></th>
              </tr>
            </thead>
            <tbody id="invoice-items-body">
              <!-- Dynamically rendered by JS -->
            </tbody>
          </table>

          <div class="invoice-totals-section">
            <div class="invoice-total-row">
              <span>Subtotal:</span>
              <span id="invoice-subtotal">₹0.00</span>
            </div>
            <div class="invoice-total-row">
              <span>CGST:</span>
              <span id="invoice-cgst">₹0.00</span>
            </div>
            <div class="invoice-total-row">
              <span>SGST:</span>
              <span id="invoice-sgst">₹0.00</span>
            </div>
            <div class="invoice-total-row grand">
              <span>Grand Total:</span>
              <span id="invoice-total">₹0.00</span>
            </div>
          </div>

          <!-- Invoice Line Item Editor Form -->
          <div class="invoice-editor-form">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 11px; color: var(--text-secondary);" for="item-name">Add Invoice Line Item</label>
              <input type="text" id="item-name" class="form-input" style="padding: 8px 12px; font-size: 13px;" placeholder="e.g. LLM API Fine-Tuning">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 11px; color: var(--text-secondary);" for="item-price">Base Cost (INR)</label>
              <input type="number" id="item-price" class="form-input" style="padding: 8px 12px; font-size: 13px; font-family: var(--font-mono);" placeholder="50000">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" style="font-size: 11px; color: var(--text-secondary);" for="item-gst">GST Tier</label>
              <select id="item-gst" class="select-cyber" style="width: 100%; padding: 8px 12px; font-size: 13px; height: 38px;" data-hover="expand">
                <option value="5">5% SGST/CGST</option>
                <option value="12">12% SGST/CGST</option>
                <option value="18" selected>18% SGST/CGST</option>
              </select>
            </div>
            <button id="add-item-btn" class="btn btn-primary btn-sm" style="height: 38px; padding: 0 16px;" data-hover="expand">Add Item</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Details Grid -->
    <section style="background: var(--bg-secondary); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Features & Details</span>
          <h2 class="section-title">Built for Performance and Scale</h2>
          <p class="section-desc">Our software products leverage clean architectures, secure databases, and progress notifications to streamline daily work.</p>
        </div>

        <div class="cards-grid">
          <div class="glass-card">
            <h3 class="card-title">Granular Permissions</h3>
            <p class="card-desc">Control access with role-based policies. Manage profiles for admins, sales agents, accounting clerks, and executives. Access logs track modifications dynamically.</p>
          </div>

          <div class="glass-card">
            <h3 class="card-title">GST-Invoicing Ledger</h3>
            <p class="card-desc">Generate SGST, CGST, and IGST calculations automatically. Print signed PDF invoices with direct ledger ledger alignment. Synchronize accounts instantly.</p>
          </div>

          <div class="glass-card">
            <h3 class="card-title">Audit Log Trail</h3>
            <p class="card-desc">Full security compliance mapping. Every invoice creation, edit, deletion, or payment sync is timestamped and locked in a secure transaction database.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindProducts() {
  initCrmMock();
  initBillingSimulator();
}
