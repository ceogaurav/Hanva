export function initBillingSimulator() {
  const itemsBody = document.getElementById('invoice-items-body');
  const addItemBtn = document.getElementById('add-item-btn');
  const itemNameInput = document.getElementById('item-name');
  const itemPriceInput = document.getElementById('item-price');
  const itemGstSelect = document.getElementById('item-gst');

  // Total Displays
  const subtotalDisplay = document.getElementById('invoice-subtotal');
  const cgstDisplay = document.getElementById('invoice-cgst');
  const sgstDisplay = document.getElementById('invoice-sgst');
  const totalDisplay = document.getElementById('invoice-total');
  
  // Header details
  const invoiceNum = document.getElementById('invoice-number');
  const invoiceDate = document.getElementById('invoice-date');

  if (!itemsBody || !addItemBtn || !itemNameInput || !itemPriceInput) return;

  // Initial items
  let items = [
    { name: "Hanva CRM Enterprise License", price: 25000, gst: 18 },
    { name: "AI Agent API Integration Setup", price: 45000, gst: 18 }
  ];

  // Set initial invoice details
  if (invoiceNum) {
    invoiceNum.textContent = `HNV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }
  if (invoiceDate) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    invoiceDate.textContent = new Date().toLocaleDateString('en-IN', options);
  }

  function formatRupees(amount) {
    return `₹${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  function renderInvoice() {
    itemsBody.innerHTML = '';
    
    let subtotal = 0;
    let totalCgst = 0;
    let totalSgst = 0;

    items.forEach((item, index) => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
      row.style.fontSize = '13px';
      
      const itemGstAmt = (item.price * item.gst) / 100;
      const itemTotal = item.price + itemGstAmt;

      subtotal += item.price;
      totalCgst += itemGstAmt / 2;
      totalSgst += itemGstAmt / 2;

      row.innerHTML = `
        <td style="padding: 12px 8px; color: var(--text-secondary); font-family: var(--font-mono);">${index + 1}</td>
        <td style="padding: 12px 8px; font-weight: 500;">${item.name}</td>
        <td style="padding: 12px 8px; text-align: right; font-family: var(--font-mono);">${formatRupees(item.price)}</td>
        <td style="padding: 12px 8px; text-align: center; font-family: var(--font-mono); color: var(--accent-cyan);">${item.gst}%</td>
        <td style="padding: 12px 8px; text-align: right; font-family: var(--font-mono); font-weight: 600;">${formatRupees(itemTotal)}</td>
        <td style="padding: 12px 8px; text-align: center;">
          <button class="delete-item-btn" data-index="${index}" style="background: transparent; border: none; color: #ef4444; font-weight: bold; cursor: none; padding: 4px 8px;" title="Delete Item">✕</button>
        </td>
      `;

      itemsBody.appendChild(row);
    });

    // Handle empty state
    if (items.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td colspan="6" style="padding: 24px; text-align: center; color: var(--text-muted); font-style: italic;">
          No items added. Add items below to calculate billing values.
        </td>
      `;
      itemsBody.appendChild(row);
    }

    const total = subtotal + totalCgst + totalSgst;

    // Update totals displays
    if (subtotalDisplay) subtotalDisplay.textContent = formatRupees(subtotal);
    if (cgstDisplay) cgstDisplay.textContent = formatRupees(totalCgst);
    if (sgstDisplay) sgstDisplay.textContent = formatRupees(totalSgst);
    if (totalDisplay) {
      totalDisplay.textContent = formatRupees(total);
      totalDisplay.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
    }

    // Bind delete listeners
    const deleteBtns = itemsBody.querySelectorAll('.delete-item-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        items.splice(index, 1);
        renderInvoice();
      });
    });
  }

  // Add Item Handler
  addItemBtn.addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const gst = parseInt(itemGstSelect.value);

    if (!name || isNaN(price) || price <= 0) {
      alert("Please enter a valid item name and numeric price.");
      return;
    }

    items.push({ name, price, gst });
    
    // Clear inputs
    itemNameInput.value = '';
    itemPriceInput.value = '';
    itemGstSelect.value = '18'; // Reset to default 18%

    renderInvoice();
  });

  // Initial render
  renderInvoice();
}
