/* ================================================
   LAFARIES AI CHAT WIDGET - FAQ FALLBACK VERSION
   Works without API - uses keyword matching
   ================================================ */

(function () {

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    #lf-launcher{
      position:fixed;bottom:28px;right:28px;
      z-index:99999;display:flex;flex-direction:column;
      align-items:center;cursor:pointer;
      filter:drop-shadow(0 8px 24px rgba(0,0,0,.32));
      transition:transform .2s ease;
      font-family:"Inter",system-ui;
    }
    #lf-launcher:hover{transform:scale(1.04);}
    #lf-launcher .lf-av-wrap{
      width:88px;height:88px;border-radius:50%;overflow:hidden;
      border:3px solid #DAB85C;background:#1a1a2e;
    }
    #lf-launcher .lf-av-wrap img{
      width:100%;height:100%;
      object-fit:cover;object-position:top center;
    }
    #lf-launcher .lf-bubble-tab{
      margin-top:-6px;
      background:linear-gradient(135deg,#1a1a2e,#16213e);
      color:#DAB85C;font-size:11.5px;font-weight:700;
      letter-spacing:.4px;padding:7px 15px;border-radius:20px;
      border:1.5px solid #DAB85C;white-space:nowrap;
      box-shadow:0 4px 14px rgba(0,0,0,.35);
    }
    #lf-launcher::before{
      content:'';position:absolute;top:-6px;left:-6px;
      width:100px;height:100px;border-radius:50%;
      border:2px solid rgba(218,184,92,.45);
      animation:lf-pulse 2.2s infinite;
    }
    @keyframes lf-pulse{
      0%{transform:scale(1);opacity:1;}
      70%{transform:scale(1.16);opacity:0;}
      100%{transform:scale(1.16);opacity:0;}
    }
    #lf-panel{
      position:fixed;bottom:158px;right:28px;
      width:368px;border-radius:22px;overflow:hidden;
      box-shadow:0 24px 70px rgba(0,0,0,.4);
      z-index:99998;display:none;flex-direction:column;
      border:1px solid rgba(218,184,92,.3);
      font-family:"Inter",system-ui;
    }
    #lf-panel.lf-open{display:flex;animation:lf-slideUp .3s ease;}
    @keyframes lf-slideUp{
      from{opacity:0;transform:translateY(18px);}
      to{opacity:1;transform:translateY(0);}
    }
    .lf-hdr{
      background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);
      padding:15px 17px;display:flex;align-items:center;gap:11px;
      border-bottom:1px solid rgba(218,184,92,.2);
    }
    .lf-hdr-av{
      width:46px;height:46px;border-radius:50%;overflow:hidden;
      border:2px solid #DAB85C;flex-shrink:0;
    }
    .lf-hdr-av img{width:100%;height:100%;object-fit:cover;object-position:top center;}
    .lf-hdr-name{color:#DAB85C;font-weight:700;font-size:14.5px;}
    .lf-hdr-status{
      color:rgba(255,255,255,.6);font-size:11px;margin-top:2px;
      display:flex;align-items:center;gap:5px;
    }
    .lf-hdr-status::before{
      content:'';width:7px;height:7px;border-radius:50%;
      background:#4caf50;display:inline-block;
    }
    .lf-hdr-close{
      color:rgba(255,255,255,.45);font-size:19px;
      cursor:pointer;margin-left:auto;line-height:1;
      transition:color .2s;
    }
    .lf-hdr-close:hover{color:#DAB85C;}
    .lf-msgs{
      flex:1;overflow-y:auto;padding:16px 15px;
      display:flex;flex-direction:column;gap:11px;
      background:#0d0d1a;max-height:350px;
    }
    .lf-msgs::-webkit-scrollbar{width:3px;}
    .lf-msgs::-webkit-scrollbar-thumb{background:rgba(218,184,92,.25);border-radius:4px;}
    .lf-msg{display:flex;gap:8px;align-items:flex-end;max-width:90%;}
    .lf-msg.lf-bot{align-self:flex-start;}
    .lf-msg.lf-user{align-self:flex-end;flex-direction:row-reverse;}
    .lf-msg-av{
      width:27px;height:27px;border-radius:50%;overflow:hidden;
      border:1.5px solid #DAB85C;flex-shrink:0;
    }
    .lf-msg-av img{width:100%;height:100%;object-fit:cover;object-position:top;}
    .lf-bbl{padding:9px 13px;border-radius:16px;font-size:13px;line-height:1.55;}
    .lf-bot .lf-bbl{
      background:#1e1e3a;color:#e8e8f0;
      border-bottom-left-radius:4px;
      border:1px solid rgba(218,184,92,.12);
    }
    .lf-user .lf-bbl{
      background:linear-gradient(135deg,#DAB85C,#b8932a);
      color:#fff;border-bottom-right-radius:4px;
    }
    .lf-chips{
      display:flex;flex-wrap:wrap;gap:7px;
      padding:10px 15px 13px;background:#0d0d1a;
    }
    .lf-chip{
      background:transparent;border:1.5px solid rgba(218,184,92,.45);
      color:#DAB85C;border-radius:20px;padding:6px 12px;
      font-size:11.5px;cursor:pointer;transition:all .2s;
    }
    .lf-chip:hover{background:#DAB85C;color:#1a1a2e;font-weight:600;}
    .lf-typing{
      display:flex;gap:4px;align-items:center;
      padding:9px 13px;background:#1e1e3a;
      border-radius:16px;border-bottom-left-radius:4px;
      width:fit-content;border:1px solid rgba(218,184,92,.12);
    }
    .lf-typing span{
      width:6px;height:6px;border-radius:50%;
      background:#DAB85C;animation:lf-bounce 1.2s infinite;
    }
    .lf-typing span:nth-child(2){animation-delay:.2s;}
    .lf-typing span:nth-child(3){animation-delay:.4s;}
    @keyframes lf-bounce{
      0%,60%,100%{transform:translateY(0);opacity:.5;}
      30%{transform:translateY(-5px);opacity:1;}
    }
    .lf-input-row{
      background:#12122a;border-top:1px solid rgba(218,184,92,.18);
      padding:11px 13px;display:flex;gap:9px;align-items:center;
    }
    .lf-input-row input{
      flex:1;background:#1e1e3a;
      border:1px solid rgba(218,184,92,.22);border-radius:22px;
      padding:9px 15px;color:#e8e8f0;font-size:13px;
      outline:none;transition:border-color .2s;
    }
    .lf-input-row input::placeholder{color:rgba(255,255,255,.28);}
    .lf-input-row input:focus{border-color:#DAB85C;}
    .lf-send-btn{
      width:38px;height:38px;border-radius:50%;
      background:linear-gradient(135deg,#DAB85C,#b8932a);
      border:none;cursor:pointer;display:flex;
      align-items:center;justify-content:center;flex-shrink:0;
      transition:transform .2s,box-shadow .2s;
    }
    .lf-send-btn:hover{transform:scale(1.09);box-shadow:0 4px 14px rgba(218,184,92,.4);}
    .lf-send-btn svg{width:17px;height:17px;fill:#fff;}
    .lf-widget-footer{
      background:#0d0d1a;text-align:center;padding:5px;
      font-size:10px;color:rgba(255,255,255,.22);
    }
    .lf-widget-footer a{color:rgba(218,184,92,.45);text-decoration:none;}
  `;
  document.head.appendChild(style);

  /* ── Inject HTML ── */
  const html = `
    <div id="lf-launcher" onclick="lfToggle()">
      <div class="lf-av-wrap">
        <img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/>
      </div>
      <div class="lf-bubble-tab">&#x1F44B; Hi, I'm LaFaries — Let's Chat!</div>
    </div>

    <div id="lf-panel">
      <div class="lf-hdr">
        <div class="lf-hdr-av">
          <img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/>
        </div>
        <div>
          <div class="lf-hdr-name">LaFaries</div>
          <div class="lf-hdr-status">Online · LaFaries Mortimer LLC</div>
        </div>
        <div class="lf-hdr-close" onclick="lfToggle()">&#x2715;</div>
      </div>
      <div class="lf-msgs" id="lf-msgs"></div>
      <div class="lf-chips" id="lf-chips">
        <button class="lf-chip" onclick="lfChip('Tell me about LAAP Suite')">&#x1F4CB; LAAP Suite</button>
        <button class="lf-chip" onclick="lfChip('What are your AI Agent services?')">&#x1F916; AI Agents</button>
        <button class="lf-chip" onclick="lfChip('What free tools do you offer?')">&#x1F193; Free Tools</button>
        <button class="lf-chip" onclick="lfChip('I want to book a call')">&#x1F4C5; Book a Call</button>
      </div>
      <div class="lf-input-row">
        <input type="text" id="lf-input" placeholder="Ask me anything…"
          onkeydown="if(event.key==='Enter') lfSend()"/>
        <button class="lf-send-btn" onclick="lfSend()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="lf-widget-footer">
        Powered by <a href="https://lafariesmortimerllc.com">LaFaries Mortimer LLC</a> · AI Assistant
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  /* ── Knowledge Base ── */
  const KNOWLEDGE = {
    "laap|suite|laap suite": {
      answer: "LAAP Suite™ is our complete business operating system at <strong>$79/month</strong> (promo price, normally $99). It includes a guided 10-step formation wizard, automated filings, compliance tracking for all 50 states, annual maintenance, and document management.<br><br>Ready to organize your business? <a href='/laap.html' style='color:#DAB85C'>Learn more about LAAP →</a>",
    },
    "ai agent|ai|chatbot|automated": {
      answer: "Our AI Agent Services provide 24/7 automated customer support that answers calls, follows up on leads, and guides customers automatically. Custom pricing based on your needs.<br><br><a href='/contact.html' style='color:#DAB85C'>Book a call</a> to discuss AI agent deployment for your business!",
    },
    "website|web design|custom site": {
      answer: "We build custom, professional websites with strategic design, mobile optimization, and optional LAAP Suite integration. Each site is hosted and maintained by us.<br><br>Pricing is custom based on your needs. <a href='/contact.html' style='color:#DAB85C'>Book a call</a> to discuss your project!",
    },
    "free|tools|calculator|invoice": {
      answer: "We offer FREE tools with no account required!<br><br>• Invoice Generator<br>• Business Name Checker<br>• LLC Operating Agreement template<br>• Meeting Minutes Maker<br>• EIN Checklist<br>• Legacy & Family Tools app<br><br><a href='/apps.html' style='color:#DAB85C'>Access free tools →</a>",
    },
    "price|pricing|cost|how much": {
      answer: "<strong>Our Services:</strong><br><br>• <strong>LAAP Suite™:</strong> $79/month (promo)<br>• <strong>AI Agents:</strong> Custom quote<br>• <strong>Custom Websites:</strong> Custom quote<br>• <strong>Managed Support:</strong> Custom quote<br>• <strong>Free Tools:</strong> $0<br><br><a href='/contact.html' style='color:#DAB85C'>Book a call</a> for detailed pricing!",
    },
    "contact|call|email|location|where": {
      answer: "We're based in <strong>Miami, FL</strong> providing virtual support nationwide.<br><br>📧 Email: support@lafariesmortimerllc.com<br>⏰ Response time: 24-48 hours<br><br><a href='/contact.html' style='color:#DAB85C'>Book a call →</a>",
    },
    "about|who|company|what do you do": {
      answer: "LaFaries Mortimer LLC is an Administrative & IT Services company specializing in:<br><br>• Business formation & compliance<br>• Administrative automation (LAAP Suite™)<br>• AI-powered customer support<br>• Custom website development<br>• Ongoing IT & admin management<br><br>Based in Miami, FL • Serving businesses nationwide",
    },
    "service|services|offer": {
      answer: "<strong>Our Services:</strong><br><br>1. <strong>LAAP Suite™</strong> ($79/mo) - Business operating system<br>2. <strong>AI Agents</strong> - 24/7 automated support<br>3. <strong>Custom Websites</strong> - Professional design<br>4. <strong>Managed Support</strong> - IT & admin help<br>5. <strong>Free Tools</strong> - No cost, no account needed<br><br><a href='/contact.html' style='color:#DAB85C'>Book a call to learn more →</a>",
    }
  };

  let lfOpen = false;

  window.lfToggle = function () {
    lfOpen = !lfOpen;
    const panel = document.getElementById('lf-panel');
    if (lfOpen) {
      panel.classList.add('lf-open');
      if (document.getElementById('lf-msgs').children.length === 0) lfWelcome();
    } else {
      panel.classList.remove('lf-open');
    }
  };

  function lfWelcome() {
    lfAddMsg('bot', "Hi! I'm <strong>LaFaries</strong>, your virtual assistant for LaFaries Mortimer LLC. I can help with:<br><br>• LAAP Suite™ ($79/month)<br>• AI Agent Services<br>• Custom Websites<br>• Free Business Tools<br>• Booking a consultation<br><br>What can I help you with? 👇");
  }

  function lfAddMsg(role, html) {
    const c = document.getElementById('lf-msgs');
    const d = document.createElement('div');
    d.className = `lf-msg lf-${role}`;
    if (role === 'bot') {
      d.innerHTML = `<div class="lf-msg-av"><img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/></div><div class="lf-bbl">${html}</div>`;
    } else {
      d.innerHTML = `<div class="lf-bbl">${html}</div>`;
    }
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  }

  function lfShowTyping() {
    const c = document.getElementById('lf-msgs');
    const d = document.createElement('div');
    d.className = 'lf-msg lf-bot';
    d.id = 'lf-typing';
    d.innerHTML = `<div class="lf-msg-av"><img src="/assets/img/lafaries-avatar.jpg" alt="LaFaries"/></div><div class="lf-typing"><span></span><span></span><span></span></div>`;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
  }

  function lfRemoveTyping() {
    document.getElementById('lf-typing')?.remove();
  }

  window.lfSend = function () {
    const inp = document.getElementById('lf-input');
    const text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    lfDoSend(text);
  };

  window.lfChip = function (text) {
    document.getElementById('lf-chips').style.display = 'none';
    lfDoSend(text);
  };

  function lfDoSend(text) {
    lfAddMsg('user', text);
    lfShowTyping();
    
    setTimeout(() => {
      const query = text.toLowerCase();
      let response = null;
      
      // Match against knowledge base
      for (const [keywords, data] of Object.entries(KNOWLEDGE)) {
        const patterns = keywords.split('|');
        if (patterns.some(pattern => query.includes(pattern))) {
          response = data.answer;
          break;
        }
      }
      
      // Default response
      if (!response) {
        response = "I can help you with information about:<br><br>• <strong>LAAP Suite™</strong> - Our business operating system<br>• <strong>AI Agents</strong> - 24/7 automated support<br>• <strong>Custom Websites</strong> - Professional design<br>• <strong>Free Tools</strong> - Business resources<br>• <strong>Pricing & Services</strong><br>• <strong>Contact Information</strong><br><br>What would you like to know? Or <a href='/contact.html' style='color:#DAB85C'>book a call</a> to speak with us directly!";
      }
      
      lfRemoveTyping();
      lfAddMsg('bot', response);
    }, 800);
  }

})();
