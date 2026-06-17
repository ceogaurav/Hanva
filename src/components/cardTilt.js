export function initCardTilt() {
  // Guard for touch-only devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  function setupTiltListeners() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
      if (card.dataset.hasTiltListener) return;
      card.dataset.hasTiltListener = "true";

      // Enable 3D transitions on parent card styles
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      card.style.transformStyle = 'preserve-3d';

      // Create glare overlay if missing
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        glare.style.position = 'absolute';
        glare.style.inset = '0';
        glare.style.pointerEvents = 'none';
        glare.style.borderRadius = 'inherit';
        glare.style.zIndex = '5';
        glare.style.mixBlendMode = 'overlay';
        glare.style.transition = 'opacity 0.2s ease';
        glare.style.opacity = '0';
        card.appendChild(glare);
      }

      card.addEventListener('mouseenter', () => {
        glare.style.opacity = '1';
        card.style.transition = 'transform 0.05s ease';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse relative coordinates
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalized offsets from -0.5 to 0.5
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Max rotation limits in degrees
        const rotX = -normY * 12; // Rotate around horizontal X axis
        const rotY = normX * 12;  // Rotate around vertical Y axis

        // Update card 3D transforms
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Dynamic glare sweep gradient matching mouse percentage coordinates
        const glarePercentX = (x / rect.width) * 100;
        const glarePercentY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glarePercentX}% ${glarePercentY}%, rgba(255, 255, 255, 0.09) 0%, transparent 65%)`;
      });

      card.addEventListener('mouseleave', () => {
        glare.style.opacity = '0';
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        
        setTimeout(() => {
          if (glare) glare.style.background = 'none';
        }, 200);
      });
    });
  }

  // Initial setup
  setupTiltListeners();

  // Re-run setup on DOM changes to bind dynamically loaded pages
  const observer = new MutationObserver(() => {
    setupTiltListeners();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
