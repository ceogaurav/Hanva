import React from 'react';
import { createRoot } from 'react-dom/client';
import BillingApp from '../components/billing/BillingApp.jsx';

let root = null;
let currentRootElement = null;

export function renderBilling() {
  return '<div id="billing-root"></div>';
}

export function bindBilling() {
  const rootElement = document.getElementById('billing-root');
  if (rootElement) {
    if (!root || currentRootElement !== rootElement) {
      if (root) {
        root.unmount();
      }
      root = createRoot(rootElement);
      currentRootElement = rootElement;
    }
    root.render(<BillingApp />);
  }
}
