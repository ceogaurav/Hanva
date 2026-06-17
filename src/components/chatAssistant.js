export function initChatAssistant() {
  const bubble = document.getElementById('chat-bubble');
  const box = document.getElementById('chat-box-container');
  const closeBtn = document.getElementById('chat-close-btn');
  const form = document.getElementById('chat-input-form');
  const input = document.getElementById('chat-message-input');
  const log = document.getElementById('chat-messages-log');
  const presetsContainer = document.getElementById('chat-presets');

  if (!bubble || !box || !closeBtn || !form || !input || !log) return;

  // Toggle Chat box open/close
  bubble.addEventListener('click', () => {
    box.classList.toggle('open');
    if (box.classList.contains('open')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    box.classList.remove('open');
  });

  // Prevent closing when clicking inside box
  box.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close when clicking outside box (on body)
  document.addEventListener('click', (e) => {
    if (!box.contains(e.target) && !bubble.contains(e.target)) {
      box.classList.remove('open');
    }
  });

  function appendMessage(sender, text, isHtml = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.style.display = 'flex';
    msg.style.flexDirection = 'column';
    msg.style.marginBottom = '12px';
    msg.style.maxWidth = '85%';
    
    if (sender === 'user') {
      msg.style.marginLeft = 'auto';
      msg.style.background = 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))';
      msg.style.color = '#fff';
      msg.style.padding = '10px 14px';
      msg.style.borderRadius = '14px 14px 0 14px';
    } else {
      msg.style.marginRight = 'auto';
      msg.style.background = 'rgba(255, 255, 255, 0.04)';
      msg.style.border = '1px solid var(--glass-border)';
      msg.style.color = 'var(--text-primary)';
      msg.style.padding = '10px 14px';
      msg.style.borderRadius = '14px 14px 14px 0';
    }

    msg.style.fontSize = '13px';
    msg.style.lineHeight = '1.5';
    
    if (isHtml) {
      msg.innerHTML = text;
    } else {
      msg.textContent = text;
    }
    
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
    return msg;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot typing-indicator';
    indicator.style.marginRight = 'auto';
    indicator.style.marginBottom = '12px';
    indicator.style.background = 'rgba(255, 255, 255, 0.04)';
    indicator.style.border = '1px solid var(--glass-border)';
    indicator.style.padding = '10px 14px';
    indicator.style.borderRadius = '14px 14px 14px 0';
    indicator.style.display = 'flex';
    indicator.style.gap = '4px';
    indicator.style.alignItems = 'center';
    
    indicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;

    log.appendChild(indicator);
    log.scrollTop = log.scrollHeight;
    return indicator;
  }

  const responses = {
    ai: "Hanva builds background agent workflows including OCR document ingestion, schema verification, and Slack report routing. You can test these in real-time on our <a href='#ai-sandbox' style='color: var(--accent-cyan); font-weight: bold;'>AI Sandbox Page</a>.",
    crm: "Our custom CRM & Billing suites manage contacts, pipelines, and invoice ledgers with granular access controls. Try the interactive chart and calculator here: <a href='#products' style='color: var(--accent-cyan); font-weight: bold;'>CRM Products Page</a>.",
    consult: "Ready to design your custom pipeline? Click over to our multi-step project architect form: <a href='#contact' style='color: var(--accent-cyan); font-weight: bold;'>Initiate Contact</a>.",
    hello: "Hello! I am Hanva's AI Assistant. How can I help you automate your business operations today?",
    default: "That sounds interesting! Hanva Technologies offers custom AI automation, CRM/Billing engines, and full-stack web architectures. Check out our <a href='#services' style='color: var(--accent-cyan); font-weight: bold;'>Services breakdown</a> for more info."
  };

  function handleBotReply(userInput) {
    const indicator = showTypingIndicator();
    const query = userInput.toLowerCase();

    // Determine matching answer
    let replyText = responses.default;
    if (query.includes('ai') || query.includes('agent') || query.includes('automation') || query.includes('sandbox')) {
      replyText = responses.ai;
    } else if (query.includes('crm') || query.includes('billing') || query.includes('invoice') || query.includes('pricing') || query.includes('calculator')) {
      replyText = responses.crm;
    } else if (query.includes('contact') || query.includes('consult') || query.includes('sales') || query.includes('book') || query.includes('price')) {
      replyText = responses.consult;
    } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      replyText = responses.hello;
    }

    // Simulate typing delay
    setTimeout(() => {
      indicator.remove();
      appendMessage('bot', replyText, true);
    }, 1200);
  }

  // Handle Preset Clicks
  if (presetsContainer) {
    presetsContainer.querySelectorAll('.chat-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = btn.getAttribute('data-value');
        const text = btn.textContent;
        
        appendMessage('user', text);
        handleBotReply(value);
      });
    });
  }

  // Handle Input Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    handleBotReply(text);
  });

  // Send first bot message
  appendMessage('bot', "Hello! I am Hanva's AI Assistant. How can I assist you with your digital automation needs today?");
}
