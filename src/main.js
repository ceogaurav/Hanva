import './style.css';
import { initPreloader } from './components/preloader.js';
import { initCustomCursor } from './components/cursor.js';
import { initRouter } from './router.js';
import { initChatAssistant } from './components/chatAssistant.js';
import { initCardTilt } from './components/cardTilt.js';
import { initSystemConsole } from './components/systemConsole.js';
import { initAudioSynthesizer } from './components/audioSynthesizer.js';
import { initTrialPopup } from './components/trialPopup.js';

// Global layout interactions (scrolling header, mobile navigation, scroll-indicator)
function initGlobalLayout() {
  const header = document.getElementById('main-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('mobile-drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const newsletterForm = document.getElementById('newsletter-form');

  // Shrinking header & scroll progress bar on scrollport movement
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Sync header height scale
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Sync scroll progress bar indicator width
    if (scrollProgress && scrollHeight > 0) {
      const percentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // Mobile navigation drawer controls
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });
  }

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileToggle) mobileToggle.classList.remove('open');
  };

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close mobile drawer on route navigation clicks (links inside drawer)
  const drawerLinks = document.querySelectorAll('.drawer-nav-item');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Newsletter form mock submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput) {
        const email = emailInput.value;
        emailInput.value = "";
        alert(`[SUBSCRIBED] Thank you! Decoded weekly insights will be sent to: ${email}`);
      }
    });
  }
}

// Start up website launch pipeline
document.addEventListener('DOMContentLoaded', () => {
  initPreloader(() => {
    // Fired once preloader slides away
    initCustomCursor();
    initGlobalLayout();
    initRouter();
    initChatAssistant();
    initCardTilt();
    initSystemConsole();
    initAudioSynthesizer();
    initTrialPopup();
  });
});


