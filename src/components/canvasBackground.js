export function initCanvasBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Set canvas size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initParticles(rect.width, rect.height);
  }

  // Define particle properties
  class Particle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 1;
      this.baseAlpha = Math.random() * 0.3 + 0.15;
      this.alpha = this.baseAlpha;
    }

    update() {
      // Movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on edges
      if (this.x < 0 || this.x > this.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.height) this.vy *= -1;

      // Mouse interactive attraction (gravity)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          // Pull particle gently towards mouse
          this.x += (dx / distance) * force * 0.6;
          this.y += (dy / distance) * force * 0.6;
          this.alpha = Math.min(0.8, this.baseAlpha + force * 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles(width, height) {
    particles = [];
    // Calculate density based on viewport area
    const density = Math.round((width * height) / 11000);
    const count = Math.min(100, Math.max(25, density));
    
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(width, height));
    }
  }

  // Draw lines between near nodes
  function connectParticles() {
    const maxDistance = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Opacity fade as they get farther apart
          const opacity = (1 - (distance / maxDistance)) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      
      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const opacity = (1 - (distance / mouse.radius)) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', resizeCanvas);
  
  // Track cursor position inside canvas container
  const parent = canvas.parentElement;
  parent.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  parent.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  resizeCanvas();
  animate();

  // Return clean-up function
  return () => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
  };
}
