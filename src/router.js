import { renderHome, bindHome } from './pages/home.js';
import { renderServices, bindServices } from './pages/services.js';
import { renderProducts, bindProducts } from './pages/products.js';
import { renderAiSandbox, bindAiSandbox } from './pages/aiSandbox.js';
import { renderPortfolio, bindPortfolio } from './pages/portfolio.js';
import { renderContact, bindContact } from './pages/contact.js';
import { renderCrm, bindCrm } from './pages/crm.js';

const routes = {
  'home': { render: renderHome, bind: bindHome },
  'services': { render: renderServices, bind: bindServices },
  'products': { render: renderProducts, bind: bindProducts },
  'ai-sandbox': { render: renderAiSandbox, bind: bindAiSandbox },
  'portfolio': { render: renderPortfolio, bind: bindPortfolio },
  'contact': { render: renderContact, bind: bindContact },
  'crm': { render: renderCrm, bind: bindCrm }
};

export function initRouter() {
  const mainContent = document.getElementById('main-content');
  const desktopNavItems = document.querySelectorAll('.desktop-nav .nav-item');
  const drawerNavItems = document.querySelectorAll('.drawer-nav .drawer-nav-item');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

  function updateNavigationUI(activeRoute) {
    // Sync desktop links
    desktopNavItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${activeRoute}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Sync mobile drawer links
    drawerNavItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${activeRoute}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) {
      mobileDrawer.classList.remove('open');
    }
    if (mobileMenuToggle && mobileMenuToggle.classList.contains('open')) {
      mobileMenuToggle.classList.remove('open');
    }
  }

  function handleRoute() {
    let rawHash = window.location.hash.substring(1);
    
    // Split query params if any
    let hash = rawHash.split('?')[0];

    // Default to home if empty or invalid route
    if (!hash || !routes[hash]) {
      hash = 'home';
      window.history.replaceState(null, null, '#home');
    }

    const route = routes[hash];
    
    updateNavigationUI(hash);
    closeMobileDrawer();

    const renderPage = () => {
      // Injects HTML template with a wrapper page-view class for styling
      mainContent.innerHTML = `<div class="page-view">${route.render()}</div>`;
      
      // Bind page interactive events
      if (route.bind) {
        route.bind();
      }

      // Smooth scroll to top on routing
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Use Modern View Transitions API if supported by the browser
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        renderPage();
      });
    } else {
      renderPage();
    }
  }

  // Bind history hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Initial page trigger
  handleRoute();
}
