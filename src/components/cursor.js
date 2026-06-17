export function initCustomCursor() {
  // Guard for mobile/touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    const cursor = document.getElementById('custom-cursor');
    const ripples = document.getElementById('cursor-ripples');
    const spotlight = document.getElementById('cursor-glow-spotlight');
    if (cursor) cursor.style.display = 'none';
    if (ripples) ripples.style.display = 'none';
    if (spotlight) spotlight.style.display = 'none';
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  const ring = cursor?.querySelector('.cursor-ring');
  const dot = cursor?.querySelector('.cursor-dot');
  const cursorText = cursor?.querySelector('.cursor-text');
  const rippleContainer = document.getElementById('cursor-ripples');
  const spotlight = document.getElementById('cursor-glow-spotlight');

  if (!cursor || !ring || !dot || !rippleContainer) return;

  // Show spotlight glow
  if (spotlight) spotlight.classList.add('active');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  let ringX = mouseX;
  let ringY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;

  // Magnetic snap targets state
  let hoveredElement = null;
  let isSnapped = false;
  let targetX = 0;
  let targetY = 0;

  // Click sparks physics particles state
  let activeSparks = [];

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Inertia follow & physics loop using requestAnimationFrame
  function updateCursor() {
    // 1. Calculate Snapping Coordinates (ensuring element is still in DOM and visible)
    if (hoveredElement && document.body.contains(hoveredElement)) {
      const rect = hoveredElement.getBoundingClientRect();
      
      // Release snap if the element is hidden (width or height is 0)
      if (rect.width === 0 || rect.height === 0) {
        hoveredElement = null;
        isSnapped = false;
      } else {
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const dx = mouseX - elementCenterX;
        const dy = mouseY - elementCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Snap threshold radius: snap ring to center if mouse is close enough
        const snapRadius = Math.max(rect.width, rect.height) * 0.8 + 20;
        
        if (distance < snapRadius) {
          isSnapped = true;
          targetX = elementCenterX;
          targetY = elementCenterY;
        } else {
          isSnapped = false;
        }
      }
    } else {
      hoveredElement = null;
      isSnapped = false;
    }

    // 2. Interpolate Ring Position (with snap override)
    if (isSnapped) {
      // Fast snap to center coordinates of button
      ringX += (targetX - ringX) * 0.25;
      ringY += (targetY - ringY) * 0.25;
    } else {
      // Standard smooth lazy follow
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
    }

    // 3. Interpolate Dot Position (always tracking actual mouse)
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;

    // Apply coordinate updates
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    if (cursorText) {
      cursorText.style.left = `${mouseX}px`;
      cursorText.style.top = `${mouseY - 24}px`;
    }

    // 4. Update Spotlight Coordinates (lagged behind for fluid glow drift)
    if (spotlight) {
      spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    // 5. Update Exploding Spark Particles
    if (activeSparks.length > 0) {
      activeSparks = activeSparks.filter(spark => {
        // Physics update
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.16; // gravity downward pull
        spark.vx *= 0.96; // air drag friction deceleration
        spark.vy *= 0.96;
        spark.alpha -= 0.02; // fade out rate

        // Render update
        spark.element.style.left = `${spark.x}px`;
        spark.element.style.top = `${spark.y}px`;
        spark.element.style.opacity = spark.alpha;
        spark.element.style.transform = `translate(-50%, -50%) scale(${spark.alpha})`;

        // Filter finished particles out
        if (spark.alpha <= 0) {
          spark.element.remove();
          return false;
        }
        return true;
      });
    }

    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);

  // Click shockwave particle explosion
  window.addEventListener('mousedown', (e) => {
    // Spawn 8 cyber sparks blasting outwards radially
    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      const sparkEl = document.createElement('div');
      sparkEl.className = 'cyber-spark';
      sparkEl.style.left = `${e.clientX}px`;
      sparkEl.style.top = `${e.clientY}px`;
      rippleContainer.appendChild(sparkEl);

      // Staggered angles around the circle
      const angle = (i * Math.PI * 2) / sparkCount + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 4 + 3; // Random speed factor

      activeSparks.push({
        element: sparkEl,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1
      });
    }
  });

  // Reset cursor snap and classes on page transitions
  window.addEventListener('hashchange', () => {
    hoveredElement = null;
    isSnapped = false;
    cursor.className = '';
    if (cursorText) cursorText.textContent = '';
  });

  // Handle cursor visibility when leaving/entering the viewport
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    if (spotlight) spotlight.classList.remove('active');
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    if (spotlight) spotlight.classList.add('active');
  });

  // Dynamic hover classes
  function setupHoverListeners() {
    const links = document.querySelectorAll('a, button, select, input, textarea, .tech-node-btn, .cyber-option, .filter-btn, [data-hover]');
    
    links.forEach(link => {
      // Avoid adding duplicate listeners
      if (link.dataset.hasCursorListeners) return;
      link.dataset.hasCursorListeners = "true";

      link.addEventListener('mouseenter', () => {
        // Track for magnetic snapping logic
        hoveredElement = link;

        const hoverType = link.getAttribute('data-hover') || 'link';
        const customText = link.getAttribute('data-hover-text');
        
        // Check if element qualifies for rotating scanner reticle target mode
        const isTargetWidget = 
          link.classList.contains('tech-node-btn') || 
          link.classList.contains('cyber-option') || 
          link.classList.contains('filter-btn') ||
          link.classList.contains('input-slider') ||
          link.classList.contains('form-input') ||
          link.id === 'sandbox-run-btn' ||
          link.id === 'add-item-btn';

        if (customText) {
          cursor.className = 'hovering-text';
          if (cursorText) cursorText.textContent = customText;
        } else if (isTargetWidget) {
          cursor.className = 'hovering-target';
        } else if (hoverType === 'expand') {
          cursor.className = 'hovering-expand';
        } else {
          cursor.className = 'hovering-link';
        }
      });

      link.addEventListener('mouseleave', () => {
        hoveredElement = null;
        cursor.className = '';
      });
    });
  }

  // Initial setup
  setupHoverListeners();

  // Re-run setup on DOM changes to bind new dynamic page elements
  const observer = new MutationObserver(() => {
    setupHoverListeners();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
